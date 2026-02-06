import { supabase } from '../lib/supabase';

// Simple in-memory cache with TTL
class Cache {
  constructor(defaultTTL = 300000) { // 5 minutes default
    this.cache = new Map();
    this.defaultTTL = defaultTTL;
  }

  set(key, value, ttl = this.defaultTTL) {
    const expiry = Date.now() + ttl;
    this.cache.set(key, { value, expiry });
  }

  get(key) {
    const item = this.cache.get(key);
    
    if (!item) return null;
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }

  delete(key) {
    this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }

  has(key) {
    return this.get(key) !== null;
  }
}

// Create cache instances
const dataCache = new Cache(300000); // 5 minutes for data
const userCache = new Cache(600000); // 10 minutes for user data

// Cache keys generator
const generateCacheKey = (table, query, params = {}) => {
  const paramStr = JSON.stringify(params);
  return `${table}:${query}:${paramStr}`;
};

// Enhanced Supabase client with caching
export const cachedSupabase = {
  // Cached select query
  async select(table, query = '*', options = {}) {
    const { 
      filters = {}, 
      order = {}, 
      limit, 
      cacheKey: customCacheKey,
      ttl,
      forceRefresh = false 
    } = options;

    const cacheKey = customCacheKey || generateCacheKey(table, query, { filters, order, limit });
    
    // Return cached data if available and not forced refresh
    if (!forceRefresh) {
      const cachedData = dataCache.get(cacheKey);
      if (cachedData) {
        return { data: cachedData, error: null, fromCache: true };
      }
    }

    try {
      let supabaseQuery = supabase.from(table).select(query);

      // Apply filters
      Object.entries(filters).forEach(([column, value]) => {
        if (value !== undefined && value !== null) {
          supabaseQuery = supabaseQuery.eq(column, value);
        }
      });

      // Apply ordering
      if (order.column) {
        supabaseQuery = supabaseQuery.order(order.column, {
          ascending: order.ascending !== false
        });
      }

      // Apply limit
      if (limit) {
        supabaseQuery = supabaseQuery.limit(limit);
      }

      const { data, error } = await supabaseQuery;

      if (error) throw error;

      // Cache the result
      dataCache.set(cacheKey, data, ttl);

      return { data, error: null, fromCache: false };
    } catch (error) {
      console.error('Cached Supabase query error:', error);
      return { data: null, error, fromCache: false };
    }
  },

  // Cached insert
  async insert(table, data, options = {}) {
    const { invalidateCache = true } = options;
    
    try {
      const { data: result, error } = await supabase
        .from(table)
        .insert(data)
        .select();

      if (error) throw error;

      // Invalidate related caches
      if (invalidateCache) {
        this.invalidateTableCache(table);
      }

      return { data: result, error: null };
    } catch (error) {
      console.error('Cached Supabase insert error:', error);
      return { data: null, error };
    }
  },

  // Cached update
  async update(table, updates, filters, options = {}) {
    const { invalidateCache = true } = options;
    
    try {
      let query = supabase.from(table).update(updates);

      // Apply filters
      Object.entries(filters).forEach(([column, value]) => {
        query = query.eq(column, value);
      });

      const { data, error } = await query.select();

      if (error) throw error;

      // Invalidate related caches
      if (invalidateCache) {
        this.invalidateTableCache(table);
      }

      return { data, error: null };
    } catch (error) {
      console.error('Cached Supabase update error:', error);
      return { data: null, error };
    }
  },

  // Cached delete
  async delete(table, filters, options = {}) {
    const { invalidateCache = true } = options;
    
    try {
      let query = supabase.from(table).delete();

      // Apply filters
      Object.entries(filters).forEach(([column, value]) => {
        query = query.eq(column, value);
      });

      const { data, error } = await query;

      if (error) throw error;

      // Invalidate related caches
      if (invalidateCache) {
        this.invalidateTableCache(table);
      }

      return { data, error: null };
    } catch (error) {
      console.error('Cached Supabase delete error:', error);
      return { data: null, error };
    }
  },

  // Invalidate cache for specific table
  invalidateTableCache(table) {
    // Remove all cache entries for this table
    const keysToDelete = [];
    dataCache.cache.forEach((value, key) => {
      if (key.startsWith(`${table}:`)) {
        keysToDelete.push(key);
      }
    });
    
    keysToDelete.forEach(key => dataCache.delete(key));
  },

  // Clear all caches
  clearAllCache() {
    dataCache.clear();
    userCache.clear();
  },

  // Get cache statistics
  getCacheStats() {
    return {
      dataCacheSize: dataCache.cache.size,
      userCacheSize: userCache.cache.size,
      totalHits: 0, // Would need to track this separately
      totalMisses: 0 // Would need to track this separately
    };
  }
};

// Specific cache helpers for common operations
export const employeeCache = {
  async getAllEmployees(forceRefresh = false) {
    return cachedSupabase.select('employees', '*', {
      order: { column: 'created_at', ascending: false },
      cacheKey: 'employees:all',
      forceRefresh
    });
  },

  async getEmployeeById(id) {
    return cachedSupabase.select('employees', '*', {
      filters: { id },
      cacheKey: `employee:${id}`,
      ttl: 600000 // 10 minutes for individual employee
    });
  },

  async searchEmployees(searchTerm) {
    if (!searchTerm) return this.getAllEmployees();
    
    return cachedSupabase.select('employees', '*', {
      filters: {
        // This would need to be implemented with proper text search
        // For now, we'll invalidate and fetch fresh data
      },
      cacheKey: `employees:search:${searchTerm}`,
      ttl: 120000 // 2 minutes for search results
    });
  },

  async deleteEmployee(employeeId) {
    try {
      // Validate Supabase client
      if (!supabase) {
        console.error('Supabase client not initialized');
        return { success: false, error: new Error('Database connection not available') };
      }
      
      // Delete from database (using 'id' field)
      const { error, status } = await supabase
        .from('employees')
        .delete()
        .eq('id', employeeId);
      
      if (error) {
        console.error('Database delete error:', error);
        return { success: false, error };
      }
      
      console.log('Employee deleted successfully, status:', status);
      
      // Clear relevant cache entries
      dataCache.delete('employees:all');
      dataCache.delete(`employee:${employeeId}`);
      
      // Clear any search result caches that might contain this employee
      const cacheKeys = Array.from(dataCache.cache.keys());
      cacheKeys.forEach(key => {
        if (key.startsWith('employees:search:')) {
          dataCache.delete(key);
        }
      });
      
      return { success: true, error: null };
    } catch (error) {
      console.error('Error deleting employee:', error);
      return { success: false, error };
    }
  }
};

// Export the cache instances for direct access if needed
export { dataCache, userCache };
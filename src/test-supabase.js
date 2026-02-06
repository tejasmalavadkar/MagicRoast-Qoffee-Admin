import { supabase } from './lib/supabase';

// Test Supabase connection and table structure
export const testSupabaseConnection = async () => {
  try {
    console.log('Testing Supabase connection...');
    
    // Test 1: Check if we can connect
    const { data: test, error: testError } = await supabase
      .from('employees')
      .select('id')
      .limit(1);
    
    if (testError) {
      console.error('Connection test failed:', testError);
      return { success: false, error: testError.message };
    }
    
    console.log('✓ Connection successful');
    
    // Test 2: Get table info
    const { data: tableInfo, error: tableError } = await supabase
      .from('employees')
      .select('*')
      .limit(0);
    
    if (tableError) {
      console.error('Table info failed:', tableError);
      return { success: false, error: tableError.message };
    }
    
    console.log('✓ Table accessible');
    console.log('Sample row structure:', tableInfo);
    
    return { success: true, message: 'All tests passed' };
    
  } catch (error) {
    console.error('Unexpected error:', error);
    return { success: false, error: error.message };
  }
};

// Test insert with minimal data
export const testInsert = async () => {
  try {
    const testData = {
      full_name: 'Test User',
      email: 'test@example.com',
      phone: '1234567890',
      employee_id: 'TEST001',
      department: 'IT',
      designation: 'Tester',
      salary: 50000,
      password: 'test123',
      title: 'Mr.',
      role: 'Employee',
      branch: 'Main Branch',
      status: 'active',
      is_active: true,
      joining_date: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    console.log('Inserting test data:', testData);
    
    const { data, error } = await supabase
      .from('employees')
      .insert([testData])
      .select();
    
    if (error) {
      console.error('Insert failed:', error);
      return { success: false, error: error.message };
    }
    
    console.log('✓ Insert successful:', data);
    
    // Clean up test data
    await supabase
      .from('employees')
      .delete()
      .eq('employee_id', 'TEST001');
    
    console.log('✓ Test data cleaned up');
    
    return { success: true, data };
    
  } catch (error) {
    console.error('Insert test error:', error);
    return { success: false, error: error.message };
  }
};
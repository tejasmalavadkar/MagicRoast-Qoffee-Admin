import { useState } from 'react';
import {
  Package,
  Search,
  Plus,
  Edit,
  Trash2,
  AlertCircle,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { products } from '../../../data/mockData';
import { formatCurrency, getStatusColor, cn } from '../../../lib/utils';

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const categories = [...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || product.category === filterCategory;
    const matchesStatus = !filterStatus || product.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const stats = {
    total: products.length,
    inStock: products.filter(p => p.status === 'in_stock').length,
    lowStock: products.filter(p => p.status === 'low_stock').length,
    outOfStock: products.filter(p => p.status === 'out_of_stock').length,
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'in_stock': return <CheckCircle className="w-4 h-4 text-success" />;
      case 'low_stock': return <AlertCircle className="w-4 h-4 text-warning" />;
      case 'out_of_stock': return <XCircle className="w-4 h-4 text-destructive" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-header mb-1">Product Details</h1>
          <p className="text-muted-foreground">Manage inventory products</p>
        </div>
        <button className="btn-primary inline-flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Package className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">{stats.total}</p>
          <p className="text-sm text-muted-foreground">Total Products</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-success/10">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
          </div>
          <p className="text-2xl font-bold text-success">{stats.inStock}</p>
          <p className="text-sm text-muted-foreground">In Stock</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-warning/10">
              <AlertCircle className="w-5 h-5 text-warning" />
            </div>
          </div>
          <p className="text-2xl font-bold text-warning">{stats.lowStock}</p>
          <p className="text-sm text-muted-foreground">Low Stock</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-destructive/10">
              <XCircle className="w-5 h-5 text-destructive" />
            </div>
          </div>
          <p className="text-2xl font-bold text-destructive">{stats.outOfStock}</p>
          <p className="text-sm text-muted-foreground">Out of Stock</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="input-field w-full sm:w-48"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="input-field w-full sm:w-40"
        >
          <option value="">All Status</option>
          <option value="in_stock">In Stock</option>
          <option value="low_stock">Low Stock</option>
          <option value="out_of_stock">Out of Stock</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Price</th>
              <th>Cost</th>
              <th>Quantity</th>
              <th>Status</th>
              <th className="w-20">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <Package className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{product.name}</p>
                      <p className="text-xs text-muted-foreground">Min: {product.minStock} {product.unit}</p>
                    </div>
                  </div>
                </td>
                <td className="font-mono text-sm">{product.sku}</td>
                <td>{product.category}</td>
                <td className="font-medium">{formatCurrency(product.price)}</td>
                <td className="text-muted-foreground">{formatCurrency(product.cost)}</td>
                <td>
                  <span className={cn(
                    'font-medium',
                    product.quantity <= product.minStock && product.quantity > 0 && 'text-warning',
                    product.quantity === 0 && 'text-destructive'
                  )}>
                    {product.quantity} {product.unit}
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(product.status)}
                    <span className={cn('badge', getStatusColor(product.status))}>
                      {product.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-12 h-12 mx-auto text-muted-foreground/50" />
          <p className="mt-4 text-muted-foreground">No products found</p>
        </div>
      )}
    </div>
  );
}
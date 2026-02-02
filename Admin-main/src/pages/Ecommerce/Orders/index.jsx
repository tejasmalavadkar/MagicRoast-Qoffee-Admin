import { useState } from 'react';
import {
  Truck,
  Search,
  Eye,
  Package,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { ecomOrders } from '../../../data/mockData';
import { formatCurrency, formatDate, getStatusColor, cn } from '../../../lib/utils';

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filteredOrders = ecomOrders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: ecomOrders.length,
    pending: ecomOrders.filter(o => o.status === 'pending').length,
    processing: ecomOrders.filter(o => o.status === 'processing').length,
    shipped: ecomOrders.filter(o => o.status === 'shipped').length,
    delivered: ecomOrders.filter(o => o.status === 'delivered').length,
    totalRevenue: ecomOrders.reduce((sum, o) => sum + o.total, 0),
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-warning" />;
      case 'processing': return <Package className="w-4 h-4 text-info" />;
      case 'shipped': return <Truck className="w-4 h-4 text-info" />;
      case 'delivered': return <CheckCircle className="w-4 h-4 text-success" />;
      case 'cancelled': return <XCircle className="w-4 h-4 text-destructive" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-header mb-1">Order Management</h1>
          <p className="text-muted-foreground">Manage e-commerce orders</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="stat-card">
          <p className="text-2xl font-bold text-foreground">{stats.total}</p>
          <p className="text-sm text-muted-foreground">Total Orders</p>
        </div>
        <div className="stat-card">
          <p className="text-2xl font-bold text-warning">{stats.pending}</p>
          <p className="text-sm text-muted-foreground">Pending</p>
        </div>
        <div className="stat-card">
          <p className="text-2xl font-bold text-info">{stats.processing}</p>
          <p className="text-sm text-muted-foreground">Processing</p>
        </div>
        <div className="stat-card">
          <p className="text-2xl font-bold text-info">{stats.shipped}</p>
          <p className="text-sm text-muted-foreground">Shipped</p>
        </div>
        <div className="stat-card">
          <p className="text-2xl font-bold text-success">{stats.delivered}</p>
          <p className="text-sm text-muted-foreground">Delivered</p>
        </div>
        <div className="stat-card">
          <p className="text-2xl font-bold text-foreground">{formatCurrency(stats.totalRevenue)}</p>
          <p className="text-sm text-muted-foreground">Revenue</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by order #, customer name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="input-field w-full sm:w-44"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
              <th className="w-16">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>
                  <span className="font-mono font-medium text-primary">{order.orderNumber}</span>
                </td>
                <td>
                  <div>
                    <p className="font-medium text-foreground">{order.customerName}</p>
                    <p className="text-xs text-muted-foreground">{order.customerEmail}</p>
                  </div>
                </td>
                <td>
                  <div className="text-sm">
                    {order.items.map((item, i) => (
                      <div key={i} className="text-muted-foreground">
                        {item.quantity}x {item.productName}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="font-bold">{formatCurrency(order.total)}</td>
                <td>
                  <span className={cn('badge', getStatusColor(order.paymentStatus))}>
                    {order.paymentStatus}
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span className={cn('badge', getStatusColor(order.status))}>
                      {order.status}
                    </span>
                  </div>
                </td>
                <td className="text-muted-foreground">{formatDate(order.createdAt)}</td>
                <td>
                  <button className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground">
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Truck className="w-12 h-12 mx-auto text-muted-foreground/50" />
          <p className="mt-4 text-muted-foreground">No orders found</p>
        </div>
      )}
    </div>
  );
}
import { useState } from 'react';
import {
  Receipt,
  Search,
  Plus,
  Eye,
  Edit,
  Printer,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
} from 'lucide-react';
import { salesInvoices } from '../../../data/mockData';
import { formatCurrency, formatDate, getStatusColor, cn } from '../../../lib/utils';

export default function SalesInvoicePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filteredInvoices = salesInvoices.filter((invoice) => {
    const matchesSearch =
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || invoice.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: salesInvoices.length,
    paid: salesInvoices.filter(i => i.status === 'paid').length,
    pending: salesInvoices.filter(i => i.status === 'sent' || i.status === 'draft').length,
    overdue: salesInvoices.filter(i => i.status === 'overdue').length,
    totalAmount: salesInvoices.reduce((sum, i) => sum + i.total, 0),
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4 text-success" />;
      case 'sent': return <Clock className="w-4 h-4 text-info" />;
      case 'draft': return <Clock className="w-4 h-4 text-warning" />;
      case 'overdue': return <AlertCircle className="w-4 h-4 text-destructive" />;
      case 'cancelled': return <XCircle className="w-4 h-4 text-muted-foreground" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-header mb-1">Sales Invoices</h1>
          <p className="text-muted-foreground">Manage sales and stock invoices</p>
        </div>
        <button className="btn-primary inline-flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Invoice
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="stat-card">
          <p className="text-2xl font-bold text-foreground">{stats.total}</p>
          <p className="text-sm text-muted-foreground">Total Invoices</p>
        </div>
        <div className="stat-card">
          <p className="text-2xl font-bold text-success">{stats.paid}</p>
          <p className="text-sm text-muted-foreground">Paid</p>
        </div>
        <div className="stat-card">
          <p className="text-2xl font-bold text-warning">{stats.pending}</p>
          <p className="text-sm text-muted-foreground">Pending</p>
        </div>
        <div className="stat-card">
          <p className="text-2xl font-bold text-destructive">{stats.overdue}</p>
          <p className="text-sm text-muted-foreground">Overdue</p>
        </div>
        <div className="stat-card">
          <p className="text-2xl font-bold text-foreground">{formatCurrency(stats.totalAmount)}</p>
          <p className="text-sm text-muted-foreground">Total Amount</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by invoice # or customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="input-field w-full sm:w-40"
        >
          <option value="">All Status</option>
          <option value="draft">Draft</option>
          <option value="sent">Sent</option>
          <option value="paid">Paid</option>
          <option value="overdue">Overdue</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Invoices Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Subtotal</th>
              <th>Tax</th>
              <th>Total</th>
              <th>Due Date</th>
              <th>Status</th>
              <th className="w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>
                  <span className="font-mono font-medium text-primary">{invoice.invoiceNumber}</span>
                </td>
                <td>
                  <p className="font-medium text-foreground">{invoice.customerName}</p>
                </td>
                <td className="text-muted-foreground">{invoice.items.length} item(s)</td>
                <td>{formatCurrency(invoice.subtotal)}</td>
                <td className="text-muted-foreground">{formatCurrency(invoice.tax)}</td>
                <td className="font-bold">{formatCurrency(invoice.total)}</td>
                <td className="text-muted-foreground">{formatDate(invoice.dueDate)}</td>
                <td>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(invoice.status)}
                    <span className={cn('badge', getStatusColor(invoice.status))}>
                      {invoice.status}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground">
                      <Printer className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredInvoices.length === 0 && (
        <div className="text-center py-12">
          <Receipt className="w-12 h-12 mx-auto text-muted-foreground/50" />
          <p className="mt-4 text-muted-foreground">No invoices found</p>
        </div>
      )}
    </div>
  );
}
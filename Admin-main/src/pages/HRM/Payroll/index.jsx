import { useState } from 'react';
import {
  DollarSign,
  Search,
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  FileText,
  Printer,
} from 'lucide-react';
import { payrollRecords } from '../../../data/mockData';
import { formatCurrency, getInitials, getStatusColor, cn } from '../../../lib/utils';

export default function PayrollPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMonth, setFilterMonth] = useState('2026-01');
  const [filterStatus, setFilterStatus] = useState('');

  const filteredRecords = payrollRecords.filter((record) => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMonth = !filterMonth || record.month === filterMonth;
    const matchesStatus = !filterStatus || record.status === filterStatus;
    return matchesSearch && matchesMonth && matchesStatus;
  });

  const totalSalary = filteredRecords.reduce((sum, r) => sum + r.netSalary, 0);
  const pendingCount = filteredRecords.filter(r => r.status === 'pending').length;
  const completedCount = filteredRecords.filter(r => r.status === 'completed').length;
  const completedAmount = filteredRecords.filter(r => r.status === 'completed').reduce((sum, r) => sum + r.netSalary, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-header mb-1">Payroll</h1>
          <p className="text-muted-foreground">Manage employee salaries and payments</p>
        </div>
        <button className="btn-primary inline-flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
          Process Payroll
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">{filteredRecords.length}</p>
          <p className="text-sm text-muted-foreground">Total Payrolls</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-success/10">
              <DollarSign className="w-5 h-5 text-success" />
            </div>
          </div>
          <p className="text-2xl font-bold text-success">{formatCurrency(completedAmount)}</p>
          <p className="text-sm text-muted-foreground">Total Paid</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-warning/10">
              <Clock className="w-5 h-5 text-warning" />
            </div>
          </div>
          <p className="text-2xl font-bold text-warning">{pendingCount}</p>
          <p className="text-sm text-muted-foreground">Pending</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-info/10">
              <CheckCircle className="w-5 h-5 text-info" />
            </div>
          </div>
          <p className="text-2xl font-bold text-info">{completedCount}</p>
          <p className="text-sm text-muted-foreground">Completed</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search employee..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="month"
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className="input-field pl-10 w-full sm:w-44"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="input-field w-full sm:w-36"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Payroll Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Month</th>
              <th>Base Salary</th>
              <th>Allowances</th>
              <th>Deductions</th>
              <th>Net Salary</th>
              <th>Status</th>
              <th className="w-20">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => (
              <tr key={record.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                      {getInitials(record.employeeName)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{record.employeeName}</p>
                      <p className="text-xs text-muted-foreground">ID: {record.employeeId}</p>
                    </div>
                  </div>
                </td>
                <td>
                  {new Date(record.month + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </td>
                <td className="font-medium">{formatCurrency(record.baseSalary)}</td>
                <td className="text-success">+{formatCurrency(record.allowances)}</td>
                <td className="text-destructive">-{formatCurrency(record.deductions)}</td>
                <td className="font-bold text-foreground">{formatCurrency(record.netSalary)}</td>
                <td>
                  <span className={cn('badge', getStatusColor(record.status))}>
                    {record.status}
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground">
                      <Printer className="w-4 h-4" />
                    </button>
                    {record.status === 'pending' && (
                      <button className="p-1.5 rounded-lg hover:bg-success/10 text-muted-foreground hover:text-success">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Footer */}
      <div className="bg-card rounded-xl border p-4 flex items-center justify-between">
        <span className="font-medium text-muted-foreground">Total Payroll Amount</span>
        <span className="text-xl font-bold text-foreground">{formatCurrency(totalSalary)}</span>
      </div>

      {/* Empty State */}
      {filteredRecords.length === 0 && (
        <div className="text-center py-12">
          <DollarSign className="w-12 h-12 mx-auto text-muted-foreground/50" />
          <p className="mt-4 text-muted-foreground">No payroll records found</p>
        </div>
      )}
    </div>
  );
}
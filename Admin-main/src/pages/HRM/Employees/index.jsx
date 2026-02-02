import { useNavigate } from 'react-router-dom';
import {
  Users,
  Plus,
  CheckCircle,
  XCircle,
  DollarSign,
} from 'lucide-react';
import { useHRM } from '../../../context/HRMContext';
import { formatCurrency } from '../../../lib/utils';

export default function EmployeesPage() {
  const navigate = useNavigate();
  const { employees } = useHRM();

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-header mb-1">Employees</h1>
          <p className="text-muted-foreground">Manage your team members</p>
        </div>
        <button
          onClick={() => navigate('/hrm/employees/new')}
          className="btn-primary inline-flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Employee
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">{employees.length}</p>
          <p className="text-sm text-muted-foreground">Total Employees</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-success/10">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
          </div>
          <p className="text-2xl font-bold text-success">{employees.filter(e => e.status === 'active').length}</p>
          <p className="text-sm text-muted-foreground">Active</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-destructive/10">
              <XCircle className="w-5 h-5 text-destructive" />
            </div>
          </div>
          <p className="text-2xl font-bold text-destructive">{employees.filter(e => e.status === 'inactive').length}</p>
          <p className="text-sm text-muted-foreground">Inactive</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-caramel/10">
              <DollarSign className="w-5 h-5 text-caramel" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {employees.length > 0 ? formatCurrency(employees.reduce((sum, e) => sum + e.salary, 0) / employees.length) : '$0'}
          </p>
          <p className="text-sm text-muted-foreground">Avg. Salary</p>
        </div>
      </div>

      {/* Add Employee Button */}
      <div className="text-center py-8">
        <button
          onClick={() => navigate('/hrm/employees/new')}
          className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-lg"
        >
          <Plus className="w-5 h-5" />
          Add New Employee
        </button>
      </div>
    </div>
  );
}
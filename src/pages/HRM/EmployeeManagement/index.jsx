import { useState, useCallback, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Plus,
  X,
  Camera,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronRight,
  CheckCircle
} from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { employeeCache } from '../../../lib/cache';
import { useDebounce } from '../../../hooks/usePerformance';
import EmployeeRow from '../../../components/EmployeeRow';
import EmployeeTableSkeleton from '../../../components/EmployeeTableSkeleton';
import ErrorBoundary from '../../../components/ErrorBoundary';
import AddEmployeeForm from '../../../components/AddEmployeeForm';
import { formatCurrency, getInitials } from '../../../lib/utils';

export default function EmployeeManagement() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [error, setError] = useState(null);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showViewPassword, setShowViewPassword] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false);
  
  // Fetch employees from Supabase with caching
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error, fromCache } = await employeeCache.getAllEmployees(forceRefresh);
      
      if (error) throw error;
      
      setEmployees(data || []);
      
      if (fromCache) {
        // Silently refresh cache in background
        setTimeout(() => {
          employeeCache.getAllEmployees(true);
        }, 1000);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
      setError(error);
      setMessage({ type: 'error', text: 'Failed to load employees' });
    } finally {
      setLoading(false);
    }
  };

  // Debounced search
  const debouncedSearch = useDebounce(async (term) => {
    if (!term.trim()) {
      fetchEmployees();
      return;
    }
    
    try {
      setLoading(true);
      // For search, we'll fetch fresh data
      const { data, error } = await employeeCache.searchEmployees(term);
      
      if (error) throw error;
      setEmployees(data || []);
    } catch (error) {
      console.error('Error searching employees:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, 300);

  // Memoized employee count
  const employeeStats = useMemo(() => ({
    total: employees.length,
    active: employees.filter(emp => emp.is_active).length,
    inactive: employees.filter(emp => !emp.is_active).length
  }), [employees]);

  // Optimized handler functions
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleDeleteEmployee = useCallback(async (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        setLoading(true);
        const result = await employeeCache.deleteEmployee(employeeId);
        
        if (result.error) {
          throw result.error;
        }
        
        // Refresh employee list
        await fetchEmployees(true);
        setMessage({ type: 'success', text: 'Employee deleted successfully!' });
      } catch (error) {
        console.error('Error deleting employee:', error);
        let errorMessage = 'Failed to delete employee';
        if (error.message) {
          errorMessage = `Failed to delete employee: ${error.message}`;
        }
        setMessage({ type: 'error', text: errorMessage });
      } finally {
        setLoading(false);
      }
    }
  }, []);

  const handleViewEmployee = useCallback((employee) => {
    setSelectedEmployee(employee);
    setShowViewModal(true);
  }, []);

  const handleEditEmployee = useCallback((employee) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  }, []);

  const handleRefresh = useCallback(() => {
    fetchEmployees(true);
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Message Display */}
          {message.text && (
            <div className={`p-4 mb-6 rounded-lg ${message.type === 'success' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
              {message.text}
            </div>
          )}

          {/* Stats Header */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-sm font-medium text-gray-500">Total Employees</h3>
              <p className="text-2xl font-bold text-gray-900">{employeeStats.total}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-sm font-medium text-gray-500">Active</h3>
              <p className="text-2xl font-bold text-green-600">{employeeStats.active}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-sm font-medium text-gray-500">Inactive</h3>
              <p className="text-2xl font-bold text-red-600">{employeeStats.inactive}</p>
            </div>
          </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Employee Management</h2>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search employees…"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition w-full sm:w-64"
                />
              </div>
              
              <button
                onClick={() => setShowAddEmployeeModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add New
              </button>
            </div>
          </div>

          {/* Employee Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-3 font-medium text-gray-700 text-sm min-w-[60px]">Image</th>
                  <th className="text-left py-3 px-3 font-semibold text-gray-800 text-sm min-w-[120px]">Name</th>
                  <th className="text-left py-3 px-3 font-medium text-gray-700 text-sm min-w-[150px]">Email</th>
                  <th className="text-left py-3 px-3 font-medium text-gray-700 text-sm min-w-[100px]">Phone</th>
                  <th className="text-left py-3 px-3 font-medium text-gray-700 text-sm min-w-[100px]">Emergency</th>
                  <th className="text-left py-3 px-3 font-medium text-gray-700 text-sm min-w-[80px]">Password</th>
                  <th className="text-left py-3 px-3 font-medium text-gray-700 text-sm min-w-[100px]">Department</th>
                  <th className="text-left py-3 px-3 font-medium text-gray-700 text-sm min-w-[80px]">Role</th>
                  <th className="text-left py-3 px-3 font-medium text-gray-700 text-sm min-w-[80px]">Salary</th>
                  <th className="text-left py-3 px-3 font-medium text-gray-700 text-sm min-w-[80px]">Status</th>
                  <th className="text-left py-3 px-3 font-medium text-gray-700 text-sm min-w-[100px]">Actions</th>
                </tr>
              </thead>
                {loading ? (
                  <EmployeeTableSkeleton rowCount={5} />
                ) : employees.length === 0 ? (
                  <tbody>
                    <tr>
                      <td colSpan="11" className="py-12 text-center text-gray-500">
                        {error ? (
                          <div>
                            <p className="mb-2">Failed to load employees</p>
                            <button 
                              onClick={handleRefresh}
                              className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                              Try Again
                            </button>
                          </div>
                        ) : (
                          <p>No employees found</p>
                        )}
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody>
                    {employees.map((employee) => (
                      <EmployeeRow
                        key={employee.id}
                        employee={employee}
                        onDelete={handleDeleteEmployee}
                        onEdit={handleEditEmployee}
                        onView={handleViewEmployee}
                      />
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>

      {/* Add New Employee Modal - Using AddEmployeeForm component */}
      <AddEmployeeForm 
        isOpen={showAddEmployeeModal}
        onClose={() => setShowAddEmployeeModal(false)}
        onAddEmployee={async (employeeData) => {
          setLoading(true);
          try {
            const { data, error } = await supabase
              .from('employees')
              .insert([employeeData])
              .select();

            if (error) throw error;

            // Refresh employee list
            await fetchEmployees();
            setMessage({ type: 'success', text: 'Employee added successfully!' });
          } catch (error) {
            console.error('Error adding employee:', error);
            setMessage({ type: 'error', text: error.message || 'Failed to add employee' });
            throw error; // Re-throw to be caught by the form
          } finally {
            setLoading(false);
          }
        }}
      />

      {/* View Employee Modal */}
      {showViewModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Employee Details</h2>
                <button 
                  onClick={() => {
                    setShowViewModal(false);
                    setSelectedEmployee(null);
                    setShowViewPassword(false);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-700">Personal Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-500">Full Name</label>
                      <p className="font-medium">{selectedEmployee.full_name || selectedEmployee.name}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Email</label>
                      <p className="font-medium">{selectedEmployee.email}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Phone</label>
                      <p className="font-medium">{selectedEmployee.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Employee ID</label>
                      <p className="font-medium font-mono">{selectedEmployee.id || selectedEmployee.employee_id}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-700">Work Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-500">Department</label>
                      <p className="font-medium">{selectedEmployee.department}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Designation</label>
                      <p className="font-medium">{selectedEmployee.designation || selectedEmployee.position}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Salary</label>
                      <p className="font-medium">{selectedEmployee.salary ? `₹${selectedEmployee.salary.toLocaleString()}` : 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Password</label>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setShowViewPassword(!showViewPassword)}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                          aria-label={showViewPassword ? "Hide password" : "Show password"}
                        >
                          {showViewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <p className="font-medium font-mono">
                          {showViewPassword ? selectedEmployee.password || 'N/A' : '••••••'}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Status</label>
                      <p className={`font-medium ${selectedEmployee.is_active ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedEmployee.is_active ? 'Active' : 'Inactive'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    setSelectedEmployee(null);
                    setShowViewPassword(false);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    handleEditEmployee(selectedEmployee);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Edit Employee
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Employee Modal */}
      {showEditModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Edit Employee</h2>
                <button 
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedEmployee(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const employeeData = {
                  full_name: formData.get('full_name'),
                  email: formData.get('email'),
                  phone: formData.get('phone'),
                  department: formData.get('department'),
                  designation: formData.get('designation'),
                  role: formData.get('role'),
                  salary: parseFloat(formData.get('salary')) || 0,
                  is_active: formData.get('is_active') === 'on'
                };
                
                try {
                  setLoading(true);
                  const { error } = await supabase
                    .from('employees')
                    .update(employeeData)
                    .eq('id', selectedEmployee.id);
                  
                  if (error) throw error;
                  
                  await fetchEmployees(true);
                  setMessage({ type: 'success', text: 'Employee updated successfully!' });
                  setShowEditModal(false);
                  setSelectedEmployee(null);
                } catch (error) {
                  console.error('Error updating employee:', error);
                  setMessage({ type: 'error', text: error.message || 'Failed to update employee' });
                } finally {
                  setLoading(false);
                }
              }} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="full_name"
                      defaultValue={selectedEmployee.full_name || selectedEmployee.name}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={selectedEmployee.email}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      defaultValue={selectedEmployee.phone}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <select
                      name="department"
                      defaultValue={selectedEmployee.department}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                    >
                      <option value="">Select Department</option>
                      <option value="IT">IT</option>
                      <option value="HR">HR</option>
                      <option value="Finance">Finance</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Operations">Operations</option>
                      <option value="Sales">Sales</option>
                      <option value="Support">Support</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                    <select
                      name="designation"
                      defaultValue={selectedEmployee.designation || selectedEmployee.position}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                    >
                      <option value="Employee">Employee</option>
                      <option value="Manager">Manager</option>
                      <option value="Senior Manager">Senior Manager</option>
                      <option value="Director">Director</option>
                      <option value="VP">VP</option>
                      <option value="Intern">Intern</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <select
                      name="role"
                      defaultValue={selectedEmployee.role || selectedEmployee.designation || selectedEmployee.position || 'Employee'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                    >
                      <option value="Employee">Employee</option>
                      <option value="Manager">Manager</option>
                      <option value="Admin">Admin</option>
                      <option value="HR">HR</option>
                      <option value="Finance">Finance</option>
                      <option value="Intern">Intern</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                    <input
                      type="number"
                      name="salary"
                      defaultValue={selectedEmployee.salary || 0}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="is_active"
                        defaultChecked={selectedEmployee.is_active}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Active Employee</span>
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      setSelectedEmployee(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Updating...' : 'Update Employee'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
    </ErrorBoundary>
  );
}
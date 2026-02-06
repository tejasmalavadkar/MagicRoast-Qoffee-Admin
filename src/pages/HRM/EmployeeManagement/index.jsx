<<<<<<< HEAD
import { useState, useCallback, useMemo, useEffect } from 'react';
=======
import { useState, useCallback, useMemo } from 'react';
>>>>>>> baec9d90e15bc827d60dc3306b781707193292a3
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Plus,
<<<<<<< HEAD
  X,
  Camera,
  Eye,
=======
  Eye,
  Edit,
  Trash2,
  X,
  Camera,
  EyeIcon,
>>>>>>> baec9d90e15bc827d60dc3306b781707193292a3
  EyeOff,
  ChevronDown,
  ChevronRight,
  CheckCircle
} from 'lucide-react';
<<<<<<< HEAD
import { supabase } from '../../../lib/supabase';
import { employeeCache } from '../../../lib/cache';
import { useDebounce } from '../../../hooks/usePerformance';
import EmployeeRow from '../../../components/EmployeeRow';
import EmployeeTableSkeleton from '../../../components/EmployeeTableSkeleton';
import ErrorBoundary from '../../../components/ErrorBoundary';
import AddEmployeeForm from '../../../components/AddEmployeeForm';
=======
import { useHRM } from '../../../context/HRMContext';
>>>>>>> baec9d90e15bc827d60dc3306b781707193292a3
import { formatCurrency, getInitials } from '../../../lib/utils';

export default function EmployeeManagement() {
  const navigate = useNavigate();
<<<<<<< HEAD
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
=======
  const { employees, departments, addEmployee, deleteEmployee } = useHRM();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Optimized employee data state
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    emergencyPhone: '',
    department: '',
    position: 'Employee',
    salary: '',
    employeeId: '',
    password: '',
    confirmPassword: '',
    address: '',
    bankName: '',
    bankAccount: ''
  });

  // Memoized filtered employees - only recalculate when needed
  const filteredEmployees = useMemo(() => {
    if (!searchTerm.trim()) return employees;
    
    const term = searchTerm.toLowerCase();
    return employees.filter(emp => 
      emp.name.toLowerCase().includes(term) ||
      emp.email.toLowerCase().includes(term) ||
      emp.employeeId.toLowerCase().includes(term)
    );
  }, [employees, searchTerm]);
>>>>>>> baec9d90e15bc827d60dc3306b781707193292a3

  // Optimized handler functions
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

<<<<<<< HEAD
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
=======
  const handleInputChange = useCallback((field) => (e) => {
    setNewEmployee(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  }, []);



  const handleAddEmployee = useCallback(() => {
    if (newEmployee.password !== newEmployee.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const employeeData = {
      ...newEmployee,
      id: `emp-${Date.now()}`,
      employeeId: newEmployee.employeeId || `EMP-${String(employees.length + 1).padStart(3, '0')}`,
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0],
      emergencyContact: 'Not provided'
    };

    addEmployee(employeeData);
    setShowAddModal(false);
    
    // Reset form efficiently
    setNewEmployee({
      name: '',
      email: '',
      phone: '',
      emergencyPhone: '',
      department: '',
      position: 'Employee',
      salary: '',
      employeeId: '',
      password: '',
      confirmPassword: '',
      address: '',
      bankName: '',
      bankAccount: ''
    });
  }, [newEmployee, employees.length, addEmployee]);

  const handleDeleteEmployee = useCallback((employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      deleteEmployee(employeeId);
    }
  }, [deleteEmployee]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Add New Employee</h1>
        </div>
>>>>>>> baec9d90e15bc827d60dc3306b781707193292a3

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
<<<<<<< HEAD
                onClick={() => setShowAddEmployeeModal(true)}
=======
                onClick={() => navigate('/hrm/add-new-employee')}
>>>>>>> baec9d90e15bc827d60dc3306b781707193292a3
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
<<<<<<< HEAD
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
=======
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Image</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Mobile</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Employee ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      {employee.avatar ? (
                        <img 
                          src={employee.avatar} 
                          alt={employee.name} 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-600 font-medium">
                            {getInitials(employee.name)}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-800">{employee.name}</td>
                    <td className="py-3 px-4 text-gray-600">{employee.phone}</td>
                    <td className="py-3 px-4 text-gray-600 font-mono">{employee.employeeId}</td>
                    <td className="py-3 px-4">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={employee.status === 'active'}
                          className="sr-only peer"
                          readOnly
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                      </label>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-800 p-1">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-800 p-1">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-800 p-1"
                          onClick={() => handleDeleteEmployee(employee.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add New Employee Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-xl font-semibold text-gray-800">Add New Employee</h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
>>>>>>> baec9d90e15bc827d60dc3306b781707193292a3
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
<<<<<<< HEAD
              
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
=======

              <div className="p-6">
                {/* Profile Photo Upload */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 mb-1">Click to upload</p>
                    <p className="text-sm text-gray-500">Max 5MB for images, 10MB for PDFs</p>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      id="profile-upload"
                    />
                  </div>
                </div>

                {/* Form Layout (Two-Column Grid) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Row 1 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
                    <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                      <option>Mr.</option>
                      <option>Mrs.</option>
                      <option>Ms.</option>
                      <option>Dr.</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      value={newEmployee.name}
                      onChange={handleInputChange('name')}
                    />
                  </div>

                  {/* Row 2 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number*</label>
                    <input
                      type="tel"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      value={newEmployee.phone}
                      onChange={handleInputChange('phone')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Number</label>
                    <input
                      type="tel"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      value={newEmployee.emergencyPhone}
                      onChange={handleInputChange('emergencyPhone')}
                    />
                  </div>

                  {/* Row 3 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                    <input
                      type="email"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      value={newEmployee.email}
                      onChange={handleInputChange('email')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password*</label>
                    <div className="relative">
                      <input
                        type={showPassword.new ? "text" : "password"}
                        placeholder="Minimum 6 characters"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none pr-10"
                        value={newEmployee.password}
                        onChange={handleInputChange('password')}
                      />
                      <button 
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => togglePasswordVisibility('new')}
                      >
                        {showPassword.new ? <EyeOff className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Row 4 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role*</label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      value={newEmployee.position}
                      onChange={handleInputChange('position')}
>>>>>>> baec9d90e15bc827d60dc3306b781707193292a3
                    >
                      <option value="Employee">Employee</option>
                      <option value="Manager">Manager</option>
                      <option value="Admin">Admin</option>
<<<<<<< HEAD
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
=======
                      <option value="SuperAdmin">SuperAdmin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID*</label>
                    <input
                      type="text"
                      placeholder="EMP-001"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      value={newEmployee.employeeId}
                      onChange={handleInputChange('employeeId')}
                    />
                  </div>

                  {/* Row 5 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department*</label>
                    <div className="relative">
                      <select
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none pr-10"
                        value={newEmployee.department}
                        onChange={handleInputChange('department')}
                      >
                        <option value="">Select Department</option>
                        {departments?.map(dept => (
                          <option key={dept.id} value={dept.name}>{dept.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Salary (₹)*</label>
                    <input
                      type="number"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      value={newEmployee.salary}
                      onChange={handleInputChange('salary')}
                    />
                  </div>
                </div>

                {/* Address Field (Full-width) */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    rows="3"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    value={newEmployee.address}
                    onChange={handleInputChange('address')}
                  ></textarea>
                </div>

                {/* Bank Details Section */}
                <div className="mb-6">
                  <button
                    type="button"
                    onClick={() => setShowBankDetails(!showBankDetails)}
                    className="flex items-center gap-2 text-gray-700 font-medium mb-4"
                  >
                    {showBankDetails ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Bank Details
                  </button>
                  
                  {showBankDetails && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pl-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          value={newEmployee.bankName}
                          onChange={handleInputChange('bankName')}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bank Account</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          value={newEmployee.bankAccount}
                          onChange={handleInputChange('bankAccount')}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 p-6 border-t">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddEmployee}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
>>>>>>> baec9d90e15bc827d60dc3306b781707193292a3
  );
}
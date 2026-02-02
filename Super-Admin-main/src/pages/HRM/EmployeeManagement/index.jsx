import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  X,
  Camera,
  EyeIcon,
  EyeOff,
  ChevronDown,
  ChevronRight,
  CheckCircle
} from 'lucide-react';
import { useHRM } from '../../../context/HRMContext';
import { formatCurrency, getInitials } from '../../../lib/utils';

export default function EmployeeManagement() {
  const navigate = useNavigate();
  const { employees, departments, addEmployee, deleteEmployee } = useHRM();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [showPassword, setShowPassword] = useState({});
  
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

  // Optimized handler functions
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleInputChange = useCallback((field) => (e) => {
    setNewEmployee(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  }, []);

  const togglePasswordVisibility = useCallback((field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
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
                onClick={() => setShowAddModal(true)}
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
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Image</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Mobile</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Emergency</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Employee ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Password</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Department</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Salary (₹)</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Role</th>
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
                    <td className="py-3 px-4 text-gray-600">{employee.email}</td>
                    <td className="py-3 px-4 text-gray-600">{employee.phone}</td>
                    <td className="py-3 px-4 text-gray-600">{employee.emergencyContact || 'N/A'}</td>
                    <td className="py-3 px-4 text-gray-600 font-mono">{employee.employeeId}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">{'••••••'}</span>
                        <button 
                          className="text-gray-400 hover:text-gray-600"
                          onClick={() => togglePasswordVisibility(employee.id)}
                        >
                          {showPassword[employee.id] ? <EyeOff className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{employee.department}</td>
                    <td className="py-3 px-4 text-gray-800 font-medium">{formatCurrency(employee.salary)}</td>
                    <td className="py-3 px-4">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        {employee.position}
                      </span>
                    </td>
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
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

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
                    >
                      <option value="Employee">Employee</option>
                      <option value="Manager">Manager</option>
                      <option value="Admin">Admin</option>
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
  );
}
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { supabase } from '../../lib/supabase';
import { testSupabaseConnection, testInsert } from '../../test-supabase';
=======
import { useHRM } from '../../context/HRMContext';
>>>>>>> baec9d90e15bc827d60dc3306b781707193292a3
import { 
  Save, 
  ArrowLeft, 
  UploadCloud, 
  Eye, 
  EyeOff, 
  Phone, 
  Plus,
  CreditCard,
  X,
  FileText,
  Shield,
<<<<<<< HEAD
  Upload,
  Mail,
  Building,
  User,
  DollarSign
=======
  Upload
>>>>>>> baec9d90e15bc827d60dc3306b781707193292a3
} from 'lucide-react';

export default function AddNewEmployee() {
  const navigate = useNavigate();
<<<<<<< HEAD
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [testing, setTesting] = useState(false);

  const [employees, setEmployees] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
=======
  const { addEmployee } = useHRM();
  const [showPassword, setShowPassword] = useState(false);
>>>>>>> baec9d90e15bc827d60dc3306b781707193292a3

  const [formData, setFormData] = useState({
    title: 'Mr.',
    name: '',
    mobile: '',
    emergencyMobile: '',
    email: '',
    password: '',
    role: 'Employee',
    employeeId: '',
    department: '',
    salary: '',
    address: '',
    // Bank details
    bankName: '',
    accountHolder: '',
    accountNumber: '',
    ifscCode: '',
    branch: '',
    // Document details
    aadharNumber: '',
    panNumber: '',
    // Permissions
    permissions: {}
  });

<<<<<<< HEAD
  // Fetch employees on component mount
  React.useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoadingEmployees(true);
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setEmployees(data || []);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setMessage({ type: 'error', text: 'Failed to load employees' });
    } finally {
      setLoadingEmployees(false);
    }
  };

=======
>>>>>>> baec9d90e15bc827d60dc3306b781707193292a3
  const modules = [
    'Add New Employee', 'Events', 'Payroll', 'Leave Management', 'Attendance', 
    'Task Management', 'Leads', 'Products Details', 'Stock Transfer', 'Warehouse',
    'Sales Invoice', 'Purchase Invoice', 'Expenses', 'Account Receivable', 
    'Account Payable', 'Reports', 'E-Com Admin', 'Website Admin', 'Update'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePermissionChange = (module, type) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [module]: {
          ...prev.permissions[module],
          [type]: !prev.permissions[module]?.[type]
        }
      }
    }));
  };

<<<<<<< HEAD
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.employeeId) {
      setMessage({ type: 'error', text: 'Please fill in all required fields' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const employeeData = {
        // Required fields
        full_name: `${formData.title || 'Mr.'} ${formData.name}`.trim(),
        email: formData.email.toLowerCase().trim(),
        phone: formData.mobile.replace(/\D/g, ''),
        employee_id: formData.employeeId.trim(),
        department: formData.department.trim(),
        designation: formData.role.trim(),
        salary: parseFloat(formData.salary) || 0,
        password: formData.password,
        
        // Optional fields from form
        title: formData.title || 'Mr.',
        emergency_contact: formData.emergencyMobile?.trim() || undefined,
        address: formData.address?.trim() || undefined,
        role: formData.role.trim(),
        branch: 'Main Branch',
        status: 'active',
        joining_date: new Date().toISOString(),
        is_active: true,
        bank_name: formData.bankName?.trim() || undefined,
        bank_account: formData.accountNumber?.trim() || undefined,
        ifsc_code: formData.ifscCode?.trim() || undefined,
        bank_branch: formData.branch?.trim() || undefined,
        aadhar_number: formData.aadharNumber?.trim() || undefined,
        pan_card: formData.panNumber?.trim() || undefined,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Remove undefined values to let Supabase use column defaults
      Object.keys(employeeData).forEach(key => {
        if (employeeData[key] === undefined) {
          delete employeeData[key];
        }
      });

      const { data, error } = await supabase
        .from('employees')
        .insert([employeeData])
        .select();

      if (error) throw error;

      setMessage({ type: 'success', text: 'Employee added successfully!' });
      
      // Reset form
      setFormData({
        title: 'Mr.',
        name: '',
        mobile: '',
        emergencyMobile: '',
        email: '',
        password: '',
        role: 'Employee',
        employeeId: '',
        department: '',
        salary: '',
        address: '',
        bankName: '',
        accountHolder: '',
        accountNumber: '',
        ifscCode: '',
        branch: '',
        aadharNumber: '',
        panNumber: '',
        permissions: {}
      });

      // Refresh employee list
      await fetchEmployees();

      // Navigate after 2 seconds
      setTimeout(() => {
        navigate('/hrm/employee-management');
      }, 2000);

    } catch (error) {
      console.error('Error adding employee:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to add employee' });
    } finally {
      setLoading(false);
    }
=======
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.employeeId) {
      alert('Please fill in all required fields');
      return;
    }

    addEmployee({
      ...formData,
      id: `emp-${Date.now()}`,
      status: 'active',
      avatar: null,
      joinDate: new Date().toISOString().split('T')[0],
    });

    navigate('/hrm/employee-management');
>>>>>>> baec9d90e15bc827d60dc3306b781707193292a3
  };

  const FileUploadField = ({ label, subLabel, name }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label} <span className="text-xs text-gray-500">({subLabel})</span></label>
      <div className="flex items-center gap-3">
        <label className="flex-1 cursor-pointer">
          <div className="flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors">
            <span className="text-gray-500 text-sm">No file chosen</span>
            <Upload className="w-4 h-4 text-gray-400" />
          </div>
          <input type="file" className="hidden" />
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h1 className="text-xl font-semibold text-gray-800">Add New Employee</h1>
          <button 
            onClick={() => navigate('/hrm/employee-management')}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
<<<<<<< HEAD
        
        {/* Message Display */}
        {message.text && (
          <div className={`p-4 mx-6 mt-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
            {message.text}
          </div>
        )}
=======
>>>>>>> baec9d90e15bc827d60dc3306b781707193292a3

        <div className="p-8">
          <form onSubmit={handleSubmit}>
            {/* Profile Photo Upload */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors bg-gray-50/50">
                <div className="bg-white p-3 rounded-full mb-3 shadow-sm border border-gray-100">
                  <UploadCloud className="w-6 h-6 text-gray-500" />
                </div>
                <p className="text-sm text-gray-600 font-medium">
                  Click to upload
                </p>
                <p className="text-xs text-gray-400 mt-1">(Max 5MB for images, 10MB for PDFs)</p>
              </div>
            </div>

            {/* Personal & Employment Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <select
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition-all"
                >
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Dr.">Dr.</option>
                </select>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number *</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>

              {/* Emergency Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                   Emergency Number
                </label>
                <input
                  type="tel"
                  name="emergencyMobile"
                  value={formData.emergencyMobile}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimum 6 characters"
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none pr-10 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition-all"
                >
                  <option value="Employee">Employee</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                  <option value="HR">HR</option>
                </select>
              </div>

              {/* Employee ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID *</label>
                <input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  placeholder="EMP-001"
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                <div className="flex gap-2">
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition-all"
                  >
                    <option value="">Select Department</option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                  <button type="button" className="p-2.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors border border-blue-100">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Salary */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Salary (₹) *</label>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="50000"
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Main St, City, Country"
                  rows="3"
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-all"
                />
              </div>
            </div>

            {/* Bank Details Section */}
            <div className="mt-10 mb-6">
              <div className="flex items-center gap-2 text-gray-800 font-semibold text-lg pb-2 border-b border-gray-200">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <span>Bank Details</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  placeholder="State Bank of India"
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account Holder</label>
                <input
                  type="text"
                  name="accountHolder"
                  value={formData.accountHolder}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                <input
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  placeholder="1234567890"
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
                <input
                  type="text"
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleChange}
                  placeholder="SBIN0001234"
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                <input
                  type="text"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  placeholder="Main Branch, Mumbai"
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* Document Details Section */}
            <div className="mt-10 mb-6">
              <div className="flex items-center gap-2 text-gray-800 font-semibold text-lg pb-2 border-b border-gray-200">
                <FileText className="w-5 h-5 text-blue-600" />
                <span>Document Details</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <FileUploadField 
                  label="Aadhar Card" 
                  subLabel="Max 10MB for PDF, 5MB for images" 
                  name="aadharFile"
                />
                <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Number</label>
                <input
                  type="text"
                  name="aadharNumber"
                  value={formData.aadharNumber}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              <div>
                <FileUploadField 
                  label="PAN Card" 
                  subLabel="Max 10MB for PDF, 5MB for images" 
                  name="panFile"
                />
                <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
                <input
                  type="text"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              <div>
                <FileUploadField 
                  label="Certificate" 
                  subLabel="Max 10MB for PDF, 5MB for images" 
                  name="certificateFile"
                />
              </div>

              <div>
                <FileUploadField 
                  label="Passbook" 
                  subLabel="Max 10MB for PDF, 5MB for images" 
                  name="passbookFile"
                />
              </div>
            </div>

            {/* Module Permissions Section */}
            <div className="mt-10 mb-6">
              <div className="flex items-center gap-2 text-gray-800 font-semibold text-lg pb-2 border-b border-gray-200">
                <Shield className="w-5 h-5 text-blue-600" />
                <span>Module Permissions</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {modules.map((module) => (
                <div key={module} className="bg-white rounded-lg border p-4">
                  <h3 className="text-sm font-semibold text-gray-800 mb-3">{module}</h3>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={formData.permissions[module]?.create || false}
                        onChange={() => handlePermissionChange(module, 'create')}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span>Create</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={formData.permissions[module]?.read || false}
                        onChange={() => handlePermissionChange(module, 'read')}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span>Read</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={formData.permissions[module]?.update || false}
                        onChange={() => handlePermissionChange(module, 'update')}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span>Update</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={formData.permissions[module]?.delete || false}
                        onChange={() => handlePermissionChange(module, 'delete')}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span>Delete</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-8 mt-4 border-t border-gray-100">
              <button
                type="button"
<<<<<<< HEAD
                onClick={async () => {
                  setTesting(true);
                  const result = await testSupabaseConnection();
                  if (result.success) {
                    const insertResult = await testInsert();
                    setMessage({ 
                      type: insertResult.success ? 'success' : 'error', 
                      text: insertResult.success ? 'Test successful!' : `Test failed: ${insertResult.error}` 
                    });
                  } else {
                    setMessage({ type: 'error', text: `Connection test failed: ${result.error}` });
                  }
                  setTesting(false);
                }}
                disabled={testing}
                className="px-6 py-2.5 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 font-medium transition-colors disabled:opacity-50"
              >
                {testing ? 'Testing...' : 'Test Connection'}
              </button>
              <button
                type="button"
=======
>>>>>>> baec9d90e15bc827d60dc3306b781707193292a3
                onClick={() => navigate('/hrm/employee-management')}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
<<<<<<< HEAD
                disabled={loading}
                className="px-8 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Add Employee
                  </>
                )}
=======
                className="px-8 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Add Employee
>>>>>>> baec9d90e15bc827d60dc3306b781707193292a3
              </button>
            </div>
          </form>
        </div>
<<<<<<< HEAD

        {/* Employee List Section */}
        <div className="p-8 border-t border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Existing Employees ({employees.length})</h2>
            <button
              onClick={fetchEmployees}
              disabled={loadingEmployees}
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
            >
              {loadingEmployees ? 'Loading...' : 'Refresh' }
            </button>
          </div>

          {loadingEmployees ? (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : employees.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No employees found. Add your first employee above!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {employees.map((employee) => (
                <div key={employee.id} className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800">{employee.full_name}</h3>
                      <p className="text-sm text-gray-600">{employee.employee_id}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${employee.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {employee.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{employee.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{employee.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4" />
                      <span>{employee.department}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{employee.designation}</span>
                    </div>
                    {employee.salary && (
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        <span>₹{employee.salary.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      Joined: {new Date(employee.joining_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
=======
>>>>>>> baec9d90e15bc827d60dc3306b781707193292a3
      </div>
    </div>
  );
}

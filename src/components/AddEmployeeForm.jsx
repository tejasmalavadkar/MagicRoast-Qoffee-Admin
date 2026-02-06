<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
=======
import React, { useState } from 'react';
>>>>>>> baec9d90e15bc827d60dc3306b781707193292a3
import { 
  X, 
  Upload, 
  User, 
  Phone, 
  Mail, 
  Lock, 
  Hash,
  Building,
  DollarSign,
<<<<<<< HEAD
  Eye,
  EyeOff,
  CreditCard,
  FileText,
  Shield,
  Plus,
  Camera
} from 'lucide-react';

const AddEmployeeForm = ({ isOpen, onClose, onAddEmployee }) => {
  const [formData, setFormData] = useState({
    // Personal Information
    title: 'Mr.',
=======
  // Banknote,
  FileText
} from 'lucide-react';

const AddEmployeeForm = ({ isOpen, onClose }) => {
  // Comprehensive debugging
  console.log('=== AddEmployeeForm Component ===');
  console.log('Props received:', { isOpen, onClose });
  console.log('isOpen type:', typeof isOpen);
  console.log('isOpen value:', isOpen);
  console.log('onClose type:', typeof onClose);
  console.log('onClose value:', onClose);

  // Test if onClose is callable
  try {
    console.log('onClose is function:', typeof onClose === 'function');
  } catch (error) {
    console.error('Error checking onClose:', error);
  }

  const [formData, setFormData] = useState({
    // Personal Information
    title: '',
>>>>>>> baec9d90e15bc827d60dc3306b781707193292a3
    fullName: '',
    mobileNumber: '',
    emergencyNumber: '',
    email: '',
    password: '',
<<<<<<< HEAD
    role: 'Employee',
    status: 'Active',
=======
    role: '',
    employeeId: '',
>>>>>>> baec9d90e15bc827d60dc3306b781707193292a3
    department: '',
    salary: '',
    address: '',
    
    // Bank Details
    bankName: '',
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    branchName: '',
    
<<<<<<< HEAD
    // Document Numbers
    aadharNumber: '',
    panNumber: '',
    
    // Module Permissions
    permissions: {}
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const modules = [
    'Add New Employee', 'Events', 'Payroll', 'Leave Management', 'Attendance', 
    'Task Management', 'Leads', 'Products Details', 'Stock Transfer', 'Warehouse',
    'Sales Invoice', 'Purchase Invoice', 'Expenses', 'Account Receivable', 
    'Account Payable', 'Reports', 'E-Com Admin', 'Website Admin', 'Update'
  ];

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

  const generateUUID = () => {
    // Generate RFC4122 version 4 compliant UUID
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Generate UUID for employeeId when form opens
  useEffect(() => {
    if (isOpen && !formData.employeeId) {
      setFormData(prev => ({
        ...prev,
        employeeId: generateUUID()
      }));
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.employeeId) {
      setMessage({ type: 'error', text: 'Please fill in all required fields' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Prepare employee data
      const employeeData = {
        full_name: `${formData.title || 'Mr.'} ${formData.fullName}`.trim(),
        email: formData.email.toLowerCase().trim(),
        phone: formData.mobileNumber.replace(/\D/g, ''),
        id: generateUUID(), // Auto-generated UUID
        department: formData.department.trim(),
        designation: formData.role.trim(),
        salary: parseFloat(formData.salary) || 0,
        password: formData.password,
        
        // Optional fields
        title: formData.title || 'Mr.',
        emergency_contact: formData.emergencyNumber?.trim() || undefined,
        address: formData.address?.trim() || undefined,
        role: formData.role.trim(),
        branch: 'Main Branch',
        status: formData.status || 'Active',
        joining_date: new Date().toISOString(),
        is_active: true,
        bank_name: formData.bankName?.trim() || undefined,
        bank_account: formData.accountNumber?.trim() || undefined,
        ifsc_code: formData.ifscCode?.trim() || undefined,
        bank_branch: formData.branchName?.trim() || undefined,
        aadhar_number: formData.aadharNumber?.trim() || undefined,
        pan_card: formData.panNumber?.trim() || undefined,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Remove undefined values
      Object.keys(employeeData).forEach(key => {
        if (employeeData[key] === undefined) {
          delete employeeData[key];
        }
      });

      // Call the onAddEmployee callback
      await onAddEmployee(employeeData);
      
      setMessage({ type: 'success', text: 'Employee added successfully!' });
      
      // Reset form after successful submission
      setFormData({
        title: 'Mr.',
        fullName: '',
        mobileNumber: '',
        emergencyNumber: '',
        email: '',
        password: '',
        role: 'Employee',
        status: 'Active',
        department: '',
        salary: '',
        address: '',
        bankName: '',
        accountHolderName: '',
        accountNumber: '',
        ifscCode: '',
        branchName: '',
        aadharNumber: '',
        panNumber: '',
        permissions: {}
      });
      
      // Close modal after success
      setTimeout(() => {
        onClose();
      }, 1500);

    } catch (error) {
      console.error('Error adding employee:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to add employee' });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-900">Add New Employee</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={loading}
=======
    // Document Uploads
    aadharCard: null,
    panCard: null,
    certificate: null,
    passbook: null,
    
    // Module Permissions
    permissions: {
      'Add New Employee': { create: false, read: false, update: false, delete: false },
      'Events': { create: false, read: false, update: false, delete: false },
      'Payroll': { create: false, read: false, update: false, delete: false },
      'Leave Management': { create: false, read: false, update: false, delete: false },
      'Attendance': { create: false, read: false, update: false, delete: false },
      'Task Management': { create: false, read: false, update: false, delete: false },
      'Leads': { create: false, read: false, update: false, delete: false },
      'Products Details': { create: false, read: false, update: false, delete: false },
      'Stock Transfer': { create: false, read: false, update: false, delete: false },
      'Warehouse': { create: false, read: false, update: false, delete: false },
      'Sales Invoice': { create: false, read: false, update: false, delete: false },
      'Purchase Invoice': { create: false, read: false, update: false, delete: false },
      'Expenses': { create: false, read: false, update: false, delete: false },
      'Account Receivable': { create: false, read: false, update: false, delete: false },
      'Account Payable': { create: false, read: false, update: false, delete: false },
      'Reports': { create: false, read: false, update: false, delete: false },
      'E-Com Admin': { create: false, read: false, update: false, delete: false },
      'Website Admin': { create: false, read: false, update: false, delete: false },
      'Update': { create: false, read: false, update: false, delete: false }
    }
  });

  const [profileImage, setProfileImage] = useState(null);

  // Debug logging for rendering conditions
  console.log('=== RENDER DECISION ===');
  console.log('isOpen value:', isOpen);
  console.log('isOpen strict equals true:', isOpen === true);
  console.log('!isOpen value:', !isOpen);
  console.log('Will return null:', !isOpen);

  if (!isOpen) {
    console.log('RETURNING NULL - Modal is NOT open');
    return null;
  }

  console.log('=== RENDERING MODAL CONTENT ===');
  console.log('Modal should be visible now');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted!');
    alert('Form submitted! Check console for data.');
  };

  // Handle cancel
  const handleCancel = () => {
    console.log('Cancel clicked, calling onClose');
    if (typeof onClose === 'function') {
      onClose();
    } else {
      console.error('onClose is not a function!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-900">Add New Employee - DEBUG VERSION</h2>
          <button 
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
>>>>>>> baec9d90e15bc827d60dc3306b781707193292a3
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
<<<<<<< HEAD
        <form onSubmit={handleSubmit}>
          {/* Message Display */}
          {message.text && (
            <div className={`p-4 mx-6 mt-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
              {message.text}
            </div>
          )}

          <div className="p-6">
            {/* Profile Photo Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors bg-gray-50/50">
                <div className="bg-white p-3 rounded-full mb-3 shadow-sm border border-gray-100">
                  <Camera className="w-6 h-6 text-gray-500" />
                </div>
                <p className="text-sm text-gray-600 font-medium">
                  Click to upload
                </p>
                <p className="text-xs text-gray-400 mt-1">(Max 5MB for images, 10MB for PDFs)</p>
              </div>
            </div>

            {/* Personal & Employment Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
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
                  name="fullName"
                  value={formData.fullName}
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
                  name="mobileNumber"
                  value={formData.mobileNumber}
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
                  name="emergencyNumber"
                  value={formData.emergencyNumber}
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
                    required
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

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                <select
                  name="status"
                  value={formData.status || 'Active'}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition-all"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
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
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-2 text-gray-800 font-semibold text-lg mb-4">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <span>Bank Details</span>
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
                    name="accountHolderName"
                    value={formData.accountHolderName}
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
                    name="branchName"
                    value={formData.branchName}
                    onChange={handleChange}
                    placeholder="Main Branch, Mumbai"
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Document Details Section */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-2 text-gray-800 font-semibold text-lg mb-4">
                <FileText className="w-5 h-5 text-blue-600" />
                <span>Document Details</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
                  <input
                    type="text"
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleChange}
                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Module Permissions Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 text-gray-800 font-semibold text-lg mb-4">
                <Shield className="w-5 h-5 text-blue-600" />
                <span>Module Permissions</span>
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
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-end gap-4 p-6 border-t border-gray-200 bg-gray-50">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
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
            </button>
          </div>
        </form>
=======
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">TEST MODAL - IT'S WORKING!</h3>
          <div className="space-y-4">
            <p className="text-green-600 font-medium">✓ If you can see this message, the modal is working correctly!</p>
            <p className="text-sm text-gray-600">isOpen value: {String(isOpen)}</p>
            <p className="text-sm text-gray-600">onClose is function: {String(typeof onClose === 'function')}</p>
            <div className="bg-yellow-100 p-3 rounded">
              <p className="text-sm text-yellow-800 font-medium">Debug Info:</p>
              <p className="text-xs text-yellow-700">This is a simplified test version to verify the modal functionality</p>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Close Test Modal
            </button>
          </div>
        </div>
>>>>>>> baec9d90e15bc827d60dc3306b781707193292a3
      </div>
    </div>
  );
};

export default AddEmployeeForm;
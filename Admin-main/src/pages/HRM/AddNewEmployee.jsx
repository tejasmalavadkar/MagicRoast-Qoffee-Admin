import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHRM } from '../../context/HRMContext';
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
  Upload
} from 'lucide-react';

export default function AddNewEmployee() {
  const navigate = useNavigate();
  const { addEmployee } = useHRM();
  const [showPassword, setShowPassword] = useState(false);

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
                onClick={() => navigate('/hrm/employee-management')}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Add Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

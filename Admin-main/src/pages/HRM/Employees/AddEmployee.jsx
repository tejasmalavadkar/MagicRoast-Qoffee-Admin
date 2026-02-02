import { useState, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Camera,
  Eye,
  EyeOff,
  Save,
  X,
  AlertCircle,
  CheckCircle,
  Upload
} from 'lucide-react';
import { useHRM } from '../../../context/HRMContext';
import { cn } from '../../../lib/utils';

export default function AddEmployeePage() {
  const navigate = useNavigate();
  const { departments, branches, addEmployee, generateEmployeeId, isEmailUnique } = useHRM();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    emergencyContact: '',
    emergencyPhone: '',
    department: '',
    position: '',
    branch: branches[0]?.name || '',
    salary: '',
    password: '',
    confirmPassword: '',
    status: 'active',
    joinDate: new Date().toISOString().split('T')[0],
    address: '',
    dateOfBirth: '',
    gender: '',
    bankAccount: '',
    bankName: ''
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Auto-generate employee ID
  const employeeId = generateEmployeeId();

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, avatar: 'Please upload a valid image file' }));
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({ ...prev, avatar: 'Image size must be less than 5MB' }));
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target.result);
        setFormData(prev => ({ ...prev, avatar: e.target.result }));
      };
      reader.readAsDataURL(file);
      
      // Clear avatar error
      if (errors.avatar) {
        setErrors(prev => ({ ...prev, avatar: '' }));
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removePhoto = () => {
    setAvatarPreview(null);
    setFormData(prev => ({ ...prev, avatar: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Mobile number is required';
    if (!formData.emergencyContact.trim()) newErrors.emergencyContact = 'Emergency contact is required';
    if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = 'Emergency phone is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.position.trim()) newErrors.position = 'Role/Position is required';
    if (!formData.branch) newErrors.branch = 'Branch is required';
    if (!formData.salary) newErrors.salary = 'Salary is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
    if (!formData.joinDate) newErrors.joinDate = 'Joining date is required';
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Email uniqueness
    if (formData.email && !isEmailUnique(formData.email)) {
      newErrors.email = 'This email is already registered';
    }
    
    // Phone validation
    if (formData.phone && !/^[+]?[0-9\s\-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    // Emergency phone validation
    if (formData.emergencyPhone && !/^[+]?[0-9\s\-()]{10,}$/.test(formData.emergencyPhone)) {
      newErrors.emergencyPhone = 'Please enter a valid emergency phone number';
    }
    
    // Salary validation
    if (formData.salary && (isNaN(formData.salary) || Number(formData.salary) <= 0)) {
      newErrors.salary = 'Please enter a valid salary amount';
    }
    
    // Password validation
    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    
    // Confirm password validation
    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Date of birth validation
    if (formData.dateOfBirth) {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      if (age < 16) {
        newErrors.dateOfBirth = 'Employee must be at least 16 years old';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Reduced delay for better UX
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const newEmployee = {
        id: Date.now().toString(),
        employeeId,
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        emergencyContact: formData.emergencyContact.trim(),
        emergencyPhone: formData.emergencyPhone.trim(),
        department: formData.department,
        position: formData.position.trim(),
        branch: formData.branch,
        salary: Number(formData.salary),
        status: formData.status,
        joinDate: formData.joinDate,
        password: formData.password,
        avatar: formData.avatar,
        address: formData.address.trim(),
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        bankAccount: formData.bankAccount.trim(),
        bankName: formData.bankName.trim()
      };
      
      addEmployee(newEmployee);
      
      setSuccessMessage(`Employee ${formData.name} has been successfully added with ID: ${employeeId}`);
      
      // Faster navigation after successful submission
      setTimeout(() => {
        navigate('/hrm/employees');
      }, 800);
      
    } catch (error) {
      setErrors({ submit: 'Failed to add employee. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (Object.values(formData).some(value => value !== '' && value !== branches[0]?.name)) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  };

  const handleGoBack = () => {
    if (Object.values(formData).some(value => value !== '' && value !== branches[0]?.name)) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-4 right-4 z-50 bg-success text-success-foreground p-4 rounded-lg shadow-lg flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          <span>{successMessage}</span>
        </div>
      )}
      
      {/* Header */}
      <div>
        <h1 className="page-header mb-1">Add New Employee</h1>
        <p className="text-muted-foreground">Create a new employee profile and login account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Photo Section */}
        <div className="bg-card rounded-xl border p-6">
          <h2 className="text-lg font-semibold mb-4">Profile Photo</h2>
          <div className="flex items-center gap-6">
            <div className="relative">
              {avatarPreview ? (
                <div className="relative">
                  <img 
                    src={avatarPreview} 
                    alt="Preview" 
                    className="w-24 h-24 rounded-full object-cover border-2 border-primary"
                  />
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="absolute -top-2 -right-2 p-1 bg-destructive rounded-full text-destructive-foreground hover:opacity-90"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border-2 border-dashed border-primary">
                  <Camera className="w-8 h-8 text-primary" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={triggerFileInput}
                className="btn-primary inline-flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                {avatarPreview ? 'Change Photo' : 'Upload Photo'}
              </button>
              <p className="text-sm text-muted-foreground mt-2">
                JPG, PNG, or GIF. Max 5MB
              </p>
              {errors.avatar && (
                <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.avatar}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-card rounded-xl border p-6">
          <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={cn("input-field", errors.name && "border-destructive")}
                placeholder="Enter full name"
              />
              {errors.name && (
                <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.name}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1.5">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={cn("input-field", errors.email && "border-destructive")}
                placeholder="Enter email address"
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1.5">Mobile Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={cn("input-field", errors.phone && "border-destructive")}
                placeholder="Enter mobile number"
              />
              {errors.phone && (
                <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.phone}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1.5">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1.5">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className={cn("input-field", errors.dateOfBirth && "border-destructive")}
              />
              {errors.dateOfBirth && (
                <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.dateOfBirth}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1.5">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Enter full address"
              />
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-card rounded-xl border p-6">
          <h2 className="text-lg font-semibold mb-4">Emergency Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Emergency Contact Name *</label>
              <input
                type="text"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
                className={cn("input-field", errors.emergencyContact && "border-destructive")}
                placeholder="Enter contact name"
              />
              {errors.emergencyContact && (
                <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.emergencyContact}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1.5">Emergency Phone *</label>
              <input
                type="tel"
                name="emergencyPhone"
                value={formData.emergencyPhone}
                onChange={handleInputChange}
                className={cn("input-field", errors.emergencyPhone && "border-destructive")}
                placeholder="Enter emergency phone"
              />
              {errors.emergencyPhone && (
                <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.emergencyPhone}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Work Information */}
        <div className="bg-card rounded-xl border p-6">
          <h2 className="text-lg font-semibold mb-4">Work Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Auto-generated Employee ID</label>
              <div className="input-field bg-muted cursor-not-allowed font-mono">
                {employeeId}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1.5">Department *</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className={cn("input-field", errors.department && "border-destructive")}
              >
                <option value="">Select department</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.name}>{dept.name}</option>
                ))}
              </select>
              {errors.department && (
                <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.department}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1.5">Role/Position *</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className={cn("input-field", errors.position && "border-destructive")}
                placeholder="Enter role/position"
              />
              {errors.position && (
                <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.position}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1.5">Branch *</label>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleInputChange}
                className={cn("input-field", errors.branch && "border-destructive")}
              >
                <option value="">Select branch</option>
                {branches.map(branch => (
                  <option key={branch.id} value={branch.name}>{branch.name}</option>
                ))}
              </select>
              {errors.branch && (
                <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.branch}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1.5">Salary ($) *</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                className={cn("input-field", errors.salary && "border-destructive")}
                placeholder="Enter monthly salary"
                min="0"
                step="0.01"
              />
              {errors.salary && (
                <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.salary}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1.5">Joining Date *</label>
              <input
                type="date"
                name="joinDate"
                value={formData.joinDate}
                onChange={handleInputChange}
                className={cn("input-field", errors.joinDate && "border-destructive")}
              />
              {errors.joinDate && (
                <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.joinDate}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1.5">Bank Name</label>
              <input
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Enter bank name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1.5">Bank Account Number</label>
              <input
                type="text"
                name="bankAccount"
                value={formData.bankAccount}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Enter account number"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1.5">Employee Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Login Credentials */}
        <div className="bg-card rounded-xl border p-6">
          <h2 className="text-lg font-semibold mb-4">Login Credentials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Password *</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={cn("input-field pr-10", errors.password && "border-destructive")}
                  placeholder="Create password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.password}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1.5">Confirm Password *</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={cn("input-field pr-10", errors.confirmPassword && "border-destructive")}
                  placeholder="Confirm password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-destructive mt-1 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); handleCancel(); }}
            className="btn-secondary"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary inline-flex items-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Employee
              </>
            )}
          </button>
        </div>

        {/* Error Message */}
        {errors.submit && (
          <div className="bg-destructive/10 border border-destructive rounded-lg p-4 text-destructive flex items-center gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{errors.submit}</span>
          </div>
        )}
      </form>
    </div>
  );
}
import React, { useState } from 'react';
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
    fullName: '',
    mobileNumber: '',
    emergencyNumber: '',
    email: '',
    password: '',
    role: '',
    employeeId: '',
    department: '',
    salary: '',
    address: '',
    
    // Bank Details
    bankName: '',
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    branchName: '',
    
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
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
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
      </div>
    </div>
  );
};

export default AddEmployeeForm;
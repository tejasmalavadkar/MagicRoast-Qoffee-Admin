import { memo, useCallback, useState } from 'react';
import { Trash2, Eye, EyeOff, Edit } from 'lucide-react';
import { getInitials } from '../lib/utils';

// Optimized employee row component
const EmployeeRow = memo(({ employee, onDelete, onEdit, onView }) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const handleDelete = useCallback((e) => {
    e.stopPropagation();
    onDelete(employee.id);
  }, [employee.id, onDelete]);

  const handleEdit = useCallback((e) => {
    e.stopPropagation();
    onEdit(employee);
  }, [employee, onEdit]);

  const handleView = useCallback((e) => {
    e.stopPropagation();
    onView(employee);
  }, [employee, onView]);

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
      <td className="py-3 px-3 text-sm">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-600 font-medium text-sm">
            {getInitials(employee.full_name || employee.name)}
          </span>
        </div>
      </td>
      <td className="py-3 px-3 text-sm">
        <div>
          <div className="font-semibold text-gray-800">{employee.full_name || employee.name}</div>
          <div className="text-xs text-gray-500">{employee.title || 'Mr.'}</div>
        </div>
      </td>
      <td className="py-3 px-3 text-gray-600 text-sm">
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {employee.email}
        </div>
      </td>
      <td className="py-3 px-3 text-gray-600 text-sm">
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {employee.phone}
        </div>
      </td>
      <td className="py-3 px-3 text-gray-600 text-sm">
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {employee.emergency_contact || 'N/A'}
        </div>
      </td>
      <td className="py-3 px-3 text-gray-600 text-sm">
        <div className="flex items-center gap-1">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowPassword(!showPassword);
            }}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
          <span className="font-mono text-xs">
            {showPassword ? employee.password || 'N/A' : '••••••'}
          </span>
        </div>
      </td>
      <td className="py-3 px-3 text-gray-600 text-sm">
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          {employee.department}
        </div>
      </td>
      <td className="py-3 px-3 text-gray-600 text-sm">
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          {employee.role || employee.designation || employee.position || 'N/A'}
        </div>
      </td>
      <td className="py-3 px-3 text-gray-600 text-sm">
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {employee.salary ? `₹${employee.salary.toLocaleString()}` : 'N/A'}
        </div>
      </td>
      <td className="py-3 px-3 text-sm">
        <span className={`px-2 py-1 text-xs rounded-full ${
          employee.is_active 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {employee.is_active ? 'Active' : 'Inactive'}
        </span>
      </td>
      <td className="py-3 px-3 text-sm">
        <div className="flex items-center gap-2">
          <button 
            onClick={handleView}
            className="text-blue-600 hover:text-blue-800 p-1 transition-colors duration-150"
            aria-label="View employee"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button 
            onClick={handleEdit}
            className="text-green-600 hover:text-green-800 p-1 transition-colors duration-150"
            aria-label="Edit employee"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button 
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 p-1 transition-colors duration-150"
            aria-label="Delete employee"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
});

// Add display name for debugging
EmployeeRow.displayName = 'EmployeeRow';

export default EmployeeRow;
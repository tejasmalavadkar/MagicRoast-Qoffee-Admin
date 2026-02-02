import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  Trash2, 
  User
} from 'lucide-react';

const EmployeeManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock employee data
  const employees = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@company.com',
      mobile: '+1 234 567 8900',
      emergency: 'Jane Smith - +1 234 567 8901',
      employeeId: 'EMP001',
      password: '••••••••',
      department: 'Engineering',
      salary: 75000,
      role: 'Employee',
      status: 'active'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      mobile: '+1 234 567 8902',
      emergency: 'Mike Johnson - +1 234 567 8903',
      employeeId: 'EMP002',
      password: '••••••••',
      department: 'Marketing',
      salary: 65000,
      role: 'SuperAdmin',
      status: 'active'
    }
  ];

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (role) => {
    const roleColors = {
      Employee: 'bg-blue-100 text-blue-800',
      SuperAdmin: 'bg-purple-100 text-purple-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColors[role] || 'bg-gray-100 text-gray-800'}`}>
        {role}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Add New Employee</h1>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Card Header */}
          <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-900">Employee Management</h2>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search employees…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-full sm:w-64"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
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
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Image</th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Email</th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Mobile</th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Emergency</th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Employee ID</th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Password</th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Department</th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Salary</th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Role</th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Status</th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-500" />
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-900">{employee.name}</td>
                    <td className="py-4 px-6 text-sm text-gray-700">{employee.email}</td>
                    <td className="py-4 px-6 text-sm text-gray-700">{employee.mobile}</td>
                    <td className="py-4 px-6 text-sm text-gray-700">{employee.emergency}</td>
                    <td className="py-4 px-6 text-sm font-mono text-gray-900">{employee.employeeId}</td>
                    <td className="py-4 px-6 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <span>{employee.password}</span>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700">{employee.department}</td>
                    <td className="py-4 px-6 text-sm text-gray-900 font-medium">${employee.salary.toLocaleString()}</td>
                    <td className="py-4 px-6">{getRoleBadge(employee.role)}</td>
                    <td className="py-4 px-6">
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input 
                          type="checkbox" 
                          name="toggle" 
                          id={`toggle-${employee.id}`}
                          className="checked:bg-blue-600 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                          defaultChecked={employee.status === 'active'}
                        />
                        <label 
                          htmlFor={`toggle-${employee.id}`} 
                          className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                        ></label>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredEmployees.length === 0 && (
            <div className="text-center py-12">
              <User className="w-12 h-12 mx-auto text-gray-300" />
              <p className="mt-4 text-gray-500">No employees found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagementPage;
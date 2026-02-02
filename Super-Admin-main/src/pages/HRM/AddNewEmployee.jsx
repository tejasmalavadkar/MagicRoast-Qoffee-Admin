import React from 'react';
import { Search, Bell, Maximize2, Plus, User, Mail, Phone, AlertCircle, Hash, Lock, Building, DollarSign, Briefcase, ToggleLeft } from 'lucide-react';

const AddNewEmployeePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Add New Employee</h1>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {/* Card Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <h2 className="text-lg font-semibold text-gray-900">Employee Management</h2>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Search Input */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search employees..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-full sm:w-64"
                    />
                  </div>
                  
                  {/* Add New Button */}
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4" />
                    Add New
                  </button>
                </div>
              </div>
            </div>

            {/* Table Content */}
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="pb-3 text-left text-sm font-medium text-gray-700">Image</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-700">Name</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-700">Email</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-700">Mobile</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-700">Emergency</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-700">Employee ID</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-700">Password</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-700">Department</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-700">Salary</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-700">Role</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-700">Status</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Empty State */}
                    <tr>
                      <td colSpan="12" className="py-16">
                        <div className="text-center">
                          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <User className="w-12 h-12 text-gray-400" />
                          </div>
                          <h3 className="text-lg font-medium text-gray-900 mb-1">No employees added yet</h3>
                          <p className="text-gray-500">Start by adding a new employee</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewEmployeePage;
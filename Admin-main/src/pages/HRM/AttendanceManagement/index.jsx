import { useState } from 'react';
import { Search, Calendar, Filter, User, X } from 'lucide-react';

export default function AttendanceManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const handleClearFilters = () => {
    setEmployeeSearch('');
    setDateFilter('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Attendance</h1>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Attendance Management</h2>
            </div>
            
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Search records…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Filter Section */}
          <div className="border border-gray-200 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Employee Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Employee Search"
                  value={employeeSearch}
                  onChange={(e) => setEmployeeSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>

              {/* Date Filter */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>

              {/* Clear Filters Button */}
              <button
                onClick={handleClearFilters}
                className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <X className="w-4 h-4" />
                Clear Filters
              </button>

              {/* Show Report Button */}
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors">
                <Filter className="w-4 h-4" />
                Show Report
              </button>
            </div>

            {/* Mark Absent Button - Positioned below the grid on larger screens */}
            <div className="mt-4 lg:mt-0 lg:absolute lg:right-6 lg:top-1/2 lg:-translate-y-1/2">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-800 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors">
                <User className="w-4 h-4" />
                Mark Absent
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <User className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No attendance records found</h3>
            <p className="text-gray-500 mb-6">Apply filters to see attendance data</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <Filter className="w-4 h-4" />
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
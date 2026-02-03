import React, { useEffect, useState } from 'react';
import { Search, Filter, FileDown, Plus, Calendar, User, Clock, Mail, X, AlertTriangle } from 'lucide-react';

const ApplyLeavePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filterRange, setFilterRange] = useState({ from: '', to: '' });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [requests] = useState([]);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    reason: '',
    sendEmail: true
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleExport = () => {
    if (!requests || requests.length === 0) {
      setToastMessage('No data to export');
      setShowToast(true);
      return;
    }
  };

  useEffect(() => {
    if (showToast) {
      const t = setTimeout(() => setShowToast(false), 2500);
      return () => clearTimeout(t);
    }
  }, [showToast]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Leave request submitted:', formData);
    setShowModal(false);
    // Reset form
    setFormData({
      startDate: '',
      endDate: '',
      reason: '',
      sendEmail: true
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Apply Leave</h1>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Header Section */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Section Header */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">My Leave Requests</h2>
              </div>

              {/* Search Bar */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by date, reason or status…"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 relative">
                <button
                  onClick={() => setShowFilters(prev => !prev)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
                <button
                  onClick={handleExport}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <FileDown className="w-4 h-4" />
                  Export
                </button>
                <button 
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  New Request
                </button>

                {showFilters && (
                  <div className="absolute top-12 right-28 bg-white border rounded-lg shadow-lg w-72 z-10">
                    <div className="px-4 py-3 border-b">
                      <p className="text-sm font-semibold text-gray-800">Date Range</p>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">From</label>
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="dd-mm-yyyy"
                              value={filterRange.from}
                              onChange={(e) => setFilterRange(r => ({ ...r, from: e.target.value }))}
                              className="w-full pl-3 pr-9 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Calendar className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">To</label>
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="dd-mm-yyyy"
                              value={filterRange.to}
                              onChange={(e) => setFilterRange(r => ({ ...r, to: e.target.value }))}
                              className="w-full pl-3 pr-9 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Calendar className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Empty State */}
          <div className="p-12">
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Clock className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">You haven't submitted any leave requests yet</h3>
              <p className="text-gray-500">Submit your first leave request to get started</p>
            </div>
          </div>
        </div>

        {/* New Leave Request Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-900">New Leave Request</h2>
                  <button 
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {/* User Info */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="font-semibold text-blue-600">VR</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Varun Rajeshirke</p>
                    <p className="text-sm text-gray-500">Digital Marketing</p>
                  </div>
                </div>
              </div>
              
              {/* Modal Form */}
              <form onSubmit={handleSubmit} className="p-6">
                <div className="space-y-4">
                  {/* Start Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date*
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        required
                      />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  
                  {/* End Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date*
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        required
                      />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  
                  {/* Total Days */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total days: {formData.startDate && formData.endDate ? Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60 * 24)) : 0} days
                    </label>
                  </div>
                  
                  {/* Reason */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Reason*
                    </label>
                    <textarea
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      placeholder="Explain the reason for your leave request"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                      required
                    />
                  </div>
                  
                  {/* Email Notification */}
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      name="sendEmail"
                      checked={formData.sendEmail}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">Send email notification to manager</span>
                  </div>
                </div>
                
                {/* Modal Footer */}
                <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {showToast && (
          <div className="fixed top-6 right-6 z-50">
            <div className="flex items-center gap-3 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-2 rounded shadow">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">{toastMessage}</span>
              <button
                onClick={() => setShowToast(false)}
                className="text-yellow-700 hover:text-yellow-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplyLeavePage;

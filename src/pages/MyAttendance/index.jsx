import React, { useState } from 'react';
import { Clock, ChevronLeft, ChevronRight, LogOut } from 'lucide-react';

const MyAttendancePage = () => {
  // Current date for the calendar
  const [currentDate, setCurrentDate] = useState(new Date());

  // Format date to display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Handle date navigation
  const goToPreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Attendance</h1>
        </div>

        {/* Layout with large empty space on left, centered card on right */}
        <div className="flex">
          {/* Large empty space on the left */}
          <div className="flex-1"></div>
          
          {/* Centered attendance card on the right */}
          <div className="w-full max-w-md">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              {/* Card Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  {/* Small rounded square user icon */}
                  <div className="w-10 h-10 rounded-md bg-blue-100 flex items-center justify-center">
                    <div className="w-6 h-6 rounded bg-blue-500"></div>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">My Attendance</h2>
                    <div className="flex items-center justify-between mt-2">
                      <button 
                        onClick={goToPreviousDay}
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                      </button>
                      <span className="text-sm font-medium text-gray-700">
                        {formatDate(currentDate)}
                      </span>
                      <button 
                        onClick={goToNextDay}
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                {/* Status Row */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm font-medium text-gray-700">Status</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Present
                  </span>
                </div>

                {/* Check In Row */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm font-medium text-gray-700">Check In</span>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">9:39 AM</span>
                  </div>
                </div>

                {/* Check In Photo */}
                <div className="mb-6">
                  <span className="text-sm font-medium text-gray-700 block mb-3">Check In Photo</span>
                  <div className="bg-black rounded-lg w-full h-48 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-700 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-gray-500"></div>
                      </div>
                      <p className="text-white text-sm">Photo Preview</p>
                    </div>
                  </div>
                </div>

                {/* Informational text */}
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500">You haven't checked out yet</p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 border-t border-gray-200">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  <LogOut className="w-4 h-4" />
                  Check Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAttendancePage;
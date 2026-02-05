import React, { useState } from 'react';
import { Clock, ChevronLeft, ChevronRight, LogOut, User, Calendar } from 'lucide-react';

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
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <div className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">My Attendance</h1>
              <p className="text-muted-foreground mt-1">Track your daily attendance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Attendance Card */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-xl border">
            {/* Card Header */}
            <div className="p-6 border-b">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-foreground">Daily Attendance</h2>
                  <div className="flex items-center justify-between mt-3">
                    <button 
                      onClick={goToPreviousDay}
                      className="p-2 rounded-lg border border-input hover:bg-accent transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-lg">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">
                        {formatDate(currentDate)}
                      </span>
                    </div>
                    <button 
                      onClick={goToNextDay}
                      className="p-2 rounded-lg border border-input hover:bg-accent transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6">
              {/* Status Row */}
              <div className="flex justify-between items-center mb-6 p-4 bg-gradient-to-r from-green-500/10 to-green-500/5 rounded-xl border border-green-500/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/20">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="font-medium text-foreground">Status</span>
                </div>
                <span className="px-3 py-1 bg-green-500/10 text-green-700 border border-green-500/20 rounded-full text-sm font-medium">
                  Present
                </span>
              </div>

              {/* Check In Row */}
              <div className="flex justify-between items-center mb-6 p-4 bg-gradient-to-r from-blue-500/10 to-blue-500/5 rounded-xl border border-blue-500/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <Clock className="w-4 h-4 text-blue-500" />
                  </div>
                  <span className="font-medium text-foreground">Check In</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">9:39 AM</span>
                </div>
              </div>

              {/* Check In Photo */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-muted/50">
                    <User className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <span className="font-medium text-foreground">Check In Photo</span>
                </div>
                <div className="bg-muted/30 rounded-xl border border-border w-full h-48 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-muted/50 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-muted-foreground"></div>
                    </div>
                    <p className="text-muted-foreground text-sm">Photo Preview</p>
                  </div>
                </div>
              </div>

              {/* Informational text */}
              <div className="text-center py-4 bg-muted/20 rounded-lg">
                <p className="text-sm text-muted-foreground">You haven't checked out yet</p>
              </div>
            </div>

            {/* Card Footer */}
            <div className="p-6 border-t">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors font-medium">
                <LogOut className="w-4 h-4" />
                Check Out
              </button>
            </div>
          </div>
        </div>

        {/* Attendance Summary Panel */}
        <div className="bg-card rounded-xl border">
          <div className="p-6 border-b bg-muted/50">
            <h3 className="text-lg font-semibold">Attendance Summary</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="flex items-center justify-between">
                  <span className="text-foreground font-medium">This Month</span>
                  <span className="text-green-700 font-bold">22/25</span>
                </div>
                <div className="mt-2 w-full bg-muted/30 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                </div>
              </div>
              
              <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="flex items-center justify-between">
                  <span className="text-foreground font-medium">On Time</span>
                  <span className="text-blue-700 font-bold">20 days</span>
                </div>
              </div>
              
              <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <div className="flex items-center justify-between">
                  <span className="text-foreground font-medium">Late Arrivals</span>
                  <span className="text-yellow-700 font-bold">2 days</span>
                </div>
              </div>
              
              <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                <div className="flex items-center justify-between">
                  <span className="text-foreground font-medium">Absent</span>
                  <span className="text-red-700 font-bold">3 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAttendancePage;
import React, { createContext, useContext, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { employees as mockEmployees, departments as mockDepartments, branches as mockBranches, attendanceRecords as mockAttendance } from '../data/mockData';

const HRMContext = createContext(undefined);

export function HRMProvider({ children }) {
  const [employees, setEmployees] = useState(() => 
    mockEmployees.map(emp => ({
      ...emp,
      // Only add essential fields needed for functionality
      emergencyContact: emp.emergencyContact || 'Not provided',
      avatar: emp.avatar || '',
      // Remove extended fields to keep data simple
    }))
  );
  
  const [attendanceRecords, setAttendanceRecords] = useState(mockAttendance);
  const [departments] = useState(mockDepartments);
  const [branches] = useState(mockBranches);
  const [nextEmployeeId, setNextEmployeeId] = useState(9); // Start from EMP009 since we have EMP001-EMP008
  const [nextAttendanceId, setNextAttendanceId] = useState(9);

  const updateEmployee = (id, updates) => {
    setEmployees(prev => 
      prev.map(emp => 
        emp.id === id ? { ...emp, ...updates } : emp
      )
    );
  };

  const deleteEmployee = (id) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  const addEmployee = (employee) => {
    setEmployees(prev => [...prev, employee]);
  };

  const generateEmployeeId = () => {
    const id = `EMP${String(nextEmployeeId).padStart(3, '0')}`;
    setNextEmployeeId(prev => prev + 1);
    return id;
  };

  const isEmailUnique = (email, excludeId = null) => {
    return !employees.some(emp => emp.email === email && emp.id !== excludeId);
  };

  const isEmployeeIdUnique = (employeeId) => {
    return !employees.some(emp => emp.employeeId === employeeId);
  };

  // Attendance Functions
  const addAttendanceRecord = (record) => {
    setAttendanceRecords(prev => [...prev, record]);
  };

  const updateAttendanceRecord = (id, updates) => {
    setAttendanceRecords(prev => 
      prev.map(record => 
        record.id === id ? { ...record, ...updates } : record
      )
    );
  };

  const deleteAttendanceRecord = (id) => {
    setAttendanceRecords(prev => prev.filter(record => record.id !== id));
  };

  const getAttendanceForDate = (date) => {
    return attendanceRecords.filter(record => record.date === date);
  };

  const getEmployeeAttendance = (employeeId) => {
    return attendanceRecords.filter(record => record.employeeId === employeeId);
  };

  const generateAttendanceId = () => {
    const id = String(nextAttendanceId);
    setNextAttendanceId(prev => prev + 1);
    return id;
  };

  const calculateWorkingHours = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 0;
    
    const [checkInHours, checkInMinutes] = checkIn.split(':').map(Number);
    const [checkOutHours, checkOutMinutes] = checkOut.split(':').map(Number);
    
    const checkInTime = checkInHours * 60 + checkInMinutes;
    const checkOutTime = checkOutHours * 60 + checkOutMinutes;
    
    return Math.max(0, (checkOutTime - checkInTime) / 60);
  };

  const determineStatus = (checkIn, checkOut, workingHours) => {
    if (!checkIn) return 'absent';
    
    // If no checkout yet, check if they're late based on check-in time
    if (!checkOut) {
      const [checkInHours, checkInMinutes] = checkIn.split(':').map(Number);
      const checkInTotalMinutes = checkInHours * 60 + checkInMinutes;
      const lateThreshold = 9 * 60 + 45; // 9:45 AM
      
      return checkInTotalMinutes > lateThreshold ? 'late' : 'present';
    }
    
    // Half day takes precedence - if check-out before 3:00 PM
    const [checkOutHours, checkOutMinutes] = checkOut.split(':').map(Number);
    const checkOutTotalMinutes = checkOutHours * 60 + checkOutMinutes;
    const halfDayThreshold = 15 * 60; // 3:00 PM (15:00 in 24-hour format)
    
    if (checkOutTotalMinutes < halfDayThreshold) return 'half_day';
    
    // Check if check-in was late (after 9:45 AM)
    const [checkInHours, checkInMinutes] = checkIn.split(':').map(Number);
    const checkInTotalMinutes = checkInHours * 60 + checkInMinutes;
    const lateThreshold = 9 * 60 + 45; // 9:45 AM
    
    if (checkInTotalMinutes > lateThreshold) return 'late';
    
    return 'present';
  };

  const processCheckIn = (employeeId, employeeName, date, checkInTime, checkInPhoto, deviceId = null, location = null) => {
    const existingRecord = attendanceRecords.find(
      record => record.employeeId === employeeId && record.date === date
    );
    
    // Prevent duplicate check-ins
    if (existingRecord && existingRecord.checkIn) {
      alert(`Employee ${employeeName} has already checked in today.`);
      return;
    }
    
    if (existingRecord) {
      // Update existing record with check-in
      const workingHours = calculateWorkingHours(checkInTime, existingRecord.checkOut);
      const status = determineStatus(checkInTime, existingRecord.checkOut, workingHours);
      
      updateAttendanceRecord(existingRecord.id, {
        checkIn: checkInTime,
        checkInPhoto,
        deviceId,
        location,
        workingHours: workingHours > 0 ? parseFloat(workingHours.toFixed(1)) : undefined,
        status
      });
    } else {
      // Create new record
      const status = determineStatus(checkInTime, null, 0);
      const newRecord = {
        id: generateAttendanceId(),
        employeeId,
        employeeName,
        date,
        checkIn: checkInTime,
        checkInPhoto,
        deviceId,
        location,
        status
      };
      addAttendanceRecord(newRecord);
    }
  };

  const processCheckOut = (employeeId, date, checkOutTime, checkOutPhoto, deviceId = null, location = null) => {
    const record = attendanceRecords.find(
      record => record.employeeId === employeeId && record.date === date
    );
    
    if (record) {
      // Prevent check-out without check-in
      if (!record.checkIn) {
        alert('Cannot check out without checking in first.');
        return;
      }
      
      // Prevent duplicate check-outs
      if (record.checkOut) {
        alert('Employee has already checked out today.');
        return;
      }
      
      const workingHours = calculateWorkingHours(record.checkIn, checkOutTime);
      const status = determineStatus(record.checkIn, checkOutTime, workingHours);
      
      updateAttendanceRecord(record.id, {
        checkOut: checkOutTime,
        checkOutPhoto,
        deviceId,
        location,
        workingHours: parseFloat(workingHours.toFixed(1)),
        status
      });
    } else {
      alert('No check-in record found for this employee today. Cannot check out.');
    }
  };



  const getAttendanceStats = (date) => {
    const records = getAttendanceForDate(date);
    return {
      total: records.length,
      present: records.filter(r => r.status === 'present').length,
      absent: records.filter(r => r.status === 'absent').length,
      late: records.filter(r => r.status === 'late').length,
      halfDay: records.filter(r => r.status === 'half_day').length
    };
  };

  const exportAttendanceReport = (startDate, endDate, format = 'excel') => {
    console.log('Export function called with format:', format);
    console.log('Start date:', startDate, 'End date:', endDate);
    
    // Filter records by date range
    const records = attendanceRecords.filter(record => 
      record.date >= startDate && record.date <= endDate
    );
    
    console.log('Records found:', records.length);
    
    if (format === 'excel') {
      // Enhanced CSV format for Excel with proper attendance table structure
      
      // Main headers matching the attendance table
      const mainHeaders = ['Employee ID', 'Employee Name', 'Email', 'Date', 'Check In', 'Check Out', 'Working Hours', 'Status'];
      
      // Additional details headers
      const detailHeaders = ['Department', 'Position', 'Check-in Photo', 'Check-out Photo', 'Device ID', 'Location'];
      
      // Combine all headers
      const allHeaders = [...mainHeaders, ...detailHeaders];
      
      // Create formatted rows
      const rows = records.map(record => {
        // Find employee details
        const employee = employees.find(emp => emp.employeeId === record.employeeId);
        
        return [
          // Main attendance data
          record.employeeId || '-',
          record.employeeName || '-',
          employee?.email || '-',
          record.date || '-',
          record.checkIn ? formatTimeForExport(record.checkIn) : '-',
          record.checkOut ? formatTimeForExport(record.checkOut) : '-',
          record.workingHours ? `${parseFloat(record.workingHours.toFixed(1))} hrs` : '-',
          record.status ? formatStatusForExport(record.status) : 'Absent',
          
          // Additional details
          employee?.department || '-',
          employee?.position || '-',
          record.checkInPhoto ? 'Yes' : 'No',
          record.checkOutPhoto ? 'Yes' : 'No',
          record.deviceId || '-',
          record.location || '-'
        ];
      });
      
      // Create CSV content with proper formatting
      const csvContent = [
        // Title row
        [`Attendance Report: ${startDate} to ${endDate}`],
        [''], // Empty row
        // Headers
        allHeaders,
        // Data rows
        ...rows
      ].map(row => row.map(cell => {
        // Escape commas and quotes in CSV
        if (typeof cell === 'string' && (cell.includes(',') || cell.includes('"'))) {
          return `"${cell.replace(/"/g, '""')}"`;
        }
        return cell;
      }).join(',')).join('\n');
      
      // Create download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `attendance_report_${startDate.replace(/-/g, '')}_to_${endDate.replace(/-/g, '')}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    } else if (format === 'pdf') {
      console.log('Generating PDF...');
      try {
        // Create PDF report with proper attendance table structure
        const doc = new jsPDF();
        
        // Add title
        doc.setFontSize(18);
        doc.text(`Attendance Report: ${startDate} to ${endDate}`, 14, 20);
        
        // Prepare data for the table
        const mainHeaders = ['Employee ID', 'Employee Name', 'Date', 'Check In', 'Check Out', 'Working Hours', 'Status'];
        
        // Create rows with formatted data
        const rows = records.map(record => {
          const employee = employees.find(emp => emp.employeeId === record.employeeId);
          
          return [
            record.employeeId || '-',
            record.employeeName || '-',
            record.date || '-',
            record.checkIn ? formatTimeForExport(record.checkIn) : '-',
            record.checkOut ? formatTimeForExport(record.checkOut) : '-',
            record.workingHours ? `${parseFloat(record.workingHours.toFixed(1))} hrs` : '-',
            record.status ? formatStatusForExport(record.status) : 'Absent'
          ];
        });
        
        // Add the table to the PDF
        doc.autoTable({
          head: [mainHeaders],
          body: rows,
          startY: 30,
          styles: {
            fontSize: 10,
            cellPadding: 5
          },
          headStyles: {
            fillColor: [59, 130, 246], // Tailwind blue-500
            textColor: [255, 255, 255],
            fontStyle: 'bold'
          },
          alternateRowStyles: {
            fillColor: [249, 250, 251] // Tailwind gray-50
          },
          margin: { left: 14, right: 14 }
        });
        
        // Add report generation info
        const finalY = doc.lastAutoTable.finalY || 30;
        doc.setFontSize(10);
        doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, finalY + 10);
        
        // Save the PDF
        doc.save(`attendance_report_${startDate.replace(/-/g, '')}_to_${endDate.replace(/-/g, '')}.pdf`);
      } catch (error) {
        console.error('PDF export error:', error);
        alert('Error generating PDF report. Please try again.');
      }
    }
  };
  
  // Helper function to format time for export
  const formatTimeForExport = (timeString) => {
    if (!timeString) return '-';
    // Convert 24-hour format to 12-hour format with AM/PM
    const [hours, minutes] = timeString.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };
  
  // Helper function to format status for export
  const formatStatusForExport = (status) => {
    switch (status) {
      case 'half_day': return 'Half Day';
      case 'late': return 'Late';
      case 'present': return 'Present';
      case 'absent': return 'Absent';
      default: return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  return (
    <HRMContext.Provider value={{
      employees,
      departments,
      branches,
      attendanceRecords,
      updateEmployee,
      deleteEmployee,
      addEmployee,
      generateEmployeeId,
      isEmailUnique,
      isEmployeeIdUnique,
      addAttendanceRecord,
      updateAttendanceRecord,
      deleteAttendanceRecord,
      getAttendanceForDate,
      getEmployeeAttendance,
      generateAttendanceId,
      calculateWorkingHours,
      determineStatus,
      processCheckIn,
      processCheckOut,
      getAttendanceStats,
      exportAttendanceReport
    }}>
      {children}
    </HRMContext.Provider>
  );
}

export function useHRM() {
  const context = useContext(HRMContext);
  if (context === undefined) {
    throw new Error('useHRM must be used within an HRMProvider');
  }
  return context;
}
import { useState, useRef, useEffect } from 'react';
import {
  Clock,
  Search,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  Timer,
  Camera,
  Check,
  X,
  Download,
  Filter,
  Edit,
  Eye,
  Upload,
  User,
  FileText,
  Trash2,
} from 'lucide-react';
import { useHRM } from '../../../context/HRMContext';
import { formatTime, getInitials, getStatusColor, cn, formatCurrency } from '../../../lib/utils';

export default function AttendancePage() {
  const { 
    employees, 
    attendanceRecords, 
    getAttendanceStats, 
    processCheckIn, 
    processCheckOut,
    updateAttendanceRecord,
    deleteAttendanceRecord,
    exportAttendanceReport
  } = useHRM();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterStatus, setFilterStatus] = useState('');
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [showCheckOutModal, setShowCheckOutModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewPhotosModal, setShowViewPhotosModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editRecord, setEditRecord] = useState(null);
  const [viewPhotosRecord, setViewPhotosRecord] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Camera refs
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  
  const stats = getAttendanceStats(selectedDate);
  
  const filteredRecords = attendanceRecords.filter((record) => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || record.status === filterStatus;
    const matchesDate = record.date === selectedDate;
    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present': return <CheckCircle className="w-4 h-4 text-success" />;
      case 'absent': return <XCircle className="w-4 h-4 text-destructive" />;
      case 'late': return <AlertCircle className="w-4 h-4 text-warning" />;
      case 'half_day': return <Timer className="w-4 h-4 text-info" />;
      default: return null;
    }
  };

  // Camera functions
  const startCamera = async (videoElement) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      streamRef.current = stream;
      videoElement.srcObject = stream;
      return true;
    } catch (error) {
      console.error('Camera access denied:', error);
      alert('Camera access is required for attendance. Please allow camera permissions.');
      return false;
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const capturePhoto = (videoElement, canvasElement) => {
    const context = canvasElement.getContext('2d');
    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;
    context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
    return canvasElement.toDataURL('image/jpeg');
  };

  const handleCheckIn = async (employee) => {
    setSelectedEmployee(employee);
    setShowCheckInModal(true);
    
    // Start camera after modal opens
    setTimeout(async () => {
      if (videoRef.current) {
        const success = await startCamera(videoRef.current);
        if (!success) {
          setShowCheckInModal(false);
        }
      }
    }, 100);
  };

  const handleCheckOut = async (employee) => {
    setSelectedEmployee(employee);
    setShowCheckOutModal(true);
    
    // Start camera after modal opens
    setTimeout(async () => {
      if (videoRef.current) {
        const success = await startCamera(videoRef.current);
        if (!success) {
          setShowCheckOutModal(false);
        }
      }
    }, 100);
  };

  const confirmCheckIn = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const photoData = capturePhoto(videoRef.current, canvasRef.current);
    const currentTime = new Date().toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    processCheckIn(
      selectedEmployee.employeeId,
      selectedEmployee.name,
      selectedDate,
      currentTime,
      photoData,
      navigator.userAgent // Device ID
    );
    
    stopCamera();
    setShowCheckInModal(false);
    setSelectedEmployee(null);
  };

  const confirmCheckOut = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const photoData = capturePhoto(videoRef.current, canvasRef.current);
    const currentTime = new Date().toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    processCheckOut(
      selectedEmployee.employeeId,
      selectedDate,
      currentTime,
      photoData,
      navigator.userAgent // Device ID
    );
    
    stopCamera();
    setShowCheckOutModal(false);
    setSelectedEmployee(null);
  };

  const handleEdit = (record) => {
    setEditRecord(record);
    setEditForm({
      checkIn: record.checkIn || '',
      checkOut: record.checkOut || '',
      status: record.status
    });
    setShowEditModal(true);
  };

  const handleViewPhotos = (record) => {
    setViewPhotosRecord(record);
    setShowViewPhotosModal(true);
  };

  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleDelete = (record) => {
    setDeleteConfirm(record);
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      deleteAttendanceRecord(deleteConfirm.id);
      setDeleteConfirm(null);
    }
  };

  const handleEditSave = () => {
    if (editRecord) {
      updateAttendanceRecord(editRecord.id, {
        checkIn: editForm.checkIn,
        checkOut: editForm.checkOut,
        status: editForm.status
      });
      setShowEditModal(false);
      setEditRecord(null);
      setEditForm({});
    }
  };

  const handleExport = (format) => {
    exportAttendanceReport(startDate, endDate, format);
  };

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-header mb-1">Attendance</h1>
          <p className="text-muted-foreground">Track daily employee attendance with camera verification</p>
        </div>
        <div className="flex gap-2">
          <div className="flex gap-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input-field text-sm w-32"
            />
            <span className="self-center text-muted-foreground">to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="input-field text-sm w-32"
            />
          </div>
          <button
            onClick={() => handleExport('excel')}
            className="btn-secondary inline-flex items-center gap-2 text-sm"
          >
            <Download className="w-4 h-4" />
            Excel
          </button>
          <button
            onClick={() => handleExport('pdf')}
            className="btn-secondary inline-flex items-center gap-2 text-sm"
          >
            <FileText className="w-4 h-4" />
            PDF
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-success/10">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
          </div>
          <p className="text-2xl font-bold text-success">{stats.present}</p>
          <p className="text-sm text-muted-foreground">Present</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-destructive/10">
              <XCircle className="w-5 h-5 text-destructive" />
            </div>
          </div>
          <p className="text-2xl font-bold text-destructive">{stats.absent}</p>
          <p className="text-sm text-muted-foreground">Absent</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-warning/10">
              <AlertCircle className="w-5 h-5 text-warning" />
            </div>
          </div>
          <p className="text-2xl font-bold text-warning">{stats.late}</p>
          <p className="text-sm text-muted-foreground">Late</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-info/10">
              <Timer className="w-5 h-5 text-info" />
            </div>
          </div>
          <p className="text-2xl font-bold text-info">{stats.halfDay}</p>
          <p className="text-sm text-muted-foreground">Half Day</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search employee..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="input-field pl-10 w-full sm:w-44"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="input-field w-full sm:w-36"
        >
          <option value="">All Status</option>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
          <option value="late">Late</option>
          <option value="half_day">Half Day</option>
        </select>
      </div>

      {/* Attendance Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th className="min-w-28">Working Hours</th>
              <th>Status</th>
              <th className="text-center w-32">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.filter(emp => emp.status === 'active').map((employee) => {
              const record = attendanceRecords.find(
                r => r.employeeId === employee.employeeId && r.date === selectedDate
              );
              
              return (
                <tr key={employee.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      {employee.avatar ? (
                        <img 
                          src={employee.avatar} 
                          alt={employee.name} 
                          className="w-10 h-10 rounded-full object-cover border-2 border-primary" 
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                          {getInitials(employee.name)}
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-foreground">{employee.name}</p>

                        <p className="text-xs text-muted-foreground font-mono">{employee.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  <td>{selectedDate}</td>
                  <td>
                    {record?.checkIn ? (
                      <span className="font-medium">{formatTime(record.checkIn)}</span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                  <td>
                    {record?.checkOut ? (
                      <span className="font-medium">{formatTime(record.checkOut)}</span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                  <td className="font-medium text-foreground">{record?.workingHours ? `${parseFloat(record.workingHours.toFixed(1))} hrs` : <span className="text-muted-foreground">-</span>}</td>
                  <td>
                    <span className={cn('badge', getStatusColor(record?.status || 'absent'))}>
                      {record?.status ? 
                        record.status === 'half_day' ? 'Half Day' : 
                        record.status.charAt(0).toUpperCase() + record.status.slice(1) : 
                        'Absent'}
                    </span>
                  </td>
                  <td className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      {!record?.checkIn ? (
                        <button
                          onClick={() => handleCheckIn(employee)}
                          className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground"
                          title="Check In"
                        >
                          <Camera className="w-4 h-4" />
                        </button>
                      ) : !record?.checkOut ? (
                        <button
                          onClick={() => handleCheckOut(employee)}
                          className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground"
                          title="Check Out"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => handleViewPhotos(record)}
                            className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground"
                            title="View Photos"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(record)}
                            className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(record)}
                            className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Check-in Modal */}
      {showCheckInModal && selectedEmployee && (
        <div className="fixed inset-0 bg-espresso/50 z-50 flex items-center justify-center p-4" onClick={() => {
          stopCamera();
          setShowCheckInModal(false);
          setSelectedEmployee(null);
        }}>
          <div className="bg-card rounded-xl border shadow-xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Check In</h3>
              <p className="text-muted-foreground mb-4">{selectedEmployee.name}</p>
              
              <div className="relative mb-4">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-64 bg-black rounded-lg object-cover"
                />
                <div className="absolute inset-0 border-4 border-primary rounded-lg pointer-events-none"></div>
              </div>
              
              <canvas ref={canvasRef} className="hidden" />
              
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    stopCamera();
                    setShowCheckInModal(false);
                    setSelectedEmployee(null);
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmCheckIn}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Camera className="w-4 h-4" />
                  Capture & Check In
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Check-out Modal */}
      {showCheckOutModal && selectedEmployee && (
        <div className="fixed inset-0 bg-espresso/50 z-50 flex items-center justify-center p-4" onClick={() => {
          stopCamera();
          setShowCheckOutModal(false);
          setSelectedEmployee(null);
        }}>
          <div className="bg-card rounded-xl border shadow-xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Check Out</h3>
              <p className="text-muted-foreground mb-4">{selectedEmployee.name}</p>
              
              <div className="relative mb-4">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-64 bg-black rounded-lg object-cover"
                />
                <div className="absolute inset-0 border-4 border-success rounded-lg pointer-events-none"></div>
              </div>
              
              <canvas ref={canvasRef} className="hidden" />
              
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    stopCamera();
                    setShowCheckOutModal(false);
                    setSelectedEmployee(null);
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmCheckOut}
                  className="btn-success inline-flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Capture & Check Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Photos Modal */}
      {showViewPhotosModal && viewPhotosRecord && (
        <div className="fixed inset-0 bg-espresso/50 z-50 flex items-center justify-center p-4" onClick={() => {
          setShowViewPhotosModal(false);
          setViewPhotosRecord(null);
        }}>
          <div className="bg-card rounded-xl border shadow-xl max-w-2xl w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">Attendance Photos</h3>
                  <p className="text-muted-foreground">{viewPhotosRecord.employeeName} - {viewPhotosRecord.date}</p>
                </div>
                <button
                  onClick={() => {
                    setShowViewPhotosModal(false);
                    setViewPhotosRecord(null);
                  }}
                  className="p-1.5 rounded-lg hover:bg-accent"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Check-In Photo</h4>
                  {viewPhotosRecord.checkInPhoto ? (
                    <img 
                      src={viewPhotosRecord.checkInPhoto} 
                      alt="Check-in" 
                      className="w-full h-64 object-contain rounded-lg border bg-muted"
                    />
                  ) : (
                    <div className="w-full h-64 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center text-muted-foreground">
                      No check-in photo
                    </div>
                  )}
                  {viewPhotosRecord.checkIn && (
                    <p className="text-center text-sm text-muted-foreground">Time: {formatTime(viewPhotosRecord.checkIn)}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Check-Out Photo</h4>
                  {viewPhotosRecord.checkOutPhoto ? (
                    <img 
                      src={viewPhotosRecord.checkOutPhoto} 
                      alt="Check-out" 
                      className="w-full h-64 object-contain rounded-lg border bg-muted"
                    />
                  ) : (
                    <div className="w-full h-64 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center text-muted-foreground">
                      No check-out photo
                    </div>
                  )}
                  {viewPhotosRecord.checkOut && (
                    <p className="text-center text-sm text-muted-foreground">Time: {formatTime(viewPhotosRecord.checkOut)}</p>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <button
                  onClick={() => {
                    setShowViewPhotosModal(false);
                    setViewPhotosRecord(null);
                  }}
                  className="btn-primary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editRecord && (
        <div className="fixed inset-0 bg-espresso/50 z-50 flex items-center justify-center p-4" onClick={() => {
          setShowEditModal(false);
          setEditRecord(null);
          setEditForm({});
        }}>
          <div className="bg-card rounded-xl border shadow-xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Edit Attendance</h3>
              <p className="text-muted-foreground">{editRecord.employeeName} - {editRecord.date}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Check In Time</label>
                  <input
                    type="time"
                    value={editForm.checkIn || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, checkIn: e.target.value }))}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Check Out Time</label>
                  <input
                    type="time"
                    value={editForm.checkOut || ''}
                    onChange={(e) => setEditForm(prev => ({ ...prev, checkOut: e.target.value }))}
                    className="input-field"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm(prev => ({ ...prev, status: e.target.value }))}
                  className="input-field w-full"
                >
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="late">Late</option>
                  <option value="half_day">Half Day</option>
                </select>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setEditRecord(null);
                    setEditForm({});
                  }}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSave}
                  className="btn-primary"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-espresso/50 z-50 flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-card rounded-xl border shadow-xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-destructive" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Delete Attendance Record?</h3>
              <p className="text-muted-foreground mb-6">
                Are you sure you want to delete the attendance record for <strong>{deleteConfirm.employeeName}</strong> on <strong>{deleteConfirm.date}</strong>? This action cannot be undone.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="btn-destructive"
                >
                  Delete Record
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {employees.filter(emp => emp.status === 'active').length === 0 && (
        <div className="text-center py-12">
          <User className="w-12 h-12 mx-auto text-muted-foreground/50" />
          <p className="mt-4 text-muted-foreground">No active employees found</p>
        </div>
      )}
    </div>
  );
}
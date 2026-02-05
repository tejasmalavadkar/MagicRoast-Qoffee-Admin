import React, { useState } from 'react';
import { User, Calendar, Check, Eye, X, Send, MessageCircle, Clock, Loader } from 'lucide-react';

const MyTasksPage = () => {
  // Sample task data
  const [tasks, setTasks] = useState([
    {
      id: 1,
      task: 'Arrange Review Meeting',
      priority: 'low',
      status: 'Completed',
      dueDate: 'Nov 6, 2025 5:33 PM',
      description: 'Do All The Arrangements',
      assignedTo: 'Employee'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('Completed');
  const [comment, setComment] = useState('');

  const getPriorityBadge = (priority) => {
    const priorityStyles = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityStyles[priority] || priorityStyles.low}`}>
        {priority}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      'Completed': 'bg-green-100 text-green-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      'Pending': 'bg-gray-100 text-gray-800',
      'Rejected': 'bg-red-100 text-red-800'
    };
    
    const statusIcons = {
      'Pending': Clock,
      'In Progress': Loader,
      'Completed': Check,
      'Rejected': X
    };
    
    const IconComponent = statusIcons[status] || Clock;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusStyles[status] || statusStyles['Pending']}`}>
        {status === 'In Progress' ? (
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span>In Progress</span>
          </div>
        ) : (
          <>
            <IconComponent className="w-3 h-3" />
            {status}
          </>
        )}
      </span>
    );
  };

  const openTaskModal = (task) => {
    setSelectedTask(task);
    setSelectedStatus(task.status);
    setShowModal(true);
  };

  const closeTaskModal = () => {
    setShowModal(false);
    setSelectedTask(null);
    setComment('');
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    // Update the task status
    if (selectedTask) {
      // Update task in state
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === selectedTask.id 
            ? { ...task, status } 
            : task
        )
      );
      
      // Update selected task status
      setSelectedTask(prev => ({ ...prev, status }));
      
      // Here you would typically update the task status in your backend
      console.log('Status updated to:', status);
      
      // Show toast notification
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fadeIn';
      toast.textContent = `Status updated to ${status}`;
      document.body.appendChild(toast);
      
      // Remove toast after 3 seconds
      setTimeout(() => {
        if (document.body.contains(toast)) {
          toast.classList.add('animate-fadeOut');
          setTimeout(() => {
            document.body.removeChild(toast);
          }, 300);
        }
      }, 3000);
    }
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      // Here you would typically add the comment to your backend
      console.log('Comment added:', comment);
      setComment('');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <Clock className="w-4 h-4" />;
      case 'In Progress': return <Loader className="w-4 h-4" />;
      case 'Completed': return <Check className="w-4 h-4" />;
      case 'Rejected': return <X className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusCardClass = (status) => {
    const baseClass = 'p-3 rounded-lg border cursor-pointer transition-all';
    if (status === selectedStatus) {
      if (status === 'Rejected') {
        return `${baseClass} border-red-500 bg-red-50 text-red-700`;
      } else if (status === 'Completed') {
        return `${baseClass} border-blue-500 bg-blue-50 text-blue-700`;
      } else {
        return `${baseClass} border-blue-500 bg-blue-50 text-blue-700`;
      }
    } else {
      return `${baseClass} border-gray-200 hover:border-gray-300`;
    }
  };

  const getStatusTextClass = (status) => {
    if (status === selectedStatus) {
      if (status === 'Rejected') {
        return 'text-red-700 font-medium';
      } else {
        return 'text-blue-700 font-medium';
      }
    } else {
      return 'text-gray-700';
    }
  };

  const getStatusIconClass = (status) => {
    if (status === selectedStatus) {
      if (status === 'Rejected') {
        return 'text-red-500';
      } else {
        return 'text-blue-500';
      }
    } else {
      return 'text-gray-400';
    }
  };

  const statusOptions = [
    { key: 'Pending', label: 'Pending', icon: Clock },
    { key: 'In Progress', label: 'In Progress', icon: Loader },
    { key: 'Completed', label: 'Completed', icon: Check },
    { key: 'Rejected', label: 'Rejected', icon: X }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Header Section */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Section Header */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Tasks</h2>
                <p className="text-sm text-gray-500">Employee • 1 task</p>
              </div>

              {/* Employee Button */}
              <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                <User className="w-4 h-4" />
                Employee
              </button>
            </div>
          </div>

          {/* Tasks Table */}
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="pb-3 text-left text-sm font-medium text-gray-700">Task</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-700">Priority</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-700">Status</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-700">Due Date</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {tasks.map((task) => (
                    <tr key={task.id} className="hover:bg-gray-50">
                      <td className="py-4 text-sm text-gray-900 font-medium">{task.task}</td>
                      <td className="py-4">{getPriorityBadge(task.priority)}</td>
                      <td className="py-4">{getStatusBadge(task.status)}</td>
                      <td className="py-4 text-sm text-gray-700">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {task.dueDate}
                        </div>
                      </td>
                      <td className="py-4">
                        <button 
                          onClick={() => openTaskModal(task)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Task Details Modal */}
        {showModal && selectedTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedTask.task}</h2>
                    <div className="flex items-center gap-1 mt-1">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Assigned to: {selectedTask.assignedTo}</span>
                    </div>
                  </div>
                  <button 
                    onClick={closeTaskModal}
                    className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Status Info Badges */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Low Priority
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${
                    selectedStatus === 'Pending' ? 'bg-gray-100 text-gray-800' :
                    selectedStatus === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    selectedStatus === 'Completed' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {selectedStatus === 'Pending' && <Clock className="w-4 h-4" />}
                    {selectedStatus === 'In Progress' && (
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <span>In Progress</span>
                      </div>
                    )}
                    {selectedStatus === 'Completed' && <Check className="w-4 h-4" />}
                    {selectedStatus === 'Rejected' && <X className="w-4 h-4" />}
                    {selectedStatus !== 'In Progress' && selectedStatus}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Due: {selectedTask.dueDate}
                  </span>
                </div>
              </div>
              
              {/* Modal Content */}
              <div className="p-6">
                {/* Description Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700">{selectedTask.description}</p>
                  </div>
                </div>
                
                {/* Update Status Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Update Status</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {statusOptions.map((option) => (
                      <div
                        key={option.key}
                        onClick={() => handleStatusChange(option.key)}
                        className={`${getStatusCardClass(option.key)} transition-all duration-200 hover:scale-105 cursor-pointer`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          {option.key === 'In Progress' && selectedStatus === 'In Progress' ? (
                            <div className="flex flex-col items-center gap-1">
                              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                              <span className="text-xs text-blue-500">Processing...</span>
                            </div>
                          ) : (
                            <option.icon className={`${getStatusIconClass(option.key)} transition-colors`} />
                          )}
                          <span className={`${getStatusTextClass(option.key)} transition-colors`}>
                            {option.label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Comments Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Comments</h3>
                  
                  {/* Empty State */}
                  <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg mb-4">
                    <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-900 font-medium mb-1">No comments yet</p>
                    <p className="text-gray-500">Be the first to comment on this task.</p>
                  </div>
                  
                  {/* Comment Input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <button
                      onClick={handleAddComment}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTasksPage;
import React, { useState } from 'react';
import { User, Calendar, Check, Eye, X, Send, MessageCircle, Clock, Loader, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';

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
    },
    {
      id: 2,
      task: 'Update Product Catalog',
      priority: 'high',
      status: 'In Progress',
      dueDate: 'Nov 10, 2025 2:00 PM',
      description: 'Update all product information and pricing',
      assignedTo: 'Manager'
    },
    {
      id: 3,
      task: 'Process Customer Returns',
      priority: 'medium',
      status: 'Pending',
      dueDate: 'Nov 8, 2025 11:00 AM',
      description: 'Handle all pending customer return requests',
      assignedTo: 'Employee'
    },
    {
      id: 4,
      task: 'Monthly Inventory Check',
      priority: 'high',
      status: 'Rejected',
      dueDate: 'Nov 5, 2025 4:00 PM',
      description: 'Conduct comprehensive inventory audit',
      assignedTo: 'Inventory Staff'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('Pending');
  const [comment, setComment] = useState('');
  const [newTaskForm, setNewTaskForm] = useState({
    task: '',
    priority: 'low',
    dueDate: '',
    description: '',
    assignedTo: 'Employee'
  });

  const getPriorityBadge = (priority) => {
    const priorityStyles = {
      low: 'bg-green-500/10 text-green-700 border border-green-500/20',
      medium: 'bg-yellow-500/10 text-yellow-700 border border-yellow-500/20',
      high: 'bg-red-500/10 text-red-700 border border-red-500/20'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityStyles[priority] || priorityStyles.low}`}>
        {priority}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      'Completed': 'bg-green-500/10 text-green-700 border border-green-500/20',
      'In Progress': 'bg-blue-500/10 text-blue-700 border border-blue-500/20',
      'Pending': 'bg-gray-500/10 text-gray-700 border border-gray-500/20',
      'Rejected': 'bg-red-500/10 text-red-700 border border-red-500/20'
    };
      
    const statusIcons = {
      'Pending': Clock,
      'In Progress': Loader,
      'Completed': Check,
      'Rejected': X
    };
      
    const IconComponent = statusIcons[status] || Clock;
      
    // Shorten "In Progress" to "Progress" to reduce button width
    const displayText = status === 'In Progress' ? 'Progress' : status;
      
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusStyles[status] || statusStyles['Pending']}`}>
        {status === 'In Progress' ? (
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span>Progress</span>
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
  
  const openNewTaskModal = () => {
    setShowNewTaskModal(true);
    // Reset form to default values
    setNewTaskForm({
      task: '',
      priority: 'low',
      dueDate: '',
      description: '',
      assignedTo: 'Employee'
    });
  };
  
  const closeNewTaskModal = () => {
    setShowNewTaskModal(false);
    setNewTaskForm({
      task: '',
      priority: 'low',
      dueDate: '',
      description: '',
      assignedTo: 'Employee'
    });
  };
  
  const handleNewTaskInputChange = (e) => {
    const { name, value } = e.target;
    setNewTaskForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleAddNewTask = () => {
    // Validate required fields
    if (!newTaskForm.task.trim() || !newTaskForm.dueDate) {
      alert('Please fill in all required fields (Task and Due Date)');
      return;
    }
  
    // Create new task object
    const newTask = {
      id: tasks.length + 1,
      task: newTaskForm.task,
      priority: newTaskForm.priority,
      status: 'Pending',
      dueDate: new Date(newTaskForm.dueDate).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      }),
      description: newTaskForm.description || 'No description provided',
      assignedTo: newTaskForm.assignedTo
    };
  
    // Add to tasks array
    setTasks(prevTasks => [...prevTasks, newTask]);
      
    // Close modal
    closeNewTaskModal();
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

  const getStatusCardClass = (status) => {
    const baseClass = 'p-4 rounded-xl border cursor-pointer transition-all hover:scale-105';
    if (status === selectedStatus) {
      if (status === 'Rejected') {
        return `${baseClass} border-red-500/30 bg-red-500/5 text-red-700 shadow-sm`;
      } else if (status === 'Completed') {
        return `${baseClass} border-green-500/30 bg-green-500/5 text-green-700 shadow-sm`;
      } else {
        return `${baseClass} border-blue-500/30 bg-blue-500/5 text-blue-700 shadow-sm`;
      }
    } else {
      return `${baseClass} border-border hover:bg-accent`;
    }
  };

  const getStatusTextClass = (status) => {
    if (status === selectedStatus) {
      if (status === 'Rejected') {
        return 'text-red-700 font-medium';
      } else if (status === 'Completed') {
        return 'text-green-700 font-medium';
      } else {
        return 'text-blue-700 font-medium';
      }
    } else {
      return 'text-foreground';
    }
  };

  const getStatusIconClass = (status) => {
    if (status === selectedStatus) {
      if (status === 'Rejected') {
        return 'text-red-500';
      } else if (status === 'Completed') {
        return 'text-green-500';
      } else {
        return 'text-blue-500';
      }
    } else {
      return 'text-muted-foreground';
    }
  };

  const statusOptions = [
    { key: 'Pending', label: 'Pending', icon: Clock },
    { key: 'In Progress', label: 'In Progress', icon: Loader },
    { key: 'Completed', label: 'Completed', icon: Check },
    { key: 'Rejected', label: 'Rejected', icon: X }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <div className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">My Tasks</h1>
              <p className="text-muted-foreground mt-1">Manage your assigned tasks</p>
            </div>
            <button 
              onClick={openNewTaskModal}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Task
            </button>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-card rounded-xl border">
        {/* Header Section */}
        <div className="p-6 border-b">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Section Header */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Check className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Tasks</h2>
                <p className="text-sm text-muted-foreground">Employee • {tasks.length} task{tasks.length !== 1 ? 's' : ''}</p>
              </div>
            </div>

            {/* Employee Button */}
            <button className="flex items-center gap-2 px-4 py-2 border border-input rounded-lg hover:bg-accent transition-colors">
              <User className="w-4 h-4" />
              Employee
            </button>
          </div>
        </div>

        {/* Tasks Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/60">
                <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Task
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider w-32">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {tasks.map((task, index) => (
                <tr 
                  key={task.id} 
                  className={cn(
                    "transition-all duration-200 hover:bg-muted/20",
                    index % 2 === 0 ? "bg-card" : "bg-muted/5"
                  )}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center border border-primary/10">
                        <Check className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-base">{task.task}</p>
                        <p className="text-xs text-muted-foreground mt-1">Task #{task.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      {getPriorityBadge(task.priority)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      {getStatusBadge(task.status)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-muted/50">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <span className="text-foreground font-medium">{task.dueDate}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => openTaskModal(task)}
                        className="p-2 rounded-lg hover:bg-primary/10 text-primary hover:text-primary-foreground transition-all duration-200 group"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Task Details Modal - SMALLER SIZE */}
      {showModal && selectedTask && (
        <div className="fixed inset-0 bg-[#2F190E80] z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-xl border shadow-2xl w-full max-w-lg flex flex-col max-h-[70vh] mt-auto mb-8">
            {/* Modal Header - MATCHING NEW LEAVE REQUEST FORM HEADER */}
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-b px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">{selectedTask.task}</h2>
                  <div className="flex items-center gap-1 mt-1">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Assigned to: {selectedTask.assignedTo}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={closeTaskModal}
                className="p-2 rounded-full hover:bg-accent transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal Content - COMPACT PADDING */}
            <div className="overflow-y-auto flex-1 p-4">
              {/* Status Info Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-green-500/10 text-green-700 border border-green-500/20 rounded-full text-sm font-medium">
                  Low Priority
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 border ${
                  selectedStatus === 'Pending' ? 'bg-gray-500/10 text-gray-700 border-gray-500/20' :
                  selectedStatus === 'In Progress' ? 'bg-blue-500/10 text-blue-700 border-blue-500/20' :
                  selectedStatus === 'Completed' ? 'bg-green-500/10 text-green-700 border-green-500/20' :
                  'bg-red-500/10 text-red-700 border-red-500/20'
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
                <span className="px-3 py-1 bg-muted/50 text-muted-foreground border border-border rounded-full text-sm font-medium flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Due: {selectedTask.dueDate}
                </span>
              </div>

              {/* Description Section */}
              <div className="bg-gradient-to-br from-card/50 to-card border rounded-xl p-4 mb-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <MessageCircle className="w-4 h-4 text-blue-500" />
                  </div>
                  <h3 className="font-semibold text-base text-foreground">Description</h3>
                </div>
                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="text-foreground">{selectedTask.description}</p>
                </div>
              </div>
              
              {/* Update Status Section */}
              <div className="bg-gradient-to-br from-card/50 to-card border rounded-xl p-4 mb-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Loader className="w-4 h-4 text-blue-500" />
                  </div>
                  <h3 className="font-semibold text-base text-foreground">Update Status</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {statusOptions.map((option) => (
                    <div
                      key={option.key}
                      onClick={() => handleStatusChange(option.key)}
                      className={`${getStatusCardClass(option.key)} transition-all duration-200`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        {option.key === 'In Progress' && selectedStatus === 'In Progress' ? (
                          <div className="flex flex-col items-center gap-1">
                            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-xs text-blue-500">Processing...</span>
                          </div>
                        ) : (
                          <option.icon className={`${getStatusIconClass(option.key)} transition-colors w-5 h-5`} />
                        )}
                        <span className={`${getStatusTextClass(option.key)} transition-colors text-sm`}>
                          {option.key === 'In Progress' ? 'Progress' : option.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Comments Section */}
              <div className="bg-gradient-to-br from-card/50 to-card border rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Send className="w-4 h-4 text-blue-500" />
                  </div>
                  <h3 className="font-semibold text-base text-foreground">Comments</h3>
                </div>
                
                {/* Empty State */}
                <div className="text-center py-8 border-2 border-dashed border-border rounded-lg mb-4">
                  <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-foreground font-medium mb-1">No comments yet</p>
                  <p className="text-muted-foreground">Be the first to comment on this task.</p>
                </div>
                
                {/* Comment Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  />
                  <button
                    onClick={handleAddComment}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
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

      {/* New Task Modal - SIMILAR TO ARRANGE REVIEW MEETING */}
      {showNewTaskModal && (
        <div className="fixed inset-0 bg-[#2F190E80] z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-xl border shadow-2xl w-full max-w-lg flex flex-col max-h-[80vh] mt-auto mb-8">
            {/* Modal Header - MATCHING HEADER STYLE */}
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-b px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Plus className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Create New Task</h2>
              </div>
              <button 
                onClick={closeNewTaskModal}
                className="p-2 rounded-full hover:bg-accent transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="overflow-y-auto flex-1 p-6">
              <div className="space-y-6">
                {/* Task Details Section */}
                <div className="bg-gradient-to-br from-card/50 to-card border rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <Check className="w-4 h-4 text-blue-500" />
                    </div>
                    <h3 className="font-semibold text-base text-foreground">Task Details</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">
                        Task Title *
                      </label>
                      <input
                        type="text"
                        name="task"
                        value={newTaskForm.task}
                        onChange={handleNewTaskInputChange}
                        placeholder="Enter task title"
                        className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-foreground">
                          Priority
                        </label>
                        <select
                          name="priority"
                          value={newTaskForm.priority}
                          onChange={handleNewTaskInputChange}
                          className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2 text-foreground">
                          Due Date *
                        </label>
                        <div className="relative">
                          <input
                            type="datetime-local"
                            name="dueDate"
                            value={newTaskForm.dueDate}
                            onChange={handleNewTaskInputChange}
                            className="w-full px-3 py-2.5 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all pr-10"
                            required
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground focus:outline-none"
                            onClick={() => {
                              const input = document.querySelector('input[name="dueDate"]');
                              if (input) {
                                input.showPicker();
                              }
                            }}
                            aria-label="Open date picker"
                          >
                            <Calendar className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={newTaskForm.description}
                        onChange={handleNewTaskInputChange}
                        placeholder="Enter task description..."
                        rows={3}
                        className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">
                        Assign To
                      </label>
                      <select
                        name="assignedTo"
                        value={newTaskForm.assignedTo}
                        onChange={handleNewTaskInputChange}
                        className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                      >
                        <option value="Employee">Employee</option>
                        <option value="Manager">Manager</option>
                        <option value="Team Lead">Team Lead</option>
                        <option value="HR">HR</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Status Preview */}
                <div className="bg-gradient-to-br from-card/50 to-card border rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-green-500/10">
                      <Loader className="w-4 h-4 text-green-500" />
                    </div>
                    <h3 className="font-semibold text-base text-foreground">Status Preview</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-500/10 text-gray-700 border border-gray-500/20 rounded-full text-sm font-medium flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Pending
                    </span>
                    <span className="px-3 py-1 bg-green-500/10 text-green-700 border border-green-500/20 rounded-full text-sm font-medium">
                      {getPriorityBadge(newTaskForm.priority)}
                    </span>
                    {newTaskForm.dueDate && (
                      <span className="px-3 py-1 bg-muted/50 text-muted-foreground border border-border rounded-full text-sm font-medium flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Due: {new Date(newTaskForm.dueDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric'
                        })}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-3 pt-4 border-t">
                <button 
                  type="button"
                  onClick={closeNewTaskModal}
                  className="px-4 py-2 rounded-lg border border-input hover:bg-accent transition-colors font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddNewTask}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium flex items-center gap-2 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Create Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTasksPage;
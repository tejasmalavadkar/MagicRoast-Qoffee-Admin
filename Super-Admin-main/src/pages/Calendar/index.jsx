import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addMonths, subMonths, addWeeks, subWeeks, addDays, parseISO, isSameDay, isWithinInterval, eachDayOfInterval, addHours, isFuture, isPast, addYears, subYears } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Plus, ChevronLeft, ChevronRight, X, Clock, MapPin, User, Users, Calendar, Eye, EyeOff, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { cn } from '../../lib/utils';

const DraggableEvent = ({ event, onEventClick, onUpdateEvent }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'event',
    item: { event },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;

  return (
    <div
      ref={drag}
      className="text-xs p-1 rounded text-white m-1 cursor-move hover:opacity-80"
      style={{ 
        backgroundColor: event.color,
        opacity
      }}
      onClick={() => onEventClick(event)}
    >
      <div className="font-medium truncate">{event.title}</div>
      <div>{event.startTime}</div>
    </div>
  );
};

const CalendarCell = ({ date, events, onDateClick, onEventClick, onUpdateEvent, currentViewDate }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'event',
    drop: (item) => {
      // Calculate new date based on the cell
      const newDate = new Date(date);
      const originalDate = new Date(`${item.event.startDate}T${item.event.startTime}`);
      
      // Update the event with the new date
      const updatedEvent = {
        ...item.event,
        startDate: format(newDate, 'yyyy-MM-dd'),
        endDate: format(newDate, 'yyyy-MM-dd'),
      };
      
      onUpdateEvent(updatedEvent);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const isToday = isSameDay(date, new Date());
  const monthStart = startOfMonth(currentViewDate);
  const isCurrentMonth = date.getMonth() === monthStart.getMonth() && date.getFullYear() === monthStart.getFullYear();
  const cellClasses = `min-h-24 p-1 border border-border ${isToday ? 'bg-primary/10 ring-2 ring-primary/30' : ''} ${!isCurrentMonth ? 'bg-muted/30 text-muted-foreground/50' : ''} ${isOver ? 'bg-primary/20' : ''}`;

  return (
    <div
      ref={drop}
      className={cellClasses}
      onClick={() => onDateClick(date)}
    >
      <div className="flex justify-between items-center mb-1">
        <span className={`text-sm font-medium ${isSameDay(date, new Date()) ? 'bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center' : ''} ${!isCurrentMonth ? 'opacity-60' : ''}`}>
          {format(date, 'd')}
        </span>
      </div>
      <div className="space-y-1 max-h-20 overflow-y-auto">
        {events.slice(0, 3).map((event, idx) => (
          <DraggableEvent
            key={`${event.id}-${idx}`}
            event={event}
            onEventClick={onEventClick}
            onUpdateEvent={onUpdateEvent}
          />
        ))}
        {events.length > 3 && (
          <div className="text-xs text-muted-foreground">+{events.length - 3} more</div>
        )}
      </div>
    </div>
  );
};

const WeekViewCell = ({ date, hour, events, onDateClick, onEventClick, onUpdateEvent }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'event',
    drop: (item) => {
      // Calculate new date and time based on the cell
      const newDate = new Date(date);
      const newHour = hour;
      
      // Update the event with the new date and time
      const updatedEvent = {
        ...item.event,
        startDate: format(newDate, 'yyyy-MM-dd'),
        endDate: format(newDate, 'yyyy-MM-dd'),
        startTime: `${String(newHour).padStart(2, '0')}:00`,
        endTime: `${String((newHour + 1) % 24).padStart(2, '0')}:00`, // Set end time to next hour
      };
      
      onUpdateEvent(updatedEvent);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const cellClasses = `p-1 min-h-12 border-r border-border ${isOver ? 'bg-primary/20' : ''}`;

  return (
    <div 
      ref={drop}
      className={cellClasses}
      onClick={() => onDateClick(date)}
    >
      {events.map(event => (
        <DraggableEvent
          key={event.id}
          event={event}
          onEventClick={onEventClick}
          onUpdateEvent={onUpdateEvent}
        />
      ))}
    </div>
  );
};

const AgendaViewItem = ({ event, onEventClick, onUpdateEvent }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'event',
    item: { event },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;

  return (
    <div 
      ref={drag}
      className="p-4 hover:bg-accent cursor-move border-b border-border last:border-b-0"
      style={{ opacity }}
      onClick={() => onEventClick(event)}
    >
      <div className="flex items-start">
        <div 
          className="w-3 h-3 rounded-full mr-3 mt-1.5 flex-shrink-0" 
          style={{ backgroundColor: event.color }}
        ></div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">{event.title}</h4>
            <span className="text-sm text-muted-foreground">
              {format(parseISO(`${event.startDate}T${event.startTime}`), 'MMM d, yyyy h:mm a')}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
          <div className="flex items-center mt-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-1" />
            <span>{event.startTime} - {event.endTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const CalendarPage = () => {
  const navigate = useNavigate();

  // State for calendar and events
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // month, week, day, agenda
  const [events, setEvents] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const initialEventForm = {
    title: '',
    type: 'meeting',
    startDate: '',
    endDate: '',
    startTime: '09:00',
    endTime: '10:00',
    description: '',
    color: '#3B82F6'
  };

  const [eventForm, setEventForm] = useState(initialEventForm);

  // Event types
  const eventTypes = [
    { value: 'shift', label: 'Employee Shift', color: '#10B981' },
    { value: 'leave', label: 'Leave', color: '#EF4444' },
    { value: 'holiday', label: 'Holiday', color: '#8B5CF6' },
    { value: 'meeting', label: 'Meeting', color: '#3B82F6' },
    { value: 'training', label: 'Training Session', color: '#F59E0B' },
    { value: 'event', label: 'Company Event', color: '#EC4899' },
  ];

  // Filter upcoming events for the panel
  const upcomingEvents = events
    .filter(event => {
      const eventDate = new Date(`${event.startDate}T${event.startTime}`);
      return isFuture(eventDate);
    })
    .sort((a, b) => {
      const dateA = new Date(`${a.startDate}T${a.startTime}`);
      const dateB = new Date(`${b.startDate}T${b.startTime}`);
      return dateA - dateB;
    })
    .slice(0, 5); // Limit to 5 upcoming events

  // Load events from localStorage on component mount
  useEffect(() => {
    const savedEvents = localStorage.getItem('personalCalendarEvents');
    if (savedEvents) {
      try {
        const parsedEvents = JSON.parse(savedEvents);
        // Convert date strings back to Date objects
        const eventsWithDates = parsedEvents.map(event => ({
          ...event,
          startDate: event.startDate,
          endDate: event.endDate
        }));
        setEvents(eventsWithDates);
      } catch (e) {
        console.error('Failed to parse saved events:', e);
      }
    } else {
      // Initialize with some sample personal events
      const sampleEvents = [
        {
          id: 1,
          title: 'Doctor Appointment',
          type: 'meeting',
          startDate: format(new Date(), 'yyyy-MM-dd'),
          endDate: format(new Date(), 'yyyy-MM-dd'),
          startTime: '14:00',
          endTime: '15:00',
          description: 'Annual health checkup',
          color: '#3B82F6'
        },
        {
          id: 2,
          title: 'Gym Session',
          type: 'training',
          startDate: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
          endDate: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
          startTime: '18:00',
          endTime: '19:00',
          description: 'Evening workout routine',
          color: '#10B981'
        },
        {
          id: 3,
          title: 'Family Dinner',
          type: 'event',
          startDate: format(addDays(new Date(), 3), 'yyyy-MM-dd'),
          endDate: format(addDays(new Date(), 3), 'yyyy-MM-dd'),
          startTime: '19:00',
          endTime: '21:00',
          description: 'Weekly family dinner',
          color: '#EC4899'
        }
      ];
      setEvents(sampleEvents);
      localStorage.setItem('personalCalendarEvents', JSON.stringify(sampleEvents));
    }
  }, []);

  // Save events to localStorage whenever events change
  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem('personalCalendarEvents', JSON.stringify(events));
    }
  }, [events]);

  // Navigation functions
  const goToToday = () => setCurrentDate(new Date());
  const goToPrevious = () => {
    if (view === 'month') setCurrentDate(subMonths(currentDate, 1));
    else if (view === 'week') setCurrentDate(subWeeks(currentDate, 1));
    else if (view === 'day') setCurrentDate(addDays(currentDate, -1));
    else setCurrentDate(addDays(currentDate, -7)); // For agenda view, go back a week
  };
  const goToNext = () => {
    if (view === 'month') setCurrentDate(addMonths(currentDate, 1));
    else if (view === 'week') setCurrentDate(addWeeks(currentDate, 1));
    else if (view === 'day') setCurrentDate(addDays(currentDate, 1));
    else setCurrentDate(addDays(currentDate, 7)); // For agenda view, go forward a week
  };

  // Modal functions
  const openCreateModal = (date) => {
    setSelectedDate(date);
    setSelectedEvent(null);
    setEventForm({
      title: '',
      type: 'meeting',
      startDate: format(date, 'yyyy-MM-dd'),
      endDate: format(date, 'yyyy-MM-dd'),
      startTime: '09:00',
      endTime: '10:00',
      description: '',
      color: '#3B82F6'
    });
    setShowEventModal(true);
  };

  const openEditModal = (event) => {
    setSelectedEvent(event);
    setEventForm({
      title: event.title,
      type: event.type,
      startDate: event.startDate,
      endDate: event.endDate,
      startTime: event.startTime,
      endTime: event.endTime,
      description: event.description,
      color: event.color
    });
    setShowEventModal(true);
  };

  const closeModal = () => {
    setShowEventModal(false);
    setSelectedEvent(null);
    setSelectedDate(null);
  };

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTypeChange = (type) => {
    const eventType = eventTypes.find(t => t.value === type);
    setEventForm(prev => ({
      ...prev,
      type,
      color: eventType?.color || '#3B82F6'
    }));
  };

  // Validation function for overlapping events
  const hasOverlappingEvent = (startDate, endDate, startTime, endTime, currentEventId = null) => {
    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);
    
    return events.some(event => {
      // Skip the current event being edited
      if (event.id === currentEventId) return false;
      
      const eventStartDateTime = new Date(`${event.startDate}T${event.startTime}`);
      const eventEndDateTime = new Date(`${event.endDate}T${event.endTime}`);
      
      // Check for time overlap
      return startDateTime < eventEndDateTime && endDateTime > eventStartDateTime;
    });
  };

  // Event CRUD operations
  const saveEvent = () => {
    // Validation checks
    if (!eventForm.title.trim()) {
      alert('Event title is required!');
      return;
    }
    
    if (!eventForm.startDate) {
      alert('Start date is required!');
      return;
    }
    
    // Parse start and end times
    const startDateTime = new Date(`${eventForm.startDate}T${eventForm.startTime}`);
    const endDateTime = new Date(`${eventForm.endDate || eventForm.startDate}T${eventForm.endTime}`);
    
    if (endDateTime <= startDateTime) {
      alert('End time must be after start time!');
      return;
    }
    
    // Check for overlapping events
    if (hasOverlappingEvent(
      eventForm.startDate, 
      eventForm.endDate || eventForm.startDate, 
      eventForm.startTime, 
      eventForm.endTime,
      selectedEvent?.id
    )) {
      alert('You have overlapping events during this time!');
      return;
    }

    let newEvent;
    if (selectedEvent) {
      // Update existing event
      newEvent = {
        ...selectedEvent,
        ...eventForm
      };
      setEvents(prev => prev.map(e => e.id === selectedEvent.id ? newEvent : e));
    } else {
      // Create new event
      newEvent = {
        id: Date.now(),
        ...eventForm
      };
      setEvents(prev => [...prev, newEvent]);
    }

    closeModal();
  };

  const deleteEvent = (eventId) => {
    const eventToDelete = events.find(e => e.id === eventId);
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(prev => prev.filter(e => e.id !== eventId));
      closeModal();
    }
  };

  // Helper functions
  const getEventsForDate = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return events.filter(event => 
      event.startDate === dateStr || 
      (event.startDate <= dateStr && event.endDate >= dateStr)
    );
  };

  // Calendar rendering functions
  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];

    let days = [];
    let day = startDate;

    while (day <= endDate) {
      const cloneDay = day;
      const dayEvents = getEventsForDate(day);
      
      days.push(
        <CalendarCell
          key={day.toString()}
          date={cloneDay}
          events={dayEvents}
          onDateClick={openCreateModal}
          onEventClick={openEditModal}
          onUpdateEvent={updateEvent}
          currentViewDate={currentDate}
        />
      );

      if (days.length === 7) {
        rows.push(
          <div key={day.toString()} className="grid grid-cols-7 gap-1">
            {days}
          </div>
        );
        days = [];
      }
      day = addDays(day, 1);
    }

    return (
      <div className="bg-card rounded-xl border">
        <div className="grid grid-cols-7 bg-muted/50 border-b">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-3 text-center text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        <div className="p-1">{rows}</div>
      </div>
    );
  };

  const renderWeekView = () => {
    const start = startOfWeek(currentDate);
    const end = endOfWeek(currentDate);
    const days = eachDayOfInterval({ start, end });

    return (
      <div className="bg-card rounded-xl border overflow-hidden">
        <div className="grid grid-cols-8 bg-muted/50 border-b">
          <div className="p-3"></div>
          {days.map(day => (
            <div key={day.toString()} className="p-3 text-center">
              <div className="text-sm font-medium text-muted-foreground">{format(day, 'EEE')}</div>
              <div className={`text-lg font-semibold mt-1 ${isSameDay(day, new Date()) ? 'bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mx-auto ring-2 ring-primary/30' : ''}`}>
                {format(day, 'd')}
              </div>
            </div>
          ))}
        </div>
        
        {/* Time slots */}
        <div className="overflow-y-auto max-h-96">
          {Array.from({ length: 24 }).map((_, hour) => (
            <div key={hour} className="grid grid-cols-8 border-b border-border">
              <div className="p-2 text-xs text-muted-foreground border-r border-border">
                {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
              </div>
              {days.map(day => {
                const dayEvents = getEventsForDate(day).filter(event => {
                  const eventHour = parseInt(event.startTime.split(':')[0]);
                  return eventHour === hour;
                });
                
                return (
                  <WeekViewCell
                    key={`${day.toString()}-${hour}`}
                    date={day}
                    hour={hour}
                    events={dayEvents}
                    onDateClick={openCreateModal}
                    onEventClick={openEditModal}
                    onUpdateEvent={updateEvent}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const dayEvents = events
      .filter(event => isSameDay(parseISO(event.startDate), currentDate))
      .sort((a, b) => {
        const timeA = parseInt(a.startTime.replace(':', ''));
        const timeB = parseInt(b.startTime.replace(':', ''));
        return timeA - timeB;
      });

    return (
      <div className="bg-card rounded-xl border overflow-hidden">
        <div className="p-4 border-b bg-muted/50">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            {format(currentDate, 'EEEE, MMMM d, yyyy')}
            {isSameDay(currentDate, new Date()) && (
              <span className="text-xs px-2 py-1 bg-primary text-primary-foreground rounded-full">
                Today
              </span>
            )}
          </h3>
        </div>
        
        <div className="p-4">
          <div className="space-y-2 max-h-[calc(100vh-250px)] overflow-y-auto">
            {Array.from({ length: 24 }).map((_, hour) => {
              const timeLabel = hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`;
              const hourEvents = dayEvents.filter(event => {
                const eventHour = parseInt(event.startTime.split(':')[0]);
                return eventHour === hour;
              });
              
              return (
                <div key={hour} className="flex border-b pb-2">
                  <div className="w-20 text-sm text-muted-foreground flex-shrink-0">
                    {timeLabel}
                  </div>
                  <div className="flex-1 ml-4">
                    {hourEvents.map(event => (
                      <div 
                        key={event.id}
                        className="mb-2 p-2 rounded text-white text-sm cursor-pointer hover:opacity-90"
                        style={{ backgroundColor: event.color }}
                        onClick={() => openEditModal(event)}
                      >
                        <div className="font-medium">{event.title}</div>
                        <div>{event.startTime} - {event.endTime}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            
            {dayEvents.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No events scheduled for today
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderAgendaView = () => {
    const sortedEvents = [...events].sort((a, b) => {
      const dateA = new Date(`${a.startDate}T${a.startTime}`);
      const dateB = new Date(`${b.startDate}T${b.startTime}`);
      return dateA - dateB;
    });

    return (
      <div className="bg-card rounded-xl border overflow-hidden">
        <div className="p-4 border-b bg-muted/50">
          <h3 className="text-lg font-semibold">Agenda View</h3>
        </div>
        <div>
          {sortedEvents.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">No events scheduled</div>
          ) : (
            sortedEvents.map(event => (
              <AgendaViewItem
                key={event.id}
                event={event}
                onEventClick={openEditModal}
                onUpdateEvent={updateEvent}
              />
            ))
          )}
        </div>
      </div>
    );
  };

  const updateEvent = (updatedEvent) => {
    // Validate overlapping events before updating
    if (hasOverlappingEvent(
      updatedEvent.startDate, 
      updatedEvent.endDate, 
      updatedEvent.startTime, 
      updatedEvent.endTime,
      updatedEvent.id
    )) {
      alert('You have overlapping events during this time!');
      return;
    }
    
    setEvents(prev => prev.map(e => e.id === updatedEvent.id ? updatedEvent : e));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <div className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">My Calendar</h1>
                <p className="text-muted-foreground mt-1">Manage your personal schedule</p>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Controls */}
        <div className="bg-card rounded-xl border p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-foreground">
                {view === 'month' ? format(currentDate, 'MMMM yyyy') :
                 view === 'week' ? `Week of ${format(startOfWeek(currentDate), 'MMM d')} - ${format(endOfWeek(currentDate), 'MMM d, yyyy')}` :
                 view === 'day' ? `Day: ${format(currentDate, 'EEEE, MMMM d, yyyy')}` :
                 `Agenda: ${format(startOfWeek(currentDate), 'MMM d')} - ${format(endOfWeek(addDays(currentDate, 6)), 'MMM d, yyyy')}`}
              </h2>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={goToPrevious}
                  className="p-2 rounded-lg border border-input hover:bg-accent transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={goToToday}
                  className="px-3 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Today
                </button>
                <button
                  onClick={goToNext}
                  className="p-2 rounded-lg border border-input hover:bg-accent transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setView('month')}
                className={`px-3 py-2 rounded-lg transition-colors ${view === 'month' ? 'bg-primary text-primary-foreground' : 'border border-input hover:bg-accent text-foreground'}`}
              >
                Month
              </button>
              <button
                onClick={() => setView('week')}
                className={`px-3 py-2 rounded-lg transition-colors ${view === 'week' ? 'bg-primary text-primary-foreground' : 'border border-input hover:bg-accent text-foreground'}`}
              >
                Week
              </button>
              <button
                onClick={() => setView('day')}
                className={`px-3 py-2 rounded-lg transition-colors ${view === 'day' ? 'bg-primary text-primary-foreground' : 'border border-input hover:bg-accent text-foreground'}`}
              >
                Day
              </button>
              <button
                onClick={() => setView('agenda')}
                className={`px-3 py-2 rounded-lg transition-colors ${view === 'agenda' ? 'bg-primary text-primary-foreground' : 'border border-input hover:bg-accent text-foreground'}`}
              >
                Agenda
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Views */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl border">
              {view === 'month' && renderMonthView()}
              {view === 'week' && renderWeekView()}
              {view === 'agenda' && renderAgendaView()}
              {view === 'day' && renderDayView()}
            </div>
          </div>
          
          {/* My Upcoming Events Panel */}
          <div className="bg-card rounded-xl border">
            <div className="p-6 border-b bg-muted/50">
              <h3 className="text-lg font-semibold">My Upcoming Events</h3>
            </div>
            <div className="p-6">
              {upcomingEvents.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No upcoming events
                </div>
              ) : (
                <div className="space-y-3">
                  {upcomingEvents.map(event => {
                    const eventDate = new Date(`${event.startDate}T${event.startTime}`);
                    return (
                      <div 
                        key={event.id}
                        className="p-3 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                        onClick={() => openEditModal(event)}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium">{event.title}</h4>
                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                              <Clock className="w-4 h-4 mr-1" />
                              <span>{format(eventDate, 'MMM d, yyyy h:mm a')}</span>
                            </div>
                          </div>
                          <Info className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Event Modal */}
        {showEventModal && (
          <div className="absolute inset-0 bg-[#2F190E80] z-50 flex items-center justify-center p-4">
            <div className="bg-card rounded-xl border shadow-2xl max-w-md w-full flex flex-col max-h-[70vh]">
              <div className="sticky top-0 bg-gradient-to-r from-primary/5 to-primary/10 border-b px-6 py-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">{selectedEvent ? 'Edit Event' : 'Create Event'}</h2>
                </div>
                <button onClick={closeModal} className="p-2 rounded-full hover:bg-accent transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="overflow-y-auto flex-1 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2 bg-gradient-to-br from-card/50 to-card border rounded-xl p-4 mb-4 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-blue-500/10">
                        <Calendar className="w-4 h-4 text-blue-500" />
                      </div>
                      <h3 className="font-semibold text-base text-foreground">Event Details</h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-foreground">Event Title *</label>
                        <div className="relative">
                          <input
                          type="text"
                          name="title"
                          value={eventForm.title}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                          placeholder="Enter event title"
                        />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1 text-foreground">Event Type</label>
                        <select
                          name="type"
                          value={eventForm.type}
                          onChange={(e) => handleTypeChange(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                        >
                          {eventTypes.map(type => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium mb-1 text-foreground">Start Date *</label>
                          <input
                            type="date"
                            name="startDate"
                            value={eventForm.startDate}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1 text-foreground">End Date</label>
                          <input
                            type="date"
                            name="endDate"
                            value={eventForm.endDate}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium mb-1 text-foreground">Start Time</label>
                          <input
                            type="time"
                            name="startTime"
                            value={eventForm.startTime}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1 text-foreground">End Time</label>
                          <input
                            type="time"
                            name="endTime"
                            value={eventForm.endTime}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1 text-foreground">Description</label>
                        <textarea
                          name="description"
                          value={eventForm.description}
                          onChange={handleInputChange}
                          rows={2}
                          className="w-full px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                          placeholder="Enter event description"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1 text-foreground">Event Color</label>
                        <div className="flex gap-2 flex-wrap">
                          {['#3B82F6', '#10B981', '#EF4444', '#8B5CF6', '#F59E0B', '#EC4899'].map(color => (
                            <button
                              key={color}
                              className={`w-6 h-6 rounded-full border transition-transform hover:scale-110 ${eventForm.color === color ? 'border-primary scale-110' : 'border-border'}`}
                              style={{ backgroundColor: color }}
                              onClick={() => setEventForm(prev => ({ ...prev, color }))}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end gap-2 pt-2 border-t">
                  <button onClick={closeModal} className="px-4 py-2 rounded-lg border border-input hover:bg-accent transition-colors font-medium text-sm">
                    Cancel
                  </button>
                  {selectedEvent && (
                    <button
                      onClick={() => deleteEvent(selectedEvent.id)}
                      className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors font-medium text-sm"
                    >
                      Delete
                    </button>
                  )}
                  <button
                    onClick={saveEvent}
                    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium flex items-center gap-2 text-sm"
                  >
                    {selectedEvent ? 'Update' : 'Save'} Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default CalendarPage;
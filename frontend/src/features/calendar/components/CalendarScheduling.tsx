import React, { useState } from 'react';

const CalendarScheduling: React.FC = () => {
    const [activeTab, setActiveTab] = useState('calendar');
    const [currentDate, setCurrentDate] = useState(new Date());

    const tabs = [
        { id: 'calendar', label: 'My Calendar', icon: '📅' },
        { id: 'meetings', label: 'Meeting Scheduler', icon: '🤝' },
        { id: 'events', label: 'Company Events', icon: '🎉' },
        { id: 'resources', label: 'Resource Booking', icon: '🏢' },
        { id: 'reminders', label: 'Reminders', icon: '⏰' }
    ];

    const mockEvents = [
        { id: 1, title: 'Team Standup', time: '09:00 AM', date: '2025-08-20', type: 'meeting', duration: '30 min' },
        { id: 2, title: 'Project Review', time: '02:00 PM', date: '2025-08-20', type: 'meeting', duration: '1 hour' },
        { id: 3, title: 'Company All-Hands', time: '10:00 AM', date: '2025-08-21', type: 'event', duration: '2 hours' },
        { id: 4, title: 'Client Presentation', time: '03:30 PM', date: '2025-08-22', type: 'meeting', duration: '45 min' }
    ];

    const mockMeetings = [
        { id: 1, title: 'Weekly Planning', organizer: 'John Doe', attendees: 5, date: '2025-08-25', time: '10:00 AM', room: 'Conference A' },
        { id: 2, title: 'Budget Review', organizer: 'Finance Team', attendees: 8, date: '2025-08-26', time: '02:00 PM', room: 'Boardroom' },
        { id: 3, title: 'Product Demo', organizer: 'Jane Smith', attendees: 12, date: '2025-08-27', time: '11:00 AM', room: 'Meeting Room 3' }
    ];

    const mockResources = [
        { id: 1, name: 'Conference Room A', capacity: 10, status: 'Available', nextBooking: '2:00 PM' },
        { id: 2, name: 'Boardroom', capacity: 20, status: 'Occupied', nextBooking: '4:00 PM' },
        { id: 3, name: 'Meeting Room 3', capacity: 6, status: 'Available', nextBooking: 'No bookings' },
        { id: 4, name: 'Training Room', capacity: 25, status: 'Maintenance', nextBooking: 'Tomorrow 9:00 AM' }
    ];

    const mockReminders = [
        { id: 1, title: 'Submit monthly report', dueDate: '2025-08-25', priority: 'High', type: 'Task' },
        { id: 2, title: 'Team performance reviews', dueDate: '2025-08-30', priority: 'Medium', type: 'Deadline' },
        { id: 3, title: 'Annual leave approval', dueDate: '2025-08-22', priority: 'Low', type: 'Reminder' }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Available': return 'bg-green-100 text-green-800';
            case 'Occupied': return 'bg-red-100 text-red-800';
            case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'High': return 'bg-red-100 text-red-800';
            case 'Medium': return 'bg-yellow-100 text-yellow-800';
            case 'Low': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'calendar':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-900">My Calendar</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                Add Event
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Calendar Widget */}
                            <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h4 className="text-lg font-semibold text-gray-900">
                                        {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                    </h4>
                                    <div className="flex space-x-2">
                                        <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">Previous</button>
                                        <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">Next</button>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-7 gap-1 mb-4">
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                        <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                                            {day}
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="grid grid-cols-7 gap-1">
                                    {Array.from({ length: 35 }, (_, i) => {
                                        const day = i - 6 + 1; // Simplified calendar grid
                                        const isToday = day === 20;
                                        const hasEvent = day === 20 || day === 21 || day === 22;
                                        
                                        return (
                                            <div
                                                key={i}
                                                className={`p-2 h-12 border border-gray-100 text-center text-sm cursor-pointer hover:bg-blue-50 ${
                                                    isToday ? 'bg-blue-600 text-white' : day > 0 && day <= 31 ? 'bg-white' : 'bg-gray-50 text-gray-400'
                                                } ${hasEvent ? 'border-blue-300' : ''}`}
                                            >
                                                {day > 0 && day <= 31 ? day : ''}
                                                {hasEvent && !isToday && (
                                                    <div className="w-1 h-1 bg-blue-600 rounded-full mx-auto mt-1"></div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            
                            {/* Upcoming Events */}
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h4 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h4>
                                <div className="space-y-3">
                                    {mockEvents.map((event) => (
                                        <div key={event.id} className="border-l-4 border-blue-400 pl-3 py-2">
                                            <h5 className="font-medium text-gray-900">{event.title}</h5>
                                            <p className="text-sm text-gray-600">{event.time} • {event.duration}</p>
                                            <p className="text-xs text-gray-500">{event.date}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'meetings':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-900">Meeting Scheduler</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                Schedule Meeting
                            </button>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <table className="min-w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Meeting</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Organizer</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendees</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Room</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {mockMeetings.map((meeting) => (
                                        <tr key={meeting.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{meeting.title}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{meeting.organizer}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{meeting.date} at {meeting.time}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{meeting.attendees} people</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{meeting.room}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button className="text-blue-600 hover:text-blue-800 mr-3">Join</button>
                                                <button className="text-gray-600 hover:text-gray-800">Edit</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            case 'resources':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-900">Resource Booking</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                Book Resource
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {mockResources.map((resource) => (
                                <div key={resource.id} className="bg-white border border-gray-200 rounded-lg p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <h4 className="font-semibold text-gray-900">{resource.name}</h4>
                                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(resource.status)}`}>
                                            {resource.status}
                                        </span>
                                    </div>
                                    <div className="space-y-2 mb-4">
                                        <p className="text-sm text-gray-600">Capacity: {resource.capacity} people</p>
                                        <p className="text-sm text-gray-600">Next available: {resource.nextBooking}</p>
                                    </div>
                                    <button 
                                        className={`w-full px-4 py-2 rounded-lg text-sm font-medium ${
                                            resource.status === 'Available' 
                                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                        disabled={resource.status !== 'Available'}
                                    >
                                        {resource.status === 'Available' ? 'Book Now' : 'Unavailable'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'reminders':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-900">Reminders & Tasks</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                Add Reminder
                            </button>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <table className="min-w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Task/Reminder</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {mockReminders.map((reminder) => (
                                        <tr key={reminder.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{reminder.title}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{reminder.dueDate}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(reminder.priority)}`}>
                                                    {reminder.priority}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{reminder.type}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button className="text-blue-600 hover:text-blue-800 mr-3">Complete</button>
                                                <button className="text-gray-600 hover:text-gray-800">Edit</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="text-center py-12">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {tabs.find(tab => tab.id === activeTab)?.label}
                        </h3>
                        <p className="text-gray-600">This feature is coming soon!</p>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-6">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Calendar & Scheduling</h1>
                        <p className="text-lg text-gray-600">Manage schedules, meetings, and company events</p>
                    </div>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-8 overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                                    activeTab === tab.id
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                <span>{tab.icon}</span>
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tab Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default CalendarScheduling;

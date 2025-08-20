import React, { useState } from 'react';

const ProjectManagement: React.FC = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const tabs = [
        { id: 'overview', label: 'Project Overview', icon: '📊' },
        { id: 'tasks', label: 'Task Management', icon: '✅' },
        { id: 'timeline', label: 'Project Timeline', icon: '📅' },
        { id: 'team', label: 'Team Collaboration', icon: '👥' },
        { id: 'files', label: 'File Management', icon: '📁' }
    ];

    const mockProjects = [
        { id: 1, name: 'Website Redesign', status: 'In Progress', progress: 65, deadline: '2025-09-15', team: 5 },
        { id: 2, name: 'Mobile App Development', status: 'Planning', progress: 20, deadline: '2025-10-30', team: 8 },
        { id: 3, name: 'Database Migration', status: 'Completed', progress: 100, deadline: '2025-08-01', team: 3 }
    ];

    const mockTasks = [
        { id: 1, title: 'Design Homepage Layout', project: 'Website Redesign', assignee: 'John Doe', priority: 'High', status: 'In Progress' },
        { id: 2, title: 'Set up Development Environment', project: 'Mobile App Development', assignee: 'Jane Smith', priority: 'Medium', status: 'Todo' },
        { id: 3, title: 'Data Backup Verification', project: 'Database Migration', assignee: 'Mike Johnson', priority: 'High', status: 'Completed' }
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Active Projects</h3>
                                    <span className="text-2xl font-bold text-blue-600">{mockProjects.filter(p => p.status !== 'Completed').length}</span>
                                </div>
                                <p className="text-gray-600">Projects currently in progress</p>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
                                    <span className="text-2xl font-bold text-green-600">{mockProjects.reduce((sum, p) => sum + p.team, 0)}</span>
                                </div>
                                <p className="text-gray-600">Total team members across projects</p>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Completion Rate</h3>
                                    <span className="text-2xl font-bold text-purple-600">
                                        {Math.round(mockProjects.reduce((sum, p) => sum + p.progress, 0) / mockProjects.length)}%
                                    </span>
                                </div>
                                <p className="text-gray-600">Average project progress</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Status</h3>
                            <div className="space-y-4">
                                {mockProjects.map((project) => (
                                    <div key={project.id} className="border border-gray-100 rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h4 className="font-medium text-gray-900">{project.name}</h4>
                                                <p className="text-sm text-gray-600">Deadline: {project.deadline}</p>
                                            </div>
                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {project.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1 mr-4">
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div 
                                                        className="bg-blue-600 h-2 rounded-full" 
                                                        style={{ width: `${project.progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <span className="text-sm text-gray-600">{project.progress}%</span>
                                            <span className="text-sm text-gray-500 ml-4">{project.team} members</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'tasks':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-900">Task Management</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                Add Task
                            </button>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <table className="min-w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Task</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assignee</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {mockTasks.map((task) => (
                                        <tr key={task.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{task.title}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{task.project}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{task.assignee}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs rounded-full ${
                                                    task.priority === 'High' ? 'bg-red-100 text-red-800' :
                                                    task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-green-100 text-green-800'
                                                }`}>
                                                    {task.priority}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs rounded-full ${
                                                    task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                    task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {task.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                                                <button className="text-gray-600 hover:text-gray-800">View</button>
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
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Management</h1>
                        <p className="text-lg text-gray-600">Plan, track, and collaborate on projects and tasks</p>
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

export default ProjectManagement;

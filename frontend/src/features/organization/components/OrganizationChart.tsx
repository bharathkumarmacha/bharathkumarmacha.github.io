import React, { useState } from 'react';

const OrganizationChart: React.FC = () => {
    const [activeTab, setActiveTab] = useState('chart');

    const tabs = [
        { id: 'chart', label: 'Org Chart', icon: '🏢' },
        { id: 'departments', label: 'Departments', icon: '🏬' },
        { id: 'hierarchy', label: 'Hierarchy', icon: '📊' }
    ];

    const mockOrgData = {
        ceo: {
            name: 'Sarah Johnson',
            position: 'Chief Executive Officer',
            department: 'Executive',
            email: 'sarah.johnson@company.com',
            phone: '+1-555-0101',
            reports: 4
        },
        departments: [
            {
                id: 1,
                name: 'Human Resources',
                head: 'John Smith',
                employees: 8,
                budget: '$450,000',
                location: 'Floor 2'
            },
            {
                id: 2,
                name: 'Finance & Accounting',
                head: 'Emily Davis',
                employees: 12,
                budget: '$380,000',
                location: 'Floor 3'
            },
            {
                id: 3,
                name: 'Engineering',
                head: 'Mike Chen',
                employees: 25,
                budget: '$1,200,000',
                location: 'Floor 4-5'
            },
            {
                id: 4,
                name: 'Sales & Marketing',
                head: 'Lisa Wilson',
                employees: 15,
                budget: '$650,000',
                location: 'Floor 1'
            }
        ],
        hierarchy: [
            {
                level: 1,
                title: 'C-Level Executives',
                positions: ['CEO', 'CTO', 'CFO', 'CMO'],
                count: 4
            },
            {
                level: 2,
                title: 'Vice Presidents',
                positions: ['VP Engineering', 'VP Sales', 'VP Operations'],
                count: 3
            },
            {
                level: 3,
                title: 'Directors',
                positions: ['HR Director', 'Finance Director', 'Product Director'],
                count: 6
            },
            {
                level: 4,
                title: 'Managers',
                positions: ['Team Leads', 'Project Managers', 'Department Managers'],
                count: 15
            },
            {
                level: 5,
                title: 'Individual Contributors',
                positions: ['Developers', 'Analysts', 'Specialists'],
                count: 42
            }
        ]
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'chart':
                return (
                    <div className="space-y-8">
                        <div className="text-center">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">Organization Structure</h3>
                            
                            {/* CEO Level */}
                            <div className="mb-8">
                                <div className="inline-block bg-blue-600 text-white px-6 py-4 rounded-lg shadow-lg">
                                    <div className="text-center">
                                        <h4 className="font-bold text-lg">{mockOrgData.ceo.name}</h4>
                                        <p className="text-blue-100">{mockOrgData.ceo.position}</p>
                                        <p className="text-blue-200 text-sm">{mockOrgData.ceo.reports} Direct Reports</p>
                                    </div>
                                </div>
                            </div>

                            {/* Department Heads Level */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                {mockOrgData.departments.map((dept) => (
                                    <div key={dept.id} className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                                                <span className="text-2xl">👤</span>
                                            </div>
                                            <h5 className="font-semibold text-gray-900">{dept.head}</h5>
                                            <p className="text-sm text-gray-600 mb-2">{dept.name}</p>
                                            <p className="text-xs text-gray-500">{dept.employees} employees</p>
                                        </div>
                                        
                                        {/* Connection line */}
                                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 w-px h-4 bg-gray-300"></div>
                                    </div>
                                ))}
                            </div>

                            {/* Visual Hierarchy Levels */}
                            <div className="space-y-4">
                                {mockOrgData.hierarchy.slice(1).map((level) => (
                                    <div key={level.level} className="flex items-center justify-center">
                                        <div className="bg-gray-50 border border-gray-200 rounded-lg px-6 py-3">
                                            <div className="text-center">
                                                <h6 className="font-medium text-gray-900">{level.title}</h6>
                                                <p className="text-sm text-gray-600">{level.count} positions</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">Company Statistics</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-600">70</div>
                                    <div className="text-sm text-gray-600">Total Employees</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-green-600">4</div>
                                    <div className="text-sm text-gray-600">Departments</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-purple-600">5</div>
                                    <div className="text-sm text-gray-600">Management Levels</div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'departments':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-900">Department Overview</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                Add Department
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {mockOrgData.departments.map((dept) => (
                                <div key={dept.id} className="bg-white border border-gray-200 rounded-lg p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <h4 className="font-semibold text-gray-900">{dept.name}</h4>
                                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                                            Active
                                        </span>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Department Head:</span>
                                            <span className="font-medium text-gray-900">{dept.head}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Team Size:</span>
                                            <span className="font-medium text-gray-900">{dept.employees} employees</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Annual Budget:</span>
                                            <span className="font-medium text-gray-900">{dept.budget}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Location:</span>
                                            <span className="font-medium text-gray-900">{dept.location}</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        <div className="flex space-x-2">
                                            <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700">
                                                View Team
                                            </button>
                                            <button className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">
                                                Edit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'hierarchy':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-900">Organizational Hierarchy</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                Update Structure
                            </button>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <table className="min-w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Level</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Positions</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Count</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {mockOrgData.hierarchy.map((level) => (
                                        <tr key={level.level} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                                                    {level.level}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{level.title}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{level.positions.join(', ')}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-900">{level.count}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
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
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Organization Chart</h1>
                        <p className="text-lg text-gray-600">Interactive company hierarchy and structure visualization</p>
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

export default OrganizationChart;

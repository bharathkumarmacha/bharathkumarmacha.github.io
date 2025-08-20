import React, { useState } from 'react';
import { useAppSelector } from '../../../hooks/redux';
import EmployeeDirectory from './EmployeeDirectory';

const HRDashboard: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'employees':
        return <EmployeeDirectory />;
      case 'leave':
        return (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Leave Management</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800">Leave management functionality will be available soon.</p>
            </div>
          </div>
        );
      case 'recruitment':
        return (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recruitment Dashboard</h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800">Recruitment management functionality will be available soon.</p>
            </div>
          </div>
        );
      case 'performance':
        return (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Performance Management</h3>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <p className="text-purple-800">Performance management functionality will be available soon.</p>
            </div>
          </div>
        );
      case 'policies':
        return (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Policies Management</h3>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-orange-800">Policies management functionality will be available soon.</p>
            </div>
          </div>
        );
      default:
        return <HROverview />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">HR Management</h2>
        <div className="flex space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Add Employee
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Generate Report
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'employees', label: 'Employee Directory', icon: '👥' },
            { id: 'leave', label: 'Leave Management', icon: '🏖️' },
            { id: 'recruitment', label: 'Recruitment', icon: '🔍' },
            { id: 'performance', label: 'Performance', icon: '⭐' },
            { id: 'policies', label: 'Policies', icon: '📋' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm">
        {renderContent()}
      </div>
    </div>
  );
};

// HR Overview Component
const HROverview: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">HR Overview</h2>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-2xl font-semibold text-gray-900">142</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">New Hires (This Month)</p>
              <p className="text-2xl font-semibold text-gray-900">8</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Leave Requests</p>
              <p className="text-2xl font-semibold text-gray-900">12</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Open Positions</p>
              <p className="text-2xl font-semibold text-gray-900">5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {[
              { action: 'New employee onboarded', name: 'Alice Johnson', time: '2 hours ago', type: 'success' },
              { action: 'Leave request approved', name: 'Bob Smith', time: '4 hours ago', type: 'info' },
              { action: 'Performance review scheduled', name: 'Carol Davis', time: '1 day ago', type: 'warning' },
              { action: 'Employee terminated', name: 'David Wilson', time: '2 days ago', type: 'error' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'info' ? 'bg-blue-500' :
                  activity.type === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.name} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Department Overview</h3>
          <div className="space-y-4">
            {[
              { dept: 'Engineering', count: 45, color: 'bg-blue-500' },
              { dept: 'Sales', count: 32, color: 'bg-green-500' },
              { dept: 'Marketing', count: 18, color: 'bg-purple-500' },
              { dept: 'HR', count: 8, color: 'bg-yellow-500' },
              { dept: 'Finance', count: 12, color: 'bg-red-500' },
              { dept: 'Operations', count: 27, color: 'bg-indigo-500' }
            ].map((dept, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${dept.color}`}></div>
                  <span className="font-medium text-gray-900">{dept.dept}</span>
                </div>
                <span className="text-sm font-semibold text-gray-600">{dept.count} employees</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Performance Management Component
const PerformanceManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Performance Management</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Upcoming Reviews</h3>
          <div className="space-y-3">
            {[
              { name: 'John Doe', department: 'Engineering', dueDate: '2024-03-15', status: 'pending' },
              { name: 'Jane Smith', department: 'Marketing', dueDate: '2024-03-18', status: 'scheduled' },
              { name: 'Mike Johnson', department: 'Sales', dueDate: '2024-03-20', status: 'overdue' }
            ].map((review, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{review.name}</p>
                  <p className="text-sm text-gray-500">{review.department}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-900">{review.dueDate}</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    review.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    review.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {review.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Average Performance Score</span>
              <span className="text-2xl font-bold text-green-600">4.2/5</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Reviews Completed</span>
              <span className="text-2xl font-bold text-blue-600">89%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Goal Achievement</span>
              <span className="text-2xl font-bold text-purple-600">76%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Policies Management Component
const PoliciesManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Company Policies</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Employee Handbook', updated: '2024-01-15', category: 'General' },
          { title: 'Code of Conduct', updated: '2024-02-01', category: 'Ethics' },
          { title: 'Leave Policy', updated: '2024-01-30', category: 'HR' },
          { title: 'Remote Work Policy', updated: '2024-02-10', category: 'Operations' },
          { title: 'Expense Policy', updated: '2024-01-20', category: 'Finance' },
          { title: 'IT Security Policy', updated: '2024-02-05', category: 'Security' }
        ].map((policy, index) => (
          <div key={index} className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-semibold text-gray-900">{policy.title}</h3>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {policy.category}
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-4">Last updated: {policy.updated}</p>
            <div className="flex space-x-2">
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                View
              </button>
              <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HRDashboard;

import React from 'react';
import { useAuth } from '../../context/AuthContext';

export const EmployeeSelfService: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Employee Self-Service</h1>
      
      {/* Profile Card */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">My Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <p className="text-gray-900">{user?.firstName} {user?.lastName}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <p className="text-gray-900">{user?.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <p className="text-gray-900 capitalize">{user?.role.replace('_', ' ')}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subscription</label>
            <p className="text-gray-900 capitalize">{user?.subscription.tier}</p>
          </div>
        </div>
        <div className="mt-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <div className="text-4xl mb-4">📅</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Request Leave</h3>
          <p className="text-gray-600 mb-4">Submit a new leave request</p>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Request Leave
          </button>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <div className="text-4xl mb-4">⏰</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">View Attendance</h3>
          <p className="text-gray-600 mb-4">Check your attendance records</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            View Records
          </button>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <div className="text-4xl mb-4">💰</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Payslips</h3>
          <p className="text-gray-600 mb-4">Download your payslips</p>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
            Download
          </button>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 rounded-full p-2">
                <span className="text-green-600">✓</span>
              </div>
              <div>
                <p className="text-gray-900">Leave request approved</p>
                <p className="text-sm text-gray-500">2 days ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 rounded-full p-2">
                <span className="text-blue-600">📄</span>
              </div>
              <div>
                <p className="text-gray-900">Payslip generated</p>
                <p className="text-sm text-gray-500">1 week ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-100 rounded-full p-2">
                <span className="text-yellow-600">⏰</span>
              </div>
              <div>
                <p className="text-gray-900">Attendance marked</p>
                <p className="text-sm text-gray-500">Today</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

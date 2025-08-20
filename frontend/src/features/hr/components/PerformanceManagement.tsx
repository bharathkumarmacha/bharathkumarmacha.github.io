import React, { useState } from 'react';
import { useAppSelector } from '../../../hooks/redux';

interface PerformanceReview {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  period: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  overallRating: number;
  goals: Goal[];
  reviewDate: string;
  nextReviewDate: string;
}

interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'performance' | 'development' | 'behavioral';
  status: 'not-started' | 'in-progress' | 'achieved' | 'exceeded';
  progress: number;
  targetDate: string;
}

interface Competency {
  id: string;
  name: string;
  description: string;
  level: number;
  maxLevel: number;
}

// Mock data
const mockPerformanceReviews: PerformanceReview[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    employeeName: 'John Doe',
    department: 'Engineering',
    period: 'Q1 2024',
    status: 'completed',
    overallRating: 4.2,
    goals: [
      {
        id: '1',
        title: 'Complete React Migration',
        description: 'Migrate legacy application to React',
        category: 'performance',
        status: 'achieved',
        progress: 100,
        targetDate: '2024-03-31'
      },
      {
        id: '2',
        title: 'Mentorship Skills',
        description: 'Mentor 2 junior developers',
        category: 'development',
        status: 'in-progress',
        progress: 75,
        targetDate: '2024-06-30'
      }
    ],
    reviewDate: '2024-03-15',
    nextReviewDate: '2024-06-15'
  },
  {
    id: '2',
    employeeId: 'EMP002',
    employeeName: 'Jane Smith',
    department: 'Marketing',
    period: 'Q1 2024',
    status: 'pending',
    overallRating: 0,
    goals: [
      {
        id: '3',
        title: 'Lead Generation Campaign',
        description: 'Increase leads by 25%',
        category: 'performance',
        status: 'in-progress',
        progress: 60,
        targetDate: '2024-03-31'
      }
    ],
    reviewDate: '',
    nextReviewDate: '2024-03-20'
  }
];

const mockCompetencies: Competency[] = [
  { id: '1', name: 'Technical Skills', description: 'Proficiency in job-related technical skills', level: 4, maxLevel: 5 },
  { id: '2', name: 'Communication', description: 'Effective verbal and written communication', level: 3, maxLevel: 5 },
  { id: '3', name: 'Leadership', description: 'Ability to lead and influence others', level: 3, maxLevel: 5 },
  { id: '4', name: 'Problem Solving', description: 'Analytical thinking and problem resolution', level: 4, maxLevel: 5 },
  { id: '5', name: 'Teamwork', description: 'Collaboration and team participation', level: 5, maxLevel: 5 }
];

const PerformanceManagement: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('reviews');
  const [selectedReview, setSelectedReview] = useState<PerformanceReview | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'achieved': return 'bg-green-100 text-green-800';
      case 'exceeded': return 'bg-emerald-100 text-emerald-800';
      case 'not-started': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getGoalCategoryIcon = (category: string) => {
    switch (category) {
      case 'performance': return '🎯';
      case 'development': return '📚';
      case 'behavioral': return '🤝';
      default: return '📋';
    }
  };

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-2 text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const renderCompetencyLevel = (level: number, maxLevel: number) => {
    return (
      <div className="flex items-center space-x-2">
        <div className="flex space-x-1">
          {Array.from({ length: maxLevel }, (_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i < level ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600">{level}/{maxLevel}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Performance Management</h2>
        <div className="flex space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            New Review Cycle
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Bulk Actions
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'reviews', label: 'Performance Reviews', icon: '📊' },
            { id: 'goals', label: 'Goals & OKRs', icon: '🎯' },
            { id: 'competencies', label: 'Competencies', icon: '💡' },
            { id: 'analytics', label: 'Analytics', icon: '📈' }
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

      {/* Performance Reviews Tab */}
      {activeTab === 'reviews' && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {mockPerformanceReviews.filter(r => r.status === 'completed').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {mockPerformanceReviews.filter(r => r.status === 'in-progress').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.667-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {mockPerformanceReviews.filter(r => r.status === 'pending').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-3 bg-red-100 rounded-lg">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Overdue</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {mockPerformanceReviews.filter(r => r.status === 'overdue').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Table */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Period
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Next Review
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockPerformanceReviews.map((review) => (
                    <tr key={review.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                              {review.employeeName.split(' ').map(n => n[0]).join('')}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{review.employeeName}</div>
                            <div className="text-sm text-gray-500">{review.department}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {review.period}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(review.status)}`}>
                          {review.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {review.overallRating > 0 ? renderStarRating(review.overallRating) : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {review.nextReviewDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          onClick={() => setSelectedReview(review)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          View Details
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          Start Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Goals & OKRs Tab */}
      {activeTab === 'goals' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockPerformanceReviews.map((review) => (
              <div key={review.id} className="bg-white border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{review.employeeName}</h3>
                    <p className="text-sm text-gray-600">{review.department} • {review.period}</p>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(review.status)}`}>
                    {review.status}
                  </span>
                </div>

                <div className="space-y-3">
                  {review.goals.map((goal) => (
                    <div key={goal.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{getGoalCategoryIcon(goal.category)}</span>
                          <h4 className="font-medium text-gray-900">{goal.title}</h4>
                        </div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(goal.status)}`}>
                          {goal.status}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{goal.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex-1 mr-4">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{goal.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${goal.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          Due: {goal.targetDate}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Competencies Tab */}
      {activeTab === 'competencies' && (
        <div className="space-y-6">
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-6">Core Competencies Framework</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockCompetencies.map((competency) => (
                <div key={competency.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">{competency.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{competency.description}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Current Level</span>
                      <span>Level {competency.level} of {competency.maxLevel}</span>
                    </div>
                    {renderCompetencyLevel(competency.level, competency.maxLevel)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Average Rating by Department</h3>
              <div className="space-y-3">
                {[
                  { dept: 'Engineering', rating: 4.2, count: 12 },
                  { dept: 'Marketing', rating: 3.8, count: 8 },
                  { dept: 'Sales', rating: 4.0, count: 15 },
                  { dept: 'HR', rating: 4.1, count: 5 }
                ].map((data, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{data.dept}</p>
                      <p className="text-sm text-gray-500">{data.count} employees</p>
                    </div>
                    <div className="text-right">
                      {renderStarRating(data.rating)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Goal Achievement Rate</h3>
              <div className="space-y-3">
                {[
                  { category: 'Performance Goals', rate: 85 },
                  { category: 'Development Goals', rate: 72 },
                  { category: 'Behavioral Goals', rate: 91 }
                ].map((data, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-900">{data.category}</span>
                      <span className="text-gray-600">{data.rate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${data.rate}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Review Status Distribution</h3>
              <div className="space-y-3">
                {[
                  { status: 'Completed', count: 45, color: 'bg-green-500' },
                  { status: 'In Progress', count: 12, color: 'bg-blue-500' },
                  { status: 'Pending', count: 8, color: 'bg-yellow-500' },
                  { status: 'Overdue', count: 3, color: 'bg-red-500' }
                ].map((data, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${data.color}`}></div>
                      <span className="font-medium text-gray-900">{data.status}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-600">{data.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceManagement;

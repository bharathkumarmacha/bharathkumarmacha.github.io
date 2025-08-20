import React, { useState } from 'react';
import { useAppSelector } from '../../../hooks/redux';

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'intern';
  level: 'entry' | 'mid' | 'senior' | 'executive';
  postedDate: string;
  applications: number;
  status: 'open' | 'closed' | 'on-hold';
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  position: string;
  status: 'applied' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  appliedDate: string;
  experience: string;
  skills: string[];
}

// Mock data
const mockJobPostings: JobPosting[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'full-time',
    level: 'senior',
    postedDate: '2024-02-01',
    applications: 45,
    status: 'open'
  },
  {
    id: '2',
    title: 'Marketing Manager',
    department: 'Marketing',
    location: 'New York',
    type: 'full-time',
    level: 'mid',
    postedDate: '2024-02-10',
    applications: 23,
    status: 'open'
  },
  {
    id: '3',
    title: 'Data Analyst Intern',
    department: 'Analytics',
    location: 'San Francisco',
    type: 'intern',
    level: 'entry',
    postedDate: '2024-01-15',
    applications: 78,
    status: 'closed'
  }
];

const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@email.com',
    position: 'Senior Software Engineer',
    status: 'interview',
    appliedDate: '2024-02-05',
    experience: '5 years',
    skills: ['React', 'Node.js', 'Python', 'AWS']
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@email.com',
    position: 'Marketing Manager',
    status: 'screening',
    appliedDate: '2024-02-12',
    experience: '3 years',
    skills: ['Digital Marketing', 'Analytics', 'Content Strategy']
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol@email.com',
    position: 'Senior Software Engineer',
    status: 'offer',
    appliedDate: '2024-02-03',
    experience: '7 years',
    skills: ['JavaScript', 'React', 'GraphQL', 'Docker']
  }
];

const RecruitmentDashboard: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-red-100 text-red-800';
      case 'on-hold': return 'bg-yellow-100 text-yellow-800';
      case 'applied': return 'bg-blue-100 text-blue-800';
      case 'screening': return 'bg-purple-100 text-purple-800';
      case 'interview': return 'bg-orange-100 text-orange-800';
      case 'offer': return 'bg-green-100 text-green-800';
      case 'hired': return 'bg-emerald-100 text-emerald-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'full-time': return '👔';
      case 'part-time': return '⏰';
      case 'contract': return '📝';
      case 'intern': return '🎓';
      default: return '💼';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Recruitment Dashboard</h2>
        <div className="flex space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Post New Job
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Import Candidates
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'jobs', label: 'Job Postings', icon: '💼' },
            { id: 'candidates', label: 'Candidates', icon: '👥' },
            { id: 'pipeline', label: 'Pipeline', icon: '🔄' }
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

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Open Positions</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {mockJobPostings.filter(job => job.status === 'open').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Applications</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {mockJobPostings.reduce((sum, job) => sum + job.applications, 0)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">In Interview</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {mockCandidates.filter(c => c.status === 'interview').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Offers Extended</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {mockCandidates.filter(c => c.status === 'offer').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Applications</h3>
              <div className="space-y-3">
                {mockCandidates.slice(0, 5).map((candidate) => (
                  <div key={candidate.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{candidate.name}</p>
                      <p className="text-sm text-gray-500">{candidate.position}</p>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(candidate.status)}`}>
                      {candidate.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold mb-4">Hiring Pipeline</h3>
              <div className="space-y-3">
                {[
                  { stage: 'Applied', count: 146, color: 'bg-blue-500' },
                  { stage: 'Screening', count: 34, color: 'bg-purple-500' },
                  { stage: 'Interview', count: 12, color: 'bg-orange-500' },
                  { stage: 'Offer', count: 3, color: 'bg-green-500' },
                  { stage: 'Hired', count: 8, color: 'bg-emerald-500' }
                ].map((stage, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${stage.color}`}></div>
                      <span className="font-medium text-gray-900">{stage.stage}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-600">{stage.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Job Postings Tab */}
      {activeTab === 'jobs' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockJobPostings.map((job) => (
              <div key={job.id} className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{job.title}</h3>
                    <p className="text-sm text-gray-600">{job.department} • {job.location}</p>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(job.status)}`}>
                    {job.status}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <span className="text-lg">{getTypeIcon(job.type)}</span>
                    <span className="text-sm text-gray-600 capitalize">{job.type}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-lg">📈</span>
                    <span className="text-sm text-gray-600 capitalize">{job.level}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Applications</p>
                    <p className="font-semibold text-gray-900">{job.applications}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Posted</p>
                    <p className="font-semibold text-gray-900">{job.postedDate}</p>
                  </div>
                </div>

                <div className="mt-4 flex space-x-2">
                  <button 
                    onClick={() => setSelectedJob(job)}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 flex-1"
                  >
                    View Details
                  </button>
                  <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Candidates Tab */}
      {activeTab === 'candidates' && (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Candidate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Experience
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockCandidates.map((candidate) => (
                  <tr key={candidate.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-medium">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                          <div className="text-sm text-gray-500">{candidate.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {candidate.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {candidate.experience}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(candidate.status)}`}>
                        {candidate.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {candidate.appliedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-4">
                        View Profile
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        Schedule Interview
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pipeline Tab */}
      {activeTab === 'pipeline' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-6">Recruitment Pipeline</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { stage: 'Applied', candidates: mockCandidates.filter(c => c.status === 'applied'), color: 'bg-blue-100 border-blue-300' },
                { stage: 'Screening', candidates: mockCandidates.filter(c => c.status === 'screening'), color: 'bg-purple-100 border-purple-300' },
                { stage: 'Interview', candidates: mockCandidates.filter(c => c.status === 'interview'), color: 'bg-orange-100 border-orange-300' },
                { stage: 'Offer', candidates: mockCandidates.filter(c => c.status === 'offer'), color: 'bg-green-100 border-green-300' },
                { stage: 'Hired', candidates: mockCandidates.filter(c => c.status === 'hired'), color: 'bg-emerald-100 border-emerald-300' }
              ].map((column) => (
                <div key={column.stage} className={`border-2 border-dashed rounded-lg p-4 ${column.color}`}>
                  <h4 className="font-semibold text-gray-900 mb-3">{column.stage} ({column.candidates.length})</h4>
                  <div className="space-y-2">
                    {column.candidates.map((candidate) => (
                      <div key={candidate.id} className="bg-white p-3 rounded shadow-sm">
                        <p className="font-medium text-sm text-gray-900">{candidate.name}</p>
                        <p className="text-xs text-gray-500">{candidate.position}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruitmentDashboard;

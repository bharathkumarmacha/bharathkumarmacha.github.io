import React, { useState } from 'react';
import { useAppSelector } from '../../../hooks/redux';

interface Policy {
  id: string;
  title: string;
  category: 'hr' | 'it' | 'finance' | 'compliance' | 'general';
  description: string;
  lastUpdated: string;
  version: string;
  status: 'active' | 'draft' | 'archived';
  approvedBy: string;
  effectiveDate: string;
  documentUrl?: string;
}

interface PolicyAcknowledgment {
  id: string;
  policyId: string;
  employeeId: string;
  employeeName: string;
  acknowledgedDate: string;
  status: 'pending' | 'acknowledged' | 'overdue';
}

// Mock data
const mockPolicies: Policy[] = [
  {
    id: '1',
    title: 'Remote Work Policy',
    category: 'hr',
    description: 'Guidelines and procedures for remote work arrangements, including eligibility, equipment, and performance expectations.',
    lastUpdated: '2024-02-15',
    version: '2.1',
    status: 'active',
    approvedBy: 'HR Director',
    effectiveDate: '2024-03-01'
  },
  {
    id: '2',
    title: 'Code of Conduct',
    category: 'compliance',
    description: 'Ethical standards and behavioral expectations for all employees, including anti-harassment and anti-discrimination policies.',
    lastUpdated: '2024-01-10',
    version: '3.0',
    status: 'active',
    approvedBy: 'CEO',
    effectiveDate: '2024-01-15'
  },
  {
    id: '3',
    title: 'Information Security Policy',
    category: 'it',
    description: 'Data protection, password requirements, and cybersecurity best practices for all employees.',
    lastUpdated: '2024-02-20',
    version: '1.5',
    status: 'active',
    approvedBy: 'CTO',
    effectiveDate: '2024-02-25'
  },
  {
    id: '4',
    title: 'Expense Reimbursement Policy',
    category: 'finance',
    description: 'Procedures for submitting, approving, and processing employee expense reimbursements.',
    lastUpdated: '2024-01-30',
    version: '2.0',
    status: 'active',
    approvedBy: 'CFO',
    effectiveDate: '2024-02-01'
  },
  {
    id: '5',
    title: 'Social Media Guidelines',
    category: 'general',
    description: 'Guidelines for employee use of social media in relation to company business and brand representation.',
    lastUpdated: '2023-12-15',
    version: '1.2',
    status: 'draft',
    approvedBy: 'Marketing Director',
    effectiveDate: '2024-03-15'
  }
];

const mockAcknowledgments: PolicyAcknowledgment[] = [
  {
    id: '1',
    policyId: '1',
    employeeId: 'EMP001',
    employeeName: 'John Doe',
    acknowledgedDate: '2024-03-02',
    status: 'acknowledged'
  },
  {
    id: '2',
    policyId: '2',
    employeeId: 'EMP002',
    employeeName: 'Jane Smith',
    acknowledgedDate: '',
    status: 'pending'
  },
  {
    id: '3',
    policyId: '3',
    employeeId: 'EMP003',
    employeeName: 'Bob Johnson',
    acknowledgedDate: '',
    status: 'overdue'
  }
];

const Policies: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('policies');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'hr': return 'bg-blue-100 text-blue-800';
      case 'it': return 'bg-purple-100 text-purple-800';
      case 'finance': return 'bg-green-100 text-green-800';
      case 'compliance': return 'bg-red-100 text-red-800';
      case 'general': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      case 'acknowledged': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'hr': return '👥';
      case 'it': return '💻';
      case 'finance': return '💰';
      case 'compliance': return '⚖️';
      case 'general': return '📋';
      default: return '📄';
    }
  };

  const filteredPolicies = selectedCategory === 'all' 
    ? mockPolicies 
    : mockPolicies.filter(policy => policy.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Policies & Procedures</h2>
        <div className="flex space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Create Policy
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Bulk Upload
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'policies', label: 'All Policies', icon: '📋' },
            { id: 'acknowledgments', label: 'Acknowledgments', icon: '✅' },
            { id: 'compliance', label: 'Compliance Tracking', icon: '📊' },
            { id: 'templates', label: 'Templates', icon: '📝' }
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

      {/* Policies Tab */}
      {activeTab === 'policies' && (
        <div className="space-y-6">
          {/* Category Filter */}
          <div className="flex space-x-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Categories
            </button>
            {['hr', 'it', 'finance', 'compliance', 'general'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors capitalize ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {getCategoryIcon(category)} {category}
              </button>
            ))}
          </div>

          {/* Policies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPolicies.map((policy) => (
              <div key={policy.id} className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{getCategoryIcon(policy.category)}</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(policy.category)}`}>
                      {policy.category}
                    </span>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(policy.status)}`}>
                    {policy.status}
                  </span>
                </div>

                <h3 className="font-semibold text-gray-900 mb-2">{policy.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{policy.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Version:</span>
                    <span className="font-medium text-gray-900">{policy.version}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Last Updated:</span>
                    <span className="font-medium text-gray-900">{policy.lastUpdated}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Effective Date:</span>
                    <span className="font-medium text-gray-900">{policy.effectiveDate}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button 
                    onClick={() => setSelectedPolicy(policy)}
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

      {/* Acknowledgments Tab */}
      {activeTab === 'acknowledgments' && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Acknowledged</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {mockAcknowledgments.filter(a => a.status === 'acknowledged').length}
                  </p>
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
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {mockAcknowledgments.filter(a => a.status === 'pending').length}
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
                    {mockAcknowledgments.filter(a => a.status === 'overdue').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Acknowledgments Table */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Policy
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acknowledged Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockAcknowledgments.map((acknowledgment) => {
                    const policy = mockPolicies.find(p => p.id === acknowledgment.policyId);
                    return (
                      <tr key={acknowledgment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium">
                                {acknowledgment.employeeName.split(' ').map(n => n[0]).join('')}
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{acknowledgment.employeeName}</div>
                              <div className="text-sm text-gray-500">{acknowledgment.employeeId}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{policy?.title}</div>
                          <div className="text-sm text-gray-500">Version {policy?.version}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(acknowledgment.status)}`}>
                            {acknowledgment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {acknowledgment.acknowledgedDate || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-4">
                            Send Reminder
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            Mark Complete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Compliance Tracking Tab */}
      {activeTab === 'compliance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Compliance by Category</h3>
              <div className="space-y-4">
                {[
                  { category: 'HR Policies', total: 45, compliant: 42, percentage: 93 },
                  { category: 'IT Security', total: 45, compliant: 38, percentage: 84 },
                  { category: 'Finance', total: 45, compliant: 45, percentage: 100 },
                  { category: 'Compliance', total: 45, compliant: 40, percentage: 89 }
                ].map((data, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-900">{data.category}</span>
                      <span className="text-gray-600">{data.compliant}/{data.total} ({data.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          data.percentage >= 95 ? 'bg-green-600' :
                          data.percentage >= 80 ? 'bg-yellow-600' : 'bg-red-600'
                        }`}
                        style={{ width: `${data.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Policy Updates</h3>
              <div className="space-y-3">
                {mockPolicies
                  .filter(p => p.status === 'active')
                  .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
                  .slice(0, 5)
                  .map((policy) => (
                    <div key={policy.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{policy.title}</p>
                        <p className="text-sm text-gray-500">Updated {policy.lastUpdated}</p>
                      </div>
                      <span className="text-sm text-blue-600 font-medium">v{policy.version}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'HR Policy Template', description: 'Standard template for HR-related policies', icon: '👥' },
              { name: 'IT Security Template', description: 'Template for information security policies', icon: '🔒' },
              { name: 'Code of Conduct Template', description: 'Template for ethical and behavioral guidelines', icon: '⚖️' },
              { name: 'Financial Policy Template', description: 'Template for finance and accounting policies', icon: '💰' },
              { name: 'Safety Policy Template', description: 'Template for workplace safety policies', icon: '🦺' },
              { name: 'Remote Work Template', description: 'Template for remote work arrangements', icon: '🏠' }
            ].map((template, index) => (
              <div key={index} className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl">{template.icon}</span>
                  <h3 className="font-semibold text-gray-900">{template.name}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                <div className="flex space-x-2">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 flex-1">
                    Use Template
                  </button>
                  <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700">
                    Preview
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Policies;

import React, { useState } from 'react';

const DocumentManagement: React.FC = () => {
    const [activeTab, setActiveTab] = useState('library');

    const tabs = [
        { id: 'library', label: 'Document Library', icon: '📚' },
        { id: 'shared', label: 'Shared Documents', icon: '🤝' },
        { id: 'templates', label: 'Document Templates', icon: '📝' },
        { id: 'approval', label: 'Approval Workflow', icon: '✅' },
        { id: 'archive', label: 'Document Archive', icon: '🗄️' }
    ];

    const mockDocuments = [
        { id: 1, name: 'Employee Handbook 2025.pdf', type: 'PDF', size: '2.5 MB', modified: '2025-08-15', owner: 'HR Team', status: 'Published' },
        { id: 2, name: 'Project Proposal Template.docx', type: 'Word', size: '1.2 MB', modified: '2025-08-10', owner: 'John Doe', status: 'Draft' },
        { id: 3, name: 'Financial Report Q2.xlsx', type: 'Excel', size: '3.8 MB', modified: '2025-07-30', owner: 'Finance Team', status: 'Under Review' }
    ];

    const mockShared = [
        { id: 1, name: 'Marketing Strategy 2025.pdf', sharedBy: 'Jane Smith', sharedWith: 'Marketing Team', date: '2025-08-12', permissions: 'Read Only' },
        { id: 2, name: 'Budget Allocation.xlsx', sharedBy: 'Finance Team', sharedWith: 'All Departments', date: '2025-08-08', permissions: 'Edit' },
        { id: 3, name: 'Meeting Notes.docx', sharedBy: 'Mike Johnson', sharedWith: 'Project Team', date: '2025-08-05', permissions: 'Comment' }
    ];

    const mockTemplates = [
        { id: 1, name: 'Invoice Template', category: 'Finance', downloads: 45, lastUsed: '2025-08-14' },
        { id: 2, name: 'Meeting Minutes Template', category: 'General', downloads: 78, lastUsed: '2025-08-12' },
        { id: 3, name: 'Employee Evaluation Form', category: 'HR', downloads: 23, lastUsed: '2025-08-10' },
        { id: 4, name: 'Project Charter Template', category: 'Projects', downloads: 34, lastUsed: '2025-08-08' }
    ];

    const mockApprovals = [
        { id: 1, document: 'Company Policy Update', requestedBy: 'HR Team', status: 'Pending', daysWaiting: 3, approvers: ['CEO', 'Legal'] },
        { id: 2, document: 'Budget Request 2025', requestedBy: 'Finance Team', status: 'Approved', daysWaiting: 0, approvers: ['CFO'] },
        { id: 3, document: 'New Hire Contract', requestedBy: 'John Doe', status: 'Rejected', daysWaiting: 7, approvers: ['HR Manager', 'Legal'] }
    ];

    const getFileIcon = (type: string) => {
        switch (type.toLowerCase()) {
            case 'pdf': return '📄';
            case 'word': return '📝';
            case 'excel': return '📊';
            case 'powerpoint': return '📽️';
            default: return '📁';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Published': return 'bg-green-100 text-green-800';
            case 'Draft': return 'bg-yellow-100 text-yellow-800';
            case 'Under Review': return 'bg-blue-100 text-blue-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Approved': return 'bg-green-100 text-green-800';
            case 'Rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'library':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-900">Document Library</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                Upload Document
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Total Documents</h4>
                                <p className="text-3xl font-bold text-blue-600">{mockDocuments.length}</p>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Shared Documents</h4>
                                <p className="text-3xl font-bold text-green-600">{mockShared.length}</p>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Storage Used</h4>
                                <p className="text-3xl font-bold text-purple-600">8.5 GB</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <table className="min-w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Document</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Owner</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {mockDocuments.map((doc) => (
                                        <tr key={doc.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <span className="text-lg mr-3">{getFileIcon(doc.type)}</span>
                                                    <span className="font-medium text-gray-900">{doc.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{doc.type}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{doc.size}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{doc.owner}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(doc.status)}`}>
                                                    {doc.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button className="text-blue-600 hover:text-blue-800 mr-3">Download</button>
                                                <button className="text-gray-600 hover:text-gray-800">Share</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            case 'templates':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-900">Document Templates</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                Create Template
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {mockTemplates.map((template) => (
                                <div key={template.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                    <div className="flex items-start justify-between mb-4">
                                        <h4 className="font-semibold text-gray-900">{template.name}</h4>
                                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                                            {template.category}
                                        </span>
                                    </div>
                                    <div className="space-y-2 mb-4">
                                        <p className="text-sm text-gray-600">Downloads: {template.downloads}</p>
                                        <p className="text-sm text-gray-600">Last used: {template.lastUsed}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700">
                                            Use Template
                                        </button>
                                        <button className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">
                                            Preview
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'approval':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-900">Document Approval Workflow</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                Submit for Approval
                            </button>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <table className="min-w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Document</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Requested By</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Days Waiting</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Approvers</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {mockApprovals.map((approval) => (
                                        <tr key={approval.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{approval.document}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{approval.requestedBy}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(approval.status)}`}>
                                                    {approval.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{approval.daysWaiting} days</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{approval.approvers.join(', ')}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                                                <button className="text-gray-600 hover:text-gray-800">Track</button>
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
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Management</h1>
                        <p className="text-lg text-gray-600">Centralized document storage, sharing, and collaboration</p>
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

export default DocumentManagement;

import React, { useState } from 'react';

const CRMDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState('customers');

    const tabs = [
        { id: 'customers', label: 'Customer Database', icon: '👥' },
        { id: 'leads', label: 'Lead Management', icon: '🎯' },
        { id: 'opportunities', label: 'Sales Pipeline', icon: '💼' },
        { id: 'communications', label: 'Communications', icon: '📧' },
        { id: 'reports', label: 'Sales Reports', icon: '📊' }
    ];

    const mockCustomers = [
        { id: 1, name: 'Acme Corp', contact: 'John Smith', status: 'Active', value: '$50,000' },
        { id: 2, name: 'Tech Solutions', contact: 'Jane Doe', status: 'Prospect', value: '$75,000' },
        { id: 3, name: 'Global Industries', contact: 'Mike Johnson', status: 'Active', value: '$120,000' }
    ];

    const mockLeads = [
        { id: 1, company: 'StartupXYZ', contact: 'Alice Brown', source: 'Website', status: 'New', score: 85 },
        { id: 2, company: 'Enterprise Ltd', contact: 'Bob Wilson', source: 'Referral', status: 'Qualified', score: 92 },
        { id: 3, company: 'Local Business', contact: 'Carol Davis', source: 'Cold Call', status: 'Contacted', score: 67 }
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'customers':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-900">Customer Database</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                Add Customer
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {mockCustomers.map((customer) => (
                                        <tr key={customer.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{customer.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{customer.contact}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs rounded-full ${
                                                    customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {customer.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">{customer.value}</td>
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

            case 'leads':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-900">Lead Management</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                Add Lead
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {mockLeads.map((lead) => (
                                <div key={lead.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-4">
                                        <h4 className="font-semibold text-gray-900">{lead.company}</h4>
                                        <span className={`px-2 py-1 text-xs rounded-full ${
                                            lead.status === 'Qualified' ? 'bg-green-100 text-green-800' :
                                            lead.status === 'New' ? 'bg-blue-100 text-blue-800' :
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {lead.status}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 mb-2">Contact: {lead.contact}</p>
                                    <p className="text-gray-600 mb-3">Source: {lead.source}</p>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <span className="text-sm text-gray-500 mr-2">Score:</span>
                                            <div className="w-12 h-2 bg-gray-200 rounded-full">
                                                <div 
                                                    className="h-2 bg-blue-600 rounded-full" 
                                                    style={{ width: `${lead.score}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-sm text-gray-600 ml-2">{lead.score}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
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
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Relationship Management</h1>
                        <p className="text-lg text-gray-600">Manage your customer relationships and sales pipeline</p>
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

export default CRMDashboard;

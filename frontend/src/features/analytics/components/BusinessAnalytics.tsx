import React, { useState } from 'react';

const BusinessAnalytics: React.FC = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    const tabs = [
        { id: 'dashboard', label: 'Analytics Dashboard', icon: '📊' },
        { id: 'kpi', label: 'KPI Tracking', icon: '🎯' },
        { id: 'reports', label: 'Custom Reports', icon: '📋' },
        { id: 'forecasting', label: 'Forecasting', icon: '🔮' },
        { id: 'insights', label: 'AI Insights', icon: '🧠' }
    ];

    const mockKPIs = [
        { id: 1, name: 'Revenue Growth', current: 15.8, target: 20, trend: 'up', period: 'Monthly' },
        { id: 2, name: 'Customer Satisfaction', current: 87.5, target: 90, trend: 'up', period: 'Weekly' },
        { id: 3, name: 'Employee Productivity', current: 92.3, target: 85, trend: 'up', period: 'Daily' },
        { id: 4, name: 'Cost Reduction', current: 12.5, target: 15, trend: 'down', period: 'Quarterly' }
    ];

    const mockReports = [
        { id: 1, name: 'Sales Performance Report', type: 'Automated', lastRun: '2025-08-20', frequency: 'Daily' },
        { id: 2, name: 'Employee Engagement Survey', type: 'Custom', lastRun: '2025-08-15', frequency: 'Monthly' },
        { id: 3, name: 'Financial Summary', type: 'Automated', lastRun: '2025-08-19', frequency: 'Weekly' },
        { id: 4, name: 'Project Status Dashboard', type: 'Custom', lastRun: '2025-08-18', frequency: 'Bi-weekly' }
    ];

    const mockInsights = [
        { id: 1, title: 'Sales Trend Analysis', description: 'Q3 sales showing 23% increase compared to Q2', impact: 'High', category: 'Revenue' },
        { id: 2, title: 'Employee Retention Alert', description: 'Turnover rate in engineering dept increased by 5%', impact: 'Medium', category: 'HR' },
        { id: 3, title: 'Cost Optimization Opportunity', description: 'Potential 18% savings identified in operational costs', impact: 'High', category: 'Finance' },
        { id: 4, title: 'Customer Behavior Pattern', description: 'Mobile usage increased by 45% in the last quarter', impact: 'Low', category: 'Customer' }
    ];

    const getTrendIcon = (trend: string) => {
        return trend === 'up' ? '📈' : '📉';
    };

    const getTrendColor = (trend: string) => {
        return trend === 'up' ? 'text-green-600' : 'text-red-600';
    };

    const getImpactColor = (impact: string) => {
        switch (impact) {
            case 'High': return 'bg-red-100 text-red-800';
            case 'Medium': return 'bg-yellow-100 text-yellow-800';
            case 'Low': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Total Revenue</h4>
                                <p className="text-3xl font-bold text-green-600">$2.4M</p>
                                <p className="text-sm text-gray-600">+15.8% from last month</p>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Active Users</h4>
                                <p className="text-3xl font-bold text-blue-600">12,458</p>
                                <p className="text-sm text-gray-600">+8.2% from last week</p>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Conversion Rate</h4>
                                <p className="text-3xl font-bold text-purple-600">3.24%</p>
                                <p className="text-sm text-gray-600">+0.5% from yesterday</p>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Customer LTV</h4>
                                <p className="text-3xl font-bold text-orange-600">$1,250</p>
                                <p className="text-sm text-gray-600">+12.3% from last quarter</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h4 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h4>
                                <div className="h-64 flex items-end justify-center space-x-2">
                                    {[65, 78, 82, 95, 88, 92, 100].map((height, index) => (
                                        <div
                                            key={index}
                                            className="bg-blue-500 rounded-t"
                                            style={{ height: `${height}%`, width: '30px' }}
                                        ></div>
                                    ))}
                                </div>
                                <div className="flex justify-between mt-2 text-sm text-gray-600">
                                    <span>Jan</span>
                                    <span>Feb</span>
                                    <span>Mar</span>
                                    <span>Apr</span>
                                    <span>May</span>
                                    <span>Jun</span>
                                    <span>Jul</span>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h4 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Metrics</h4>
                                <div className="space-y-4">
                                    {mockKPIs.slice(0, 3).map((kpi) => (
                                        <div key={kpi.id} className="flex items-center justify-between">
                                            <div>
                                                <h5 className="font-medium text-gray-900">{kpi.name}</h5>
                                                <p className="text-sm text-gray-600">{kpi.period} tracking</p>
                                            </div>
                                            <div className="text-right">
                                                <p className={`font-bold ${getTrendColor(kpi.trend)}`}>
                                                    {kpi.current}% {getTrendIcon(kpi.trend)}
                                                </p>
                                                <p className="text-sm text-gray-600">Target: {kpi.target}%</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'kpi':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-900">KPI Tracking</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                Add KPI
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {mockKPIs.map((kpi) => (
                                <div key={kpi.id} className="bg-white border border-gray-200 rounded-lg p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <h4 className="font-semibold text-gray-900">{kpi.name}</h4>
                                        <span className={`px-2 py-1 text-xs rounded-full ${kpi.current >= kpi.target ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {kpi.period}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-2xl font-bold text-gray-900">{kpi.current}%</span>
                                            <span className={`text-lg ${getTrendColor(kpi.trend)}`}>
                                                {getTrendIcon(kpi.trend)}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-blue-600 h-2 rounded-full" 
                                                style={{ width: `${Math.min((kpi.current / kpi.target) * 100, 100)}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">Target: {kpi.target}%</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'reports':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-900">Custom Reports</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                Create Report
                            </button>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <table className="min-w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Report Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Run</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Frequency</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {mockReports.map((report) => (
                                        <tr key={report.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{report.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs rounded-full ${
                                                    report.type === 'Automated' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                                }`}>
                                                    {report.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{report.lastRun}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{report.frequency}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button className="text-blue-600 hover:text-blue-800 mr-3">Run</button>
                                                <button className="text-gray-600 hover:text-gray-800">Download</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            case 'insights':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-900">AI-Powered Insights</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                Generate Insights
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {mockInsights.map((insight) => (
                                <div key={insight.id} className="bg-white border border-gray-200 rounded-lg p-6">
                                    <div className="flex justify-between items-start mb-3">
                                        <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                                        <span className={`px-2 py-1 text-xs rounded-full ${getImpactColor(insight.impact)}`}>
                                            {insight.impact} Impact
                                        </span>
                                    </div>
                                    <p className="text-gray-600 mb-3">{insight.description}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-500">Category: {insight.category}</span>
                                        <button className="text-blue-600 hover:text-blue-800 text-sm">View Details</button>
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
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Analytics</h1>
                        <p className="text-lg text-gray-600">Comprehensive business intelligence and data analytics</p>
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

export default BusinessAnalytics;

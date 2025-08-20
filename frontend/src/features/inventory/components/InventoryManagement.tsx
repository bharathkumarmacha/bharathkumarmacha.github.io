import React, { useState } from 'react';

const InventoryManagement: React.FC = () => {
    const [activeTab, setActiveTab] = useState('stock');

    const tabs = [
        { id: 'stock', label: 'Stock Levels', icon: '📊' },
        { id: 'products', label: 'Product Catalog', icon: '🏷️' },
        { id: 'suppliers', label: 'Supplier Management', icon: '🏭' },
        { id: 'orders', label: 'Purchase Orders', icon: '📝' },
        { id: 'reports', label: 'Inventory Reports', icon: '📈' }
    ];

    const mockInventory = [
        { id: 1, name: 'Office Chairs', sku: 'OFC-001', current: 25, minimum: 10, maximum: 50, status: 'In Stock' },
        { id: 2, name: 'Laptops', sku: 'LAP-002', current: 5, minimum: 10, maximum: 30, status: 'Low Stock' },
        { id: 3, name: 'Desk Lamps', sku: 'DSK-003', current: 0, minimum: 5, maximum: 25, status: 'Out of Stock' }
    ];

    const mockSuppliers = [
        { id: 1, name: 'Office Supplies Inc', contact: 'supplier1@example.com', phone: '+1-555-0101', status: 'Active', orders: 15 },
        { id: 2, name: 'Tech Hardware Ltd', contact: 'supplier2@example.com', phone: '+1-555-0102', status: 'Active', orders: 8 },
        { id: 3, name: 'Furniture World', contact: 'supplier3@example.com', phone: '+1-555-0103', status: 'Inactive', orders: 3 }
    ];

    const mockOrders = [
        { id: 1, orderNumber: 'PO-2025-001', supplier: 'Office Supplies Inc', date: '2025-08-15', status: 'Pending', total: '$2,500' },
        { id: 2, orderNumber: 'PO-2025-002', supplier: 'Tech Hardware Ltd', date: '2025-08-10', status: 'Delivered', total: '$15,000' },
        { id: 3, orderNumber: 'PO-2025-003', supplier: 'Furniture World', date: '2025-08-05', status: 'Processing', total: '$8,750' }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'In Stock': return 'bg-green-100 text-green-800';
            case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
            case 'Out of Stock': return 'bg-red-100 text-red-800';
            case 'Active': return 'bg-green-100 text-green-800';
            case 'Inactive': return 'bg-gray-100 text-gray-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Processing': return 'bg-blue-100 text-blue-800';
            case 'Delivered': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'stock':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-900">Stock Levels</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                Add Item
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Total Items</h4>
                                <p className="text-3xl font-bold text-blue-600">{mockInventory.length}</p>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Low Stock Items</h4>
                                <p className="text-3xl font-bold text-yellow-600">
                                    {mockInventory.filter(item => item.status === 'Low Stock' || item.status === 'Out of Stock').length}
                                </p>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">Total Value</h4>
                                <p className="text-3xl font-bold text-green-600">$125,450</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <table className="min-w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Stock</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Min/Max</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {mockInventory.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{item.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{item.sku}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-900">{item.current}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{item.minimum} / {item.maximum}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(item.status)}`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button className="text-blue-600 hover:text-blue-800 mr-3">Reorder</button>
                                                <button className="text-gray-600 hover:text-gray-800">Edit</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            case 'suppliers':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-900">Supplier Management</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                Add Supplier
                            </button>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <table className="min-w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supplier Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {mockSuppliers.map((supplier) => (
                                        <tr key={supplier.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{supplier.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{supplier.contact}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{supplier.phone}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-900">{supplier.orders}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(supplier.status)}`}>
                                                    {supplier.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button className="text-blue-600 hover:text-blue-800 mr-3">Contact</button>
                                                <button className="text-gray-600 hover:text-gray-800">Edit</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            case 'orders':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-900">Purchase Orders</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                Create Order
                            </button>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <table className="min-w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order Number</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supplier</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {mockOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{order.orderNumber}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{order.supplier}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{order.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">{order.total}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </td>
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
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Inventory Management</h1>
                        <p className="text-lg text-gray-600">Track stock levels, manage suppliers, and handle procurement</p>
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

export default InventoryManagement;

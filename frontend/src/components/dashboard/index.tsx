import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { AuthService } from '../../services/authService';

// Enhanced dashboard with role-based features and sub-modules
const dashboardFeatures = [
  {
    id: 'hr',
    title: 'HR Management',
    description: 'Comprehensive HR operations and employee management',
    icon: '👥',
    path: '/hr',
    gradient: 'from-blue-500 to-blue-600',
    requiredRoles: ['admin', 'hr_manager'],
    requiredSubscription: 'pro',
    features: ['employee_management'],
    subModules: [
      { id: 'overview', title: 'HR Overview', path: '/hr', icon: '📊' },
      { id: 'employees', title: 'Employee Directory', path: '/hr?tab=employees', icon: '👥' },
      { id: 'leave', title: 'Leave Management', path: '/hr?tab=leave', icon: '🏖️' },
      { id: 'recruitment', title: 'Recruitment', path: '/hr?tab=recruitment', icon: '🎯' },
      { id: 'performance', title: 'Performance', path: '/hr?tab=performance', icon: '📈' },
      { id: 'policies', title: 'Policies', path: '/hr?tab=policies', icon: '📋' }
    ]
  },
  {
    id: 'finance',
    title: 'Finance & Accounting',
    description: 'Complete financial management and reporting suite',
    icon: '💰',
    path: '/finance',
    gradient: 'from-green-500 to-green-600',
    requiredRoles: ['admin', 'finance'],
    requiredSubscription: 'pro',
    features: ['invoice_management'],
    subModules: [
      { id: 'overview', title: 'Finance Overview', path: '/finance', icon: '📊' },
      { id: 'invoices', title: 'Invoice Management', path: '/finance?tab=invoices', icon: '📄' },
      { id: 'expenses', title: 'Expense Management', path: '/finance?tab=expenses', icon: '💳' },
      { id: 'budgets', title: 'Budget Tracking', path: '/finance?tab=budgets', icon: '💰' },
      { id: 'reports', title: 'Financial Reports', path: '/finance?tab=reports', icon: '📈' }
    ]
  },
  {
    id: 'employee',
    title: 'Employee Self-Service',
    description: 'Personal portal for employee information and requests',
    icon: '👤',
    path: '/employee',
    gradient: 'from-purple-500 to-purple-600',
    requiredRoles: ['admin', 'hr_manager', 'employee', 'finance'],
    requiredSubscription: 'free',
    features: ['self_service'],
    subModules: [
      { id: 'profile', title: 'My Profile', path: '/employee?tab=profile', icon: '👤' },
      { id: 'leave', title: 'Leave Requests', path: '/employee?tab=leave', icon: '🏖️' },
      { id: 'attendance', title: 'Attendance', path: '/employee?tab=attendance', icon: '⏰' },
      { id: 'documents', title: 'Documents', path: '/employee?tab=documents', icon: '📁' },
      { id: 'payroll', title: 'Payroll Info', path: '/employee?tab=payroll', icon: '💰' }
    ]
  },
  {
    id: 'organization',
    title: 'Organization Chart',
    description: 'Interactive company hierarchy and structure visualization',
    icon: '🏢',
    path: '/organization',
    gradient: 'from-indigo-500 to-indigo-600',
    requiredRoles: ['admin', 'hr_manager'],
    requiredSubscription: 'enterprise',
    features: ['organization_chart'],
    subModules: [
      { id: 'chart', title: 'Org Chart', path: '/organization', icon: '🏢' },
      { id: 'departments', title: 'Departments', path: '/organization?tab=departments', icon: '🏬' },
      { id: 'hierarchy', title: 'Hierarchy', path: '/organization?tab=hierarchy', icon: '📊' }
    ]
  },
  {
    id: 'chatbot',
    title: 'AI Assistant',
    description: 'Intelligent AI-powered business assistant',
    icon: '🤖',
    path: '/chatbot',
    gradient: 'from-cyan-500 to-cyan-600',
    requiredRoles: ['admin', 'hr_manager', 'employee', 'finance'],
    requiredSubscription: 'pro',
    features: ['chatbot_access'],
    subModules: [
      { id: 'chat', title: 'Chat Interface', path: '/chatbot', icon: '💬' },
      { id: 'history', title: 'Chat History', path: '/chatbot?tab=history', icon: '📝' }
    ]
  },
  {
    id: 'subscription',
    title: 'Subscription & Billing',
    description: 'Manage subscription plans and billing information',
    icon: '⚙️',
    path: '/subscription',
    gradient: 'from-gray-500 to-gray-600',
    requiredRoles: ['admin', 'hr_manager', 'employee', 'finance'],
    requiredSubscription: 'free',
    features: [],
    subModules: [
      { id: 'plans', title: 'Subscription Plans', path: '/subscription', icon: '💎' },
      { id: 'billing', title: 'Billing History', path: '/subscription?tab=billing', icon: '💳' },
      { id: 'usage', title: 'Usage Analytics', path: '/subscription?tab=usage', icon: '📊' }
    ]
  },
  {
    id: 'crm',
    title: 'Customer Management',
    description: 'Manage customer relationships, leads, and sales pipeline',
    icon: '🤝',
    path: '/crm',
    gradient: 'from-rose-500 to-pink-600',
    requiredRoles: ['admin', 'hr_manager'],
    requiredSubscription: 'pro',
    features: ['crm_access'],
    subModules: [
      { id: 'customers', title: 'Customer Database', path: '/crm?tab=customers', icon: '👥' },
      { id: 'leads', title: 'Lead Management', path: '/crm?tab=leads', icon: '🎯' },
      { id: 'opportunities', title: 'Sales Pipeline', path: '/crm?tab=opportunities', icon: '💼' },
      { id: 'communications', title: 'Communications', path: '/crm?tab=communications', icon: '📧' },
      { id: 'reports', title: 'Sales Reports', path: '/crm?tab=reports', icon: '📊' }
    ]
  },
  {
    id: 'projects',
    title: 'Project Management',
    description: 'Plan, track, and collaborate on projects and tasks',
    icon: '📋',
    path: '/projects',
    gradient: 'from-teal-500 to-green-600',
    requiredRoles: ['admin', 'hr_manager', 'employee'],
    requiredSubscription: 'pro',
    features: ['project_management'],
    subModules: [
      { id: 'overview', title: 'Project Overview', path: '/projects', icon: '📊' },
      { id: 'tasks', title: 'Task Management', path: '/projects?tab=tasks', icon: '✅' },
      { id: 'timeline', title: 'Project Timeline', path: '/projects?tab=timeline', icon: '📅' },
      { id: 'team', title: 'Team Collaboration', path: '/projects?tab=team', icon: '👥' },
      { id: 'files', title: 'File Management', path: '/projects?tab=files', icon: '📁' }
    ]
  },
  {
    id: 'inventory',
    title: 'Inventory Management',
    description: 'Track stock levels, manage suppliers, and handle procurement',
    icon: '📦',
    path: '/inventory',
    gradient: 'from-amber-500 to-orange-600',
    requiredRoles: ['admin', 'finance'],
    requiredSubscription: 'pro',
    features: ['inventory_management'],
    subModules: [
      { id: 'stock', title: 'Stock Levels', path: '/inventory?tab=stock', icon: '📊' },
      { id: 'products', title: 'Product Catalog', path: '/inventory?tab=products', icon: '🏷️' },
      { id: 'suppliers', title: 'Supplier Management', path: '/inventory?tab=suppliers', icon: '🏭' },
      { id: 'orders', title: 'Purchase Orders', path: '/inventory?tab=orders', icon: '📝' },
      { id: 'reports', title: 'Inventory Reports', path: '/inventory?tab=reports', icon: '📈' }
    ]
  },
  {
    id: 'analytics',
    title: 'Business Analytics',
    description: 'Comprehensive business intelligence and data analytics',
    icon: '📈',
    path: '/analytics',
    gradient: 'from-violet-500 to-purple-600',
    requiredRoles: ['admin', 'hr_manager', 'finance'],
    requiredSubscription: 'enterprise',
    features: ['analytics_access'],
    subModules: [
      { id: 'dashboard', title: 'Analytics Dashboard', path: '/analytics', icon: '📊' },
      { id: 'kpi', title: 'KPI Tracking', path: '/analytics?tab=kpi', icon: '🎯' },
      { id: 'reports', title: 'Custom Reports', path: '/analytics?tab=reports', icon: '📋' },
      { id: 'forecasting', title: 'Forecasting', path: '/analytics?tab=forecasting', icon: '🔮' },
      { id: 'insights', title: 'AI Insights', path: '/analytics?tab=insights', icon: '🧠' }
    ]
  },
  {
    id: 'documents',
    title: 'Document Management',
    description: 'Centralized document storage, sharing, and collaboration',
    icon: '📄',
    path: '/documents',
    gradient: 'from-slate-500 to-gray-600',
    requiredRoles: ['admin', 'hr_manager', 'employee', 'finance'],
    requiredSubscription: 'free',
    features: ['document_management'],
    subModules: [
      { id: 'library', title: 'Document Library', path: '/documents', icon: '📚' },
      { id: 'shared', title: 'Shared Documents', path: '/documents?tab=shared', icon: '🤝' },
      { id: 'templates', title: 'Document Templates', path: '/documents?tab=templates', icon: '📝' },
      { id: 'approval', title: 'Approval Workflow', path: '/documents?tab=approval', icon: '✅' },
      { id: 'archive', title: 'Document Archive', path: '/documents?tab=archive', icon: '🗄️' }
    ]
  },
  {
    id: 'calendar',
    title: 'Calendar & Scheduling',
    description: 'Manage schedules, meetings, and company events',
    icon: '📅',
    path: '/calendar',
    gradient: 'from-emerald-500 to-teal-600',
    requiredRoles: ['admin', 'hr_manager', 'employee', 'finance'],
    requiredSubscription: 'free',
    features: ['calendar_access'],
    subModules: [
      { id: 'calendar', title: 'My Calendar', path: '/calendar', icon: '📅' },
      { id: 'meetings', title: 'Meeting Scheduler', path: '/calendar?tab=meetings', icon: '🤝' },
      { id: 'events', title: 'Company Events', path: '/calendar?tab=events', icon: '🎉' },
      { id: 'resources', title: 'Resource Booking', path: '/calendar?tab=resources', icon: '🏢' },
      { id: 'reminders', title: 'Reminders', path: '/calendar?tab=reminders', icon: '⏰' }
    ]
  },
  {
    id: 'training',
    title: 'Training & Development',
    description: 'Employee training programs and skill development tracking',
    icon: '🎓',
    path: '/training',
    gradient: 'from-blue-600 to-indigo-600',
    requiredRoles: ['admin', 'hr_manager', 'employee'],
    requiredSubscription: 'pro',
    features: ['training_management'],
    subModules: [
      { id: 'courses', title: 'Training Courses', path: '/training?tab=courses', icon: '📚' },
      { id: 'progress', title: 'Learning Progress', path: '/training?tab=progress', icon: '📊' },
      { id: 'certifications', title: 'Certifications', path: '/training?tab=certifications', icon: '🏆' },
      { id: 'skills', title: 'Skill Assessment', path: '/training?tab=skills', icon: '⭐' },
      { id: 'library', title: 'Learning Library', path: '/training?tab=library', icon: '📖' }
    ]
  }
];

const Dashboard: React.FC = () => {
    const { user } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const [selectedModule, setSelectedModule] = useState<string | null>(null);
    const [showSubModules, setShowSubModules] = useState<string | null>(null);

    const checkAccess = (feature: any) => {
        if (!user) return { hasAccess: false, reason: 'Not authenticated' };

        // Check role access
        const hasRole = feature.requiredRoles.some((role: string) => 
            AuthService.hasRole(user, role)
        );
        
        if (!hasRole) {
            return { hasAccess: false, reason: 'Insufficient role permissions' };
        }

        // Check subscription tier - Enterprise users should have access to everything
        const userSubscription = user.subscription?.tier || 'free';
        if (userSubscription === 'enterprise') {
            return { hasAccess: true };
        }

        const tierLevels = { free: 0, pro: 1, enterprise: 2 };
        const userTierLevel = tierLevels[userSubscription as keyof typeof tierLevels] || 0;
        const requiredTierLevel = tierLevels[feature.requiredSubscription as keyof typeof tierLevels] || 0;
        
        if (userTierLevel < requiredTierLevel) {
            return { 
                hasAccess: false, 
                reason: `Requires ${feature.requiredSubscription} subscription`,
                upgradeRequired: true
            };
        }

        // Check specific features - Enterprise users bypass this check
        if (feature.features.length > 0 && userSubscription !== 'enterprise') {
            const hasFeatures = feature.features.every((feat: string) =>
                AuthService.hasSubscriptionFeature(user, feat)
            );
            
            if (!hasFeatures) {
                return { 
                    hasAccess: false, 
                    reason: `Feature not available in ${userSubscription} plan`,
                    upgradeRequired: true
                };
            }
        }

        return { hasAccess: true };
    };

    const getWelcomeMessage = () => {
        if (!user) return "Welcome";
        
        const timeOfDay = new Date().getHours();
        let greeting = "Good morning";
        if (timeOfDay >= 12 && timeOfDay < 17) greeting = "Good afternoon";
        if (timeOfDay >= 17) greeting = "Good evening";
        
        return `${greeting}, ${user.username}`;
    };

    const handleModuleClick = (feature: any) => {
        const access = checkAccess(feature);
        
        if (!access.hasAccess) {
            if (access.upgradeRequired) {
                navigate('/upgrade');
            } else {
                navigate('/unauthorized');
            }
            return;
        }

        if (feature.subModules && feature.subModules.length > 0) {
            setSelectedModule(feature.id);
            setShowSubModules(showSubModules === feature.id ? null : feature.id);
        } else {
            navigate(feature.path);
        }
    };

    const handleSubModuleClick = (subModule: any) => {
        navigate(subModule.path);
        setShowSubModules(null);
        setSelectedModule(null);
    };

    const handleUpgrade = () => {
        navigate('/subscription');
    };

    const getSubscriptionBadgeColor = (tier: string) => {
        switch (tier) {
            case 'free': return 'bg-gray-100 text-gray-800 border-gray-300';
            case 'pro': return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'enterprise': return 'bg-purple-100 text-purple-800 border-purple-300';
            default: return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    const getActiveFeatures = () => {
        return dashboardFeatures.filter(feature => {
            const access = checkAccess(feature);
            return access.hasAccess;
        });
    };

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Please log in to continue</h1>
                </div>
            </div>
        );
    }

    const activeFeatures = getActiveFeatures();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header Section with Subscription Info */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    {getWelcomeMessage()}
                                </h1>
                                <p className="text-lg text-gray-600 mb-4">
                                    Manage your business operations from one central dashboard
                                </p>                             
                                 
                            </div>
                            
                            {/* Subscription Info */}
                            <div className="lg:ml-6">
                                <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-200">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-lg">💎</span>
                                            <span className="font-semibold text-gray-900">Current Plan</span>
                                        </div>
                                        <span className={`px-3 py-1 text-sm font-semibold rounded-full border capitalize ${getSubscriptionBadgeColor(user.subscription.tier)}`}>
                                            {user.subscription.tier}
                                        </span>
                                    </div>
                                    
                                    {user.subscription.tier !== 'enterprise' && (
                                        <div className="space-y-2">
                                            <p className="text-sm text-gray-600">
                                                {user.subscription.tier === 'free' 
                                                    ? 'Upgrade to unlock premium features'
                                                    : 'Upgrade to Enterprise for full access'
                                                }
                                            </p>
                                            <button
                                                onClick={handleUpgrade}
                                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 text-sm font-medium transition-all duration-200"
                                            >
                                                {user.subscription.tier === 'free' ? 'Upgrade Now' : 'Upgrade to Enterprise'}
                                            </button>
                                        </div>
                                    )}
                                    
                                    {user.subscription.tier === 'enterprise' && (
                                        <p className="text-sm text-green-600 font-medium">
                                            ✨ All features unlocked
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                 {/* Quick Stats */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-gradient-to-r from-blue-200 to-purple-200 rounded-2xl shadow-xl p-6 backdrop-blur-sm border border-white/20">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="text-center bg-white rounded-xl border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 p-3 shadow-md hover:shadow-lg">
                            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 mb-2 border-2 border-blue-200">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">{activeFeatures.length}</p>
                            <p className="text-sm text-gray-600">Active Features</p>
                        </div>
                        
                        <div className="text-center bg-white rounded-xl border-2 border-green-100 hover:border-green-300 transition-all duration-300 p-3 shadow-md hover:shadow-lg">
                            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 mb-2 border-2 border-green-200">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <p className="text-2xl font-bold text-gray-900 capitalize">{user.subscription.tier}</p>
                            <p className="text-sm text-gray-600">Current Plan</p>
                        </div>
                        
                        <div className="text-center bg-white rounded-xl border-2 border-purple-100 hover:border-purple-300 transition-all duration-300 p-3 shadow-md hover:shadow-lg">
                            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 text-purple-600 mb-2 border-2 border-purple-200">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <p className="text-2xl font-bold text-gray-900 capitalize">
                                {user.roles.length > 0 ? user.roles[0].replace('_', ' ') : 'No role'}
                            </p>
                            <p className="text-sm text-gray-600">Your Role</p>
                        </div>
                        
                        <div className="text-center bg-white rounded-xl border-2 border-orange-100 hover:border-orange-300 transition-all duration-300 p-3 shadow-md hover:shadow-lg">
                            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-100 text-orange-600 mb-2 border-2 border-orange-200">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">
                                {dashboardFeatures.reduce((sum, feature) => sum + (feature.subModules?.length || 0), 0)}
                            </p>
                            <p className="text-sm text-gray-600">Total Modules</p>
                        </div>
                    </div>
                </div>
            </div>
            </div>

           

            {/* Sub-modules Navigation */}
            {showSubModules && (
                <div className="bg-white border-b shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="py-4">
                            <div className="flex items-center space-x-2 mb-3">
                                <span className="text-lg">
                                    {dashboardFeatures.find(f => f.id === showSubModules)?.icon}
                                </span>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {dashboardFeatures.find(f => f.id === showSubModules)?.title}
                                </h3>
                                <button
                                    onClick={() => setShowSubModules(null)}
                                    className="ml-auto text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {dashboardFeatures.find(f => f.id === showSubModules)?.subModules?.map((subModule) => (
                                    <button
                                        key={subModule.id}
                                        onClick={() => handleSubModuleClick(subModule)}
                                        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                                    >
                                        <span>{subModule.icon}</span>
                                        <span className="font-medium text-gray-700">{subModule.title}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Dashboard Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {dashboardFeatures.map((feature) => {
                        const access = checkAccess(feature);
                        
                        return (
                            <div
                                key={feature.id}
                                className={`relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 cursor-pointer ${
                                    !access.hasAccess ? 'opacity-75' : ''
                                } ${selectedModule === feature.id ? 'ring-2 ring-blue-500' : ''}`}
                                onClick={() => handleModuleClick(feature)}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-10`}></div>
                                
                                <div className="relative p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} text-white text-xl font-bold shadow-lg`}>
                                            {feature.icon}
                                        </div>
                                        
                                        {!access.hasAccess && (
                                            <div className="flex items-center space-x-1">
                                                {access.upgradeRequired ? (
                                                    <div className="flex items-center space-x-1 px-2 py-1 bg-yellow-100 rounded-full">
                                                        <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                        </svg>
                                                        <span className="text-xs font-medium text-yellow-700">Upgrade</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center space-x-1 px-2 py-1 bg-red-100 rounded-full">
                                                        <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                                                        </svg>
                                                        <span className="text-xs font-medium text-red-700">Locked</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{feature.description}</p>
                                    
                                    {feature.subModules && feature.subModules.length > 0 && (
                                        <div className="mb-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-medium text-gray-500">
                                                    {feature.subModules.length} modules available
                                                </span>
                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                    
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-xs text-gray-500">Required:</span>
                                            <span className="text-xs font-medium text-gray-700 capitalize">
                                                {feature.requiredSubscription}
                                            </span>
                                        </div>
                                        
                                        {access.hasAccess ? (
                                            <div className="flex items-center space-x-1 text-green-600">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span className="text-xs font-medium">Available</span>
                                            </div>
                                        ) : (
                                            <div className="text-xs text-gray-400">
                                                {access.reason}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                
               
            </div>
        </div>
    );
};

export default Dashboard;

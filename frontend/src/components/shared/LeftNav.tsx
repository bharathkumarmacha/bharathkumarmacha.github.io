import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { AuthService } from '../../services/authService';

interface NavItem {
  title: string;
  path: string;
  icon?: string;
}

const LeftNav: React.FC = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);
  const { user } = useAppSelector((state) => state.auth);

  // Navigation items based on user role (moved from Header)
  const getNavigationItems = (): NavItem[] => {
    if (!user) return [];
    
    const items: NavItem[] = [
      { title: 'Dashboard', path: '/', icon: '📊' },
    ];

    // Add role-specific navigation
    if (user.roles.includes('admin')) {
      items.push(
        { title: 'HR Management', path: '/hr', icon: '👥' },
        { title: 'Finance', path: '/finance', icon: '💰' },
        { title: 'Organization', path: '/organization', icon: '🏢' },
        { title: 'CRM', path: '/crm', icon: '🤝' },
        { title: 'Projects', path: '/projects', icon: '📋' },
        { title: 'Inventory', path: '/inventory', icon: '📦' },
        { title: 'Analytics', path: '/analytics', icon: '📈' },
        { title: 'Training', path: '/training', icon: '🎓' }
      );
    } else {
      if (user.roles.includes('hr_manager')) {
        items.push(
          { title: 'HR Management', path: '/hr', icon: '👥' },
          { title: 'CRM', path: '/crm', icon: '🤝' },
          { title: 'Training', path: '/training', icon: '🎓' },
          { title: 'Projects', path: '/projects', icon: '📋' }
        );
      }
      if (user.roles.includes('finance')) {
        items.push(
          { title: 'Finance', path: '/finance', icon: '💰' },
          { title: 'Inventory', path: '/inventory', icon: '📦' },
          { title: 'Analytics', path: '/analytics', icon: '📈' }
        );
      }
      if (user.roles.includes('employee')) {
        items.push(
          { title: 'Projects', path: '/projects', icon: '📋' },
          { title: 'Training', path: '/training', icon: '🎓' }
        );
      }
      if (user.subscription.features.includes('organization_chart')) {
        items.push({ title: 'Organization', path: '/organization', icon: '🏢' });
      }
    }

    // Employee self-service and common apps for all users
    items.push(
      { title: 'Employee Portal', path: '/employee', icon: '👤' },
      { title: 'Documents', path: '/documents', icon: '📄' },
      { title: 'Calendar', path: '/calendar', icon: '📅' }
    );
    
    // Add chatbot access for users with feature
    if (user.subscription.features.includes('chatbot_access')) {
      items.push({ title: 'Chatbot', path: '/chatbot', icon: '🤖' });
    }
    
    // Add subscription management
    items.push({ title: 'Subscription', path: '/subscription', icon: '⚙️' });

    return items;
  };

  const navigationItems = getNavigationItems();

  // Don't render anything if user is not authenticated
  if (!user) {
    return null;
  }

  return (
    <>
      <button
        className="md:block fixed left-60 top-20 z-50 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg shadow-lg focus:outline-none transition-all duration-300"
        onClick={() => setExpanded((prev) => !prev)}
        style={{ left: expanded ? '15rem' : '0.5rem', top: '5.5rem', transition: 'left 0.3s ease-in-out' }}
      >
        {expanded ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        )}
      </button>
      
      <aside
        className={`md:block bg-gradient-to-b from-gray-50 to-white border-r border-gray-200 min-h-screen fixed top-16 left-0 h-[calc(100vh-4rem)] overflow-y-auto z-40 shadow-lg transition-all duration-300 ease-in-out ${
          expanded ? 'w-60' : 'w-0 overflow-hidden'
        }`}
      >
        {expanded && (
          <nav className="p-4">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-blue-600 text-white shadow-md transform scale-105'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:shadow-sm'
                  }`}
                >
                  {item.icon && (
                    <span className="text-lg">{item.icon}</span>
                  )}
                  {!item.icon && (
                    <div className={`w-5 h-5 rounded-full ${
                      location.pathname === item.path ? 'bg-white/20' : 'bg-blue-100'
                    }`} />
                  )}
                  <span className="flex-1">{item.title}</span>
                  {location.pathname === item.path && (
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  )}
                </Link>
              ))}
            </div>
            
            {/* Navigation Footer */}
            <div className="mt-8 pt-4 border-t border-gray-200">
              <div className="text-xs text-gray-500 text-center">
                Navigation Menu
              </div>
            </div>
          </nav>
        )}
      </aside>
    </>
  );
};

export default LeftNav;

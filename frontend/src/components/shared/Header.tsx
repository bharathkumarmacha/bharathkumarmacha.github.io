import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import navigationData from '../../shared/data/navigation.json';

const Header: React.FC = () => {
  const [search, setSearch] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-gradient-to-r from-primary-400 via-primary-300 to-primary-100 shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-2 min-h-0">
        <div className="flex items-center justify-between min-h-0">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-2xl font-bold text-white hover:text-gray-100 transition-all duration-300"
            >
              My App
            </Link>
          </div>
          <div className="flex-1 flex justify-center">
            {/* Search Bar */}
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-[30%] max-w-lg px-4 py-2 rounded-2xl bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-300 text-base shadow ml-[-30%]"
              style={{ minWidth: 180 }}
            />
          </div>
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <button
              className="relative focus:outline-none"
              title="Notifications"
              onClick={() => alert('No new notifications!')}
            >
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 shadow" style={{display: 'none'}}>3</span>
            </button>
            {/* User avatar and name */}
            {/* <img
              src=""
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-primary-400 shadow"
            /> */}
            <span className="text-white font-medium">John Doe</span>
            <button
              className="ml-3 px-3 py-1 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-all text-sm font-medium shadow"
              onClick={() => { /* TODO: Add logout logic here */ alert('Logged out!'); }}
            >
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationData.links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors
                  ${location.pathname === link.path 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
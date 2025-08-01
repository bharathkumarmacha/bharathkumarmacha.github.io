import React, { useState } from 'react';
import { Link, useLocation, Location } from 'react-router-dom';
import navigationData from '../../shared/data/navigation.json';

declare global {
  interface Window {
    __lastClickedPath?: string;
  }
}

interface NavLink {
  title: string;
  path?: string;
  sublinks?: NavLink[];
  image?: string;
}

// Helper to render links and sublinks recursively
const renderLinks = (
  links: NavLink[],
  location: Location,
  level = 0,
  openStates: Record<string, boolean>,
  setOpenStates: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
): React.ReactNode => (
  <ul className={level === 0 ? 'space-y-2' : 'ml-4 space-y-1'}>
    {links.map((link: NavLink) => {
      const hasSublinks = link.sublinks && Array.isArray(link.sublinks) && link.sublinks.length > 0;
      const isOpen = openStates[link.title] ?? false;
      return (
        <li key={link.path || link.title}>
          <div className="flex items-center">
            {link.image && (
              <img src={link.image} alt={link.title} className="w-5 h-5 mr-2 rounded-full object-cover" />
            )}
            <Link
              to={link.path || '#'}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${location.pathname === link.path ? 'bg-primary-200 text-primary-900' : 'text-primary-800 hover:bg-primary-100 hover:text-primary-900'}`}
              onClick={() => {
                if (window.__lastClickedPath === link.path) {
                  console.log('Clicked twice:', link.path);
                }
                window.__lastClickedPath = link.path;
                setTimeout(() => { window.__lastClickedPath = undefined; }, 500);
              }}
            >
              {link.title}
            </Link>
            {hasSublinks && (
              <button
                className="ml-2 text-primary-500 hover:text-primary-700 focus:outline-none"
                onClick={() => setOpenStates((prev) => ({ ...prev, [link.title]: !isOpen }))}
                aria-label={isOpen ? `Collapse ${link.title}` : `Expand ${link.title}`}
              >
                {isOpen ? '−' : '+'}
              </button>
            )}
          </div>
          {hasSublinks && isOpen && renderLinks(link.sublinks!, location, level + 1, openStates, setOpenStates)}
        </li>
      );
    })}
  </ul>
);

const LeftNav: React.FC = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});

  return (
    <>
      <button
        className="hidden md:block fixed left-60 top-20 z-50 bg-primary-400 text-white px-2 py-1 rounded shadow focus:outline-none transition-all duration-200"
        onClick={() => setExpanded((prev) => !prev)}
        style={{ left: expanded ? '15rem' : '0.5rem', top: '5.5rem', transition: 'left 0.2s, top 0.2s' }}
      >
        {expanded ? <span className="text-lg">⮜</span> : <span className="text-lg">⮞</span>}
      </button>
      <aside
        className={`hidden md:block bg-white/80 border-r border-primary-100 min-h-screen py-6 px-2 fixed top-16 left-0 h-[calc(100vh-4rem)] overflow-y-auto z-40 transition-all duration-200 ${expanded ? 'w-60' : 'w-0 px-0 py-0 overflow-hidden'}`}
        style={{ transition: 'width 0.2s' }}
      >
        {expanded && renderLinks(navigationData.links as NavLink[], location, 0, openStates, setOpenStates)}
      </aside>
    </>
  );
};

export default LeftNav;

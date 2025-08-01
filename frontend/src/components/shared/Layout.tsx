import React from 'react';
import Header from './Header';
import Footer from './Footer';
import LeftNav from './LeftNav';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
    <Header />
    <div className="flex flex-1 min-h-0">
      <LeftNav />
      <div className="flex-grow flex flex-col min-h-0">
        <main className="flex-grow flex flex-col min-h-0 px-4 py-8 overflow-auto md:ml-60">
          <div className="flex-1 flex flex-col bg-white rounded-lg shadow-lg p-6 min-h-0">
            {children}
          </div>
        </main>
      </div>
    </div>
    <Footer />
  </div>
);

export default Layout;

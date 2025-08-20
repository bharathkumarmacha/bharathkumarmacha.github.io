import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { loginSuccess } from './store/authSlice';
import { AuthService } from './services/authService';

// Components
import Layout from './components/shared/Layout';
import LoginForm from './features/auth/components/LoginForm';
import ProtectedRoute from './features/auth/components/ProtectedRoute';
import Dashboard from './components/dashboard';
import HRDashboard from './features/hr/components/HRDashboard';
import EmployeeSelfService from './features/employee/components/EmployeeSelfService';
import FinanceDashboard from './features/finance/components/FinanceDashboard';
import SubscriptionManagement from './features/subscription/components/SubscriptionManagement';

// Pages
import ChatBot from './components/chatbot/ChatBot';
import EmailList from './components/email/EmailList';
import './App.css';

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Check for existing authentication on app load
    const initAuth = async () => {
      const user = await AuthService.getCurrentUser();
      if (user) {
        dispatch(loginSuccess(user));
      }
    };
    
    initAuth();
  }, [dispatch]);

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        
        {/* HR Routes */}
        <Route 
          path="/hr" 
          element={
            <ProtectedRoute requiredRoles={['admin', 'hr_manager']}>
              <HRDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Finance Routes */}
        <Route 
          path="/finance" 
          element={
            <ProtectedRoute requiredRoles={['admin', 'finance']}>
              <FinanceDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Employee Self-Service Routes */}
        <Route 
          path="/employee" 
          element={
            <ProtectedRoute>
              <EmployeeSelfService />
            </ProtectedRoute>
          } 
        />
        
        {/* Organization Chart */}
        <Route 
          path="/organization" 
          element={
            <ProtectedRoute requiredSubscription="enterprise">
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Organization Chart</h1>
                <div className="bg-white p-8 rounded-lg shadow text-center">
                  <p className="text-gray-600">Organization chart visualization would go here</p>
                  <p className="text-sm text-gray-500 mt-2">Available in Enterprise plan</p>
                </div>
              </div>
            </ProtectedRoute>
          } 
        />
        
        {/* Subscription Management */}
        <Route path="/subscription" element={<SubscriptionManagement />} />
        
        {/* Existing Routes */}
        <Route 
          path="/chatbot" 
          element={
            <ProtectedRoute requiredSubscription="pro">
              <ChatBot />
            </ProtectedRoute>
          } 
        />
        
        <Route path="/email" element={<EmailList />} />
        
        {/* Unauthorized and Upgrade pages */}
        <Route 
          path="/unauthorized" 
          element={
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
                <p className="text-gray-600">You don't have permission to access this resource.</p>
              </div>
            </div>
          } 
        />
        
        <Route 
          path="/upgrade" 
          element={
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-yellow-600 mb-4">Upgrade Required</h1>
                <p className="text-gray-600 mb-4">This feature requires a higher subscription plan.</p>
                <button 
                  onClick={() => window.location.href = '/subscription'}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  View Plans
                </button>
              </div>
            </div>
          } 
        />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <AppContent />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
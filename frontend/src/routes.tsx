import React from 'react';
import Dashboard from './components/dashboard';
import EmailList from './components/email/EmailList';
import ChatBot from './components/chatbot/ChatBot';
import HRDashboard from './features/hr/components/HRDashboard';
import FinanceDashboard from './features/finance/components/FinanceDashboard';
import EmployeeSelfService from './features/employee/components/EmployeeSelfService';
import CRMDashboard from './features/crm/components/CRMDashboard';
import ProjectManagement from './features/projects/components/ProjectManagement';
import InventoryManagement from './features/inventory/components/InventoryManagement';
import BusinessAnalytics from './features/analytics/components/BusinessAnalytics';
import DocumentManagement from './features/documents/components/DocumentManagement';
import CalendarScheduling from './features/calendar/components/CalendarScheduling';
import TrainingDevelopment from './features/training/components/TrainingDevelopment';
import OrganizationChart from './features/organization/components/OrganizationChart';
import { useUser } from './context/UserContext';

// Example: public and private route wrappers
const PublicRoute = ({ element }: { element: JSX.Element }) => element;
const RoleRoute = ({ element, allowedRoles }: { element: JSX.Element, allowedRoles: string[] }) => {
  const { user, loading } = useUser();
  if (loading) return <div>Loading...</div>;
 // if (!user) return <div>Access Denied</div>;
  const hasAccess = true; //allowedRoles.some(role => user.roles.includes(role));
  return hasAccess ? element : <div>Access Denied</div>;
};

export const appRoutes = [
  {
    path: '/',
    element: <PublicRoute element={<Dashboard />} />,
    isPublic: true,
  },
  {
    path: '/email',
    element: <RoleRoute element={<EmailList />} allowedRoles={["user", "basic_subscriber"]} />,
    isPublic: false,
    allowedRoles: ["user", "basic_subscriber"]
  },
  {
    path: '/chatbot',
    element: <RoleRoute element={<ChatBot />} allowedRoles={["user", "premium_subscriber"]} />,
    isPublic: false,
    allowedRoles: ["user", "premium_subscriber"]
  },
  {
    path: '/hr',
    element: <RoleRoute element={<HRDashboard />} allowedRoles={["admin", "hr_manager"]} />,
    isPublic: false,
    allowedRoles: ["admin", "hr_manager"]
  },
  {
    path: '/finance',
    element: <RoleRoute element={<FinanceDashboard />} allowedRoles={["admin", "finance"]} />,
    isPublic: false,
    allowedRoles: ["admin", "finance"]
  },
  {
    path: '/employee',
    element: <RoleRoute element={<EmployeeSelfService />} allowedRoles={["admin", "hr_manager", "employee", "finance"]} />,
    isPublic: false,
    allowedRoles: ["admin", "hr_manager", "employee", "finance"]
  },
  {
    path: '/crm',
    element: <RoleRoute element={<CRMDashboard />} allowedRoles={["admin", "hr_manager"]} />,
    isPublic: false,
    allowedRoles: ["admin", "hr_manager"]
  },
  {
    path: '/projects',
    element: <RoleRoute element={<ProjectManagement />} allowedRoles={["admin", "hr_manager", "employee"]} />,
    isPublic: false,
    allowedRoles: ["admin", "hr_manager", "employee"]
  },
  {
    path: '/inventory',
    element: <RoleRoute element={<InventoryManagement />} allowedRoles={["admin", "finance"]} />,
    isPublic: false,
    allowedRoles: ["admin", "finance"]
  },
  {
    path: '/analytics',
    element: <RoleRoute element={<BusinessAnalytics />} allowedRoles={["admin", "hr_manager", "finance"]} />,
    isPublic: false,
    allowedRoles: ["admin", "hr_manager", "finance"]
  },
  {
    path: '/documents',
    element: <RoleRoute element={<DocumentManagement />} allowedRoles={["admin", "hr_manager", "employee", "finance"]} />,
    isPublic: false,
    allowedRoles: ["admin", "hr_manager", "employee", "finance"]
  },
  {
    path: '/calendar',
    element: <RoleRoute element={<CalendarScheduling />} allowedRoles={["admin", "hr_manager", "employee", "finance"]} />,
    isPublic: false,
    allowedRoles: ["admin", "hr_manager", "employee", "finance"]
  },
  {
    path: '/training',
    element: <RoleRoute element={<TrainingDevelopment />} allowedRoles={["admin", "hr_manager", "employee"]} />,
    isPublic: false,
    allowedRoles: ["admin", "hr_manager", "employee"]
  },
  {
    path: '/organization',
    element: <RoleRoute element={<OrganizationChart />} allowedRoles={["admin", "hr_manager"]} />,
    isPublic: false,
    allowedRoles: ["admin", "hr_manager"]
  },
];

import React from 'react';
import Dashboard from './components/dashboard';
import EmailList from './components/email/EmailList';
import ChatBot from './components/chatbot/ChatBot';
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
];

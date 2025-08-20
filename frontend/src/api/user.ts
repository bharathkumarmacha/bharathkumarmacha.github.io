import axios from 'axios';

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  subscription: {
    tier: string;
    status: string;
    expiresAt: string;
    features: string[];
  };
  profile: {
    avatar?: string;
    department?: string;
    position?: string;
    employeeId?: string;
  };
}

export async function fetchUser(): Promise<User> {
  // Mock user data for development - replace with real API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: '1',
        username: 'admin',
        email: 'admin@company.com',
        firstName: 'Admin',
        lastName: 'User',
        roles: ['admin'],
        subscription: {
          tier: 'enterprise',
          status: 'active',
          expiresAt: '2025-12-31',
          features: [
            'hr_access', 'finance_access', 'crm_access', 'projects_access',
            'inventory_access', 'analytics_access', 'documents_access',
            'calendar_access', 'training_access', 'organization_chart'
          ]
        },
        profile: {
          avatar: 'https://via.placeholder.com/150',
          department: 'Administration',
          position: 'System Administrator',
          employeeId: 'EMP001'
        }
      });
    }, 100);
  });
}

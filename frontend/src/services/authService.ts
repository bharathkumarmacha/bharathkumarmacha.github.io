import { LoginCredentials, AuthResponse, User } from '../types/auth';

// Mock users for development
const mockUsers: User[] = [
  {
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
      features: ['all_access', 'advanced_analytics', 'priority_support', 'chatbot_access', 'email_access', 'employee_management', 'invoice_management', 'organization_chart', 'self_service']
    },
    profile: {
      department: 'Management',
      position: 'System Administrator',
      employeeId: 'EMP001'
    }
  },
  {
    id: '2',
    username: 'hr_manager',
    email: 'hr@company.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    roles: ['hr_manager'],
    subscription: {
      tier: 'pro',
      status: 'active',
      expiresAt: '2025-12-31',
      features: ['hr_management', 'employee_directory', 'leave_management', 'chatbot_access', 'email_access', 'employee_management', 'self_service']
    },
    profile: {
      department: 'Human Resources',
      position: 'HR Manager',
      employeeId: 'EMP002'
    }
  },
  {
    id: '3',
    username: 'employee',
    email: 'john@company.com',
    firstName: 'John',
    lastName: 'Doe',
    roles: ['employee'],
    subscription: {
      tier: 'free',
      status: 'active',
      expiresAt: '2025-12-31',
      features: ['basic_access', 'self_service', 'email_access']
    },
    profile: {
      department: 'Engineering',
      position: 'Software Developer',
      employeeId: 'EMP003'
    }
  },
  {
    id: '4',
    username: 'finance',
    email: 'finance@company.com',
    firstName: 'Mike',
    lastName: 'Wilson',
    roles: ['finance'],
    subscription: {
      tier: 'pro',
      status: 'active',
      expiresAt: '2025-12-31',
      features: ['finance_management', 'invoice_generation', 'payment_tracking', 'chatbot_access', 'email_access', 'invoice_management', 'self_service']
    },
    profile: {
      department: 'Finance',
      position: 'Finance Manager',
      employeeId: 'EMP004'
    }
  }
];

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, password is same as username
    const user = mockUsers.find(u => 
      u.username === credentials.username && credentials.password === credentials.username
    );
    
    if (!user) {
      throw new Error('Invalid username or password');
    }
    
    // Generate mock JWT token
    const token = `mock-jwt-token-${user.id}-${Date.now()}`;
    const refreshToken = `mock-refresh-token-${user.id}-${Date.now()}`;
    
    return {
      user,
      token,
      refreshToken
    };
  }
  
  static async logout(): Promise<void> {
    // Clear tokens
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }
  
  static async refreshToken(): Promise<string> {
    // Mock refresh token logic
    await new Promise(resolve => setTimeout(resolve, 500));
    return `refreshed-token-${Date.now()}`;
  }
  
  static async getCurrentUser(): Promise<User | null> {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    // In a real app, you would validate the token with your backend
    // For demo, extract user ID from mock token
    const userId = token.split('-')[3];
    return mockUsers.find(u => u.id === userId) || null;
  }
  
  static hasRole(user: User | null, role: string): boolean {
    return user?.roles.includes(role as any) || false;
  }
  
  static hasSubscriptionFeature(user: User | null, feature: string): boolean {
    return user?.subscription.features.includes(feature) || false;
  }
}

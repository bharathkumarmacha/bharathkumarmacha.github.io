export type UserRole = 'admin' | 'hr_manager' | 'employee' | 'finance';

export type SubscriptionTier = 'free' | 'pro' | 'enterprise';

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: UserRole[];
  subscription: {
    tier: SubscriptionTier;
    status: 'active' | 'inactive' | 'expired';
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

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

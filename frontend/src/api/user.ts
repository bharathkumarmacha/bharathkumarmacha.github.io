import axios from 'axios';

export interface User {
  id: string;
  username: string;
  roles: string[];
  subscription: {
    status: string;
    tier: string;
    expiresAt: string;
  };
}

export async function fetchUser(): Promise<User> {
  // Replace with your real API endpoint
  const response = await axios.get<User>('/api/user');
  return response.data;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  tier: 'free' | 'pro' | 'enterprise';
  price: {
    monthly: number;
    yearly: number;
  };
  features: string[];
  limits: {
    users: number;
    storage: string;
    supportLevel: 'basic' | 'priority' | 'dedicated';
  };
  popular?: boolean;
}

export interface SubscriptionState {
  currentPlan: SubscriptionPlan | null;
  availablePlans: SubscriptionPlan[];
  billingHistory: BillingRecord[];
  isLoading: boolean;
}

export interface BillingRecord {
  id: string;
  planId: string;
  amount: number;
  currency: string;
  billingDate: string;
  status: 'paid' | 'pending' | 'failed';
  invoiceUrl?: string;
}

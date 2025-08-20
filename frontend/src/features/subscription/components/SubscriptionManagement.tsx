import React from 'react';
import { useAppSelector } from '../../../hooks/redux';
import { SubscriptionPlan } from '../../../types/subscription';

// Mock subscription plans
const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    tier: 'free',
    price: { monthly: 0, yearly: 0 },
    features: [
      'Basic dashboard access',
      'Employee self-service',
      'Email management',
      'Up to 10 employees',
      'Email support'
    ],
    limits: {
      users: 10,
      storage: '1GB',
      supportLevel: 'basic'
    }
  },
  {
    id: 'pro',
    name: 'Professional',
    tier: 'pro',
    price: { monthly: 29, yearly: 290 },
    features: [
      'All Free features',
      'HR Management',
      'Invoice generation & tracking',
      'AI Chatbot assistant',
      'Advanced reporting',
      'Up to 100 employees',
      'Priority support'
    ],
    limits: {
      users: 100,
      storage: '50GB',
      supportLevel: 'priority'
    },
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tier: 'enterprise',
    price: { monthly: 99, yearly: 990 },
    features: [
      'All Pro features',
      'Organization chart visualization',
      'Advanced analytics & insights',
      'Custom integrations',
      'Unlimited employees',
      'Dedicated support manager'
    ],
    limits: {
      users: -1, // unlimited
      storage: 'Unlimited',
      supportLevel: 'dedicated'
    }
  }
];

const SubscriptionManagement: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const currentTier = user?.subscription.tier;

  const handleUpgrade = (planId: string) => {
    // Simulate upgrade process
    alert(`Upgrading to ${planId} plan. This would redirect to payment processing.`);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Subscription Plans</h1>
        <p className="text-gray-600 mt-2">Choose the plan that best fits your organization</p>
      </div>

      {/* Current Plan Status */}
      {user && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-blue-900">Current Plan</h3>
              <p className="text-blue-700">
                You are currently on the <span className="font-semibold capitalize">{currentTier}</span> plan
              </p>
              <p className="text-sm text-blue-600 mt-1">
                Status: {user.subscription.status} | Expires: {user.subscription.expiresAt}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-900">
                {currentTier === 'free' ? 'Free' : 
                 currentTier === 'pro' ? '$29/mo' : '$99/mo'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {subscriptionPlans.map((plan) => (
          <div 
            key={plan.id}
            className={`relative bg-white rounded-lg shadow-lg border-2 p-6 ${
              plan.popular 
                ? 'border-blue-500 transform scale-105' 
                : 'border-gray-200'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}

            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900">
                  ${plan.price.monthly}
                </span>
                <span className="text-gray-600">/month</span>
              </div>
              {plan.price.yearly > 0 && (
                <p className="text-sm text-gray-500 mt-1">
                  Or ${plan.price.yearly}/year (save ${(plan.price.monthly * 12) - plan.price.yearly})
                </p>
              )}
            </div>

            <ul className="mt-6 space-y-3">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              {currentTier === plan.tier ? (
                <button
                  disabled
                  className="w-full bg-gray-100 text-gray-500 py-3 px-4 rounded-lg font-medium cursor-not-allowed"
                >
                  Current Plan
                </button>
              ) : (
                <button
                  onClick={() => handleUpgrade(plan.id)}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {currentTier === 'free' || 
                   (currentTier === 'pro' && plan.tier === 'enterprise')
                    ? 'Upgrade' 
                    : 'Downgrade'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Features Comparison */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Feature Comparison</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 font-medium text-gray-900">Feature</th>
                <th className="text-center py-2 font-medium text-gray-900">Free</th>
                <th className="text-center py-2 font-medium text-gray-900">Pro</th>
                <th className="text-center py-2 font-medium text-gray-900">Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-3 text-gray-700">Max Employees</td>
                <td className="py-3 text-center">10</td>
                <td className="py-3 text-center">100</td>
                <td className="py-3 text-center">Unlimited</td>
              </tr>
              <tr>
                <td className="py-3 text-gray-700">Storage</td>
                <td className="py-3 text-center">1GB</td>
                <td className="py-3 text-center">50GB</td>
                <td className="py-3 text-center">Unlimited</td>
              </tr>
              <tr>
                <td className="py-3 text-gray-700">AI Chatbot</td>
                <td className="py-3 text-center">❌</td>
                <td className="py-3 text-center">✅</td>
                <td className="py-3 text-center">✅</td>
              </tr>
              <tr>
                <td className="py-3 text-gray-700">Email Management</td>
                <td className="py-3 text-center">✅</td>
                <td className="py-3 text-center">✅</td>
                <td className="py-3 text-center">✅</td>
              </tr>
              <tr>
                <td className="py-3 text-gray-700">HR Management</td>
                <td className="py-3 text-center">❌</td>
                <td className="py-3 text-center">✅</td>
                <td className="py-3 text-center">✅</td>
              </tr>
              <tr>
                <td className="py-3 text-gray-700">Invoice Generation</td>
                <td className="py-3 text-center">❌</td>
                <td className="py-3 text-center">✅</td>
                <td className="py-3 text-center">✅</td>
              </tr>
              <tr>
                <td className="py-3 text-gray-700">Organization Chart</td>
                <td className="py-3 text-center">❌</td>
                <td className="py-3 text-center">❌</td>
                <td className="py-3 text-center">✅</td>
              </tr>
              <tr>
                <td className="py-3 text-gray-700">Advanced Analytics</td>
                <td className="py-3 text-center">❌</td>
                <td className="py-3 text-center">❌</td>
                <td className="py-3 text-center">✅</td>
              </tr>
              <tr>
                <td className="py-3 text-gray-700">Support Level</td>
                <td className="py-3 text-center">Email</td>
                <td className="py-3 text-center">Priority</td>
                <td className="py-3 text-center">Dedicated</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionManagement;

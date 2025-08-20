# Demo Credentials

## Test Users

Use these credentials to test different roles and subscription levels:

### Admin User
- **Username:** admin
- **Password:** admin
- **Role:** Admin
- **Subscription:** Enterprise
- **Access:** All features

### HR Manager
- **Username:** hr_manager
- **Password:** hr_manager
- **Role:** HR Manager
- **Subscription:** Pro
- **Access:** HR Management, Employee Directory, Dashboard

### Employee
- **Username:** employee
- **Password:** employee
- **Role:** Employee
- **Subscription:** Free
- **Access:** Employee Self-Service, Dashboard

### Finance Manager
- **Username:** finance
- **Password:** finance
- **Role:** Finance
- **Subscription:** Pro
- **Access:** Invoice Management, Finance Dashboard

## Features by Subscription Tier

### Free Tier
- Basic dashboard access
- Employee self-service
- Up to 10 employees
- Email support

### Pro Tier
- All Free features
- HR Management
- Invoice generation
- Advanced reporting
- Up to 100 employees
- Priority support

### Enterprise Tier
- All Pro features
- Organization chart
- Advanced analytics
- Custom integrations
- Unlimited employees
- Dedicated support

## Getting Started

1. Start the development server: `npm run dev`
2. Open your browser to the local development URL
3. Use any of the demo credentials above to login
4. Explore different features based on your role and subscription level

## Project Structure

```
src/
├── components/          # Shared UI components
├── features/           # Feature-based modules
│   ├── auth/           # Authentication
│   ├── hr/             # HR Management
│   ├── finance/        # Finance & Invoicing
│   ├── employee/       # Employee Self-Service
│   ├── subscription/   # Subscription Management
│   └── organization/   # Organization Chart
├── store/              # Redux store
├── hooks/              # Custom React hooks
├── services/           # API services
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── data/               # Mock data and configurations
```

import React from 'react';
import apps from '../../shared/data/dashboardApps.json';
import DashboardCard from './DashboardCard';

const Dashboard: React.FC = () => {
    return (
        <div className="space-y-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-secondary-900 mb-4">Welcome to InfoMerica</h1>
                <p className="text-secondary-600 text-lg max-w-2xl mx-auto">
                    Access all your tools and applications from one central dashboard
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {apps.map((app) => (
                    <DashboardCard key={app.path} {...app} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;

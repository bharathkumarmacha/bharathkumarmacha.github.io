import React from 'react';

const DashboardCard: React.FC<{ title: string; description: string; path: string; icon: string }> = ({
    title,
    description,
    path,
    icon
}) => (
    <a
        href={path}
        className="block p-6 bg-white rounded-lg shadow-soft transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
    >
        <div className="flex items-center mb-4">
            <span className="text-primary-500 text-2xl mr-3">{icon}</span>
            <h3 className="text-xl font-semibold text-secondary-800">{title}</h3>
        </div>
        <p className="text-secondary-600">{description}</p>
    </a>
);

export default DashboardCard;

import React, { useState } from 'react';

const TrainingDevelopment: React.FC = () => {
    const [activeTab, setActiveTab] = useState('courses');

    const tabs = [
        { id: 'courses', label: 'Training Courses', icon: '📚' },
        { id: 'progress', label: 'Learning Progress', icon: '📊' },
        { id: 'certifications', label: 'Certifications', icon: '🏆' },
        { id: 'skills', label: 'Skill Assessment', icon: '⭐' },
        { id: 'library', label: 'Learning Library', icon: '📖' }
    ];

    const mockCourses = [
        { id: 1, title: 'Leadership Fundamentals', instructor: 'Dr. Sarah Johnson', duration: '6 weeks', enrolled: 45, rating: 4.8, category: 'Leadership' },
        { id: 2, title: 'Data Analysis with Excel', instructor: 'Mike Chen', duration: '4 weeks', enrolled: 78, rating: 4.6, category: 'Technical' },
        { id: 3, title: 'Communication Skills', instructor: 'Emily Davis', duration: '3 weeks', enrolled: 92, rating: 4.9, category: 'Soft Skills' },
        { id: 4, title: 'Project Management Basics', instructor: 'John Smith', duration: '8 weeks', enrolled: 34, rating: 4.7, category: 'Management' }
    ];

    const mockProgress = [
        { id: 1, employee: 'John Doe', course: 'Leadership Fundamentals', progress: 75, status: 'In Progress', lastActivity: '2025-08-19' },
        { id: 2, employee: 'Jane Smith', course: 'Data Analysis with Excel', progress: 100, status: 'Completed', lastActivity: '2025-08-15' },
        { id: 3, employee: 'Mike Johnson', course: 'Communication Skills', progress: 45, status: 'In Progress', lastActivity: '2025-08-18' },
        { id: 4, employee: 'Sarah Wilson', course: 'Project Management Basics', progress: 90, status: 'In Progress', lastActivity: '2025-08-20' }
    ];

    const mockCertifications = [
        { id: 1, name: 'Project Management Professional (PMP)', provider: 'PMI', employees: 8, validity: '3 years', category: 'Management' },
        { id: 2, name: 'Microsoft Excel Expert', provider: 'Microsoft', employees: 23, validity: '2 years', category: 'Technical' },
        { id: 3, name: 'Leadership Excellence Certificate', provider: 'Internal', employees: 15, validity: 'Lifetime', category: 'Leadership' },
        { id: 4, name: 'Agile Scrum Master', provider: 'Scrum Alliance', employees: 12, validity: '2 years', category: 'Management' }
    ];

    const mockSkills = [
        { id: 1, skill: 'Communication', averageScore: 8.5, assessments: 45, lastAssessment: '2025-08-10' },
        { id: 2, skill: 'Technical Problem Solving', averageScore: 7.8, assessments: 34, lastAssessment: '2025-08-12' },
        { id: 3, skill: 'Leadership', averageScore: 7.2, assessments: 28, lastAssessment: '2025-08-15' },
        { id: 4, skill: 'Time Management', averageScore: 8.9, assessments: 52, lastAssessment: '2025-08-18' }
    ];

    const mockLibrary = [
        { id: 1, title: 'The Art of Leadership', type: 'eBook', category: 'Leadership', downloads: 234, rating: 4.7 },
        { id: 2, title: 'Excel Mastery Video Series', type: 'Video', category: 'Technical', downloads: 456, rating: 4.8 },
        { id: 3, title: 'Effective Communication Podcast', type: 'Audio', category: 'Soft Skills', downloads: 189, rating: 4.6 },
        { id: 4, title: 'Project Management Templates', type: 'Document', category: 'Management', downloads: 312, rating: 4.9 }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-800';
            case 'In Progress': return 'bg-blue-100 text-blue-800';
            case 'Not Started': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'eBook': return '📖';
            case 'Video': return '🎥';
            case 'Audio': return '🎧';
            case 'Document': return '📄';
            default: return '📁';
        }
    };

    const renderStarRating = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}>
                ⭐
            </span>
        ));
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'courses':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-900">Available Training Courses</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                Create Course
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {mockCourses.map((course) => (
                                <div key={course.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-3">
                                        <h4 className="font-semibold text-gray-900">{course.title}</h4>
                                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                                            {course.category}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 mb-2">Instructor: {course.instructor}</p>
                                    <p className="text-gray-600 mb-2">Duration: {course.duration}</p>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center">
                                            {renderStarRating(course.rating)}
                                            <span className="ml-2 text-sm text-gray-600">{course.rating}</span>
                                        </div>
                                        <span className="text-sm text-gray-600">{course.enrolled} enrolled</span>
                                    </div>
                                    <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                        Enroll Now
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'progress':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-900">Learning Progress Tracking</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                Export Report
                            </button>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <table className="min-w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progress</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Activity</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {mockProgress.map((progress) => (
                                        <tr key={progress.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{progress.employee}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{progress.course}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                                        <div 
                                                            className="bg-blue-600 h-2 rounded-full" 
                                                            style={{ width: `${progress.progress}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-sm text-gray-600">{progress.progress}%</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(progress.status)}`}>
                                                    {progress.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{progress.lastActivity}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                                                <button className="text-gray-600 hover:text-gray-800">Message</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            case 'certifications':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-900">Professional Certifications</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                Add Certification
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {mockCertifications.map((cert) => (
                                <div key={cert.id} className="bg-white border border-gray-200 rounded-lg p-6">
                                    <div className="flex justify-between items-start mb-3">
                                        <h4 className="font-semibold text-gray-900">{cert.name}</h4>
                                        <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                                            {cert.category}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 mb-2">Provider: {cert.provider}</p>
                                    <p className="text-gray-600 mb-2">Validity: {cert.validity}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">{cert.employees} employees certified</span>
                                        <button className="text-blue-600 hover:text-blue-800 text-sm">View Details</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'skills':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-900">Skill Assessment Dashboard</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                Create Assessment
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {mockSkills.map((skill) => (
                                <div key={skill.id} className="bg-white border border-gray-200 rounded-lg p-6">
                                    <h4 className="font-semibold text-gray-900 mb-3">{skill.skill}</h4>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-2xl font-bold text-blue-600">{skill.averageScore}/10</span>
                                        <span className="text-sm text-gray-600">{skill.assessments} assessments</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                                        <div 
                                            className="bg-blue-600 h-2 rounded-full" 
                                            style={{ width: `${(skill.averageScore / 10) * 100}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-sm text-gray-600">Last assessment: {skill.lastAssessment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'library':
                return (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-900">Learning Resource Library</h3>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                Upload Resource
                            </button>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <table className="min-w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Resource</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Downloads</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {mockLibrary.map((resource) => (
                                        <tr key={resource.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <span className="text-lg mr-3">{getTypeIcon(resource.type)}</span>
                                                    <span className="font-medium text-gray-900">{resource.title}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{resource.type}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                                                    {resource.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-gray-600">{resource.downloads}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {renderStarRating(resource.rating)}
                                                    <span className="ml-2 text-sm text-gray-600">{resource.rating}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button className="text-blue-600 hover:text-blue-800 mr-3">Download</button>
                                                <button className="text-gray-600 hover:text-gray-800">Preview</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="text-center py-12">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {tabs.find(tab => tab.id === activeTab)?.label}
                        </h3>
                        <p className="text-gray-600">This feature is coming soon!</p>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-6">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Training & Development</h1>
                        <p className="text-lg text-gray-600">Employee training programs and skill development tracking</p>
                    </div>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-8 overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                                    activeTab === tab.id
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                <span>{tab.icon}</span>
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tab Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default TrainingDevelopment;

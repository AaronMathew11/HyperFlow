import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEnvironmentStore } from '../store/environmentStore';
import { useAuth } from '../contexts/AuthContext';
import Breadcrumb from '../../../shared/components/Breadcrumb';
import SwimlaneDiagram from '../../../shared/components/SwimlaneDiagram';
import { getClient, getBusinessUnit } from '../../../shared/lib/api';
import { Client, BusinessUnit } from '../../../shared/types';

export default function EnvironmentDetailPage() {
    const { clientId, buId, environmentId } = useParams<{ clientId: string; buId: string; environmentId: string }>();
    const { environments, loadEnvironments } = useEnvironmentStore();
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const [client, setClient] = useState<Client | null>(null);
    const [businessUnit, setBusinessUnit] = useState<BusinessUnit | null>(null);

    const environment = environments.find(env => env.id === environmentId);

    useEffect(() => {
        if (buId) {
            loadEnvironments(buId);
        }
        if (clientId) {
            getClient(clientId).then(setClient);
        }
        if (buId) {
            getBusinessUnit(buId).then(setBusinessUnit);
        }
    }, [buId, clientId, loadEnvironments]);

    const handleBack = () => {
        navigate(`/client/${clientId}/bu/${buId}`);
    };

    const breadcrumbItems = [
        { label: 'Home', path: '/' },
        { label: client?.name || 'Client', path: `/client/${clientId}` },
        { label: businessUnit?.name || 'Business Unit', path: `/client/${clientId}/bu/${buId}` },
        { label: environment?.name || 'Environment' },
    ];

    if (!environment) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Environment Not Found</h2>
                    <p className="text-gray-600 mb-6">The environment you're looking for doesn't exist or has been removed.</p>
                    <button
                        onClick={handleBack}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
            {/* Left Sidebar */}
            <aside className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
                {/* Top Section */}
                <div className="p-4 border-b border-gray-100">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">HyperFlow</h1>
                        <p className="text-xs text-gray-600 mt-1">Environment Details</p>
                    </div>
                </div>

                {/* Navigation/Content Area */}
                <div className="flex-1 p-4">
                    {/* Sidebar content can go here if needed */}
                </div>

                {/* Bottom Section - User Info */}
                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                {user?.email?.[0].toUpperCase() || 'U'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {user?.email?.split('@')[0] || 'User'}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={signOut}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                            title="Sign out"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm border-b border-gray-200 px-8 py-4">
                    <Breadcrumb items={breadcrumbItems} />
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto p-8">
                    <div className="space-y-8">
                        {/* Swimlane Diagram */}
                        <SwimlaneDiagram environmentId={environmentId} />
                    </div>
                </main>
            </div>
        </div>
    );
}

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEnvironmentStore } from '../store/environmentStore';
import { useAuth } from '../contexts/AuthContext';
import Breadcrumb from '../../../shared/components/Breadcrumb';
import SwimlaneDiagram from '../../../shared/components/SwimlaneDiagram';
import DocumentationSection from '../../../shared/components/DocumentationSection';
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

    const getEnvironmentTypeBadge = (type: string) => {
        const badges = {
            development: 'bg-blue-100 text-blue-800 border-blue-300',
            staging: 'bg-yellow-100 text-yellow-800 border-yellow-300',
            production: 'bg-green-100 text-green-800 border-green-300',
            testing: 'bg-purple-100 text-purple-800 border-purple-300',
        };
        return badges[type as keyof typeof badges] || badges.development;
    };

    const getAuthMethodLabel = (method?: string) => {
        const labels = {
            'api-key': 'API Key',
            'oauth': 'OAuth 2.0',
            'basic-auth': 'Basic Auth',
            'none': 'None',
        };
        return labels[method as keyof typeof labels] || 'Not Configured';
    };

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
                        <h1 className="text-2xl font-bold text-gray-900">Hypervision</h1>
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
                    <div className="max-w-7xl mx-auto space-y-8">
                        {/* Environment Header */}
                        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h1 className="text-3xl font-bold text-gray-900">{environment.name}</h1>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium border-2 ${getEnvironmentTypeBadge(environment.type)}`}>
                                            {environment.type.charAt(0).toUpperCase() + environment.type.slice(1)}
                                        </span>
                                        {environment.integrationType && (
                                            <span className="px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 border-2 border-indigo-300">
                                                {environment.integrationType.toUpperCase()}
                                            </span>
                                        )}
                                    </div>
                                    {environment.description && (
                                        <p className="text-gray-600">{environment.description}</p>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleBack}
                                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                        </svg>
                                        Back
                                    </button>
                                </div>
                            </div>

                            {/* Environment Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                    <div className="flex items-center gap-2 mb-2">
                                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                        </svg>
                                        <h3 className="font-semibold text-gray-900">Base URL</h3>
                                    </div>
                                    <p className="text-sm text-gray-700 break-all">{environment.baseUrl}</p>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                    <div className="flex items-center gap-2 mb-2">
                                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        <h3 className="font-semibold text-gray-900">Authentication</h3>
                                    </div>
                                    <p className="text-sm text-gray-700">{getAuthMethodLabel(environment.authMethod)}</p>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                    <div className="flex items-center gap-2 mb-2">
                                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <h3 className="font-semibold text-gray-900">Created</h3>
                                    </div>
                                    <p className="text-sm text-gray-700">
                                        {new Date(environment.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Swimlane Diagram */}
                        <SwimlaneDiagram integrationType={environment.integrationType} />

                        {/* Documentation Section */}
                        <DocumentationSection links={environment.documentationLinks} />
                    </div>
                </main>
            </div>
        </div>
    );
}

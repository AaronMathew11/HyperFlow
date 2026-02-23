import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEnvironmentStore } from '../store/environmentStore';
import Breadcrumb from '../../../shared/components/Breadcrumb';
import SwimlaneDiagram from '../../../shared/components/SwimlaneDiagram';
import { getClient, getBusinessUnit } from '../../../shared/lib/api';
import { Client, BusinessUnit } from '../../../shared/types';

export default function EnvironmentDetailPage() {
    const { clientId, buId, environmentId } = useParams<{ clientId: string; buId: string; environmentId: string }>();
    const { environments, loadEnvironments } = useEnvironmentStore();
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
        <div className="h-screen flex flex-col overflow-hidden">
            {/* Compact Header */}
            <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-3 flex items-center justify-between flex-shrink-0">
                <Breadcrumb items={breadcrumbItems} />
                <button
                    onClick={handleBack}
                    className="px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-1"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back
                </button>
            </header>

            {/* Full-page Swimlane */}
            <div className="flex-1 overflow-hidden">
                <SwimlaneDiagram environmentId={environmentId} />
            </div>
        </div>
    );
}

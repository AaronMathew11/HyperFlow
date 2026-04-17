import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEnvironmentStore } from '../store/environmentStore';
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
        if (buId) loadEnvironments(buId);
        if (clientId) getClient(clientId).then(setClient);
        if (buId) getBusinessUnit(buId).then(setBusinessUnit);
    }, [buId, clientId, loadEnvironments]);

    const handleBack = () => {
        navigate(`/client/${clientId}/bu/${buId}`);
    };

    const handleBreadcrumbNavigation = (level: 'clients' | 'businessUnits' | 'environments') => {
        switch (level) {
            case 'clients':
                navigate('/');
                break;
            case 'businessUnits':
                if (clientId) navigate(`/client/${clientId}`);
                break;
            case 'environments':
                if (clientId && buId) navigate(`/client/${clientId}/bu/${buId}`);
                break;
        }
    };

    const breadcrumbData = useMemo(() => ({
        client: client ? { name: client.name } : undefined,
        businessUnit: businessUnit ? { name: businessUnit.name } : undefined,
    }), [client, businessUnit]);

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
                        className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <SwimlaneDiagram
            environmentId={environmentId}
            boardName={environment.name}
            onBack={handleBack}
            breadcrumbData={breadcrumbData}
            onBreadcrumbNavigation={handleBreadcrumbNavigation}
        />
    );
}

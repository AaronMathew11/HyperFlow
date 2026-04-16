import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBusinessUnitStore } from '../store/businessUnitStore';

import CreateBusinessUnitModal from './CreateBusinessUnitModal';
import Breadcrumb from '../../../shared/components/Breadcrumb';
import { getClient } from '../../../shared/lib/api';
import { Client } from '../../../shared/types';
import TopNav from './TopNav';

export default function BusinessUnitsPage() {
    const { clientId } = useParams<{ clientId: string }>();
    const { businessUnits, loading, loadBusinessUnits, createBusinessUnit, deleteBusinessUnit } = useBusinessUnitStore();

    const navigate = useNavigate();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [client, setClient] = useState<Client | null>(null);

    useEffect(() => {
        if (clientId) {
            loadBusinessUnits(clientId);
            getClient(clientId).then(setClient);
        }
    }, [clientId, loadBusinessUnits]);

    const handleCreateBU = async (name: string, description?: string) => {
        if (!clientId) return;
        const newBU = await createBusinessUnit(clientId, name, description);
        if (newBU) {
            navigate(`/client/${clientId}/bu/${newBU.id}`);
        }
    };

    const handleOpenBU = (buId: string) => {
        navigate(`/client/${clientId}/bu/${buId}`);
    };

    const handleDeleteBU = async (buId: string) => {
        await deleteBusinessUnit(buId);
    };

    const breadcrumbItems = useMemo(() => [
        { label: 'Home', path: '/' },
        { label: client?.name || 'Loading...', path: clientId ? `/client/${clientId}` : undefined },
    ], [client, clientId]);

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <TopNav />

            <main className="flex-1 px-10 py-8 max-w-[1400px] w-full mx-auto">
                <Breadcrumb items={breadcrumbItems} />

                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900">Business Units</h2>
                        <p className="text-sm text-gray-500 mt-1">Manage business units for this client</p>
                    </div>

                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm rounded-xl hover:bg-black transition-all shadow-sm"
                    >
                        <span className="text-lg leading-none">+</span>
                        New Business Unit
                    </button>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-32">
                        <div className="animate-spin h-10 w-10 border-2 border-gray-300 border-t-gray-900 rounded-full" />
                    </div>
                ) : businessUnits.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 bg-white border border-gray-200 rounded-2xl">
                        <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No business units yet</h3>
                        <p className="text-gray-500 text-sm mt-1 mb-4">Create your first business unit</p>
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="px-4 py-2 bg-gray-900 text-white text-sm rounded-xl hover:bg-black"
                        >
                            Create Business Unit
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 gap-1">
                        {businessUnits.map((bu) => (
                            <div
                                key={bu.id}
                                className="flex flex-col items-center cursor-pointer group"
                                onClick={() => handleOpenBU(bu.id)}
                            >
                                {/* Business Unit Card */}
                                <div className="w-28 h-28 bg-white border border-gray-200 rounded-2xl flex items-center justify-center hover:shadow-md hover:border-gray-300 transition-all">
                                    <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Name below */}
                                <p className="mt-3 text-sm text-gray-800 text-center max-w-[110px] truncate">
                                    {bu.name}
                                </p>

                                {/* Delete */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteBU(bu.id);
                                    }}
                                    className="text-xs text-red-500 mt-1 opacity-0 group-hover:opacity-100 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <CreateBusinessUnitModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreateBU}
            />
        </div>
    );
}

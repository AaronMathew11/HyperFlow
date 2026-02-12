import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBusinessUnitStore } from '../store/businessUnitStore';
import { useAuth } from '../contexts/AuthContext';
import FolderCard from './FolderCard';
import CreateBusinessUnitModal from './CreateBusinessUnitModal';
import Breadcrumb from '../../../shared/components/Breadcrumb';
import { getClient } from '../../../shared/lib/api';
import { Client } from '../../../shared/types';

export default function BusinessUnitsPage() {
    const { clientId } = useParams<{ clientId: string }>();
    const { businessUnits, loading, loadBusinessUnits, createBusinessUnit, deleteBusinessUnit } = useBusinessUnitStore();
    const { user, signOut } = useAuth();
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

    const breadcrumbItems = [
        { label: 'Home', path: '/' },
        { label: client?.name || 'Client' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
            {/* Left Sidebar */}
            <aside className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
                {/* Top Section */}
                <div className="p-4 border-b border-gray-100">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Hypervision</h1>
                        <p className="text-xs text-gray-600 mt-1">Workflow Management</p>
                    </div>
                </div>

                {/* Navigation/Content Area */}
                <div className="flex-1 p-4">
                    {/* Sidebar content can go here if needed */}
                </div>

                {/* Bottom Account Section */}
                <div className="p-6 border-t border-gray-100">
                    {user && (
                        <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-blue-600"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                                <button
                                    onClick={signOut}
                                    className="text-xs text-gray-500 hover:text-red-600 transition-colors mt-1"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <Breadcrumb items={breadcrumbItems} />

                {/* Page Title and Create Button */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Business Units</h2>
                        <p className="text-gray-600 mt-2">
                            {businessUnits.length} {businessUnits.length === 1 ? 'business unit' : 'business units'}
                        </p>
                    </div>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Create Business Unit
                    </button>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                            <p className="mt-4 text-gray-600">Loading business units...</p>
                        </div>
                    </div>
                ) : businessUnits.length === 0 ? (
                    <div className="text-center py-20">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-24 w-24 mx-auto text-gray-300 mb-4"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 9h-15a4.483 4.483 0 00-3 1.146z" />
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No business units yet</h3>
                        <p className="text-gray-600 mb-6">Create your first business unit in this client</p>
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Create First Business Unit
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {businessUnits.map((bu) => (
                            <FolderCard
                                key={bu.id}
                                id={bu.id}
                                name={bu.name}
                                description={bu.description}
                                color="purple"
                                onOpen={() => handleOpenBU(bu.id)}
                                onDelete={handleDeleteBU}
                            />
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

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClientStore } from '../store/clientStore';

import FolderCard from './FolderCard';
import CreateClientModal from './CreateClientModal';
import TopNav from './TopNav';
import Breadcrumb from '../../../shared/components/Breadcrumb';

export default function ClientsPage() {
    const { clients, loading, loadClients, createClient, deleteClient } = useClientStore();

    const navigate = useNavigate();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    useEffect(() => {
        loadClients();
    }, [loadClients]);

    const handleCreateClient = async (name: string, description?: string) => {
        const newClient = await createClient(name, description);
        if (newClient) {
            navigate(`/client/${newClient.id}`);
        }
    };

    const handleOpenClient = (clientId: string) => {
        navigate(`/client/${clientId}`);
    };

    const handleDeleteClient = async (clientId: string) => {
        await deleteClient(clientId);
    };

    const breadcrumbItems = [{ label: 'Home' }];

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <TopNav />

            <main className="flex-1 px-10 py-8 max-w-[1400px] w-full mx-auto">
                <Breadcrumb items={breadcrumbItems} />

                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900">Clients</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Manage and organize your clients
                        </p>
                    </div>

                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm rounded-xl hover:bg-black transition-all shadow-sm"
                    >
                        <span className="text-lg leading-none">+</span>
                        New Client
                    </button>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex items-center justify-center py-32">
                        <div className="animate-spin h-10 w-10 border-2 border-gray-300 border-t-gray-900 rounded-full" />
                    </div>
                ) : clients.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 bg-white border border-gray-200 rounded-2xl">
                        <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No clients yet</h3>
                        <p className="text-gray-500 text-sm mt-1 mb-4">Start by creating your first client</p>
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="px-4 py-2 bg-gray-900 text-white text-sm rounded-xl hover:bg-black"
                        >
                            Create Client
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 gap-1">
                        {clients.map((client) => (
                            <div
                                key={client.id}
                                className="flex flex-col items-center cursor-pointer group"
                                onClick={() => handleOpenClient(client.id)}
                            >
                                {/* Client Card */}
                                <div className="w-28 h-28 bg-white border border-gray-200 rounded-2xl flex items-center justify-center hover:shadow-md hover:border-gray-300 transition-all">
                                    <div className="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Name below card */}
                                <p className="mt-3 text-sm text-gray-800 text-center max-w-[110px] truncate">
                                    {client.name}
                                </p>

                                {/* Delete (on hover) */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteClient(client.id);
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

            <CreateClientModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreateClient}
                existingClients={clients}
            />
        </div>
    );
}

import { create } from 'zustand';
import { Client } from '../../shared/types';

interface ClientState {
    clients: Client[];
    currentClient: Client | null;
    loading: boolean;
    error: string | null;
    loadClients: () => Promise<void>;
    createClient: (name: string, description?: string) => Promise<Client | null>;
    deleteClient: (clientId: string) => Promise<void>;
    setCurrentClient: (client: Client | null) => void;
}

export const useClientStore = create<ClientState>((set) => ({
    clients: [],
    currentClient: null,
    loading: false,
    error: null,

    loadClients: async () => {
        set({ loading: true, error: null });
        try {
            const { fetchClients } = await import('../lib/api');
            const clients = await fetchClients();
            set({ clients, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
            console.error('Error loading clients:', error);
        }
    },

    createClient: async (name: string, description?: string) => {
        set({ loading: true, error: null });
        try {
            const { createClient: apiCreateClient } = await import('../lib/api');
            const newClient = await apiCreateClient(name, description);

            if (!newClient) {
                throw new Error('Failed to create client');
            }

            set(state => ({
                clients: [newClient, ...state.clients],
                loading: false,
            }));

            return newClient;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            console.error('Error creating client:', error);
            return null;
        }
    },

    deleteClient: async (clientId: string) => {
        set({ loading: true, error: null });
        try {
            const { deleteClient: apiDeleteClient } = await import('../lib/api');
            const success = await apiDeleteClient(clientId);

            if (!success) {
                throw new Error('Failed to delete client');
            }

            set(state => ({
                clients: state.clients.filter(client => client.id !== clientId),
                currentClient: state.currentClient?.id === clientId ? null : state.currentClient,
                loading: false,
            }));
        } catch (error: any) {
            set({ error: error.message, loading: false });
            console.error('Error deleting client:', error);
        }
    },

    setCurrentClient: (client: Client | null) => {
        set({ currentClient: client });
    },
}));

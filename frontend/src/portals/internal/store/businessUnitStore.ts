import { create } from 'zustand';
import { BusinessUnit } from '../../shared/types';

interface BusinessUnitState {
    businessUnits: BusinessUnit[];
    currentBusinessUnit: BusinessUnit | null;
    loading: boolean;
    error: string | null;
    loadBusinessUnits: (clientId: string) => Promise<void>;
    createBusinessUnit: (clientId: string, name: string, description?: string) => Promise<BusinessUnit | null>;
    deleteBusinessUnit: (buId: string) => Promise<void>;
    setCurrentBusinessUnit: (bu: BusinessUnit | null) => void;
    clearBusinessUnits: () => void;
}

export const useBusinessUnitStore = create<BusinessUnitState>((set) => ({
    businessUnits: [],
    currentBusinessUnit: null,
    loading: false,
    error: null,

    loadBusinessUnits: async (clientId: string) => {
        set({ loading: true, error: null });
        try {
            const { fetchBusinessUnits } = await import('../lib/api');
            const businessUnits = await fetchBusinessUnits(clientId);
            set({ businessUnits, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
            console.error('Error loading business units:', error);
        }
    },

    createBusinessUnit: async (clientId: string, name: string, description?: string) => {
        set({ loading: true, error: null });
        try {
            const { createBusinessUnit: apiCreateBU } = await import('../lib/api');
            const newBU = await apiCreateBU(clientId, name, description);

            if (!newBU) {
                throw new Error('Failed to create business unit');
            }

            set(state => ({
                businessUnits: [newBU, ...state.businessUnits],
                loading: false,
            }));

            return newBU;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            console.error('Error creating business unit:', error);
            return null;
        }
    },

    deleteBusinessUnit: async (buId: string) => {
        set({ loading: true, error: null });
        try {
            const { deleteBusinessUnit: apiDeleteBU } = await import('../lib/api');
            const success = await apiDeleteBU(buId);

            if (!success) {
                throw new Error('Failed to delete business unit');
            }

            set(state => ({
                businessUnits: state.businessUnits.filter(bu => bu.id !== buId),
                currentBusinessUnit: state.currentBusinessUnit?.id === buId ? null : state.currentBusinessUnit,
                loading: false,
            }));
        } catch (error: any) {
            set({ error: error.message, loading: false });
            console.error('Error deleting business unit:', error);
        }
    },

    setCurrentBusinessUnit: (bu: BusinessUnit | null) => {
        set({ currentBusinessUnit: bu });
    },

    clearBusinessUnits: () => {
        set({ businessUnits: [], currentBusinessUnit: null });
    },
}));

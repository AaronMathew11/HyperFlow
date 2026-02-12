import { create } from 'zustand';
import { Workflow, Environment } from '../../../shared/types';

interface CustomerStore {
  workflows: Workflow[];
  environments: Environment[];
  loading: boolean;

  // Actions
  setWorkflows: (workflows: Workflow[]) => void;
  setEnvironments: (environments: Environment[]) => void;
  setLoading: (loading: boolean) => void;

  // API calls
  loadWorkflows: (businessUnitId: string) => Promise<void>;
  loadEnvironments: (businessUnitId: string) => Promise<void>;
}

export const useCustomerStore = create<CustomerStore>((set) => ({
  workflows: [],
  environments: [],
  loading: false,

  setWorkflows: (workflows) => set({ workflows }),
  setEnvironments: (environments) => set({ environments }),
  setLoading: (loading) => set({ loading }),

  loadWorkflows: async (businessUnitId: string) => {
    set({ loading: true });
    try {
      // TODO: Call backend API for customer workflows
      // For now, mock the data
      const mockWorkflows: Workflow[] = [
        {
          id: '1',
          name: 'User Verification Flow',
          description: 'Complete user verification process',
          business_unit_id: businessUnitId,
          owner_id: 'owner-1',
          flow_data: {
            nodes: [],
            edges: [],
          },
          environment_ids: ['env-1', 'env-2'],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];

      set({ workflows: mockWorkflows });
    } catch (error) {
      console.error('Error loading workflows:', error);
      set({ workflows: [] });
    } finally {
      set({ loading: false });
    }
  },

  loadEnvironments: async (businessUnitId: string) => {
    try {
      // TODO: Call backend API for customer environments
      // For now, mock the data
      const mockEnvironments: Environment[] = [
        {
          id: 'env-1',
          name: 'Production',
          type: 'production',
          baseUrl: 'https://api.example.com',
          business_unit_id: businessUnitId,
          owner_id: 'owner-1',
          description: 'Production environment',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];

      set({ environments: mockEnvironments });
    } catch (error) {
      console.error('Error loading environments:', error);
      set({ environments: [] });
    }
  },
}));
import { create } from 'zustand';
import { Environment } from '../../shared/types';
import { EnvironmentFormData } from '../components/CreateEnvironmentModal';

interface EnvironmentStore {
  environments: Environment[];
  loading: boolean;
  error: string | null;
  loadEnvironments: (businessUnitId: string) => Promise<void>;
  createEnvironment: (businessUnitId: string, data: EnvironmentFormData) => Promise<Environment | null>;
  updateEnvironment: (id: string, data: Partial<EnvironmentFormData>) => Promise<void>;
  deleteEnvironment: (id: string) => Promise<void>;
}

export const useEnvironmentStore = create<EnvironmentStore>((set) => ({
  environments: [],
  loading: false,
  error: null,

  loadEnvironments: async (businessUnitId: string) => {
    set({ loading: true, error: null });
    try {
      // TODO: Replace with actual API call
      const mockEnvironments: Environment[] = [
        {
          id: '1',
          name: 'Development',
          description: 'Development environment',
          type: 'development',
          baseUrl: 'https://dev-api.example.com',
          authMethod: 'api-key',
          apiKey: '***',
          headers: { 'Content-Type': 'application/json' },
          variables: { 'DEBUG': 'true' },
          business_unit_id: businessUnitId,
          owner_id: 'user1',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
      
      set({ environments: mockEnvironments, loading: false });
    } catch (error) {
      console.error('Error loading environments:', error);
      set({ error: 'Failed to load environments', loading: false });
    }
  },

  createEnvironment: async (businessUnitId: string, data: EnvironmentFormData) => {
    set({ loading: true, error: null });
    try {
      // TODO: Replace with actual API call
      const newEnvironment: Environment = {
        id: Date.now().toString(),
        name: data.name,
        description: data.description,
        type: 'development', // Default type based on form data
        baseUrl: 'https://api.example.com', // Default URL
        authMethod: 'api-key',
        apiKey: undefined,
        headers: undefined,
        variables: undefined,
        business_unit_id: businessUnitId,
        owner_id: 'user1', // TODO: Get from auth
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      set(state => ({
        environments: [...state.environments, newEnvironment],
        loading: false
      }));

      return newEnvironment;
    } catch (error) {
      console.error('Error creating environment:', error);
      set({ error: 'Failed to create environment', loading: false });
      return null;
    }
  },

  updateEnvironment: async (id: string, data: Partial<EnvironmentFormData>) => {
    set({ loading: true, error: null });
    try {
      // TODO: Replace with actual API call
      set(state => ({
        environments: state.environments.map(env =>
          env.id === id
            ? { ...env, ...data, updated_at: new Date().toISOString() }
            : env
        ),
        loading: false
      }));
    } catch (error) {
      console.error('Error updating environment:', error);
      set({ error: 'Failed to update environment', loading: false });
    }
  },

  deleteEnvironment: async (id: string) => {
    set({ loading: true, error: null });
    try {
      // TODO: Replace with actual API call
      set(state => ({
        environments: state.environments.filter(env => env.id !== id),
        loading: false
      }));
    } catch (error) {
      console.error('Error deleting environment:', error);
      set({ error: 'Failed to delete environment', loading: false });
    }
  }
}));
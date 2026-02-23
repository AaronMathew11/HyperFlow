import { create } from 'zustand';
import { Environment, WorkflowEnvironment } from '../../../shared/types';
import { EnvironmentFormData } from '../components/CreateEnvironmentModal';
import * as api from '../../../shared/lib/api';

interface EnvironmentStore {
  environments: Environment[];
  loading: boolean;
  error: string | null;
  loadEnvironments: (businessUnitId: string) => Promise<void>;
  createEnvironment: (businessUnitId: string, data: EnvironmentFormData) => Promise<Environment | null>;
  updateEnvironment: (id: string, data: Partial<EnvironmentFormData>) => Promise<void>;
  deleteEnvironment: (id: string) => Promise<void>;
  // Workflow-environment linking
  linkWorkflowToEnvironment: (workflowId: string, environmentId: string) => Promise<void>;
  unlinkWorkflowFromEnvironment: (workflowId: string, environmentId: string) => Promise<void>;
  getWorkflowEnvironments: (workflowId: string) => Promise<WorkflowEnvironment[]>;
}

export const useEnvironmentStore = create<EnvironmentStore>((set) => ({
  environments: [],
  loading: false,
  error: null,

  loadEnvironments: async (businessUnitId: string) => {
    set({ loading: true, error: null });
    try {
      const environments = await api.fetchEnvironments(businessUnitId);
      set({ environments, loading: false });
    } catch (error) {
      console.error('Error loading environments:', error);
      set({ error: 'Failed to load environments', loading: false });
    }
  },

  createEnvironment: async (businessUnitId: string, data: EnvironmentFormData) => {
    set({ loading: true, error: null });
    try {
      const newEnvironment = await api.createEnvironment(businessUnitId, {
        name: data.name,
        description: data.description,
        type: data.type,
        base_url: data.base_url,
        integration_type: data.integrationType,
        variables: {
          uses_results_api: data.usesResultsApi,
          uses_outputs_api: data.usesOutputsApi,
          relies_on_webhooks: data.reliesOnWebhooks,
          sdk_platform: data.sdkPlatform
        }
      });

      if (newEnvironment) {
        set(state => ({
          environments: [...state.environments, newEnvironment],
          loading: false
        }));
      } else {
        set({ error: 'Failed to create environment', loading: false });
      }

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
      const success = await api.updateEnvironment(id, data);

      if (success) {
        set(state => ({
          environments: state.environments.map(env =>
            env.id === id
              ? { ...env, ...data, updated_at: new Date().toISOString() }
              : env
          ),
          loading: false
        }));
      } else {
        set({ error: 'Failed to update environment', loading: false });
      }
    } catch (error) {
      console.error('Error updating environment:', error);
      set({ error: 'Failed to update environment', loading: false });
    }
  },

  deleteEnvironment: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const success = await api.deleteEnvironment(id);

      if (success) {
        set(state => ({
          environments: state.environments.filter(env => env.id !== id),
          loading: false
        }));
      } else {
        set({ error: 'Failed to delete environment', loading: false });
      }
    } catch (error) {
      console.error('Error deleting environment:', error);
      set({ error: 'Failed to delete environment', loading: false });
    }
  },

  linkWorkflowToEnvironment: async (workflowId: string, environmentId: string) => {
    set({ loading: true, error: null });
    try {
      await api.linkWorkflowToEnvironment(workflowId, environmentId);
      set({ loading: false });
    } catch (error) {
      console.error('Error linking workflow to environment:', error);
      set({ error: 'Failed to link workflow', loading: false });
    }
  },

  unlinkWorkflowFromEnvironment: async (workflowId: string, environmentId: string) => {
    set({ loading: true, error: null });
    try {
      await api.unlinkWorkflowFromEnvironment(workflowId, environmentId);
      set({ loading: false });
    } catch (error) {
      console.error('Error unlinking workflow from environment:', error);
      set({ error: 'Failed to unlink workflow', loading: false });
    }
  },

  getWorkflowEnvironments: async (workflowId: string) => {
    try {
      return await api.getWorkflowEnvironments(workflowId);
    } catch (error) {
      console.error('Error getting workflow environments:', error);
      return [];
    }
  }
}));
import { create } from 'zustand';
import { Workflow } from '../../shared/types';

interface WorkflowState {
    workflows: Workflow[];
    currentWorkflow: Workflow | null;
    loading: boolean;
    error: string | null;
    loadWorkflows: (buId: string) => Promise<void>;
    createWorkflow: (buId: string, name: string, description?: string, environmentIds?: string[]) => Promise<Workflow | null>;
    deleteWorkflow: (workflowId: string) => Promise<void>;
    setCurrentWorkflow: (workflow: Workflow | null) => void;
    saveCurrentWorkflowData: (flowData: Workflow['flow_data']) => Promise<void>;
    clearWorkflows: () => void;
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
    workflows: [],
    currentWorkflow: null,
    loading: false,
    error: null,

    loadWorkflows: async (buId: string) => {
        set({ loading: true, error: null });
        try {
            const { fetchWorkflows } = await import('../lib/api');
            const workflows = await fetchWorkflows(buId);
            set({ workflows, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
            console.error('Error loading workflows:', error);
        }
    },

    createWorkflow: async (buId: string, name: string, description?: string, environmentIds?: string[]) => {
        set({ loading: true, error: null });
        try {
            const { createWorkflow: apiCreateWorkflow } = await import('../lib/api');
            const newWorkflow = await apiCreateWorkflow(buId, name, description);

            if (!newWorkflow) {
                throw new Error('Failed to create workflow');
            }

            set(state => ({
                workflows: [newWorkflow, ...state.workflows],
                loading: false,
            }));

            return newWorkflow;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            console.error('Error creating workflow:', error);
            return null;
        }
    },

    deleteWorkflow: async (workflowId: string) => {
        set({ loading: true, error: null });
        try {
            const { deleteWorkflow: apiDeleteWorkflow } = await import('../lib/api');
            const success = await apiDeleteWorkflow(workflowId);

            if (!success) {
                throw new Error('Failed to delete workflow');
            }

            set(state => ({
                workflows: state.workflows.filter(w => w.id !== workflowId),
                currentWorkflow: state.currentWorkflow?.id === workflowId ? null : state.currentWorkflow,
                loading: false,
            }));
        } catch (error: any) {
            set({ error: error.message, loading: false });
            console.error('Error deleting workflow:', error);
        }
    },

    setCurrentWorkflow: (workflow: Workflow | null) => {
        set({ currentWorkflow: workflow });
    },

    saveCurrentWorkflowData: async (flowData: Workflow['flow_data']) => {
        const { currentWorkflow } = get();
        if (!currentWorkflow) return;

        try {
            const { updateWorkflow } = await import('../lib/api');
            await updateWorkflow(currentWorkflow.id, { flow_data: flowData });

            set(state => ({
                workflows: state.workflows.map(w =>
                    w.id === currentWorkflow.id
                        ? { ...w, flow_data: flowData, updated_at: new Date().toISOString() }
                        : w
                ),
                currentWorkflow: {
                    ...currentWorkflow,
                    flow_data: flowData,
                    updated_at: new Date().toISOString(),
                },
            }));
        } catch (error: any) {
            console.error('Error saving workflow data:', error);
        }
    },

    clearWorkflows: () => {
        set({ workflows: [], currentWorkflow: null });
    },
}));

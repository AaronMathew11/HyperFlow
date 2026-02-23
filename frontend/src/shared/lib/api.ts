import { supabase } from './supabase';
import { Board, AccessLink, CreateLinkResponse, PublicBoardData, Client, BusinessUnit, Workflow, Environment, WorkflowEnvironment } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// ============ HELPER FUNCTION ============

async function getAuthHeaders(): Promise<HeadersInit | null> {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) {
        console.error('No access token found');
        return null;
    }
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
    };
}

// ============ CLIENTS API ============

export async function fetchClients(): Promise<Client[]> {
    try {
        const headers = await getAuthHeaders();
        if (!headers) return [];

        const response = await fetch(`${API_URL}/api/clients`, {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            console.error('Failed to fetch clients:', response.status);
            return [];
        }

        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error('Error fetching clients:', error);
        return [];
    }
}

export async function createClient(name: string, description?: string): Promise<Client | null> {
    try {
        const headers = await getAuthHeaders();
        if (!headers) return null;

        const response = await fetch(`${API_URL}/api/clients`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ name, description }),
        });

        if (!response.ok) {
            console.error('Failed to create client:', response.status);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating client:', error);
        return null;
    }
}

export async function getClient(clientId: string): Promise<Client | null> {
    try {
        const headers = await getAuthHeaders();
        if (!headers) return null;

        const response = await fetch(`${API_URL}/api/clients/${clientId}`, {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            console.error('Failed to get client:', response.status);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Error getting client:', error);
        return null;
    }
}

export async function deleteClient(clientId: string): Promise<boolean> {
    try {
        const headers = await getAuthHeaders();
        if (!headers) return false;

        const response = await fetch(`${API_URL}/api/clients/${clientId}`, {
            method: 'DELETE',
            headers,
        });

        return response.ok;
    } catch (error) {
        console.error('Error deleting client:', error);
        return false;
    }
}

// ============ BUSINESS UNITS API ============

export async function fetchBusinessUnits(clientId: string): Promise<BusinessUnit[]> {
    try {
        const headers = await getAuthHeaders();
        if (!headers) return [];

        const response = await fetch(`${API_URL}/api/clients/${clientId}/business-units`, {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            console.error('Failed to fetch business units:', response.status);
            return [];
        }

        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error('Error fetching business units:', error);
        return [];
    }
}

export async function createBusinessUnit(clientId: string, name: string, description?: string): Promise<BusinessUnit | null> {
    try {
        const headers = await getAuthHeaders();
        if (!headers) return null;

        const response = await fetch(`${API_URL}/api/clients/${clientId}/business-units`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ name, description }),
        });

        if (!response.ok) {
            console.error('Failed to create business unit:', response.status);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating business unit:', error);
        return null;
    }
}

export async function getBusinessUnit(buId: string): Promise<BusinessUnit | null> {
    try {
        const headers = await getAuthHeaders();
        if (!headers) return null;

        const response = await fetch(`${API_URL}/api/business-units/${buId}`, {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            console.error('Failed to get business unit:', response.status);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Error getting business unit:', error);
        return null;
    }
}

export async function deleteBusinessUnit(buId: string): Promise<boolean> {
    try {
        const headers = await getAuthHeaders();
        if (!headers) return false;

        const response = await fetch(`${API_URL}/api/business-units/${buId}`, {
            method: 'DELETE',
            headers,
        });

        return response.ok;
    } catch (error) {
        console.error('Error deleting business unit:', error);
        return false;
    }
}

// ============ WORKFLOWS API ============

export async function fetchWorkflows(buId: string): Promise<Workflow[]> {
    try {
        const headers = await getAuthHeaders();
        if (!headers) return [];

        const response = await fetch(`${API_URL}/api/business-units/${buId}/workflows`, {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            console.error('Failed to fetch workflows:', response.status);
            return [];
        }

        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error('Error fetching workflows:', error);
        return [];
    }
}

export async function createWorkflow(buId: string, name: string, description?: string): Promise<Workflow | null> {
    try {
        const headers = await getAuthHeaders();
        if (!headers) return null;

        const response = await fetch(`${API_URL}/api/business-units/${buId}/workflows`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ name, description }),
        });

        if (!response.ok) {
            console.error('Failed to create workflow:', response.status);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating workflow:', error);
        return null;
    }
}

export async function getWorkflow(workflowId: string): Promise<Workflow | null> {
    try {
        const headers = await getAuthHeaders();
        if (!headers) return null;

        const response = await fetch(`${API_URL}/api/workflows/${workflowId}`, {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            console.error('Failed to get workflow:', response.status);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Error getting workflow:', error);
        return null;
    }
}

export async function updateWorkflow(workflowId: string, updates: { name?: string; description?: string; flow_data?: Workflow['flow_data'] }): Promise<boolean> {
    try {
        const headers = await getAuthHeaders();
        if (!headers) return false;

        const response = await fetch(`${API_URL}/api/workflows/${workflowId}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(updates),
        });

        return response.ok;
    } catch (error) {
        console.error('Error updating workflow:', error);
        return false;
    }
}

export async function deleteWorkflow(workflowId: string): Promise<boolean> {
    try {
        const headers = await getAuthHeaders();
        if (!headers) return false;

        const response = await fetch(`${API_URL}/api/workflows/${workflowId}`, {
            method: 'DELETE',
            headers,
        });

        return response.ok;
    } catch (error) {
        console.error('Error deleting workflow:', error);
        return false;
    }
}

// ============ LEGACY BOARD API ============

interface CreateBoardRequest {
    title: string;
    description?: string;
}

interface CreateBoardResponse {
    id: string;
    title?: string;
    name?: string;
    description?: string;
    user_id: string;
    created_at: string;
    updated_at: string;
}

export async function createBoard(title: string, description?: string): Promise<Board | null> {
    try {
        // Get the current session to retrieve the access token
        const { data: { session } } = await supabase.auth.getSession();

        if (!session?.access_token) {
            console.error('No access token found');
            return null;
        }

        const requestBody: CreateBoardRequest = {
            title,
            description,
        };

        const response = await fetch(`${API_URL}/api/boards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.access_token}`,
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Failed to create board:', response.status, errorText);
            return null;
        }

        const data: CreateBoardResponse = await response.json();

        console.log('Create Board API Response:', data);

        // Use the response data directly - handle both title and name fields
        const board: Board = {
            id: data.id,
            name: data.title || data.name || 'Untitled Board',
            description: data.description || '',
            user_id: data.user_id,
            flow_data: {
                nodes: [],
                edges: [],
                flowInputs: '',
                flowOutputs: '',
            },
            created_at: data.created_at,
            updated_at: data.updated_at,
        };

        console.log('Transformed Board:', board);

        return board;
    } catch (error) {
        console.error('Error creating board:', error);
        return null;
    }
}

export async function fetchBoards(): Promise<Board[]> {
    try {
        // Get the current session to retrieve the access token
        const { data: { session } } = await supabase.auth.getSession();

        if (!session?.access_token) {
            console.error('No access token found');
            return [];
        }

        const response = await fetch(`${API_URL}/api/boards`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.access_token}`,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Failed to fetch boards:', response.status, errorText);
            return [];
        }

        const data: CreateBoardResponse[] = await response.json();

        console.log('Fetch Boards API Response:', data);

        // Transform the response data to Board type - handle both title and name fields
        const boards: Board[] = data.map(item => ({
            id: item.id,
            name: item.title || item.name || 'Untitled Board',
            description: item.description || '',
            user_id: item.user_id,
            flow_data: {
                nodes: [],
                edges: [],
                flowInputs: '',
                flowOutputs: '',
            },
            created_at: item.created_at,
            updated_at: item.updated_at,
        }));

        console.log('Transformed Boards:', boards);

        return boards;
    } catch (error) {
        console.error('Error fetching boards:', error);
        return [];
    }
}

export async function deleteBoard(boardId: string): Promise<boolean> {
    try {
        // Get the current session to retrieve the access token
        const { data: { session } } = await supabase.auth.getSession();

        if (!session?.access_token) {
            console.error('No access token found');
            return false;
        }

        const response = await fetch(`${API_URL}/api/boards/${boardId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${session.access_token}`,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Failed to delete board:', response.status, errorText);
            return false;
        }

        console.log('Board deleted successfully:', boardId);
        return true;
    } catch (error) {
        console.error('Error deleting board:', error);
        return false;
    }
}

// ============ WORKFLOW SNAPSHOT API ============

export interface WorkflowData {
    nodes: any[];
    edges: any[];
    flowInputs: string;
    flowOutputs: string;
}

export interface SaveWorkflowResponse {
    message: string;
    updated_at: string;
}

export async function saveWorkflow(boardId: string, data: WorkflowData): Promise<SaveWorkflowResponse | null> {
    try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session?.access_token) {
            console.error('No access token found');
            return null;
        }

        const response = await fetch(`${API_URL}/api/workflows/${boardId}/snapshot`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.access_token}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Failed to save workflow:', response.status, errorText);
            return null;
        }

        const result: SaveWorkflowResponse = await response.json();
        console.log('Workflow saved successfully:', result);
        return result;
    } catch (error) {
        console.error('Error saving workflow:', error);
        return null;
    }
}

export async function fetchWorkflowSnapshot(boardId: string): Promise<WorkflowData | null> {
    try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session?.access_token) {
            console.error('No access token found');
            return null;
        }

        const response = await fetch(`${API_URL}/api/workflows/${boardId}/snapshot`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.access_token}`,
            },
        });

        if (!response.ok) {
            // No snapshot exists yet - return empty workflow
            if (response.status === 404) {
                return {
                    nodes: [],
                    edges: [],
                    flowInputs: '',
                    flowOutputs: '',
                };
            }
            console.error('Failed to fetch workflow snapshot:', response.status);
            return null;
        }

        const result = await response.json();
        // Handle object response from backend
        if (result && result.data) {
            return result.data as WorkflowData;
        }
        // Return empty workflow if no data
        return {
            nodes: [],
            edges: [],
            flowInputs: '',
            flowOutputs: '',
        };
    } catch (error) {
        console.error('Error fetching workflow snapshot:', error);
        return null;
    }
}

// ============ ACCESS LINK FUNCTIONS ============

export async function createAccessLink(
    boardId: string,
    role: 'viewer' | 'editor' = 'viewer',
    expiresIn?: number
): Promise<CreateLinkResponse | null> {
    try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session?.access_token) {
            console.error('No access token found');
            return null;
        }

        const response = await fetch(`${API_URL}/api/boards/${boardId}/links`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.access_token}`,
            },
            body: JSON.stringify({ role, expiresIn }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Failed to create access link:', response.status, errorText);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating access link:', error);
        return null;
    }
}

export async function listAccessLinks(boardId: string): Promise<AccessLink[]> {
    try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session?.access_token) {
            console.error('No access token found');
            return [];
        }

        const response = await fetch(`${API_URL}/api/boards/${boardId}/links`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${session.access_token}`,
            },
        });

        if (!response.ok) {
            console.error('Failed to list access links:', response.status);
            return [];
        }

        return await response.json();
    } catch (error) {
        console.error('Error listing access links:', error);
        return [];
    }
}

export async function revokeAccessLink(boardId: string, linkId: string): Promise<boolean> {
    try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session?.access_token) {
            console.error('No access token found');
            return false;
        }

        const response = await fetch(`${API_URL}/api/boards/${boardId}/links/${linkId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${session.access_token}`,
            },
        });

        return response.ok;
    } catch (error) {
        console.error('Error revoking access link:', error);
        return false;
    }
}

// ============ PUBLIC API FUNCTIONS (no auth required) ============

export async function verifyLinkPassword(
    linkId: string,
    password: string
): Promise<{ boardId: string; role: string } | null> {
    try {
        const response = await fetch(`${API_URL}/api/public/links/${linkId}/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password }),
        });

        if (!response.ok) {
            if (response.status === 410) {
                throw new Error('Link has expired');
            }
            if (response.status === 401) {
                throw new Error('Invalid password');
            }
            throw new Error('Failed to verify link');
        }

        return await response.json();
    } catch (error) {
        console.error('Error verifying link password:', error);
        throw error;
    }
}

export async function getPublicBoard(
    linkId: string,
    password: string
): Promise<PublicBoardData | null> {
    try {
        const response = await fetch(
            `${API_URL}/api/public/links/${linkId}/board?token=${encodeURIComponent(password)}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            if (response.status === 410) {
                throw new Error('Link has expired');
            }
            throw new Error('Failed to fetch board');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching public board:', error);
        throw error;
    }
}

// ============ ENVIRONMENTS API ============

export async function fetchEnvironments(businessUnitId: string): Promise<Environment[]> {
    try {
        const headers = await getAuthHeaders();
        if (!headers) return [];

        const response = await fetch(`${API_URL}/api/business-units/${businessUnitId}/environments`, {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            console.error('Failed to fetch environments:', response.status);
            return [];
        }

        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error('Error fetching environments:', error);
        return [];
    }
}

export async function createEnvironment(businessUnitId: string, data: Partial<Environment>): Promise<Environment | null> {
    try {
        const headers = await getAuthHeaders();
        if (!headers) return null;

        const response = await fetch(`${API_URL}/api/business-units/${businessUnitId}/environments`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            console.error('Failed to create environment:', response.status);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating environment:', error);
        return null;
    }
}

export async function getEnvironment(environmentId: string): Promise<Environment | null> {
    try {
        const headers = await getAuthHeaders();
        if (!headers) return null;

        const response = await fetch(`${API_URL}/api/environments/${environmentId}`, {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            console.error('Failed to get environment:', response.status);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Error getting environment:', error);
        return null;
    }
}

export async function updateEnvironment(environmentId: string, data: Partial<Environment>): Promise<boolean> {
    try {
        const headers = await getAuthHeaders();
        if (!headers) return false;

        const response = await fetch(`${API_URL}/api/environments/${environmentId}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(data),
        });

        return response.ok;
    } catch (error) {
        console.error('Error updating environment:', error);
        return false;
    }
}

export async function deleteEnvironment(environmentId: string): Promise<boolean> {
    try {
        const headers = await getAuthHeaders();
        if (!headers) return false;

        const response = await fetch(`${API_URL}/api/environments/${environmentId}`, {
            method: 'DELETE',
            headers,
        });

        return response.ok;
    } catch (error) {
        console.error('Error deleting environment:', error);
        return false;
    }
}

// ============ WORKFLOW-ENVIRONMENT RELATIONSHIPS API ============

export async function linkWorkflowToEnvironment(workflowId: string, environmentId: string): Promise<WorkflowEnvironment | null> {
    try {
        const headers = await getAuthHeaders();
        if (!headers) return null;

        const response = await fetch(`${API_URL}/api/workflows/${workflowId}/environments/${environmentId}`, {
            method: 'POST',
            headers,
        });

        if (!response.ok) {
            console.error('Failed to link workflow to environment:', response.status);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Error linking workflow to environment:', error);
        return null;
    }
}

export async function unlinkWorkflowFromEnvironment(workflowId: string, environmentId: string): Promise<boolean> {
    try {
        const headers = await getAuthHeaders();
        if (!headers) return false;

        const response = await fetch(`${API_URL}/api/workflows/${workflowId}/environments/${environmentId}`, {
            method: 'DELETE',
            headers,
        });

        return response.ok;
    } catch (error) {
        console.error('Error unlinking workflow from environment:', error);
        return false;
    }
}

export async function getWorkflowEnvironments(workflowId: string): Promise<WorkflowEnvironment[]> {
    try {
        const headers = await getAuthHeaders();
        if (!headers) return [];

        const response = await fetch(`${API_URL}/api/workflows/${workflowId}/environments`, {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            console.error('Failed to get workflow environments:', response.status);
            return [];
        }

        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error('Error getting workflow environments:', error);
        return [];
    }
}

export async function getEnvironmentWorkflows(environmentId: string): Promise<WorkflowEnvironment[]> {
    try {
        const headers = await getAuthHeaders();
        if (!headers) return [];

        const response = await fetch(`${API_URL}/api/environments/${environmentId}/workflows`, {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            console.error('Failed to get environment workflows:', response.status);
            return [];
        }

        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error('Error getting environment workflows:', error);
        return [];
    }
}

export async function updateWorkflowEnvironmentDiagram(
    workflowId: string,
    environmentId: string,
    flowData: Workflow['flow_data']
): Promise<boolean> {
    try {
        const headers = await getAuthHeaders();
        if (!headers) return false;

        const response = await fetch(`${API_URL}/api/workflows/${workflowId}/environments/${environmentId}/flow-data`, {
            method: 'PUT',
            headers,
            body: JSON.stringify({ flow_data_override: flowData }),
        });

        return response.ok;
    } catch (error) {
        console.error('Error updating workflow environment diagram:', error);
        return false;
    }
}

// Helper function to save swimlane diagram (uses workflow's base flow_data)
export async function saveSwimlaneDiagram(workflowId: string, flowData: Workflow['flow_data']): Promise<boolean> {
    return updateWorkflow(workflowId, { flow_data: flowData });
}

// Helper function to load swimlane diagram for a specific workflow-environment combination
export async function loadSwimlaneDiagram(workflowId: string, environmentId?: string): Promise<Workflow['flow_data'] | null> {
    try {
        // If environment is specified, check for environment-specific override
        if (environmentId) {
            const headers = await getAuthHeaders();
            if (!headers) return null;

            const response = await fetch(`${API_URL}/api/workflows/${workflowId}/environments/${environmentId}`, {
                method: 'GET',
                headers,
            });

            if (response.ok) {
                const workflowEnv: WorkflowEnvironment = await response.json();
                // Return override if it exists, otherwise fall through to base workflow
                if (workflowEnv.flow_data_override) {
                    return workflowEnv.flow_data_override;
                }
            }
        }

        // Load base workflow diagram
        const workflow = await getWorkflow(workflowId);
        return workflow?.flow_data || null;
    } catch (error) {
        console.error('Error loading swimlane diagram:', error);
        return null;
    }
}

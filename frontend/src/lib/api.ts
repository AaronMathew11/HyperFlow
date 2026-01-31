import { supabase } from './supabase';
import { Board, Client, BusinessUnit, Workflow } from '../types';

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

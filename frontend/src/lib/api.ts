import { supabase } from './supabase';
import { Board } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

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

// Workflow snapshot types
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

        const response = await fetch(`${API_URL}/api/boards/${boardId}/snapshot`, {
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

        const response = await fetch(`${API_URL}/api/boards/${boardId}/snapshot`, {
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
        // Handle array response from backend
        if (Array.isArray(result) && result.length > 0) {
            return result[0].data as WorkflowData;
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

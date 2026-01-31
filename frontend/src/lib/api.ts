import { supabase } from './supabase';
import { Board, AccessLink, CreateLinkResponse, PublicBoardData } from '../types';

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

// Access Link Functions

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

// Public API functions (no auth required)

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

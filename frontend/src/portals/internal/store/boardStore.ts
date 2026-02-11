import { create } from 'zustand';
import { Board } from '../../shared/types';

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

interface BoardState {
    boards: Board[];
    currentBoard: Board | null;
    loading: boolean;
    error: string | null;
    saveStatus: SaveStatus;
    lastSavedAt: string | null;
    loadBoards: () => Promise<void>;
    createBoard: (name: string, description?: string) => Promise<Board | null>;
    updateBoard: (boardId: string, updates: Partial<Board>) => Promise<void>;
    deleteBoard: (boardId: string) => Promise<void>;
    setCurrentBoard: (board: Board | null) => void;
    saveCurrentBoardData: (flowData: Board['flow_data']) => Promise<boolean>;
    loadBoardSnapshot: (boardId: string) => Promise<Board['flow_data'] | null>;
    setSaveStatus: (status: SaveStatus) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
    boards: [],
    currentBoard: null,
    loading: false,
    error: null,
    saveStatus: 'idle',
    lastSavedAt: null,

    loadBoards: async () => {
        set({ loading: true, error: null });
        try {
            const { fetchBoards: apiFetchBoards } = await import('../lib/api');
            const boards = await apiFetchBoards();
            set({ boards, loading: false });
        } catch (error: any) {
            set({ error: error.message, loading: false });
            console.error('Error loading boards:', error);
        }
    },

    createBoard: async (name: string, description?: string) => {
        set({ loading: true, error: null });
        try {
            // Import the API function dynamically to avoid circular dependencies
            const { createBoard: apiCreateBoard } = await import('../lib/api');
            const newBoard = await apiCreateBoard(name, description);

            if (!newBoard) {
                throw new Error('Failed to create board');
            }

            set(state => ({
                boards: [newBoard, ...state.boards],
                loading: false,
            }));

            return newBoard;
        } catch (error: any) {
            set({ error: error.message, loading: false });
            console.error('Error creating board:', error);
            return null;
        }
    },

    updateBoard: async (boardId: string, updates: Partial<Board>) => {
        set({ loading: true, error: null });
        try {
            set(state => ({
                boards: state.boards.map(board =>
                    board.id === boardId
                        ? { ...board, ...updates, updated_at: new Date().toISOString() }
                        : board
                ),
                currentBoard: state.currentBoard?.id === boardId
                    ? { ...state.currentBoard, ...updates, updated_at: new Date().toISOString() }
                    : state.currentBoard,
                loading: false,
            }));
        } catch (error: any) {
            set({ error: error.message, loading: false });
            console.error('Error updating board:', error);
        }
    },

    deleteBoard: async (boardId: string) => {
        set({ loading: true, error: null });
        try {
            const { deleteBoard: apiDeleteBoard } = await import('../lib/api');
            const success = await apiDeleteBoard(boardId);

            if (!success) {
                throw new Error('Failed to delete board');
            }

            set(state => ({
                boards: state.boards.filter(board => board.id !== boardId),
                currentBoard: state.currentBoard?.id === boardId ? null : state.currentBoard,
                loading: false,
            }));
        } catch (error: any) {
            set({ error: error.message, loading: false });
            console.error('Error deleting board:', error);
        }
    },

    setCurrentBoard: (board: Board | null) => {
        set({ currentBoard: board });
    },

    setSaveStatus: (status: SaveStatus) => {
        set({ saveStatus: status });
    },

    saveCurrentBoardData: async (flowData: Board['flow_data']) => {
        const { currentBoard } = get();
        if (!currentBoard) return false;

        set({ saveStatus: 'saving' });

        try {
            const { saveWorkflow } = await import('../lib/api');
            const result = await saveWorkflow(currentBoard.id, {
                nodes: flowData.nodes,
                edges: flowData.edges,
                flowInputs: flowData.flowInputs || '',
                flowOutputs: flowData.flowOutputs || '',
            });

            if (!result) {
                set({ saveStatus: 'error' });
                return false;
            }

            set(state => ({
                boards: state.boards.map(board =>
                    board.id === currentBoard.id
                        ? { ...board, flow_data: flowData, updated_at: result.updated_at }
                        : board
                ),
                currentBoard: {
                    ...currentBoard,
                    flow_data: flowData,
                    updated_at: result.updated_at,
                },
                saveStatus: 'saved',
                lastSavedAt: result.updated_at,
            }));

            // Reset to idle after 2 seconds
            setTimeout(() => {
                set({ saveStatus: 'idle' });
            }, 2000);

            return true;
        } catch (error: any) {
            console.error('Error saving board data:', error);
            set({ saveStatus: 'error' });
            return false;
        }
    },

    loadBoardSnapshot: async (boardId: string) => {
        try {
            const { fetchWorkflowSnapshot } = await import('../lib/api');
            const snapshot = await fetchWorkflowSnapshot(boardId);
            return snapshot;
        } catch (error: any) {
            console.error('Error loading board snapshot:', error);
            return null;
        }
    },
}));

import { create } from 'zustand';
import { Board } from '../types';

interface BoardState {
    boards: Board[];
    currentBoard: Board | null;
    loading: boolean;
    error: string | null;
    loadBoards: () => Promise<void>;
    createBoard: (name: string, description?: string) => Promise<Board | null>;
    updateBoard: (boardId: string, updates: Partial<Board>) => Promise<void>;
    deleteBoard: (boardId: string) => Promise<void>;
    setCurrentBoard: (board: Board | null) => void;
    saveCurrentBoardData: (flowData: Board['flow_data']) => Promise<void>;
}

export const useBoardStore = create<BoardState>((set, get) => ({
    boards: [],
    currentBoard: null,
    loading: false,
    error: null,

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

    saveCurrentBoardData: async (flowData: Board['flow_data']) => {
        const { currentBoard } = get();
        if (!currentBoard) return;

        try {
            set(state => ({
                boards: state.boards.map(board =>
                    board.id === currentBoard.id
                        ? { ...board, flow_data: flowData, updated_at: new Date().toISOString() }
                        : board
                ),
                currentBoard: {
                    ...currentBoard,
                    flow_data: flowData,
                    updated_at: new Date().toISOString(),
                },
            }));
        } catch (error: any) {
            console.error('Error saving board data:', error);
        }
    },
}));

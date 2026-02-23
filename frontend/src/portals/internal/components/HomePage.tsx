import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBoardStore } from '../store/boardStore';

import BoardCard from './BoardCard';
import CreateBoardModal from './CreateBoardModal';
import { Board } from '../../../shared/types';
import TopNav from './TopNav';

export default function HomePage() {
    const { boards, loading, loadBoards, createBoard, deleteBoard } = useBoardStore();

    const navigate = useNavigate();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    useEffect(() => {
        loadBoards();
    }, [loadBoards]);

    const handleCreateBoard = async (name: string, description?: string) => {
        const newBoard = await createBoard(name, description);
        if (newBoard) {
            // Navigate to the new board with format: uuid_name
            const sanitizedName = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            navigate(`/${newBoard.id}_${sanitizedName}`);
        }
    };

    const handleDeleteBoard = async (boardId: string) => {
        await deleteBoard(boardId);
    };

    const handleOpenBoard = (board: Board) => {
        // Navigate to board with format: uuid_name
        const sanitizedName = board.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        navigate(`/${board.id}_${sanitizedName}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
            <TopNav />

            {/* Main Content */}
            <main className="flex-1 p-8">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                            <p className="mt-4 text-gray-600">Loading boards...</p>
                        </div>
                    </div>
                ) : boards.length === 0 ? (
                    <div className="text-center py-20">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-24 w-24 mx-auto text-gray-300 mb-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                            />
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No boards yet</h3>
                        <p className="text-gray-600 mb-6">Create your first flowchart board to get started</p>
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Create Your First Board
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {boards.map((board) => (
                            <BoardCard
                                key={board.id}
                                board={board}
                                onOpen={handleOpenBoard}
                                onDelete={handleDeleteBoard}
                            />
                        ))}
                    </div>
                )}
            </main>

            <CreateBoardModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreateBoard}
            />
        </div>
    );
}

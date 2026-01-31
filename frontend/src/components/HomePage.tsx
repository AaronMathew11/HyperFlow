import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBoardStore } from '../store/boardStore';
import { useAuth } from '../contexts/AuthContext';
import BoardCard from './BoardCard';
import CreateBoardModal from './CreateBoardModal';
import { Board } from '../types';

export default function HomePage() {
    const { boards, loading, loadBoards, createBoard, deleteBoard } = useBoardStore();
    const { user, signOut } = useAuth();
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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">HyperFlow</h1>
                            <p className="text-sm text-gray-600 mt-1">Flowchart Management</p>
                        </div>
                        <div className="flex items-center gap-4">
                            {user && (
                                <div className="flex items-center gap-3">
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-900">{user.email}</p>
                                    </div>
                                    <button
                                        onClick={signOut}
                                        className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">My Boards</h2>
                        <p className="text-gray-600 mt-1">
                            {boards.length} {boards.length === 1 ? 'board' : 'boards'}
                        </p>
                    </div>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
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
                        Create Board
                    </button>
                </div>

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

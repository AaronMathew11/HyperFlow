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
        <div className="min-h-screen bg-white flex flex-col">
            <TopNav />

            {/* Main Content */}
            <main className="flex-1 px-10 py-8 max-w-[1400px] mx-auto w-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900">Flowchart Boards</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {boards.length} {boards.length === 1 ? 'board' : 'boards'} created
                        </p>
                    </div>

                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm rounded-xl hover:bg-black transition-all shadow-sm"
                    >
                        <span className="text-lg leading-none">+</span>
                        New Board
                    </button>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-32">
                        <div className="animate-spin h-10 w-10 border-2 border-gray-300 border-t-gray-900 rounded-full" />
                    </div>
                ) : boards.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 bg-white border border-gray-200 rounded-2xl">
                        <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No boards yet</h3>
                        <p className="text-gray-500 text-sm mt-1 mb-4">Create your first flowchart board to get started</p>
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="px-4 py-2 bg-gray-900 text-white text-sm rounded-xl hover:bg-black"
                        >
                            Create Board
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 gap-1">
                        {boards.map((board) => (
                            <div
                                key={board.id}
                                className="flex flex-col items-center cursor-pointer group"
                                onClick={() => handleOpenBoard(board)}
                            >
                                {/* Board Card */}
                                <div className="w-28 h-28 bg-white border border-gray-200 rounded-2xl flex items-center justify-center hover:shadow-md hover:border-gray-300 transition-all">
                                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                                        <svg className="h-7 w-7 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
                                                d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Name below card */}
                                <p className="mt-3 text-sm text-gray-800 text-center max-w-[110px] truncate">
                                    {board.name}
                                </p>

                                {/* Delete (on hover) */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteBoard(board.id);
                                    }}
                                    className="text-xs text-red-500 mt-1 opacity-0 group-hover:opacity-100 transition"
                                >
                                    Delete
                                </button>
                            </div>
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

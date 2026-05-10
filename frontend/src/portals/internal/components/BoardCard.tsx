import { Board } from '../../../shared/types';
import { useState } from 'react';

interface BoardCardProps {
    board: Board;
    onOpen: (board: Board) => void;
    onDelete: (boardId: string) => void;
}

export default function BoardCard({ board, onOpen, onDelete }: BoardCardProps) {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMs = now.getTime() - date.getTime();
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) {
            return 'Today';
        } else if (diffInDays === 1) {
            return 'Yesterday';
        } else if (diffInDays < 7) {
            return `${diffInDays} days ago`;
        } else {
            return date.toLocaleDateString();
        }
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (showDeleteConfirm) {
            onDelete(board.id);
        } else {
            setShowDeleteConfirm(true);
            setTimeout(() => setShowDeleteConfirm(false), 3000);
        }
    };

    return (
        <div
            onClick={() => onOpen(board)}
            className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer border border-gray-200 hover:border-blue-400 overflow-hidden"
        >
            <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {board.name}
                    </h3>
                    <button
                        onClick={handleDelete}
                        className={`flex-shrink-0 ml-2 p-2 rounded-md transition-colors ${showDeleteConfirm
                            ? 'bg-red-100 text-red-700 hover:bg-red-200 relative z-10'
                            : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                            }`}
                        title={showDeleteConfirm ? 'Click again to confirm' : 'Delete board'}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>

                {board.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {board.description}
                    </p>
                )}

                <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                            </svg>
                            {board.flow_data?.nodes?.length || 0} nodes
                        </span>
                        <span className="flex items-center gap-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            {board.flow_data?.edges?.length || 0} connections
                        </span>
                    </div>
                    <span className="text-xs">
                        {formatDate(board.updated_at)}
                    </span>
                </div>
            </div>

            {showDeleteConfirm && (
                <div
                    className="absolute inset-0 bg-red-50 bg-opacity-95 flex items-center justify-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <p className="text-red-700 font-medium">Click delete again to confirm</p>
                </div>
            )}
        </div>
    );
}

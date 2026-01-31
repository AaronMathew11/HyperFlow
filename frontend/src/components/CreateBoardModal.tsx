import { useState } from 'react';

interface CreateBoardModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (name: string, description?: string) => void;
}

export default function CreateBoardModal({ isOpen, onClose, onCreate }: CreateBoardModalProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onCreate(name.trim(), description.trim() || undefined);
            setName('');
            setDescription('');
            onClose();
        }
    };

    const handleClose = () => {
        setName('');
        setDescription('');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Create New Board</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="board-name" className="block text-sm font-medium text-gray-700 mb-2">
                                Board Name *
                            </label>
                            <input
                                id="board-name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter board name"
                                autoFocus
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="board-description" className="block text-sm font-medium text-gray-700 mb-2">
                                Description (Optional)
                            </label>
                            <textarea
                                id="board-description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                placeholder="Enter board description"
                                rows={3}
                            />
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Create Board
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

import { useState } from 'react';
import { Environment } from '../../shared/types';

interface CreateWorkflowModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (name: string, description?: string, environmentIds?: string[]) => void;
    environments: Environment[];
}

export default function CreateWorkflowModal({ isOpen, onClose, onCreate, environments }: CreateWorkflowModalProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedEnvironments, setSelectedEnvironments] = useState<string[]>([]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onCreate(name.trim(), description.trim() || undefined, selectedEnvironments);
            setName('');
            setDescription('');
            setSelectedEnvironments([]);
            onClose();
        }
    };

    const handleEnvironmentToggle = (environmentId: string) => {
        setSelectedEnvironments(prev => 
            prev.includes(environmentId)
                ? prev.filter(id => id !== environmentId)
                : [...prev, environmentId]
        );
    };

    const getEnvironmentColor = (type: string) => {
        switch (type) {
            case 'production': return 'bg-red-100 text-red-700 border-red-200';
            case 'staging': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'testing': return 'bg-purple-100 text-purple-700 border-purple-200';
            default: return 'bg-blue-100 text-blue-700 border-blue-200';
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 m-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Workflow</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Workflow Name *
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                            placeholder="Enter workflow name"
                            autoFocus
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description (optional)
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all resize-none"
                            placeholder="Enter description"
                            rows={3}
                        />
                    </div>

                    {/* Environment Selection */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Environments (optional)
                        </label>
                        {environments.length === 0 ? (
                            <div className="text-center py-4 text-gray-500 text-sm border border-gray-200 rounded-lg">
                                <p>No environments available</p>
                                <p className="text-xs mt-1">Create an environment first to map it to workflows</p>
                            </div>
                        ) : (
                            <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-200 rounded-lg p-3">
                                {environments.map((env) => (
                                    <label
                                        key={env.id}
                                        className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedEnvironments.includes(env.id)}
                                            onChange={() => handleEnvironmentToggle(env.id)}
                                            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium text-gray-900 truncate">
                                                    {env.name}
                                                </span>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getEnvironmentColor(env.type)}`}>
                                                    {env.type}
                                                </span>
                                            </div>
                                            {env.description && (
                                                <p className="text-xs text-gray-500 truncate mt-1">
                                                    {env.description}
                                                </p>
                                            )}
                                        </div>
                                    </label>
                                ))}
                            </div>
                        )}
                        {selectedEnvironments.length > 0 && (
                            <p className="text-xs text-gray-600 mt-2">
                                {selectedEnvironments.length} environment{selectedEnvironments.length > 1 ? 's' : ''} selected
                            </p>
                        )}
                    </div>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!name.trim()}
                            className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Create Workflow
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

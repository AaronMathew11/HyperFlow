import { useState } from 'react';
import { Environment } from '../../../shared/types';

interface CreateWorkflowModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (name: string, description?: string, environmentIds?: string[], flowType?: 'sdk' | 'api') => void;
    environments: Environment[];
}

export default function CreateWorkflowModal({ isOpen, onClose, onCreate, environments }: CreateWorkflowModalProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedEnvironments, setSelectedEnvironments] = useState<string[]>([]);
    const [flowType, setFlowType] = useState<'sdk' | 'api'>('sdk');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onCreate(name.trim(), description.trim() || undefined, selectedEnvironments, flowType);
            setName('');
            setDescription('');
            setSelectedEnvironments([]);
            setFlowType('sdk');
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

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-xl max-h-[90vh] overflow-y-auto">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Create New Workflow</h3>
                <p className="text-sm text-gray-500 mb-6">Define your workflow type and configuration</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Flow Type Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Workflow Type
                        </label>
                        <div className="flex space-x-4">
                            <label className="flex items-center text-sm">
                                <input
                                    type="radio"
                                    name="flowType"
                                    value="sdk"
                                    checked={flowType === 'sdk'}
                                    onChange={() => setFlowType('sdk')}
                                    className="mr-2 w-4 h-4 text-gray-900 border-gray-300 focus:ring-gray-900"
                                />
                                SDK Flow
                            </label>
                            <label className="flex items-center text-sm">
                                <input
                                    type="radio"
                                    name="flowType"
                                    value="api"
                                    checked={flowType === 'api'}
                                    onChange={() => setFlowType('api')}
                                    className="mr-2 w-4 h-4 text-gray-900 border-gray-300 focus:ring-gray-900"
                                />
                                API Flow
                            </label>
                        </div>
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Workflow Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
                            placeholder="e.g. KYC Verification Flow"
                            autoFocus
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description <span className="text-gray-400 font-normal">(optional)</span>
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm resize-none"
                            placeholder="Describe the purpose of this workflow..."
                            rows={2}
                        />
                    </div>

                    {/* Environment Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Environments <span className="text-gray-400 font-normal">(optional)</span>
                        </label>
                        {environments.length === 0 ? (
                            <div className="py-3 px-3 text-sm text-gray-500 border border-gray-200 rounded-lg bg-gray-50">
                                No environments available.
                            </div>
                        ) : (
                            <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-200 rounded-lg p-3 bg-gray-50">
                                {environments.map((env) => (
                                    <label
                                        key={env.id}
                                        className="flex items-start gap-3 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedEnvironments.includes(env.id)}
                                            onChange={() => handleEnvironmentToggle(env.id)}
                                            className="mt-1 w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-gray-900 truncate">
                                                    {env.name}
                                                </span>
                                                {env.integration_type && (
                                                    <span className="text-xs text-gray-500">
                                                        ({env.integration_type.toUpperCase()})
                                                    </span>
                                                )}
                                            </div>
                                            {env.description && (
                                                <p className="text-xs text-gray-500 truncate mt-0.5">{env.description}</p>
                                            )}
                                        </div>
                                    </label>
                                ))}
                            </div>
                        )}
                        {selectedEnvironments.length > 0 && (
                            <p className="text-xs text-gray-500 mt-2">
                                {selectedEnvironments.length} environment{selectedEnvironments.length > 1 ? 's' : ''} selected
                            </p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="mt-8 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!name.trim()}
                            className="px-5 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Create Workflow
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

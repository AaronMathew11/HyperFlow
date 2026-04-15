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

    const getEnvironmentColor = (integration_type?: string) => {
        switch (integration_type) {
            case 'sdk': return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'api': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            default: return 'bg-blue-100 text-blue-700 border-blue-200';
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg m-4 overflow-hidden">
                {/* Header gradient */}
                <div
                    className="px-6 pt-6 pb-5"
                    style={{
                        background: 'linear-gradient(135deg, #06063D 0%, #1a1a6e 100%)',
                    }}
                >
                    <h2 className="text-2xl font-bold text-white mb-1">Create New Workflow</h2>
                    <p className="text-sm text-blue-200 opacity-80">Define your workflow type and configuration</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    {/* Flow Type Selection */}
                    <div className="mb-5">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Workflow Type
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {/* SDK Option */}
                            <button
                                type="button"
                                onClick={() => setFlowType('sdk')}
                                className={`relative flex flex-col items-start p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                                    flowType === 'sdk'
                                        ? 'border-indigo-500 bg-indigo-50 shadow-md shadow-indigo-100'
                                        : 'border-gray-200 bg-white hover:border-indigo-200 hover:bg-gray-50'
                                }`}
                            >
                                {flowType === 'sdk' && (
                                    <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center">
                                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                )}
                                <div className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center mb-2.5">
                                    <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                    </svg>
                                </div>
                                <div className={`font-bold text-sm mb-0.5 ${flowType === 'sdk' ? 'text-indigo-700' : 'text-gray-800'}`}>
                                    SDK Flow
                                </div>
                                <div className="text-xs text-gray-500 leading-relaxed">
                                    Module-based workflow using HyperVerse SDK integrations
                                </div>
                            </button>

                            {/* API Option */}
                            <button
                                type="button"
                                onClick={() => setFlowType('api')}
                                className={`relative flex flex-col items-start p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                                    flowType === 'api'
                                        ? 'border-emerald-500 bg-emerald-50 shadow-md shadow-emerald-100'
                                        : 'border-gray-200 bg-white hover:border-emerald-200 hover:bg-gray-50'
                                }`}
                            >
                                {flowType === 'api' && (
                                    <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                )}
                                <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center mb-2.5">
                                    <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className={`font-bold text-sm mb-0.5 ${flowType === 'api' ? 'text-emerald-700' : 'text-gray-800'}`}>
                                    API Flow
                                </div>
                                <div className="text-xs text-gray-500 leading-relaxed">
                                    REST API documentation workflow with endpoint grouping
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Name */}
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Workflow Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all text-gray-900 placeholder-gray-400 bg-gray-50"
                            placeholder="e.g. KYC Verification Flow"
                            autoFocus
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-5">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Description <span className="text-gray-400 font-normal">(optional)</span>
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all resize-none text-gray-900 placeholder-gray-400 bg-gray-50"
                            placeholder="Describe the purpose of this workflow..."
                            rows={2}
                        />
                    </div>

                    {/* Environment Selection */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Environments <span className="text-gray-400 font-normal">(optional)</span>
                        </label>
                        {environments.length === 0 ? (
                            <div className="flex items-center gap-3 py-4 px-4 text-gray-500 text-sm border border-dashed border-gray-200 rounded-xl bg-gray-50">
                                <svg className="w-5 h-5 text-gray-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                                <div>
                                    <p className="font-medium text-gray-600">No environments available</p>
                                    <p className="text-xs text-gray-400 mt-0.5">Create an environment first to map it to workflows</p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-1.5 max-h-32 overflow-y-auto border border-gray-200 rounded-xl p-2.5 bg-gray-50">
                                {environments.map((env) => (
                                    <label
                                        key={env.id}
                                        className="flex items-center gap-3 cursor-pointer hover:bg-white p-2 rounded-lg transition-colors"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedEnvironments.includes(env.id)}
                                            onChange={() => handleEnvironmentToggle(env.id)}
                                            className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium text-gray-900 truncate">
                                                    {env.name}
                                                </span>
                                                {env.integration_type && (
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getEnvironmentColor(env.integration_type)}`}>
                                                        {env.integration_type.toUpperCase()}
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
                            <p className="text-xs text-indigo-600 mt-2 font-medium">
                                {selectedEnvironments.length} environment{selectedEnvironments.length > 1 ? 's' : ''} selected
                            </p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!name.trim()}
                            className={`flex-1 px-4 py-3 text-white rounded-xl transition-all font-semibold shadow-sm ${
                                flowType === 'api'
                                    ? 'bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300'
                                    : 'bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300'
                            } disabled:cursor-not-allowed disabled:shadow-none`}
                        >
                            Create {flowType === 'api' ? 'API' : 'SDK'} Workflow
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

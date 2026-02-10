import { useState, useEffect } from 'react';
import { Environment } from '../types';

interface CreateEnvironmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (data: EnvironmentFormData) => void;
    environment?: Environment | null;
}

export interface EnvironmentFormData {
    name: string;
    description?: string;
    // Client integration questions
    usesResultsApi: boolean;
    usesOutputsApi: boolean;
    reliesOnWebhooks: boolean;
    integrationType: 'api' | 'sdk';
    sdkPlatform?: 'ios' | 'android' | 'web' | 'react-native' | 'flutter' | 'other';
}

export default function CreateEnvironmentModal({ isOpen, onClose, onCreate, environment }: CreateEnvironmentModalProps) {
    const [formData, setFormData] = useState<EnvironmentFormData>({
        name: '',
        description: '',
        usesResultsApi: false,
        usesOutputsApi: false,
        reliesOnWebhooks: false,
        integrationType: 'api',
        sdkPlatform: undefined
    });

    useEffect(() => {
        if (environment) {
            setFormData({
                name: environment.name,
                description: environment.description || '',
                usesResultsApi: false, // These aren't stored in Environment yet
                usesOutputsApi: false,
                reliesOnWebhooks: false,
                integrationType: 'api',
                sdkPlatform: undefined
            });
        }
    }, [environment]);


    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        onCreate(formData);
        
        // Reset form
        setFormData({
            name: '',
            description: '',
            usesResultsApi: false,
            usesOutputsApi: false,
            reliesOnWebhooks: false,
            integrationType: 'api',
            sdkPlatform: undefined
        });
        onClose();
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">{environment ? 'Edit Environment' : 'Create Environment'}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Info */}
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Environment Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="e.g., Production API, Staging Environment"
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Optional description of this environment"
                                />
                            </div>


                        </div>

                        {/* Integration Configuration */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900">Integration Configuration</h3>
                            
                            {/* Integration Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Is it an API integration or an SDK integration? *
                                </label>
                                <div className="flex space-x-4">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="integrationType"
                                            value="api"
                                            checked={formData.integrationType === 'api'}
                                            onChange={(e) => setFormData({ ...formData, integrationType: e.target.value as 'api' | 'sdk', sdkPlatform: undefined })}
                                            className="mr-2"
                                        />
                                        API Integration
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="integrationType"
                                            value="sdk"
                                            checked={formData.integrationType === 'sdk'}
                                            onChange={(e) => setFormData({ ...formData, integrationType: e.target.value as 'api' | 'sdk' })}
                                            className="mr-2"
                                        />
                                        SDK Integration
                                    </label>
                                </div>
                            </div>

                            {/* SDK Platform Selection - only show if SDK integration */}
                            {formData.integrationType === 'sdk' && (
                                <div>
                                    <label htmlFor="sdkPlatform" className="block text-sm font-medium text-gray-700 mb-2">
                                        What platform are they integrating on? *
                                    </label>
                                    <select
                                        id="sdkPlatform"
                                        required={formData.integrationType === 'sdk'}
                                        value={formData.sdkPlatform || ''}
                                        onChange={(e) => setFormData({ ...formData, sdkPlatform: e.target.value as any })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Select platform</option>
                                        <option value="ios">iOS</option>
                                        <option value="android">Android</option>
                                        <option value="web">Web</option>
                                        <option value="react-native">React Native</option>
                                        <option value="flutter">Flutter</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            )}

                            {/* API Usage Questions */}
                            <div className="space-y-3">
                                <h4 className="text-sm font-medium text-gray-900">API Usage</h4>
                                
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.usesResultsApi}
                                        onChange={(e) => setFormData({ ...formData, usesResultsApi: e.target.checked })}
                                        className="mr-2"
                                    />
                                    <span className="text-sm text-gray-700">Is the client using Results API?</span>
                                </label>

                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.usesOutputsApi}
                                        onChange={(e) => setFormData({ ...formData, usesOutputsApi: e.target.checked })}
                                        className="mr-2"
                                    />
                                    <span className="text-sm text-gray-700">Is the client using Outputs API?</span>
                                </label>

                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.reliesOnWebhooks}
                                        onChange={(e) => setFormData({ ...formData, reliesOnWebhooks: e.target.checked })}
                                        className="mr-2"
                                    />
                                    <span className="text-sm text-gray-700">Is the client relying on webhooks?</span>
                                </label>
                            </div>
                        </div>


                        {/* Actions */}
                        <div className="flex gap-3 pt-4 border-t">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                            >
                                {environment ? 'Update Environment' : 'Create Environment'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
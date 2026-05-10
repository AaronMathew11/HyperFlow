import { useState, useEffect } from 'react';
import { Environment } from '../../../shared/types';

interface CreateEnvironmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (data: EnvironmentFormData) => void;
    environment?: Environment | null;
}

export interface EnvironmentFormData {
    name: string;
    description?: string;
    integrationType: 'api' | 'sdk';
    sdkPlatform?: 'android' | 'ios' | 'web' | 'linkkyc' | 'react-native' | 'flutter';
    usesResultsApi: boolean;
    usesOutputsApi: boolean;
    reliesOnWebhooks: boolean;
}

export default function CreateEnvironmentModal({ isOpen, onClose, onCreate, environment }: CreateEnvironmentModalProps) {
    const [formData, setFormData] = useState<EnvironmentFormData>({
        name: '',
        description: '',
        integrationType: 'api',
        sdkPlatform: undefined,
        usesResultsApi: false,
        usesOutputsApi: false,
        reliesOnWebhooks: false,
    });

    useEffect(() => {
        if (environment) {
            setFormData({
                name: environment.name,
                description: environment.description || '',
                integrationType: environment.integration_type as any || 'api',
                sdkPlatform: environment.variables?.sdk_platform || undefined,
                usesResultsApi: environment.variables?.uses_results_api || false,
                usesOutputsApi: environment.variables?.uses_outputs_api || false,
                reliesOnWebhooks: environment.variables?.relies_on_webhooks || false,
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
            integrationType: 'api',
            usesResultsApi: false,
            usesOutputsApi: false,
            reliesOnWebhooks: false,
        });
        onClose();
    };


    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-xl max-h-[90vh] overflow-y-auto">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{environment ? 'Edit Environment' : 'Create Environment'}</h3>
                <p className="text-sm text-gray-500 mb-6">Configure the environment properties and integration settings</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Info */}
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Environment Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
                                    placeholder="e.g., Production API, Staging Environment"
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm resize-none"
                                    placeholder="Optional description of this environment"
                                />
                            </div>
                        </div>

                        {/* Integration Configuration */}
                        <div className="space-y-4">
                            {/* Integration Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Is it an API integration or an SDK integration? *
                                </label>
                                <div className="flex space-x-4">
                                    <label className="flex items-center text-sm">
                                        <input
                                            type="radio"
                                            name="integrationType"
                                            value="api"
                                            checked={formData.integrationType === 'api'}
                                            onChange={(e) => setFormData({ ...formData, integrationType: e.target.value as 'api' | 'sdk', sdkPlatform: undefined })}
                                            className="mr-2 w-4 h-4 text-gray-900 border-gray-300 focus:ring-gray-900"
                                        />
                                        API Integration
                                    </label>
                                    <label className="flex items-center text-sm">
                                        <input
                                            type="radio"
                                            name="integrationType"
                                            value="sdk"
                                            checked={formData.integrationType === 'sdk'}
                                            onChange={(e) => setFormData({ ...formData, integrationType: e.target.value as 'api' | 'sdk' })}
                                            className="mr-2 w-4 h-4 text-gray-900 border-gray-300 focus:ring-gray-900"
                                        />
                                        SDK Integration
                                    </label>
                                </div>
                            </div>

                            {/* SDK Platform Selection - only show if SDK integration */}
                            {formData.integrationType === 'sdk' && (
                                <div>
                                    <label htmlFor="sdkPlatform" className="block text-sm font-medium text-gray-700 mb-1">
                                        Mode of Integration *
                                    </label>
                                    <select
                                        id="sdkPlatform"
                                        required={formData.integrationType === 'sdk'}
                                        value={formData.sdkPlatform || ''}
                                        onChange={(e) => setFormData({ ...formData, sdkPlatform: e.target.value as any })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
                                    >
                                        <option value="">Select platform</option>
                                        <option value="android">Android</option>
                                        <option value="ios">iOS</option>
                                        <option value="web">Web</option>
                                        <option value="react-native">React Native</option>
                                        <option value="flutter">Flutter</option>
                                        <option value="linkkyc">LinkKYC</option>
                                    </select>
                                </div>
                            )}

                            {/* API Usage Questions - only show for SDK integration */}
                            {formData.integrationType === 'sdk' && (
                                <div className="space-y-3 pt-2">
                                    <div>
                                        <p className="text-sm font-medium text-gray-700 mb-2">Which API is the client using?</p>
                                        <div className="space-y-2">
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="apiType"
                                                    checked={formData.usesResultsApi}
                                                    onChange={() => setFormData({ ...formData, usesResultsApi: true, usesOutputsApi: false })}
                                                    className="mr-2 w-4 h-4 text-gray-900 border-gray-300 focus:ring-gray-900"
                                                />
                                                <span className="text-sm text-gray-700">Results API</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="apiType"
                                                    checked={formData.usesOutputsApi}
                                                    onChange={() => setFormData({ ...formData, usesResultsApi: false, usesOutputsApi: true })}
                                                    className="mr-2 w-4 h-4 text-gray-900 border-gray-300 focus:ring-gray-900"
                                                />
                                                <span className="text-sm text-gray-700">Outputs API</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={formData.reliesOnWebhooks}
                                                onChange={(e) => setFormData({ ...formData, reliesOnWebhooks: e.target.checked })}
                                                className="mr-2 w-4 h-4 text-gray-900 rounded border-gray-300 focus:ring-gray-900"
                                            />
                                            <span className="text-sm font-medium text-gray-700">Is the client relying on webhooks?</span>
                                        </label>
                                    </div>
                                </div>
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
                                className="px-5 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors"
                            >
                                {environment ? 'Update Environment' : 'Create Environment'}
                            </button>
                        </div>
                    </form>
            </div>
        </div>
    );
}
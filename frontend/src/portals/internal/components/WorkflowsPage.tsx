import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useWorkflowStore } from '../store/workflowStore';
import { useEnvironmentStore } from '../store/environmentStore';
import { useAuth } from '../contexts/AuthContext';
import CreateWorkflowModal from './CreateWorkflowModal';
import CreateEnvironmentModal from './CreateEnvironmentModal';
import Breadcrumb from '../../../shared/components/Breadcrumb';
import { getClient, getBusinessUnit, createBUAccessLink } from '../../../shared/lib/api';
import { Client, BusinessUnit, Workflow, Environment, CreateBULinkResponse } from '../../../shared/types';

export default function WorkflowsPage() {
    const { clientId, buId } = useParams<{ clientId: string; buId: string }>();
    const { workflows, loading, loadWorkflows, createWorkflow, deleteWorkflow } = useWorkflowStore();
    const { environments, loadEnvironments, createEnvironment, deleteEnvironment } = useEnvironmentStore();
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isCreateEnvModalOpen, setIsCreateEnvModalOpen] = useState(false);
    const [client, setClient] = useState<Client | null>(null);
    const [businessUnit, setBusinessUnit] = useState<BusinessUnit | null>(null);
    const [activeTab, setActiveTab] = useState<'workflows' | 'environments'>('workflows');
    const [isEditEnvModalOpen, setIsEditEnvModalOpen] = useState(false);
    const [selectedEnvironment, setSelectedEnvironment] = useState<Environment | null>(null);
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
    const [generatedLink, setGeneratedLink] = useState<CreateBULinkResponse | null>(null);
    const [isGeneratingLink, setIsGeneratingLink] = useState(false);
    const [linkCopied, setLinkCopied] = useState(false);
    const [passCopied, setPassCopied] = useState(false);

    const handleGenerateLink = async () => {
        if (!buId) return;
        setIsGeneratingLink(true);
        try {
            const result = await createBUAccessLink(buId);
            if (result) {
                setGeneratedLink(result);
                setIsLinkModalOpen(true);
            }
        } catch (error) {
            console.error('Error generating link:', error);
        } finally {
            setIsGeneratingLink(false);
        }
    };

    const handleCopyLink = () => {
        if (generatedLink) {
            navigator.clipboard.writeText(generatedLink.shareUrl);
            setLinkCopied(true);
            setTimeout(() => setLinkCopied(false), 2000);
        }
    };

    const handleCopyPassword = () => {
        if (generatedLink) {
            navigator.clipboard.writeText(generatedLink.password);
            setPassCopied(true);
            setTimeout(() => setPassCopied(false), 2000);
        }
    };

    useEffect(() => {
        if (buId) {
            loadWorkflows(buId);
            loadEnvironments(buId);
        }
        if (clientId) {
            getClient(clientId).then(setClient);
        }
        if (buId) {
            getBusinessUnit(buId).then(setBusinessUnit);
        }
    }, [buId, clientId, loadWorkflows, loadEnvironments]);

    const handleCreateWorkflow = async (name: string, description?: string, environmentIds?: string[]) => {
        if (!buId) return;
        const newWorkflow = await createWorkflow(buId, name, description, environmentIds);
        if (newWorkflow) {
            navigate(`/workflow/${newWorkflow.id}`);
        }
    };

    const handleOpenWorkflow = (workflow: Workflow) => {
        navigate(`/workflow/${workflow.id}`);
    };

    const handleDeleteWorkflow = async (workflowId: string) => {
        await deleteWorkflow(workflowId);
    };

    const handleCreateEnvironment = async (data: any) => {
        if (!buId) return;
        await createEnvironment(buId, data);
    };

    const handleDeleteEnvironment = async (environmentId: string) => {
        await deleteEnvironment(environmentId);
    };

    const handleEditEnvironment = (environment: Environment) => {
        setSelectedEnvironment(environment);
        setIsEditEnvModalOpen(true);
    };

    const handleUpdateEnvironment = async (data: any) => {
        // Implementation will depend on your environment store's update method
        // For now, close the modal and refresh
        setIsEditEnvModalOpen(false);
        setSelectedEnvironment(null);
        if (buId) {
            loadEnvironments(buId);
        }
    };

    const breadcrumbItems = [
        { label: 'Home', path: '/' },
        { label: client?.name || 'Client', path: `/client/${clientId}` },
        { label: businessUnit?.name || 'Business Unit' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
            {/* Left Sidebar */}
            <aside className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
                {/* Top Section */}
                <div className="p-4 border-b border-gray-100">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Hypervision</h1>
                        <p className="text-xs text-gray-600 mt-1">Workflow Management</p>
                    </div>
                </div>

                {/* Navigation/Content Area */}
                <div className="flex-1 p-4">
                    {/* Sidebar content can go here if needed */}
                </div>

                {/* Bottom Account Section */}
                <div className="p-6 border-t border-gray-100">
                    {user && (
                        <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-blue-600"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                                <button
                                    onClick={signOut}
                                    className="text-xs text-gray-500 hover:text-red-600 transition-colors mt-1"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <Breadcrumb items={breadcrumbItems} />

                {/* Page Title and Create Buttons */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Workflows & Environments</h2>
                        <p className="text-gray-600 mt-2">
                            {workflows.length} workflows, {environments.length} environments
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={handleGenerateLink}
                            disabled={isGeneratingLink}
                            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg disabled:opacity-50"
                        >
                            {isGeneratingLink ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                                </svg>
                            )}
                            Generate Client Link
                        </button>
                        <button
                            onClick={() => setIsCreateEnvModalOpen(true)}
                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Create Environment
                        </button>
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Create Workflow
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                            <button
                                onClick={() => setActiveTab('workflows')}
                                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'workflows'
                                    ? 'border-green-500 text-green-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                Workflows ({workflows.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('environments')}
                                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'environments'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                Environments ({environments.length})
                            </button>
                        </nav>
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center">
                            <div className={`inline-block animate-spin rounded-full h-12 w-12 border-b-2 ${activeTab === 'workflows' ? 'border-green-600' : 'border-blue-600'
                                }`}></div>
                            <p className="mt-4 text-gray-600">Loading {activeTab}...</p>
                        </div>
                    </div>
                ) : activeTab === 'workflows' && workflows.length === 0 ? (
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
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No workflows yet</h3>
                        <p className="text-gray-600 mb-6">Create your first workflow in this business unit</p>
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
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
                            Create First Workflow
                        </button>
                    </div>
                ) : activeTab === 'environments' && environments.length === 0 ? (
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
                                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                            />
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No environments yet</h3>
                        <p className="text-gray-600 mb-6">Create your first environment to configure API settings</p>
                        <button
                            onClick={() => setIsCreateEnvModalOpen(true)}
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
                            Create First Environment
                        </button>
                    </div>
                ) : activeTab === 'workflows' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {workflows.map((workflow) => (
                            <WorkflowCard
                                key={workflow.id}
                                workflow={workflow}
                                environments={environments}
                                onOpen={() => handleOpenWorkflow(workflow)}
                                onDelete={() => handleDeleteWorkflow(workflow.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {environments.map((environment) => (
                            <EnvironmentCard
                                key={environment.id}
                                environment={environment}
                                onClick={() => navigate(`/client/${clientId}/bu/${buId}/environment/${environment.id}`)}
                                onDelete={() => handleDeleteEnvironment(environment.id)}
                            />
                        ))}
                    </div>
                )}
            </main>

            <CreateWorkflowModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreateWorkflow}
                environments={environments}
            />

            <CreateEnvironmentModal
                isOpen={isCreateEnvModalOpen}
                onClose={() => setIsCreateEnvModalOpen(false)}
                onCreate={handleCreateEnvironment}
            />

            <CreateEnvironmentModal
                isOpen={isEditEnvModalOpen}
                onClose={() => {
                    setIsEditEnvModalOpen(false);
                    setSelectedEnvironment(null);
                }}
                onCreate={handleUpdateEnvironment}
                environment={selectedEnvironment}
            />

            {/* Generate Link Modal */}
            {isLinkModalOpen && generatedLink && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full mx-4">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Client Link Generated</h3>
                                <p className="text-sm text-gray-500">Share this link and password with your client</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Share URL</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        readOnly
                                        value={generatedLink.shareUrl}
                                        className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 font-mono"
                                    />
                                    <button
                                        onClick={handleCopyLink}
                                        className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${linkCopied
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                                            }`}
                                    >
                                        {linkCopied ? 'Copied!' : 'Copy'}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        readOnly
                                        value={generatedLink.password}
                                        className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 font-mono"
                                    />
                                    <button
                                        onClick={handleCopyPassword}
                                        className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${passCopied
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                                            }`}
                                    >
                                        {passCopied ? 'Copied!' : 'Copy'}
                                    </button>
                                </div>
                            </div>

                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                                <div className="flex gap-2">
                                    <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                    <p className="text-sm text-amber-800">
                                        The password is only shown once. Make sure to copy and share it securely.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end mt-6">
                            <button
                                onClick={() => {
                                    setIsLinkModalOpen(false);
                                    setGeneratedLink(null);
                                    setLinkCopied(false);
                                    setPassCopied(false);
                                }}
                                className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Inline EnvironmentCard component
function EnvironmentCard({
    environment,
    onClick,
    onDelete,
}: {
    environment: Environment;
    onClick: () => void;
    onDelete: () => void;
}) {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (showDeleteConfirm) {
            onDelete();
            setShowDeleteConfirm(false);
        } else {
            setShowDeleteConfirm(true);
            setTimeout(() => setShowDeleteConfirm(false), 3000);
        }
    };

    const getEnvironmentColor = (integrationType?: string) => {
        switch (integrationType) {
            case 'sdk': return 'bg-purple-100 text-purple-600';
            case 'api': return 'bg-blue-100 text-blue-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <div
            onClick={onClick}
            className="relative group cursor-pointer bg-white rounded-xl border border-gray-200 p-6 transition-all duration-200 hover:shadow-lg hover:border-blue-300">
            {/* Delete Button */}
            <button
                onClick={handleDelete}
                className={`absolute top-3 right-3 p-2 rounded-lg transition-all duration-200 ${showDeleteConfirm
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-500 hover:bg-red-50'
                    }`}
                title={showDeleteConfirm ? 'Click again to confirm' : 'Delete'}
            >
                <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
            </button>

            {/* Environment Info */}
            <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${getEnvironmentColor(environment.integration_type)}`}>
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {environment.name}
                    </h3>
                    {environment.integration_type && (
                        <p className="text-sm text-gray-500 capitalize mb-2">
                            {environment.integration_type.toUpperCase()} Integration
                        </p>
                    )}
                    {environment.description && (
                        <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                            {environment.description}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

// Inline WorkflowCard component
function WorkflowCard({
    workflow,
    environments,
    onOpen,
    onDelete,
}: {
    workflow: Workflow;
    environments: Environment[];
    onOpen: () => void;
    onDelete: () => void;
}) {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (showDeleteConfirm) {
            onDelete();
            setShowDeleteConfirm(false);
        } else {
            setShowDeleteConfirm(true);
            setTimeout(() => setShowDeleteConfirm(false), 3000);
        }
    };

    return (
        <div
            onClick={onOpen}
            className="relative group cursor-pointer bg-white rounded-xl border border-gray-200 p-6 transition-all duration-200 hover:shadow-lg hover:border-green-300"
        >
            {/* Delete Button */}
            <button
                onClick={handleDelete}
                className={`absolute top-3 right-3 p-2 rounded-lg transition-all duration-200 ${showDeleteConfirm
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-500 hover:bg-red-50'
                    }`}
                title={showDeleteConfirm ? 'Click again to confirm' : 'Delete'}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
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

            {/* Workflow Icon */}
            <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-green-600"
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
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {workflow.name}
                    </h3>
                    {workflow.description && (
                        <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                            {workflow.description}
                        </p>
                    )}
                    {workflow.environments && workflow.environments.length > 0 && (
                        <div className="mt-2">
                            <div className="flex flex-wrap gap-1">
                                {workflow.environments.slice(0, 3).map(we => {
                                    const env = environments.find(e => e.id === we.environment_id);
                                    if (!env) return null;

                                    const getEnvColorClass = (integrationType?: string) => {
                                        switch (integrationType) {
                                            case 'sdk': return 'bg-purple-100 text-purple-700';
                                            case 'api': return 'bg-blue-100 text-blue-700';
                                            default: return 'bg-gray-100 text-gray-700';
                                        }
                                    };

                                    return (
                                        <span key={we.id} className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getEnvColorClass(env.integration_type)}`}>
                                            <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                            </svg>
                                            {env.name}
                                        </span>
                                    );
                                })}
                                {workflow.environments.length > 3 && (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                                        +{workflow.environments.length - 3} more
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                    <p className="text-xs text-gray-400 mt-2">
                        Updated {new Date(workflow.updated_at).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
}

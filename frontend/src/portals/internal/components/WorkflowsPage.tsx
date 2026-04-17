import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useWorkflowStore } from '../store/workflowStore';
import { useEnvironmentStore } from '../store/environmentStore';
import { useFlowStore } from '../store/flowStore';

import CreateWorkflowModal from './CreateWorkflowModal';
import CreateEnvironmentModal from './CreateEnvironmentModal';
import Breadcrumb from '../../../shared/components/Breadcrumb';
import { getClient, getBusinessUnit, createBUAccessLink } from '../../../shared/lib/api';
import { Client, BusinessUnit, CreateBULinkResponse } from '../../../shared/types';
import TopNav from './TopNav';

export default function WorkflowsPage() {
    const { clientId, buId } = useParams<{ clientId: string; buId: string }>();

    const { workflows, loading, loadWorkflows, createWorkflow, deleteWorkflow } = useWorkflowStore();
    const { environments, loadEnvironments, createEnvironment, deleteEnvironment } = useEnvironmentStore();

    const navigate = useNavigate();

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isCreateEnvModalOpen, setIsCreateEnvModalOpen] = useState(false);
    const [client, setClient] = useState<Client | null>(null);
    const [businessUnit, setBusinessUnit] = useState<BusinessUnit | null>(null);
    const [activeTab, setActiveTab] = useState<'workflows' | 'environments'>('workflows');

    const [generatedLink, setGeneratedLink] = useState<CreateBULinkResponse | null>(null);
    const [isGeneratingLink, setIsGeneratingLink] = useState(false);
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);

    useEffect(() => {
        if (buId) {
            loadWorkflows(buId);
            loadEnvironments(buId);
        }
        if (clientId) getClient(clientId).then(setClient);
        if (buId) getBusinessUnit(buId).then(setBusinessUnit);
    }, [buId, clientId]);

    const { setFlowType } = useFlowStore.getState();

    const handleCreateWorkflow = async (name: string, description?: string, _environmentIds?: string[], flowType?: 'sdk' | 'api') => {
        if (!buId) return;
        if (flowType) setFlowType(flowType);
        const wf = await createWorkflow(buId, name, flowType || 'sdk', description);
        if (wf) navigate(`/workflow/${wf.id}`);
    };

    const handleGenerateLink = async () => {
        if (!buId) return;
        setIsGeneratingLink(true);
        try {
            const linkData = await createBUAccessLink(buId);
            if (linkData) {
                setGeneratedLink(linkData);
                setIsLinkModalOpen(true);
            }
        } catch (error) {
            console.error('Error generating link:', error);
        } finally {
            setIsGeneratingLink(false);
        }
    };

    const handleDeleteEnvironment = async (environmentId: string) => {
        await deleteEnvironment(environmentId);
    };


    const breadcrumbItems = useMemo(() => [
        { label: 'Home', path: '/' },
        { label: client?.name || 'Loading...', path: `/client/${clientId}` },
        { label: businessUnit?.name || 'Loading...' }
    ], [client, businessUnit]);

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <TopNav />

            <main className="flex-1 px-10 py-8 max-w-[1400px] mx-auto w-full">
                <Breadcrumb items={breadcrumbItems} />

                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900">Workflows & Environments</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {workflows.length} workflows · {environments.length} environments
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={handleGenerateLink}
                            disabled={isGeneratingLink}
                            className="px-4 py-2 bg-gray-900 text-white text-sm rounded-xl disabled:opacity-50"
                        >
                            {isGeneratingLink ? 'Generating...' : 'Generate Link'}
                        </button>

                        <button
                            onClick={() => setIsCreateEnvModalOpen(true)}
                            className="px-4 py-2 bg-gray-900 text-white text-sm rounded-xl"
                        >
                            New Environment
                        </button>

                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="px-4 py-2 bg-gray-900 text-white text-sm rounded-xl"
                        >
                            New Workflow
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mb-8 border-b">
                    <div className="flex gap-6">
                        <button
                            onClick={() => setActiveTab('workflows')}
                            className={`pb-2 text-sm ${activeTab === 'workflows' ? 'border-b-2 border-black text-black' : 'text-gray-500'}`}
                        >
                            Workflows
                        </button>

                        <button
                            onClick={() => setActiveTab('environments')}
                            className={`pb-2 text-sm ${activeTab === 'environments' ? 'border-b-2 border-black text-black' : 'text-gray-500'}`}
                        >
                            Environments
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin h-10 w-10 border-2 border-gray-300 border-t-black rounded-full" />
                    </div>
                ) : (
                    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 gap-1">

                        {/* WORKFLOWS */}
                        {activeTab === 'workflows' && workflows.map((wf) => (
                            <div
                                key={wf.id}
                                className="flex flex-col items-center cursor-pointer group"
                                onClick={() => navigate(`/workflow/${wf.id}`)}
                            >
                                <div className="w-28 h-28 bg-white border border-gray-200 rounded-2xl flex items-center justify-center hover:shadow-md">
                                    <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                                        <svg className="h-7 w-7 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
                                                d="M4 6h4v4H4zM16 6h4v4h-4zM10 8h4M12 8v8M4 16h4v4H4zM16 16h4v4h-4zM8 18h8" />
                                        </svg>
                                    </div>
                                </div>

                                <p className="mt-3 text-sm text-center truncate max-w-[110px]">
                                    {wf.name}
                                </p>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteWorkflow(wf.id);
                                    }}
                                    className="text-xs text-red-500 opacity-0 group-hover:opacity-100"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}

                        {/* ENVIRONMENTS */}
                        {activeTab === 'environments' && environments.map((env) => (
                            <div
                                key={env.id}
                                className="flex flex-col items-center cursor-pointer group"
                                onClick={() => navigate(`/client/${clientId}/bu/${buId}/environment/${env.id}`)}
                            >
                                <div className="w-28 h-28 bg-white border border-gray-200 rounded-2xl flex items-center justify-center hover:shadow-md">
                                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                                        <svg className="h-7 w-7 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
                                                d="M4 6h16M4 12h16M4 18h16M6 6v12M12 6v12M18 6v12" />
                                        </svg>
                                    </div>
                                </div>

                                <p className="mt-3 text-sm text-center truncate max-w-[110px]">
                                    {env.name}
                                </p>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteEnvironment(env.id);
                                    }}
                                    className="text-xs text-red-500 opacity-0 group-hover:opacity-100"
                                >
                                    Delete
                                </button>
                            </div>
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
                onCreate={(data) => {
                    if (buId) createEnvironment(buId, data);
                }}
            />

            {isLinkModalOpen && generatedLink && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Share Link Generated</h3>
                        <p className="text-sm text-gray-500 mb-6">
                            Share this link and password with the customer so they can view the workflows.
                        </p>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Share URL</label>
                                <div className="flex">
                                    <input
                                        readOnly
                                        value={generatedLink.shareUrl}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg bg-gray-50 focus:outline-none text-sm"
                                    />
                                    <button
                                        onClick={() => navigator.clipboard.writeText(generatedLink.shareUrl)}
                                        className="px-4 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200 text-sm font-medium transition-colors"
                                    >
                                        Copy
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <div className="flex">
                                    <input
                                        readOnly
                                        value={generatedLink.password}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg bg-gray-50 focus:outline-none text-sm"
                                    />
                                    <button
                                        onClick={() => navigator.clipboard.writeText(generatedLink.password)}
                                        className="px-4 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200 text-sm font-medium transition-colors"
                                    >
                                        Copy
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={() => setIsLinkModalOpen(false)}
                                className="px-5 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
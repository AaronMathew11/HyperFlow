import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEnvironmentStore } from '../store/environmentStore';
import { useAuth } from '../contexts/AuthContext';
import Breadcrumb from '../../../shared/components/Breadcrumb';
import SwimlaneDiagram from '../../../shared/components/SwimlaneDiagram';
import {
    getClient,
    getBusinessUnit,
    getEnvironmentWorkflows,
    linkWorkflowToEnvironment,
    unlinkWorkflowFromEnvironment,
    fetchWorkflows
} from '../../../shared/lib/api';
import { Client, BusinessUnit, WorkflowEnvironment, Workflow } from '../../../shared/types';

export default function EnvironmentDetailPage() {
    const { clientId, buId, environmentId } = useParams<{ clientId: string; buId: string; environmentId: string }>();
    const { environments, loadEnvironments } = useEnvironmentStore();
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    // Data State
    const [client, setClient] = useState<Client | null>(null);
    const [businessUnit, setBusinessUnit] = useState<BusinessUnit | null>(null);
    const [workflowEnvs, setWorkflowEnvs] = useState<WorkflowEnvironment[]>([]);
    const [allWorkflows, setAllWorkflows] = useState<Workflow[]>([]);

    // UI State
    const [selectedWfEnv, setSelectedWfEnv] = useState<WorkflowEnvironment | null>(null);
    const [isLinking, setIsLinking] = useState(false);
    const [linkError, setLinkError] = useState('');
    const [selectedWorkflowToLink, setSelectedWorkflowToLink] = useState('');

    const environment = environments.find(env => env.id === environmentId);

    useEffect(() => {
        if (buId) {
            loadEnvironments(buId);
            getBusinessUnit(buId).then(setBusinessUnit);
            fetchWorkflows(buId).then(setAllWorkflows);
        }
        if (clientId) {
            getClient(clientId).then(setClient);
        }
        if (environmentId) {
            refreshLinkedWorkflows();
        }
    }, [buId, clientId, environmentId, loadEnvironments]);

    const refreshLinkedWorkflows = () => {
        if (environmentId) {
            getEnvironmentWorkflows(environmentId).then(setWorkflowEnvs);
        }
    };

    const handleBack = () => {
        navigate(`/client/${clientId}/bu/${buId}`);
    };

    const handleLinkWorkflow = async () => {
        if (!selectedWorkflowToLink || !environmentId) return;

        try {
            const result = await linkWorkflowToEnvironment(selectedWorkflowToLink, environmentId);
            if (result) {
                refreshLinkedWorkflows();
                setIsLinking(false);
                setSelectedWorkflowToLink('');
                setLinkError('');
            } else {
                setLinkError('Failed to link workflow');
            }
        } catch (err) {
            setLinkError('An error occurred');
        }
    };

    const handleUnlinkWorkflow = async (workflowId: string) => {
        if (!environmentId || !confirm('Are you sure you want to unlink this workflow?')) return;

        const success = await unlinkWorkflowFromEnvironment(workflowId, environmentId);
        if (success) {
            if (selectedWfEnv?.workflow_id === workflowId) {
                setSelectedWfEnv(null);
            }
            refreshLinkedWorkflows();
        } else {
            alert('Failed to unlink workflow');
        }
    };

    const breadcrumbItems = [
        { label: 'Home', path: '/' },
        { label: client?.name || 'Client', path: `/client/${clientId}` },
        { label: businessUnit?.name || 'Business Unit', path: `/client/${clientId}/bu/${buId}` },
        { label: environment?.name || 'Environment' },
    ];

    if (!environment) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Environment Not Found</h2>
                    <p className="text-gray-600 mb-6">The environment you're looking for doesn't exist or has been removed.</p>
                    <button onClick={handleBack} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    // Filter workflows that are not yet linked
    const availableToLink = allWorkflows.filter(wf =>
        !workflowEnvs.some(we => we.workflow_id === wf.id)
    );

    return (
        <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 shrink-0 z-10">
                <div className="flex justify-between items-center mb-4">
                    <Breadcrumb items={breadcrumbItems} />
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                {user?.email?.[0].toUpperCase()}
                            </div>
                            <span className="text-sm font-medium text-gray-700">{user?.email?.split('@')[0]}</span>
                        </div>
                        <button onClick={signOut} className="text-gray-400 hover:text-gray-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{environment.name}</h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Type: <span className="uppercase font-medium text-gray-700">{environment.type}</span> •
                            Base URL: <span className="font-mono text-gray-600">{environment.base_url}</span>
                        </p>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar - Workflow List */}
                <aside className="w-80 bg-white border-r border-gray-200 flex flex-col shrink-0">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                        <h2 className="font-bold text-gray-700">Deployed Workflows</h2>
                        <button
                            onClick={() => setIsLinking(true)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                            title="Deploy Workflow"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                    </div>

                    {isLinking && (
                        <div className="p-4 bg-blue-50 border-b border-blue-100">
                            <label className="block text-xs font-bold text-blue-800 mb-1">DEPLOY NEW WORKFLOW</label>
                            <select
                                value={selectedWorkflowToLink}
                                onChange={e => setSelectedWorkflowToLink(e.target.value)}
                                className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 mb-2"
                            >
                                <option value="">Select a workflow...</option>
                                {availableToLink.map(wf => (
                                    <option key={wf.id} value={wf.id}>{wf.name}</option>
                                ))}
                            </select>
                            {linkError && <p className="text-red-500 text-xs mb-2">{linkError}</p>}
                            <div className="flex gap-2">
                                <button
                                    onClick={handleLinkWorkflow}
                                    disabled={!selectedWorkflowToLink}
                                    className="flex-1 bg-blue-600 text-white text-xs py-1.5 rounded hover:bg-blue-700 disabled:opacity-50"
                                >
                                    Deploy
                                </button>
                                <button
                                    onClick={() => { setIsLinking(false); setLinkError(''); }}
                                    className="flex-1 bg-white text-gray-600 text-xs py-1.5 rounded border border-gray-300 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="flex-1 overflow-y-auto">
                        {workflowEnvs.length === 0 ? (
                            <div className="p-8 text-center text-gray-400 text-sm">
                                No workflows deployed to this environment yet.
                            </div>
                        ) : (
                            <ul className="divide-y divide-gray-100">
                                {workflowEnvs.map(we => (
                                    <li key={we.id}>
                                        <button
                                            onClick={() => setSelectedWfEnv(we)}
                                            className={`w-full text-left p-4 hover:bg-gray-50 transition-colors relative group ${selectedWfEnv?.id === we.id ? 'bg-blue-50 hover:bg-blue-50 border-l-4 border-blue-600' : 'border-l-4 border-transparent'}`}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <div className="font-medium text-gray-900">{we.workflow_name || 'Unknown Workflow'}</div>
                                                    <div className="text-xs text-gray-500 mt-1">Deployed: {we.deployed_at ? new Date(we.deployed_at).toLocaleDateString() : 'N/A'}</div>
                                                    {we.flow_data_override && (
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800 mt-2">
                                                            Customized
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="absolute top-4 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleUnlinkWorkflow(we.workflow_id); }}
                                                    className="p-1 text-gray-400 hover:text-red-600 rounded"
                                                    title="Unlink/Undeploy"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 overflow-hidden bg-gray-100 p-6">
                    {selectedWfEnv ? (
                        <div className="h-full flex flex-col">
                            <div className="mb-4 flex justify-between items-center">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">
                                        {selectedWfEnv.workflow_name} <span className="text-gray-400 mx-2">/</span> Configuration
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {selectedWfEnv.flow_data_override
                                            ? "Editing environment-specific override for this workflow."
                                            : "Viewing base workflow configuration. Make changes to create an override."}
                                    </p>
                                </div>
                            </div>
                            <div className="flex-1 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                                <SwimlaneDiagram
                                    workflowId={selectedWfEnv.workflow_id}
                                    environmentId={environmentId}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-400">
                            <div className="text-center">
                                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.001 8.001 0 01-7.938-6H5a2 2 0 01-2-2 2 2 0 012-2h.062C5.418 3.999 9 0 9 0s3.582 3.999 4.938 6H21a2 2 0 012 2 2 2 0 01-2 2h-1.062A8.001 8.001 0 0121 12z" />
                                </svg>
                                <p className="text-lg font-medium">Select a workflow to view its diagram</p>
                                <p className="text-sm mt-2 max-w-sm mx-auto">
                                    Choose a deployed workflow from the list on the left, or deploy a new one to this environment.
                                </p>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

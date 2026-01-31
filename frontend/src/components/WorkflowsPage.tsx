import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useWorkflowStore } from '../store/workflowStore';
import { useAuth } from '../contexts/AuthContext';
import CreateWorkflowModal from './CreateWorkflowModal';
import Breadcrumb from './Breadcrumb';
import { getClient, getBusinessUnit } from '../lib/api';
import { Client, BusinessUnit, Workflow } from '../types';

export default function WorkflowsPage() {
    const { clientId, buId } = useParams<{ clientId: string; buId: string }>();
    const { workflows, loading, loadWorkflows, createWorkflow, deleteWorkflow } = useWorkflowStore();
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [client, setClient] = useState<Client | null>(null);
    const [businessUnit, setBusinessUnit] = useState<BusinessUnit | null>(null);

    useEffect(() => {
        if (buId) {
            loadWorkflows(buId);
        }
        if (clientId) {
            getClient(clientId).then(setClient);
        }
        if (buId) {
            getBusinessUnit(buId).then(setBusinessUnit);
        }
    }, [buId, clientId, loadWorkflows]);

    const handleCreateWorkflow = async (name: string, description?: string) => {
        if (!buId) return;
        const newWorkflow = await createWorkflow(buId, name, description);
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

    const breadcrumbItems = [
        { label: 'Home', path: '/' },
        { label: client?.name || 'Client', path: `/client/${clientId}` },
        { label: businessUnit?.name || 'Business Unit' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">HyperFlow</h1>
                            <p className="text-sm text-gray-600 mt-1">Workflow Management</p>
                        </div>
                        <div className="flex items-center gap-4">
                            {user && (
                                <div className="flex items-center gap-3">
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-900">{user.email}</p>
                                    </div>
                                    <button
                                        onClick={signOut}
                                        className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Breadcrumb items={breadcrumbItems} />

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Workflows</h2>
                        <p className="text-gray-600 mt-1">
                            {workflows.length} {workflows.length === 1 ? 'workflow' : 'workflows'}
                        </p>
                    </div>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
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
                        Create Workflow
                    </button>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                            <p className="mt-4 text-gray-600">Loading workflows...</p>
                        </div>
                    </div>
                ) : workflows.length === 0 ? (
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
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {workflows.map((workflow) => (
                            <WorkflowCard
                                key={workflow.id}
                                workflow={workflow}
                                onOpen={() => handleOpenWorkflow(workflow)}
                                onDelete={() => handleDeleteWorkflow(workflow.id)}
                            />
                        ))}
                    </div>
                )}
            </main>

            <CreateWorkflowModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreateWorkflow}
            />
        </div>
    );
}

// Inline WorkflowCard component
function WorkflowCard({
    workflow,
    onOpen,
    onDelete,
}: {
    workflow: Workflow;
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
                className={`absolute top-3 right-3 p-2 rounded-lg transition-all duration-200 ${
                    showDeleteConfirm
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
                    <p className="text-xs text-gray-400 mt-2">
                        Updated {new Date(workflow.updated_at).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
}

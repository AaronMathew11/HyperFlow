import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCustomerAuth } from '../contexts/CustomerAuthContext';
import { Environment, Workflow } from '../../../shared/types';
import Breadcrumb from '../../../shared/components/Breadcrumb';
import CustomerTopNav from './CustomerTopNav';

export default function EnvironmentWorkflows() {
    const { envId } = useParams<{ envId: string }>();
    const navigate = useNavigate();
    const { buData, loadBUData } = useCustomerAuth();

    const [environment, setEnvironment] = useState<Environment | null>(null);
    const [workflows, setWorkflows] = useState<Workflow[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, [envId]);

    const loadData = async () => {
        try {
            setLoading(true);
            if (!buData) {
                await loadBUData();
            }
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (buData && envId) {
            const selectedEnv = buData.environments?.find((e: any) => e.id === envId);
            if (selectedEnv) {
                setEnvironment(selectedEnv);
            }

            if (buData.workflows) {
                setWorkflows(buData.workflows);
            }
        }
    }, [buData, envId]);

    const handleWorkflowSelect = (workflowId: string) => {
        navigate(`/customer/dashboard/${envId}?workflowId=${workflowId}`);
    };

    const breadcrumbItems = [
        { label: 'Environments', path: '/customer/environments' },
        { label: environment?.name || 'Environment Workflows' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
            <CustomerTopNav />

            {/* Main Content */}
            <main className="flex-1 p-8">
                <Breadcrumb items={breadcrumbItems} />

                {/* Page Title */}
                <div className="flex items-center justify-between mb-8 mt-4">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Workflows for {environment?.name || 'Environment'}</h2>
                        <p className="text-gray-600 mt-2">
                            {workflows.length} {workflows.length === 1 ? 'workflow' : 'workflows'}
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                            <p className="mt-4 text-gray-600">Loading workflows...</p>
                        </div>
                    </div>
                ) : workflows.length === 0 ? (
                    <div className="text-center py-20">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-24 w-24 mx-auto text-gray-300 mb-4"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No workflows yet</h3>
                        <p className="text-gray-600 mb-6">No workflows available for this environment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {workflows.map((workflow) => {
                            return (
                                <div
                                    key={workflow.id}
                                    onClick={() => handleWorkflowSelect(workflow.id)}
                                    className={`relative group cursor-pointer rounded-xl border-2 border-blue-200 bg-blue-50 hover:bg-blue-100 p-6 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]`}
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`h-20 w-20 text-blue-500 mb-4`}
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                                        </svg>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                                            {workflow.name}
                                        </h3>
                                        {workflow.description && (
                                            <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                                                {workflow.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
}

import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCustomerAuth } from '../contexts/CustomerAuthContext';
import { Workflow, Environment } from '../../../shared/types';
import SwimlaneDiagram from '../../../shared/components/SwimlaneDiagram';
import Canvas from '../../internal/components/Canvas';

export default function CustomerDashboard() {
  const { envId } = useParams<{ envId: string }>();
  const navigate = useNavigate();
  const { signOut, buData, loadBUData, businessUnitName } = useCustomerAuth();

  const [activeView, setActiveView] = useState<'workflows' | 'swimlane'>('workflows');
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [workflowsExpanded, setWorkflowsExpanded] = useState(true);
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [environment, setEnvironment] = useState<Environment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (envId) {
      loadCustomerData();
    }
  }, [envId, buData]);

  const loadCustomerData = async () => {
    try {
      setLoading(true);

      if (!buData) {
        await loadBUData();
        return;
      }

      const selectedEnv = buData.environments?.find((e: any) => e.id === envId);
      if (selectedEnv) {
        setEnvironment(selectedEnv);
      }

      if (buData.workflows) {
        setWorkflows(buData.workflows);
        if (buData.workflows.length > 0 && !selectedWorkflow) {
          setSelectedWorkflow(buData.workflows[0]);
        }
      }
    } catch (error) {
      console.error('Error loading customer data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get the flow_data for the selected workflow + environment combo
  const selectedFlowData = useMemo(() => {
    if (!selectedWorkflow || !envId) return null;

    if (buData?.workflowEnvironments) {
      const weRelation = buData.workflowEnvironments.find(
        (we: any) => we.workflow_id === selectedWorkflow.id && we.environment_id === envId
      );

      if (weRelation?.flow_data_override) {
        return weRelation.flow_data_override;
      }
    }

    if (selectedWorkflow.flow_data) {
      return selectedWorkflow.flow_data;
    }

    return { nodes: [], edges: [], flowInputs: '', flowOutputs: '' };
  }, [selectedWorkflow, envId, buData]);

  // Get environment-level swimlane diagram data
  const envFlowData = useMemo(() => {
    if (!environment?.variables?.flow_data) return null;
    return environment.variables.flow_data;
  }, [environment]);

  const handleWorkflowSelect = (workflow: Workflow) => {
    setSelectedWorkflow(workflow);
    setActiveView('workflows');
  };

  const handleBackToEnvironments = () => {
    navigate('/customer/environments');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* Left Sidebar */}
      <aside className="w-80 bg-white shadow-lg border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-blue-600">Hypervision</h1>
              <p className="text-sm text-gray-600 mt-1">Customer Portal</p>
            </div>
            <button
              onClick={handleBackToEnvironments}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              title="Back to environments"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Environment Info */}
        {environment && (
          <div className="p-4 border-b border-gray-100 bg-blue-50">
            <h2 className="font-semibold text-blue-900">{environment.name}</h2>
            {environment.integration_type && (
              <p className="text-sm text-blue-700 capitalize">{environment.integration_type} Integration</p>
            )}
            {environment.description && (
              <p className="text-xs text-blue-600 mt-1">{environment.description}</p>
            )}
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-2">
            {/* Workflows Section */}
            <div>
              <button
                onClick={() => setWorkflowsExpanded(!workflowsExpanded)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center justify-between ${activeView === 'workflows' ? 'bg-green-50 text-green-700 font-medium' : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                  </svg>
                  <span>Workflows ({workflows.length})</span>
                </div>
                <svg className={`w-4 h-4 transition-transform ${workflowsExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {workflowsExpanded && (
                <div className="mt-2 ml-4 space-y-1">
                  {workflows.map((workflow) => (
                    <button
                      key={workflow.id}
                      type="button"
                      onClick={() => handleWorkflowSelect(workflow)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${selectedWorkflow?.id === workflow.id && activeView === 'workflows'
                        ? 'bg-green-100 text-green-800 font-medium border border-green-200'
                        : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                      <p className="font-medium">{workflow.name}</p>
                      {workflow.description && (
                        <p className="text-xs text-gray-500 mt-1">{workflow.description}</p>
                      )}
                    </button>
                  ))}
                  {workflows.length === 0 && (
                    <p className="text-sm text-gray-400 px-3 py-2">No workflows available</p>
                  )}
                </div>
              )}
            </div>

            {/* Architecture & Documentation */}
            <button
              onClick={() => setActiveView('swimlane')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${activeView === 'swimlane' ? 'bg-blue-50 text-blue-700 font-medium' : 'bg-gray-50 hover:bg-gray-100 text-gray-600'
                }`}
            >
              <svg className="w-5 h-5 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Architecture & Documentation
            </button>
          </div>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{businessUnitName || 'Customer'}</p>
              <button
                onClick={signOut}
                className="text-xs text-gray-500 hover:text-red-600 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {activeView === 'workflows' && selectedWorkflow ? (
          <div className="flex-1 flex flex-col">
            {/* Workflow Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900">{selectedWorkflow.name}</h1>
                  <p className="text-gray-600">{selectedWorkflow.description}</p>
                </div>
                <div className="text-sm text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                  Read-only
                </div>
              </div>
            </div>

            {/* Workflow Diagram - using Canvas for internal-like workflow view */}
            <div className="flex-1" style={{ height: 'calc(100vh - 73px)' }}>
              {selectedFlowData ? (
                <Canvas
                  board={{
                    id: selectedWorkflow.id,
                    name: selectedWorkflow.name,
                    description: selectedWorkflow.description || '',
                    user_id: '',
                    flow_data: selectedFlowData,
                    created_at: selectedWorkflow.created_at || new Date().toISOString(),
                    updated_at: selectedWorkflow.updated_at || new Date().toISOString(),
                  }}
                  onBack={() => { }}
                  readOnly={true}
                  initialData={selectedFlowData}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No diagram data available for this workflow.
                </div>
              )}
            </div>
          </div>
        ) : activeView === 'swimlane' ? (
          <div className="flex-1 flex flex-col overflow-y-auto">
            {/* Swimlane Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900">Architecture & Documentation</h1>
                  <p className="text-gray-600">Integration architecture and documentation for {environment?.name}</p>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-8">
              {/* Environment Swimlane Diagram */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900">Integration Architecture</h3>
                  <p className="text-sm text-gray-600 mt-1">Interactive swimlane diagram for {environment?.name}</p>
                </div>
                <div style={{ height: '600px' }}>
                  <SwimlaneDiagram
                    readOnly={true}
                    initialData={envFlowData}
                  />
                </div>
              </div>

              {/* Documentation Links */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Integration Documentation</h3>
                <p className="text-sm text-gray-500 mb-6">Explore our comprehensive guides and API references</p>

                <div className="flex items-center mb-6">
                  <a
                    href="https://documentation.hyperverge.co/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Full Application Documentation
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <a
                    href="https://documentation.hyperverge.co/docs/sdk-integration"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col p-6 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors">
                        <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900">SDK Integration</h4>
                    </div>
                    <p className="text-gray-600 text-sm flex-1">Complete guide for integrating HyperVerge SDK into your frontend applications with code examples and best practices.</p>
                  </a>

                  <a
                    href="https://documentation.hyperverge.co/docs/api-reference"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col p-6 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-green-200 transition-colors">
                        <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900">Results API</h4>
                    </div>
                    <p className="text-gray-600 text-sm flex-1">Comprehensive API reference for accessing verification results, processing responses, and handling different result formats.</p>
                  </a>

                  <a
                    href="https://documentation.hyperverge.co/accessing-results/results-webhook/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col p-6 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-200 transition-colors">
                        <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v-2H4v2zM4 15h8v-2H4v2zM4 11h8V9H4v2z" />
                        </svg>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900">Webhooks</h4>
                    </div>
                    <p className="text-gray-600 text-sm flex-1">Set up and configure webhooks for real-time result notifications, including payload formats and security considerations.</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Select a Workflow</h3>
              <p className="text-gray-500">Choose a workflow from the sidebar to view its diagram</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
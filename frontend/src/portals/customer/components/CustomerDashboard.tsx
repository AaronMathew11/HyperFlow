import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCustomerAuth } from '../contexts/CustomerAuthContext';
import { Workflow, Environment } from '../../../shared/types';
import InteractiveSwimlane from './InteractiveSwimlane';
import DummyWorkflowViewer from './DummyWorkflowViewer';

export default function CustomerDashboard() {
  const { envId } = useParams<{ envId: string }>();
  const navigate = useNavigate();
  const { user, signOut } = useCustomerAuth();

  const [activeView, setActiveView] = useState<'documentation' | 'workflow'>('documentation');
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [workflowsExpanded, setWorkflowsExpanded] = useState(false);
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [environment, setEnvironment] = useState<Environment | null>(null);
  const [environmentFormData, setEnvironmentFormData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (envId) {
      loadCustomerData(envId);
    }
  }, [envId]);

  const loadCustomerData = async (environmentId: string) => {
    try {
      setLoading(true);
      
      // Load environment details based on environmentId
      const envData = {
        'env-prod': {
          env: {
            id: 'env-prod',
            name: 'Production Environment',
            type: 'production',
            baseUrl: 'https://api.hdfcamc.com',
            business_unit_id: 'bu-hdfc',
            description: 'Live production integration with full KYC verification workflows',
            owner_id: 'owner-1',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          formData: {
            usesResultsApi: true,
            usesOutputsApi: false,
            reliesOnWebhooks: true,
            integrationType: 'sdk',
            sdkPlatform: 'web'
          }
        },
        'env-staging': {
          env: {
            id: 'env-staging',
            name: 'Staging Environment',
            type: 'staging',
            baseUrl: 'https://staging-api.hdfcamc.com',
            business_unit_id: 'bu-hdfc',
            description: 'Testing environment for integration validation and UAT',
            owner_id: 'owner-1',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          formData: {
            usesResultsApi: false,
            usesOutputsApi: true,
            reliesOnWebhooks: false,
            integrationType: 'api'
          }
        },
        'env-sandbox': {
          env: {
            id: 'env-sandbox',
            name: 'Sandbox Environment',
            type: 'development',
            baseUrl: 'https://sandbox-api.hdfcamc.com',
            business_unit_id: 'bu-hdfc',
            description: 'Development sandbox for initial testing and prototyping',
            owner_id: 'owner-1',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          formData: {
            usesResultsApi: true,
            usesOutputsApi: true,
            reliesOnWebhooks: true,
            integrationType: 'sdk',
            sdkPlatform: 'react-native'
          }
        }
      };

      const selectedEnvData = envData[environmentId as keyof typeof envData];
      if (selectedEnvData) {
        setEnvironment(selectedEnvData.env);
        setEnvironmentFormData(selectedEnvData.formData);
      }

      // Mock workflows for this environment
      setWorkflows([
        {
          id: 'wf-1',
          name: 'KYC Document Verification',
          description: 'Complete KYC process with document verification and face match',
          business_unit_id: 'bu-hdfc',
          owner_id: 'owner-1',
          flow_data: { 
            nodes: [
              { id: '1', type: 'startNode', position: { x: 0, y: 0 }, data: { label: 'Start KYC' } },
              { id: '2', type: 'moduleNode', position: { x: 200, y: 0 }, data: { label: 'Document Upload' } },
              { id: '3', type: 'moduleNode', position: { x: 400, y: 0 }, data: { label: 'Face Verification' } },
              { id: '4', type: 'endStatusNode', position: { x: 600, y: 0 }, data: { label: 'Verification Complete' } }
            ], 
            edges: [
              { id: 'e1-2', source: '1', target: '2' },
              { id: 'e2-3', source: '2', target: '3' },
              { id: 'e3-4', source: '3', target: '4' }
            ]
          },
          environment_ids: [environmentId],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'wf-2',
          name: 'Onboarding Flow',
          description: 'Complete customer onboarding with multiple verification steps',
          business_unit_id: 'bu-hdfc',
          owner_id: 'owner-1',
          flow_data: { 
            nodes: [
              { id: '1', type: 'startNode', position: { x: 0, y: 0 }, data: { label: 'Start Onboarding' } },
              { id: '2', type: 'moduleNode', position: { x: 200, y: 0 }, data: { label: 'Basic Details' } },
              { id: '3', type: 'conditionNode', position: { x: 400, y: 0 }, data: { label: 'Risk Assessment' } },
              { id: '4', type: 'endStatusNode', position: { x: 600, y: 0 }, data: { label: 'Account Created' } }
            ], 
            edges: [
              { id: 'e1-2', source: '1', target: '2' },
              { id: 'e2-3', source: '2', target: '3' },
              { id: 'e3-4', source: '3', target: '4' }
            ]
          },
          environment_ids: [environmentId],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'wf-3',
          name: 'Risk Assessment Workflow',
          description: 'Advanced risk assessment with multiple data points',
          business_unit_id: 'bu-hdfc',
          owner_id: 'owner-1',
          flow_data: { 
            nodes: [
              { id: '1', type: 'startNode', position: { x: 0, y: 0 }, data: { label: 'Start Assessment' } },
              { id: '2', type: 'moduleNode', position: { x: 200, y: 0 }, data: { label: 'Credit Check' } },
              { id: '3', type: 'moduleNode', position: { x: 400, y: 0 }, data: { label: 'Background Verification' } },
              { id: '4', type: 'endStatusNode', position: { x: 600, y: 0 }, data: { label: 'Risk Score Generated' } }
            ], 
            edges: [
              { id: 'e1-2', source: '1', target: '2' },
              { id: 'e2-3', source: '2', target: '3' },
              { id: 'e3-4', source: '3', target: '4' }
            ]
          },
          environment_ids: [environmentId],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]);

    } catch (error) {
      console.error('Error loading customer data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWorkflowSelect = (workflow: Workflow) => {
    console.log('Selecting workflow:', workflow);
    setSelectedWorkflow(workflow);
    setActiveView('workflow');
    console.log('Active view set to workflow');
    // Keep dropdown open - don't set setWorkflowsExpanded(false)
  };

  const handleBackToEnvironments = () => {
    navigate('/customer/login/link');
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
            <p className="text-sm text-blue-700 capitalize">{environment.type}</p>
            <p className="text-xs text-blue-600 mt-1">{environment.description}</p>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {/* Workflows Dropdown */}
            <div>
              <button
                onClick={() => setWorkflowsExpanded(!workflowsExpanded)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center justify-between ${
                  activeView === 'workflow' ? 'bg-green-100 text-green-700 font-medium' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                  </svg>
                  <span>Workflows ({workflows.length})</span>
                </div>
                <svg className={`w-4 h-4 transition-transform ${workflowsExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Workflow List */}
              {workflowsExpanded && (
                <div className="mt-2 ml-4 space-y-1">
                  {workflows.map((workflow) => (
                    <button
                      key={workflow.id}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleWorkflowSelect(workflow);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedWorkflow?.id === workflow.id 
                          ? 'bg-green-200 text-green-800 font-medium' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <div>
                        <p className="font-medium">{workflow.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{workflow.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Documentation */}
            <button
              onClick={() => setActiveView('documentation')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                activeView === 'documentation' ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Documentation
              </div>
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
              <p className="text-sm font-medium text-gray-900">{user?.email}</p>
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
        {activeView === 'workflow' && selectedWorkflow ? (
          <div className="flex-1">
            {/* Workflow Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{selectedWorkflow.name}</h1>
                  <p className="text-gray-600">{selectedWorkflow.description}</p>
                </div>
              </div>
            </div>

            {/* Workflow Canvas */}
            <div className="flex-1 bg-gray-50" style={{ height: 'calc(100vh - 200px)' }}>
              <div className="h-full p-4">
                <div className="h-full bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <DummyWorkflowViewer workflow={selectedWorkflow} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 p-8">
            {/* Documentation Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Documentation</h1>
              <div className="flex items-center gap-4">
                <p className="text-gray-600">Integration guides and API documentation</p>
                <a
                  href="https://documentation.hyperverge.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Application Documentation
                </a>
              </div>
            </div>

            <div className="space-y-8">
              {/* Swimlane Diagram */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900">Integration Architecture</h3>
                  <p className="text-sm text-gray-600 mt-1">Interactive components based on your {environment?.name} configuration</p>
                </div>
                
                <div className="h-96">
                  <InteractiveSwimlane 
                    environments={environment ? [environment] : []}
                    environmentFormData={{ [environment?.id || '']: environmentFormData }}
                  />
                </div>
              </div>

              {/* Documentation Links */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Integration Documentation</h3>
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
        )}
      </main>
    </div>
  );
}
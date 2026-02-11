import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCustomerAuth } from '../contexts/CustomerAuthContext';
import { Workflow, Environment } from '../../../shared/types';

export default function CustomerDashboard() {
  const { buId } = useParams<{ buId: string }>();
  const navigate = useNavigate();
  const { user, signOut } = useCustomerAuth();
  
  const [activeTab, setActiveTab] = useState<'workflows' | 'documentation'>('workflows');
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [environments, setEnvironments] = useState<Environment[]>([]);
  const [loading, setLoading] = useState(true);
  const [businessUnitName, setBusinessUnitName] = useState('Business Unit');

  useEffect(() => {
    if (buId) {
      loadCustomerData(buId);
    }
  }, [buId]);

  const loadCustomerData = async (businessUnitId: string) => {
    try {
      setLoading(true);
      // TODO: Call backend API to get customer workflows and environments
      // For now, mock the data
      
      setBusinessUnitName('Sample Business Unit');
      setWorkflows([
        {
          id: '1',
          name: 'User Verification Flow',
          description: 'Complete user verification process',
          business_unit_id: businessUnitId,
          owner_id: 'owner-1',
          flow_data: { nodes: [], edges: [] },
          environment_ids: ['env-1', 'env-2'],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '2', 
          name: 'Document Validation',
          description: 'Document verification workflow',
          business_unit_id: businessUnitId,
          owner_id: 'owner-1',
          flow_data: { nodes: [], edges: [] },
          environment_ids: ['env-1'],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]);
      
      setEnvironments([
        {
          id: 'env-1',
          name: 'Production',
          type: 'production',
          baseUrl: 'https://api.example.com',
          business_unit_id: businessUnitId,
          description: 'Production environment',
          owner_id: 'owner-1',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'env-2',
          name: 'Staging',
          type: 'staging', 
          baseUrl: 'https://staging-api.example.com',
          business_unit_id: businessUnitId,
          description: 'Staging environment',
          owner_id: 'owner-1',
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

  const handleWorkflowClick = (workflowId: string) => {
    navigate(`/customer/workflow/${workflowId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-blue-600">Hypervision</h1>
          <p className="text-sm text-gray-600 mt-1">Customer Portal</p>
        </div>

        {/* Business Unit Info */}
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">{businessUnitName}</h2>
          <p className="text-sm text-gray-500">Workflows & Documentation</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <button
              onClick={() => setActiveTab('workflows')}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'workflows'
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
                Workflows
              </div>
            </button>
            <button
              onClick={() => setActiveTab('documentation')}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'documentation'
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
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
      <main className="flex-1 p-8">
        {activeTab === 'workflows' ? (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Workflows</h2>
              <p className="text-gray-600">{workflows.length} available workflows</p>
            </div>

            {workflows.length === 0 ? (
              <div className="text-center py-20">
                <svg className="h-24 w-24 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No workflows available</h3>
                <p className="text-gray-600">Contact your account manager for access.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workflows.map((workflow) => (
                  <div
                    key={workflow.id}
                    onClick={() => handleWorkflowClick(workflow.id)}
                    className="bg-white rounded-xl border border-gray-200 p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-blue-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{workflow.name}</h3>
                        {workflow.description && (
                          <p className="text-gray-600 text-sm mb-3">{workflow.description}</p>
                        )}
                        
                        {workflow.environment_ids && workflow.environment_ids.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {workflow.environment_ids.map(envId => {
                              const env = environments.find(e => e.id === envId);
                              if (!env) return null;
                              
                              const getEnvColor = (type: string) => {
                                switch (type) {
                                  case 'production': return 'bg-red-100 text-red-700';
                                  case 'staging': return 'bg-yellow-100 text-yellow-700';
                                  default: return 'bg-blue-100 text-blue-700';
                                }
                              };
                              
                              return (
                                <span key={envId} className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getEnvColor(env.type)}`}>
                                  {env.name}
                                </span>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Documentation</h2>
              <p className="text-gray-600">API documentation and integration guides</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <div className="text-center py-20">
                <svg className="h-24 w-24 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Documentation Coming Soon</h3>
                <p className="text-gray-600">Comprehensive API documentation will be available here.</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
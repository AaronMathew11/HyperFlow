import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCustomerAuth } from '../contexts/CustomerAuthContext';
import { Workflow } from '../../../shared/types';

export default function CustomerWorkflowView() {
  const { workflowId } = useParams<{ workflowId: string }>();
  const navigate = useNavigate();
  const { businessUnitId } = useCustomerAuth();

  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (workflowId) {
      loadWorkflow(workflowId);
    }
  }, [workflowId]);

  const loadWorkflow = async (id: string) => {
    try {
      setLoading(true);
      // TODO: Call backend API to get customer workflow
      // For now, mock the data

      setWorkflow({
        id,
        name: 'User Verification Flow',
        description: 'Complete user verification process',
        business_unit_id: businessUnitId || '',
        owner_id: 'owner-1',
        flow_data: { nodes: [], edges: [] },
        environment_ids: ['env-1'],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

    } catch (error) {
      console.error('Error loading workflow:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(`/customer/dashboard/${businessUnitId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading workflow...</p>
        </div>
      </div>
    );
  }

  if (!workflow) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <svg className="h-24 w-24 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Workflow Not Found</h3>
          <p className="text-gray-600 mb-6">The requested workflow could not be found or you don't have access to it.</p>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{workflow.name}</h1>
                {workflow.description && (
                  <p className="text-gray-600 mt-1">{workflow.description}</p>
                )}
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Read-only view
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="p-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center py-20">
            <svg className="h-24 w-24 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Workflow Visualization</h3>
            <p className="text-gray-600 mb-6">
              This workflow contains {workflow.flow_data ? 'configured' : 'no'} flow steps.
              <br />
              Integration with the read-only workflow viewer will be implemented here.
            </p>

            {/* Placeholder for workflow visualization */}
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 mt-8">
              <p className="text-gray-500">Workflow canvas will be displayed here</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
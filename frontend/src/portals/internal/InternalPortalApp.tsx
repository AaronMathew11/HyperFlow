import { Routes, Route, useParams, useNavigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import PublicBoardView from '../../shared/components/PublicBoardView';
import { Board } from '../../shared/types';
import { useBoardStore } from './store/boardStore';
import { useWorkflowStore } from './store/workflowStore';
import { useEffect, useState } from 'react';
import { getWorkflow } from '../../shared/lib/api';

// New hierarchy pages
import ClientsPage from './components/ClientsPage';
import BusinessUnitsPage from './components/BusinessUnitsPage';
import WorkflowsPage from './components/WorkflowsPage';
import EnvironmentDetailPage from './components/EnvironmentDetailPage';

// Legacy imports (keep for backward compatibility)
import HomePage from './components/HomePage';

// Workflow Editor View (new hierarchy)
function WorkflowView() {
  const { workflowId } = useParams<{ workflowId: string }>();
  const navigate = useNavigate();
  const { currentWorkflow, setCurrentWorkflow } = useWorkflowStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [breadcrumbData, setBreadcrumbData] = useState<{
    client?: { id: string; name: string };
    businessUnit?: { id: string; name: string };
  }>({});

  useEffect(() => {
    if (workflowId) {
      setLoading(true);
      setError(null);
      console.log('Loading workflow:', workflowId);
      
      getWorkflow(workflowId)
        .then(async (workflow) => {
          console.log('Workflow loaded:', workflow);
          if (workflow) {
            setCurrentWorkflow(workflow);

            // Load breadcrumb data
            if (workflow.business_unit_id) {
              try {
                const { getBusinessUnit, getClient } = await import('../../shared/lib/api');
                const businessUnit = await getBusinessUnit(workflow.business_unit_id);
                if (businessUnit) {
                  const client = await getClient(businessUnit.client_id);
                  setBreadcrumbData({
                    client: client ? { id: client.id, name: client.name } : undefined,
                    businessUnit: { id: businessUnit.id, name: businessUnit.name }
                  });
                }
              } catch (error) {
                console.error('Error loading breadcrumb data:', error);
              }
            }
          } else {
            setError('Workflow not found');
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error loading workflow:', error);
          setError(error.message || 'Failed to load workflow');
          setLoading(false);
        });
    }
  }, [workflowId, setCurrentWorkflow]);

  const handleBack = () => {
    // Navigate back to the workflows page for this workflow's business unit
    if (currentWorkflow?.business_unit_id && breadcrumbData.client?.id) {
      navigate(`/client/${breadcrumbData.client.id}/bu/${currentWorkflow.business_unit_id}`);
    } else {
      // Fallback: go back through browser history
      navigate(-1);
    }
  };

  const handleBreadcrumbNavigation = (level: 'clients' | 'businessUnits' | 'workflows') => {
    switch (level) {
      case 'clients':
        navigate('/');
        break;
      case 'businessUnits':
        if (breadcrumbData.client?.id) {
          navigate(`/client/${breadcrumbData.client.id}`);
        }
        break;
      case 'workflows':
        if (currentWorkflow?.business_unit_id && breadcrumbData.client?.id) {
          navigate(`/client/${breadcrumbData.client.id}/bu/${currentWorkflow.business_unit_id}`);
        }
        break;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Loading workflow...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Workflow</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (!currentWorkflow) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-yellow-600 mb-4">
            <svg className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20.4a7.962 7.962 0 01-5-1.709M15 9V7a3 3 0 00-6 0v2" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Workflow Not Found</h2>
          <p className="text-gray-600 mb-4">The requested workflow could not be found.</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  // Convert Workflow to Board-like structure for Canvas compatibility
  const boardLike: Board = {
    id: currentWorkflow.id,
    name: currentWorkflow.name,
    description: currentWorkflow.description,
    user_id: currentWorkflow.owner_id,
    flow_data: currentWorkflow.flow_data,
    created_at: currentWorkflow.created_at,
    updated_at: currentWorkflow.updated_at,
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Canvas
        board={boardLike}
        onBack={handleBack}
        breadcrumbData={breadcrumbData}
        onBreadcrumbNavigation={handleBreadcrumbNavigation}
      />
      <div className="absolute top-0 left-0 z-20 pointer-events-none h-full">
        <div className="pointer-events-auto">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

// Legacy Board View (for backward compatibility)
function BoardView() {
  const { boardId } = useParams<{ boardId: string }>();
  const navigate = useNavigate();
  const { boards } = useBoardStore();
  const [currentBoard, setCurrentBoard] = useState<Board | null>(null);

  useEffect(() => {
    if (boardId) {
      // Extract UUID from the boardId (format: uuid_name)
      const uuid = boardId.split('_')[0];
      const board = boards.find(b => b.id === uuid);
      if (board) {
        setCurrentBoard(board);
      }
    }
  }, [boardId, boards]);

  const handleBackToHome = () => {
    // Navigate back to the clients page (home)
    navigate('/');
  };

  if (!currentBoard) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading board...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <Canvas board={currentBoard} onBack={handleBackToHome} />
      <div className="absolute top-0 left-0 z-20 pointer-events-none h-full">
        <div className="pointer-events-auto">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  );
}

function InternalPortalApp() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public route - no auth required */}
        <Route path="/share/:linkId" element={<PublicBoardView />} />

        {/* Protected routes */}
        <Route element={<ProtectedLayout />}>
          {/* New Hierarchy Routes */}
          <Route path="/" element={<ClientsPage />} />
          <Route path="/client/:clientId" element={<BusinessUnitsPage />} />
          <Route path="/client/:clientId/bu/:buId" element={<WorkflowsPage />} />
          <Route path="/client/:clientId/bu/:buId/environment/:environmentId" element={<EnvironmentDetailPage />} />
          <Route path="/workflow/:workflowId" element={<WorkflowView />} />

          {/* Legacy Routes (for backward compatibility) */}
          <Route path="/legacy" element={<HomePage />} />
          <Route path="/board/:boardId" element={<BoardView />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default InternalPortalApp;
import { BrowserRouter, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
// Workflow type used via currentWorkflow from store
import { useWorkflowStore } from './store/workflowStore';
import { useEffect, useState } from 'react';
import { getWorkflow } from './lib/api';

// New hierarchy pages
import ClientsPage from './components/ClientsPage';
import BusinessUnitsPage from './components/BusinessUnitsPage';
import WorkflowsPage from './components/WorkflowsPage';

// Legacy imports (keep for backward compatibility)
import HomePage from './components/HomePage';
import { useBoardStore } from './store/boardStore';
import { Board } from './types';

// Workflow Editor View (new hierarchy)
function WorkflowView() {
  const { workflowId } = useParams<{ workflowId: string }>();
  const navigate = useNavigate();
  const { currentWorkflow, setCurrentWorkflow } = useWorkflowStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (workflowId) {
      setLoading(true);
      getWorkflow(workflowId).then((workflow) => {
        if (workflow) {
          setCurrentWorkflow(workflow);
        }
        setLoading(false);
      });
    }
  }, [workflowId, setCurrentWorkflow]);

  const handleBack = () => {
    if (currentWorkflow) {
      // Navigate back to the workflows page
      // We need to get the BU info to navigate correctly
      navigate(-1); // Go back to previous page
    } else {
      navigate('/');
    }
  };

  if (loading || !currentWorkflow) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Loading workflow...</p>
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
      <Canvas board={boardLike} onBack={handleBack} />
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

function App() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <BrowserRouter>
          <Routes>
            {/* New Hierarchy Routes */}
            <Route path="/" element={<ClientsPage />} />
            <Route path="/client/:clientId" element={<BusinessUnitsPage />} />
            <Route path="/client/:clientId/bu/:buId" element={<WorkflowsPage />} />
            <Route path="/workflow/:workflowId" element={<WorkflowView />} />

            {/* Legacy Routes (for backward compatibility) */}
            <Route path="/legacy" element={<HomePage />} />
            <Route path="/board/:boardId" element={<BoardView />} />
          </Routes>
        </BrowserRouter>
      </ProtectedRoute>
    </AuthProvider>
  );
}

export default App;

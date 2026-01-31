import { BrowserRouter, Routes, Route, useParams, useNavigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './components/HomePage';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import PublicBoardView from './components/PublicBoardView';
import { Board } from './types';
import { useBoardStore } from './store/boardStore';
import { useEffect, useState } from 'react';

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

function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public route - no auth required */}
          <Route path="/share/:linkId" element={<PublicBoardView />} />

          {/* Protected routes */}
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/:boardId" element={<BoardView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

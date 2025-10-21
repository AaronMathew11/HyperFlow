import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';

function App() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <div className="relative h-screen w-screen overflow-hidden">
          <Canvas />
          <div className="absolute top-0 left-0 z-20 pointer-events-none h-full">
            <div className="pointer-events-auto">
              <Sidebar />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    </AuthProvider>
  );
}

export default App;

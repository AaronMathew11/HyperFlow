import { useAuth } from '../contexts/AuthContext';
import Login from './Login';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  // In development mode, allow bypassing authentication
  const isDevelopment = import.meta.env.DEV;
  const bypassAuth = import.meta.env.VITE_BYPASS_AUTH === 'true';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600"></div>
          <p className="mt-4 text-primary-700 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Bypass authentication in development if configured
  if (isDevelopment && bypassAuth) {
    return <>{children}</>;
  }

  if (!user) {
    return <Login />;
  }

  return <>{children}</>;
}

import { ReactNode } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useCustomerAuth } from '../contexts/CustomerAuthContext';

interface CustomerProtectedRouteProps {
  children: ReactNode;
}

export default function CustomerProtectedRoute({ children }: CustomerProtectedRouteProps) {
  const { user, loading } = useCustomerAuth();
  const params = useParams();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect to customer login with current path
    const currentPath = window.location.pathname;
    const linkId = params.linkId || localStorage.getItem('customer_link_id') || 'default';
    return <Navigate to={`/customer/login/${linkId}?redirect=${encodeURIComponent(currentPath)}`} replace />;
  }

  return <>{children}</>;
}
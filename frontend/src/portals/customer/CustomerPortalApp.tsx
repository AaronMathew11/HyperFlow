import { Routes, Route, Outlet } from 'react-router-dom';
import { CustomerAuthProvider } from './contexts/CustomerAuthContext';
import CustomerProtectedRoute from './components/CustomerProtectedRoute';
import CustomerLogin from './components/CustomerLogin';
import CustomerDashboard from './components/CustomerDashboard';
import CustomerWorkflowView from './components/CustomerWorkflowView';
import EnvironmentSelection from './components/EnvironmentSelection';

function CustomerProtectedLayout() {
  return (
    <CustomerProtectedRoute>
      <Outlet />
    </CustomerProtectedRoute>
  );
}

function CustomerPortalApp() {
  return (
    <CustomerAuthProvider>
      <Routes>
        {/* Public customer routes */}
        <Route path="/login/:linkId" element={<CustomerLogin />} />
        
        {/* Protected customer routes */}
        <Route element={<CustomerProtectedLayout />}>
          <Route path="/environments" element={<EnvironmentSelection />} />
          <Route path="/dashboard/:envId" element={<CustomerDashboard />} />
          <Route path="/workflow/:workflowId" element={<CustomerWorkflowView />} />
        </Route>
      </Routes>
    </CustomerAuthProvider>
  );
}

export default CustomerPortalApp;
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InternalPortalApp from './portals/internal/InternalPortalApp';
import CustomerPortalApp from './portals/customer/CustomerPortalApp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer Portal Routes */}
        <Route path="/customer/*" element={<CustomerPortalApp />} />
        
        {/* Internal Portal Routes (default) */}
        <Route path="/*" element={<InternalPortalApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
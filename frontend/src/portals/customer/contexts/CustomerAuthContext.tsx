import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CustomerUser } from '../../../shared/types';

interface CustomerAuthContextType {
  user: CustomerUser | null;
  loading: boolean;
  signIn: (linkId: string, email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  businessUnitId: string | null;
}

const CustomerAuthContext = createContext<CustomerAuthContextType | undefined>(undefined);

export function CustomerAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CustomerUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [businessUnitId, setBusinessUnitId] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing customer session
    const customerToken = localStorage.getItem('customer_token');
    const buId = localStorage.getItem('customer_bu_id');

    if (customerToken && buId) {
      // Validate token with backend
      validateCustomerToken(customerToken, buId);
    } else {
      setLoading(false);
    }
  }, []);

  const validateCustomerToken = async (_token: string, buId: string) => {
    try {
      // TODO: Call backend to validate customer token
      // For now, mock the validation
      setUser({
        id: 'customer-1',
        email: 'customer@example.com',
        name: 'Customer User'
      });
      setBusinessUnitId(buId);
    } catch (error) {
      localStorage.removeItem('customer_token');
      localStorage.removeItem('customer_bu_id');
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (_linkId: string, email: string, _password: string): Promise<boolean> => {
    try {
      // TODO: Call backend customer login API
      // For now, mock the login
      const token = 'mock-customer-token';
      const buId = 'mock-bu-id';

      localStorage.setItem('customer_token', token);
      localStorage.setItem('customer_bu_id', buId);

      setUser({
        id: 'customer-1',
        email,
        name: 'Customer User'
      });
      setBusinessUnitId(buId);

      return true;
    } catch (error) {
      console.error('Customer sign in error:', error);
      return false;
    }
  };

  const signOut = () => {
    localStorage.removeItem('customer_token');
    localStorage.removeItem('customer_bu_id');
    setUser(null);
    setBusinessUnitId(null);
  };

  return (
    <CustomerAuthContext.Provider value={{
      user,
      loading,
      signIn,
      signOut,
      businessUnitId
    }}>
      {children}
    </CustomerAuthContext.Provider>
  );
}

export const useCustomerAuth = () => {
  const context = useContext(CustomerAuthContext);
  if (context === undefined) {
    throw new Error('useCustomerAuth must be used within a CustomerAuthProvider');
  }
  return context;
};
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { verifyBULink, getPublicBUData } from '../../../shared/lib/api';
import { CustomerUser, PublicBUData } from '../../../shared/types';

interface CustomerAuthContextType {
  user: CustomerUser | null;
  loading: boolean;
  signIn: (linkId: string, password: string) => Promise<boolean>;
  signOut: () => void;
  businessUnitId: string | null;
  businessUnitName: string | null;
  linkId: string | null;
  token: string | null;
  buData: PublicBUData | null;
  loadBUData: () => Promise<void>;
}

const CustomerAuthContext = createContext<CustomerAuthContextType | undefined>(undefined);

export function CustomerAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CustomerUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [businessUnitId, setBusinessUnitId] = useState<string | null>(null);
  const [businessUnitName, setBusinessUnitName] = useState<string | null>(null);
  const [linkId, setLinkId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [buData, setBuData] = useState<PublicBUData | null>(null);

  useEffect(() => {
    // Check for existing customer session
    const storedLinkId = localStorage.getItem('customer_link_id');
    const storedToken = localStorage.getItem('customer_token');
    const storedBuId = localStorage.getItem('customer_bu_id');
    const storedBuName = localStorage.getItem('customer_bu_name');

    if (storedLinkId && storedToken && storedBuId) {
      setLinkId(storedLinkId);
      setToken(storedToken);
      setBusinessUnitId(storedBuId);
      setBusinessUnitName(storedBuName);
      setUser({ id: 'customer', email: '', name: 'Customer User' });
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const signIn = async (newLinkId: string, password: string): Promise<boolean> => {
    try {
      const result = await verifyBULink(newLinkId, password);
      if (!result) return false;

      // Store session
      localStorage.setItem('customer_link_id', newLinkId);
      localStorage.setItem('customer_token', password);
      localStorage.setItem('customer_bu_id', result.businessUnitId);
      localStorage.setItem('customer_bu_name', result.businessUnitName);

      setLinkId(newLinkId);
      setToken(password);
      setBusinessUnitId(result.businessUnitId);
      setBusinessUnitName(result.businessUnitName);
      setUser({ id: 'customer', email: '', name: 'Customer User' });

      return true;
    } catch (error) {
      console.error('Customer sign in error:', error);
      return false;
    }
  };

  const loadBUData = async () => {
    if (!linkId || !token) return;
    try {
      const data = await getPublicBUData(linkId, token);
      if (data) {
        setBuData(data);
      }
    } catch (error) {
      console.error('Error loading BU data:', error);
    }
  };

  const signOut = () => {
    localStorage.removeItem('customer_link_id');
    localStorage.removeItem('customer_token');
    localStorage.removeItem('customer_bu_id');
    localStorage.removeItem('customer_bu_name');
    setUser(null);
    setBusinessUnitId(null);
    setBusinessUnitName(null);
    setLinkId(null);
    setToken(null);
    setBuData(null);
  };

  return (
    <CustomerAuthContext.Provider value={{
      user,
      loading,
      signIn,
      signOut,
      businessUnitId,
      businessUnitName,
      linkId,
      token,
      buData,
      loadBUData,
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
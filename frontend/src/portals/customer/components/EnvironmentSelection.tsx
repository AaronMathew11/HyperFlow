import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCustomerAuth } from '../contexts/CustomerAuthContext';
import { Environment } from '../../../shared/types';

export default function EnvironmentSelection() {
  const { linkId } = useParams<{ linkId: string }>();
  const navigate = useNavigate();
  const { user, signOut } = useCustomerAuth();
  const [environments, setEnvironments] = useState<Environment[]>([]);
  const [loading, setLoading] = useState(true);
  const [businessUnitName, setBusinessUnitName] = useState('Business Unit');

  useEffect(() => {
    loadEnvironments();
  }, []);

  const loadEnvironments = async () => {
    try {
      setLoading(true);
      // Mock environment data - in production this would come from the link configuration
      setBusinessUnitName('HDFC AMC Solutions');
      setEnvironments([
        {
          id: 'env-prod',
          name: 'Investor Portal - web',
          type: 'production',
          baseUrl: 'https://api.hdfcamc.com',
          business_unit_id: 'bu-hdfc',
          description: 'RI Iinvestor Onboarding',
          owner_id: 'owner-1',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'env-staging',
          name: 'Smart Wealth App',
          type: 'staging',
          baseUrl: 'https://staging-api.hdfcamc.com',
          business_unit_id: 'bu-hdfc',
          description: 'RI Investor Onboarding',
          owner_id: 'owner-1',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'env-sandbox',
          name: 'HDFC securities',
          type: 'development',
          baseUrl: 'https://sandbox-api.hdfcamc.com',
          business_unit_id: 'bu-hdfc',
          description: 'RI Investor Onboarding',
          owner_id: 'owner-1',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]);
    } catch (error) {
      console.error('Error loading environments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnvironmentSelect = (envId: string) => {
    // Navigate to the main dashboard with the selected environment
    navigate(`/customer/dashboard/${envId}`);
  };

  const getEnvironmentColor = (type: string) => {
    switch (type) {
      case 'production': return 'border-red-300 bg-red-50 hover:bg-red-100';
      case 'staging': return 'border-yellow-300 bg-yellow-50 hover:bg-yellow-100';
      case 'development': return 'border-blue-300 bg-blue-50 hover:bg-blue-100';
      default: return 'border-gray-300 bg-gray-50 hover:bg-gray-100';
    }
  };

  const getEnvironmentIcon = (type: string) => {
    switch (type) {
      case 'production':
        return (
          <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        );
      case 'staging':
        return (
          <svg className="w-8 h-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'development':
        return (
          <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading environments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Select Usecase</h1>
          <p className="text-xl text-gray-600 mb-2">{businessUnitName}</p>
          <p className="text-gray-500">
            Choose the environment you want to explore workflows and documentation for
          </p>
        </div>

        {/* Environment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {environments.map((env) => (
            <div
              key={env.id}
              onClick={() => handleEnvironmentSelect(env.id)}
              className={`cursor-pointer rounded-xl border-2 p-6 transition-all duration-200 hover:shadow-lg ${getEnvironmentColor(env.type)}`}
            >
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {getEnvironmentIcon(env.type)}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{env.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{env.description}</p>
                <div className="flex items-center justify-center text-xs text-gray-500">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  {env.baseUrl}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* User Info */}
        <div className="border-t border-gray-200 pt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{user?.email}</p>
              <p className="text-xs text-gray-500">Customer Access</p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="text-sm text-gray-500 hover:text-red-600 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
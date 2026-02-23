import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomerAuth } from '../contexts/CustomerAuthContext';
import { Environment } from '../../../shared/types';

export default function EnvironmentSelection() {
  const navigate = useNavigate();
  const { user, signOut, businessUnitName, buData, loadBUData } = useCustomerAuth();
  const [environments, setEnvironments] = useState<Environment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      await loadBUData();
    } catch (error) {
      console.error('Error loading environments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (buData?.environments) {
      setEnvironments(buData.environments);
    }
  }, [buData]);

  const handleEnvironmentSelect = (envId: string) => {
    navigate(`/customer/dashboard/${envId}`);
  };

  const getEnvironmentColor = (integrationType?: string) => {
    switch (integrationType) {
      case 'sdk': return 'border-purple-300 bg-purple-50 hover:bg-purple-100';
      case 'api': return 'border-blue-300 bg-blue-50 hover:bg-blue-100';
      default: return 'border-gray-300 bg-gray-50 hover:bg-gray-100';
    }
  };

  const getEnvironmentIcon = (integrationType?: string) => {
    switch (integrationType) {
      case 'sdk':
        return (
          <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case 'api':
        return (
          <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
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
          <p className="text-xl text-gray-600 mb-2">{businessUnitName || 'Business Unit'}</p>
          <p className="text-gray-500">
            Choose the environment you want to explore workflows and documentation for
          </p>
        </div>

        {/* Environment Cards */}
        <div className={`grid grid-cols-1 ${environments.length >= 3 ? 'md:grid-cols-3' : environments.length === 2 ? 'md:grid-cols-2' : ''} gap-6 mb-8`}>
          {environments.map((env) => (
            <div
              key={env.id}
              onClick={() => handleEnvironmentSelect(env.id)}
              className={`cursor-pointer rounded-xl border-2 p-6 transition-all duration-200 hover:shadow-lg ${getEnvironmentColor(env.integration_type)}`}
            >
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {getEnvironmentIcon(env.integration_type)}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{env.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{env.description}</p>
                {env.integration_type && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white bg-opacity-60 text-gray-700 uppercase">
                    {env.integration_type} Integration
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {environments.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
            <p className="text-gray-500">No environments configured for this business unit yet.</p>
          </div>
        )}

        {/* User Info */}
        <div className="border-t border-gray-200 pt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{user?.email || 'Customer Access'}</p>
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
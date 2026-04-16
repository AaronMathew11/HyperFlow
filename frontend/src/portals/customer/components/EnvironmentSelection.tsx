import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomerAuth } from '../contexts/CustomerAuthContext';
import { Environment } from '../../../shared/types';
import CustomerTopNav from './CustomerTopNav';

export default function EnvironmentSelection() {
  const navigate = useNavigate();
  const { buData, loadBUData } = useCustomerAuth();
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

  const getEnvironmentColorClasses = (integrationType?: string) => {
    switch (integrationType) {
      case 'sdk':
        return {
          icon: 'text-purple-600',
          bg: 'bg-purple-100',
        };
      case 'api':
        return {
          icon: 'text-blue-600',
          bg: 'bg-blue-100',
        };
      default:
        return {
          icon: 'text-gray-600',
          bg: 'bg-gray-100',
        };
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <CustomerTopNav />

      {/* Main Content */}
      <main className="flex-1 px-10 py-8 max-w-[1400px] w-full mx-auto">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-900">Environments</h2>
          <p className="text-gray-500 mt-1">
            {environments.length} {environments.length === 1 ? 'environment' : 'environments'}
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-500">Loading environments...</p>
            </div>
          </div>
        ) : environments.length === 0 ? (
          <div className="text-center py-20">
            <svg
              className="h-20 w-20 mx-auto text-gray-300 mb-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16M6 6v12M12 6v12M18 6v12"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No environments yet</h3>
            <p className="text-gray-500">No environments configured for this business unit.</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 gap-1">
            {environments.map((env) => {
              const colors = getEnvironmentColorClasses(env.integration_type);

              return (
                <div
                  key={env.id}
                  onClick={() => handleEnvironmentSelect(env.id)}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  {/* Card */}
                  <div className="w-28 h-28 bg-white border border-gray-200 rounded-2xl flex items-center justify-center hover:shadow-md hover:border-gray-300 transition-all">

                    {/* Icon Container */}
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${colors.bg}`}>

                      {/* Environment Icon */}
                      <svg
                        className={`h-14 w-14 ${colors.icon}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 6h16M4 12h16M4 18h16M6 6v12M12 6v12M18 6v12"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Name */}
                  <p className="mt-3 text-sm text-gray-800 text-center max-w-[110px] truncate">
                    {env.name}
                  </p>

                  {/* Type */}
                  {env.integration_type && (
                    <span className="text-[10px] text-gray-400 uppercase mt-1">
                      {env.integration_type}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
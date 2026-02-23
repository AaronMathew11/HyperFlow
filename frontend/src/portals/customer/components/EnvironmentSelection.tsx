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
    navigate(`/customer/env/${envId}`);
  };

  const getEnvironmentColorClasses = (integrationType?: string) => {
    switch (integrationType) {
      case 'sdk':
        return {
          icon: 'text-purple-500',
          bg: 'bg-purple-50',
          hover: 'hover:bg-purple-100',
          border: 'border-purple-200',
        };
      case 'api':
        return {
          icon: 'text-blue-500',
          bg: 'bg-blue-50',
          hover: 'hover:bg-blue-100',
          border: 'border-blue-200',
        };
      default:
        return {
          icon: 'text-gray-500',
          bg: 'bg-gray-50',
          hover: 'hover:bg-gray-100',
          border: 'border-gray-200',
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <CustomerTopNav />

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Page Title */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Environments</h2>
            <p className="text-gray-600 mt-2">
              {environments.length} {environments.length === 1 ? 'environment' : 'environments'}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading environments...</p>
            </div>
          </div>
        ) : environments.length === 0 ? (
          <div className="text-center py-20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24 mx-auto text-gray-300 mb-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 9h-15a4.483 4.483 0 00-3 1.146z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No environments yet</h3>
            <p className="text-gray-600 mb-6">No environments configured for this business unit.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {environments.map((env) => {
              const colors = getEnvironmentColorClasses(env.integration_type);
              return (
                <div
                  key={env.id}
                  onClick={() => handleEnvironmentSelect(env.id)}
                  className={`relative group cursor-pointer rounded-xl border-2 ${colors.border} ${colors.bg} ${colors.hover} p-6 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]`}
                >
                  <div className="flex flex-col items-center text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-20 w-20 ${colors.icon} mb-4`}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 9h-15a4.483 4.483 0 00-3 1.146z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                      {env.name}
                    </h3>
                    {env.description && (
                      <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                        {env.description}
                      </p>
                    )}
                    {env.integration_type && (
                      <span className={`inline-flex items-center px-2 py-0.5 mt-2 opacity-75 rounded-full text-[10px] font-medium bg-white/80 text-gray-800 uppercase`}>
                        {env.integration_type}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
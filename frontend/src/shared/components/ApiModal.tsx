import { useState, useEffect } from 'react';
import { ModuleType } from '../types';
import ModuleIcon from './ModuleIcon';

interface ApiModalProps {
  selectedModule: ModuleType | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ApiModal({ selectedModule, isOpen, onClose }: ApiModalProps) {
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'curl' | 'parameters' | 'response'>('overview');

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const copyToClipboard = async (text: string, type: 'curl') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'curl') {
        setCopiedCurl(true);
        setTimeout(() => setCopiedCurl(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };


  if (!isOpen || !selectedModule?.apiInfo) return null;

  const { apiInfo } = selectedModule;

  const tabConfig = [
    { id: 'overview', label: 'Overview', icon: '' },
    { id: 'parameters', label: 'Parameters', icon: '' },
    { id: 'curl', label: 'cURL Example', icon: '' },
    { id: 'response', label: 'Response', icon: '' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="relative bg-white rounded-3xl shadow-2xl max-w-[95vw] w-full max-h-[95vh] overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%)',
          backdropFilter: 'blur(20px) saturate(120%)',
          WebkitBackdropFilter: 'blur(20px) saturate(120%)',
          border: '1px solid rgba(255, 255, 255, 0.7)',
          boxShadow: '0 25px 100px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.2)',
          minWidth: '1000px',
        }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 px-8 py-6 border-b border-gray-200/50">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 min-w-0 flex-1">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0"
                style={{ backgroundColor: selectedModule.color + '20', color: selectedModule.color }}
              >
                <ModuleIcon type={selectedModule.icon} className="w-8 h-8" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-1 break-words">{selectedModule.label}</h2>
                <p className="text-gray-600 text-lg mb-2 break-words">{selectedModule.description}</p>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {apiInfo.method}
                  </span>
                  <span className="text-sm text-gray-500">
                    HyperVerge API
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0 ml-4">
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white/60 rounded-xl transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200/60 bg-gray-50/30 overflow-x-auto">
          <nav className="flex space-x-8 px-8 min-w-max">
            {tabConfig.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div 
          className="px-10 py-8 overflow-y-scroll max-h-[calc(95vh-200px)]" 
          style={{
            scrollBehavior: 'smooth',
            scrollbarWidth: 'thin',
            scrollbarColor: '#d1d5db #f3f4f6',
            overscrollBehavior: 'contain'
          }}
          onWheel={(e) => {
            e.stopPropagation();
          }}
        >
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* API Endpoint */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">API Endpoint</h3>
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 text-sm font-bold bg-blue-500 text-white rounded-lg">
                          {apiInfo.method}
                        </span>
                        <span className="text-sm text-gray-600 font-medium">Production Endpoint</span>
                      </div>
                      <code className="block text-sm bg-white/80 px-4 py-3 rounded-lg text-gray-800 font-mono border border-blue-200 break-all word-break overflow-x-auto">
                        {apiInfo.endpoint}
                      </code>
                    </div>
                  </div>

                  {/* Success Criteria */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Success Criteria</h3>
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                      <p className="text-sm text-gray-600 mb-3">API call is considered successful when:</p>
                      <code className="block text-sm bg-white/80 px-4 py-3 rounded-lg text-green-800 font-mono border border-green-200 break-words">
                        {apiInfo.successCriteria}
                      </code>
                    </div>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="space-y-6">
                  {/* Recommended Next APIs */}
                  {apiInfo.nextApiRecommendations.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Next Recommended APIs</h3>
                      <div className="space-y-3">
                        {apiInfo.nextApiRecommendations.map((api, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-100"
                          >
                            <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </div>
                            <span className="font-medium text-gray-800 capitalize break-words flex-1">
                              {api.replace('-', ' ')}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Documentation Link */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Documentation</h3>
                    <a
                      href={apiInfo.documentationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 w-full p-6 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border border-purple-100 rounded-2xl transition-all duration-200 group"
                    >
                      <div className="p-3 bg-purple-500 text-white rounded-xl group-hover:bg-purple-600 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-lg break-words">View Complete Documentation</p>
                        <p className="text-gray-600 break-words">Detailed guides, examples, and API reference</p>
                      </div>
                      <svg className="w-5 h-5 text-purple-400 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Parameters Tab */}
          {activeTab === 'parameters' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                {/* Input Parameters */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    Input Parameters
                    <span className="text-sm font-normal text-gray-500">({apiInfo.inputVariables.length} parameters)</span>
                  </h3>
                  <div className="space-y-3">
                    {apiInfo.inputVariables.map((variable, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100"
                      >
                        <div className="w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <code className="font-mono font-semibold text-blue-800 text-lg break-all block mb-1">{variable}</code>
                          <p className="text-sm text-gray-600">Required parameter</p>
                        </div>
                        <span className="px-3 py-2 text-xs bg-blue-100 text-blue-700 rounded-lg font-medium flex-shrink-0">
                          Required
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Output Parameters */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    Response Fields
                    <span className="text-sm font-normal text-gray-500">({apiInfo.outputVariables.length} fields)</span>
                  </h3>
                  <div className="space-y-3">
                    {apiInfo.outputVariables.map((variable, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100"
                      >
                        <div className="w-10 h-10 bg-green-500 text-white rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <code className="font-mono font-semibold text-green-800 text-lg break-all block mb-1">{variable}</code>
                          <p className="text-sm text-gray-600">Response field</p>
                        </div>
                        <span className="px-3 py-2 text-xs bg-green-100 text-green-700 rounded-lg font-medium flex-shrink-0">
                          Returned
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* cURL Tab */}
          {activeTab === 'curl' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  cURL Example
                </h3>
                <button
                  onClick={() => copyToClipboard(apiInfo.curlExample, 'curl')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 shadow-sm ${
                    copiedCurl 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  {copiedCurl ? 'Copied!' : 'Copy Command'}
                </button>
              </div>
              <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700 shadow-inner">
                <pre className="text-sm text-gray-100 font-mono whitespace-pre-wrap overflow-x-auto">
                  {apiInfo.curlExample}
                </pre>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Usage Tips</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Replace placeholder values with actual API credentials</li>
                  <li>• Ensure your API keys have proper permissions</li>
                  <li>• Test in a development environment first</li>
                  <li>• Check response status codes for error handling</li>
                </ul>
              </div>
            </div>
          )}

          {/* Response Tab */}
          {activeTab === 'response' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                Response Format
              </h3>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Success Response</h4>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <pre className="text-sm text-green-800 font-mono">
{`{
  "status": "success",
  "statusCode": 200,
  "result": {
    // API-specific response data
  }
}`}
                    </pre>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Error Response</h4>
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <pre className="text-sm text-red-800 font-mono">
{`{
  "status": "failure",
  "statusCode": 400,
  "error": "Error description"
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
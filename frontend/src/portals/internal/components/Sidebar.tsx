import { useState, useEffect } from 'react';
import { modules } from '../../../shared/data/modules';
import ModuleIcon from '../../../shared/components/ModuleIcon';
import { useFlowStore } from '../store/flowStore';
import { useApiDocumentation } from '../../../hooks/useApiDocumentation';
import { useModuleDocumentation } from '../../../hooks/useModuleDocumentation';
import { ApiDocumentationWithDetails } from '../../../lib/apiDocumentation';
import { ModuleDocumentation } from '../../../lib/moduleDocumentation';
import VariableInput from '../../../shared/components/VariableInput';

export default function Sidebar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSdkCollapsed, setIsSdkCollapsed] = useState(false);
  const flowType = useFlowStore((state) => state.flowType);
  const sdkMode = useFlowStore((state) => state.sdkMode);
  const setSdkMode = useFlowStore((state) => state.setSdkMode);
  // flowType is now set at workflow creation — not toggled in the sidebar
  const flowInputs = useFlowStore((state) => state.flowInputs);
  const flowOutputs = useFlowStore((state) => state.flowOutputs);
  const addFlowInput = useFlowStore((state) => state.addFlowInput);
  const removeFlowInput = useFlowStore((state) => state.removeFlowInput);
  const updateFlowInput = useFlowStore((state) => state.updateFlowInput);
  const addFlowOutput = useFlowStore((state) => state.addFlowOutput);
  const removeFlowOutput = useFlowStore((state) => state.removeFlowOutput);
  const updateFlowOutput = useFlowStore((state) => state.updateFlowOutput);

  // API Documentation hook - only used when flowType is 'api'
  const { apis, loading: apisLoading, error: apisError, searchApis } = useApiDocumentation();
  
  // Module Documentation hook - only used when flowType is 'sdk'
  const { modules: dbModules, loading: modulesLoading, error: modulesError, searchModules } = useModuleDocumentation();

  const onDragStart = (event: React.DragEvent, moduleType: string) => {
    event.dataTransfer.setData('application/reactflow', moduleType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDragStartApiDoc = (event: React.DragEvent, api: typeof apiModules[0]) => {
    event.dataTransfer.setData('application/reactflow', 'api-documentation');
    event.dataTransfer.setData('application/apidoc', JSON.stringify({
      id: api.id,
      name: api.label,
      description: api.description,
      url: api.url,
      docUrl: api.url, // use same URL as documentation link
      category: api.category,
      color: api.color,
      method: api.method,
      curlExample: api.curlExample,
      successResponse: api.successResponse,
      failureResponses: api.failureResponses,
      errorDetails: api.errorDetails,
      inputs: api.inputs,
      outputs: api.outputs,
    }));
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDragStartDbModule = (event: React.DragEvent, module: ModuleDocumentation) => {
    event.dataTransfer.setData('application/reactflow', 'moduleNode');
    event.dataTransfer.setData('application/moduledata', JSON.stringify({
      id: module.id,
      name: module.name,
      description: module.description,
      category: module.category,
      color: module.color,
      icon: module.icon,
      cspUrls: module.csp_urls || [],
      ipAddresses: module.ip_addresses || [],
    }));
    event.dataTransfer.effectAllowed = 'move';
  };

  // Filter modules for SDK flow
  const filteredModules = modules.filter(module =>
    module.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Derive HTTP method from curl example
  const deriveMethodFromCurl = (curl?: string): string => {
    if (!curl) return 'POST';
    const match = curl.match(/(?:-X|--request)\s+(\w+)/i);
    if (match) return match[1].toUpperCase();
    if (!/(?:\s-d|\s--data|\s--data-raw|\s-F|\s--form)\s/.test(curl)) return 'GET';
    return 'POST';
  };

  // Transform APIs to module-like structure for consistent rendering
  const apiModules = apis.map((api: ApiDocumentationWithDetails) => ({
    id: api.id,
    label: api.name,
    description: api.description || 'API endpoint',
    color: api.category === 'india_api' ? '#10B981' : '#6366F1',
    icon: '🌐',
    category: api.category,
    url: api.url,
    method: deriveMethodFromCurl(api.curl_example),
    curlExample: api.curl_example,
    successResponse: api.success_response,
    failureResponses: api.failure_responses,
    errorDetails: api.error_details,
    inputs: (api as any).api_inputs_new?.map((i: any) => ({ name: i.name, type: i.type, required: i.required })) || [],
    outputs: (api as any).api_outputs_new?.map((o: any) => ({ name: o.name, type: o.type, required: o.required })) || [],
  }));

  // Filter both SDK modules and APIs client-side on every keystroke
  useEffect(() => {
    if (flowType === 'sdk') {
      searchModules(searchTerm);
    } else if (flowType === 'api') {
      searchApis(searchTerm);
    }
  }, [searchTerm, flowType]); // eslint-disable-line react-hooks/exhaustive-deps



  const conditionBox = {
    id: 'condition',
    label: 'Condition',
    description: 'Decision point in workflow',
    color: '#F59E0B',
    icon: '◊',
  };

  const genericModule = {
    id: 'api-module',
    label: 'Generic Module',
    description: 'Custom module for SDK integration',
    color: '#6366F1',
    icon: 'module',
  };

  const endStatuses = [
    {
      id: 'end-status-auto-approved',
      label: 'Auto Approved',
      description: 'Automatically approved workflow end',
      color: '#10B981',
      icon: '',
    },
    {
      id: 'end-status-auto-declined',
      label: 'Auto Declined',
      description: 'Automatically declined workflow end',
      color: '#EF4444',
      icon: '',
    },
    {
      id: 'end-status-needs-review',
      label: 'Needs Review',
      description: 'Manual review required workflow end',
      color: '#F59E0B',
      icon: '',
    },
  ];

  return (
    <aside
      className="w-80 p-5 overflow-y-auto relative m-4 rounded-2xl shadow-2xl"
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
        backdropFilter: 'blur(40px) saturate(150%)',
        WebkitBackdropFilter: 'blur(40px) saturate(150%)',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        boxShadow: '0 8px 32px rgba(6, 6, 61, 0.1), 0 2px 8px rgba(6, 6, 61, 0.05)',
        height: 'calc(100vh - 32px)',
      }}
    >
      {/* Subtle top highlight */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none rounded-t-2xl"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%)'
        }}
      />

      <div className="mb-8 relative z-10">
        <h2 className="text-2xl font-semibold text-primary-900 mb-1 tracking-tight">Hypervision</h2>
        <p className="text-sm text-primary-600 font-medium">
          {flowType === 'sdk' ? 'Drag modules to the canvas' : 'Drag modules to canvas, click nodes for API details'}
        </p>
      </div>

      {/* Flow Type Badge — read-only display, set at workflow creation */}
      <div className="mb-5 relative z-10">
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/80 border border-gray-200">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: flowType === 'api' ? '#10B981' : '#6366F1' }}
          >
            {flowType === 'api' ? (
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-800">
              {flowType === 'api' ? 'API Flow' : 'SDK Flow'}
            </p>
            <p className="text-xs text-gray-500">
              {flowType === 'api' ? 'REST endpoints & groups' : 'SDK module integrations'}
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4 relative z-10">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white/80 border border-primary-200 rounded-lg text-sm text-primary-900 placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/30 focus:border-primary-400 transition-all"
          />
        </div>
      </div>

      {/* SDK Mode Toggle - Only show for SDK flow */}
      {flowType === 'sdk' && (
        <div className="mb-6 relative z-10">
          <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
            <button
              onClick={() => setSdkMode('general')}
              className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-all duration-200 ${
                sdkMode === 'general'
                  ? 'bg-white text-primary-700 shadow-sm'
                  : 'text-primary-500 hover:text-primary-600'
              }`}
            >
              General
            </button>
            <button
              onClick={() => setSdkMode('advanced')}
              className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-all duration-200 ${
                sdkMode === 'advanced'
                  ? 'bg-white text-primary-700 shadow-sm'
                  : 'text-primary-500 hover:text-primary-600'
              }`}
            >
              Advanced
            </button>
          </div>
          <p className="text-xs text-primary-500 mt-2">
            {sdkMode === 'general' 
              ? 'Simple workflow view with basic module information' 
              : 'Detailed view with descriptions, success/failure criteria'
            }
          </p>
        </div>
      )}

      {/* Configuration */}
      {flowType === 'sdk' && (
        <div className="mb-6 relative z-10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-primary-600 uppercase tracking-wider">SDK Configuration</h3>
            <button
              onClick={() => setIsSdkCollapsed(!isSdkCollapsed)}
              className="text-xs text-primary-600 font-medium hover:text-primary-700 transition-colors"
            >
              {isSdkCollapsed ? 'Expand' : 'Collapse'}
            </button>
          </div>
        
        {!isSdkCollapsed && (
          <div className="space-y-4">
            {/* SDK Inputs */}
            <VariableInput
              label="SDK Inputs"
              variables={flowInputs}
              placeholder="user_id"
              onAdd={addFlowInput}
              onRemove={removeFlowInput}
              onUpdate={updateFlowInput}
            />

            {/* SDK Outputs — only shown for SDK flow */}
            {flowType === 'sdk' && (
              <VariableInput
                label="SDK Outputs"
                variables={flowOutputs}
                placeholder="verification_status"
                onAdd={addFlowOutput}
                onRemove={removeFlowOutput}
                onUpdate={updateFlowOutput}
              />
            )}
          </div>
        )}

        {/* Summary when collapsed */}
        {isSdkCollapsed && (flowInputs.length > 0 || flowOutputs.length > 0) && (
          <div className="text-xs text-primary-700 bg-white/80 p-3 rounded-lg shadow-sm border border-primary-100">
            {flowInputs.length > 0 && (
              <div className="mb-2">
                <span className="font-medium">Inputs:</span>{' '}
                {flowInputs.slice(0, 3).join(', ')}{flowInputs.length > 3 ? '...' : ''}
              </div>
            )}
            {flowOutputs.length > 0 && (
              <div>
                <span className="font-medium">Outputs:</span>{' '}
                {flowOutputs.slice(0, 3).join(', ')}{flowOutputs.length > 3 ? '...' : ''}
              </div>
            )}
          </div>
        )}
        </div>
      )}


      {/* Condition Box */}
      <div className="mb-6 relative z-10">
        <h3 className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-3">Logic</h3>
        <div
          className="group p-3.5 bg-white/80 rounded-xl cursor-move hover:shadow-md transition-all duration-200 shadow-sm border border-primary-100"
          draggable
          onDragStart={(e) => onDragStart(e, conditionBox.id)}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary-50 text-primary-600 group-hover:bg-primary-100 transition-colors">
              <ModuleIcon type="condition" className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm text-primary-900 truncate">
                {conditionBox.label}
              </div>
              <div className="text-xs text-primary-600 truncate mt-0.5">
                {conditionBox.description}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Groups - available in both API and SDK flows */}
      <div className="mb-6 relative z-10">
        <h3 className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-3">Groups</h3>
        <div
          className="group p-3.5 bg-white/80 rounded-xl cursor-move hover:shadow-md transition-all duration-200 shadow-sm border border-indigo-200"
          draggable
          onDragStart={(e) => onDragStart(e, 'api-group')}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-500 group-hover:bg-indigo-100 transition-colors">
              {/* Group icon — dashed rectangle */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="4" />
                <rect x="7" y="7" width="4" height="4" rx="1" strokeDasharray="0" />
                <rect x="13" y="7" width="4" height="4" rx="1" strokeDasharray="0" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm text-primary-900 truncate">
                {flowType === 'api' ? 'Product Group' : 'Module Group'}
              </div>
              <div className="text-xs text-primary-600 truncate mt-0.5">
                {flowType === 'api' ? 'Group multiple APIs together' : 'Group multiple modules together'}
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Modules/APIs */}
      <div className="mb-6 relative z-10">
        <h3 className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-3">
          {flowType === 'api' ? 'APIs' : 'Modules'}
        </h3>
        
        {/* Loading state for APIs */}
        {flowType === 'api' && apisLoading && (
          <div className="text-center text-primary-400 text-sm py-4">
            <div className="animate-spin w-4 h-4 border-2 border-primary-400 border-t-transparent rounded-full mx-auto mb-2"></div>
            Loading APIs...
          </div>
        )}
        
        {/* Error state for APIs */}
        {flowType === 'api' && apisError && (
          <div className="text-center text-red-500 text-sm py-4 bg-red-50 rounded-lg border border-red-200">
            <p className="font-medium mb-1">Failed to load APIs</p>
            <p className="text-xs">{apisError}</p>
          </div>
        )}

        {/* Loading state for Modules */}
        {flowType === 'sdk' && modulesLoading && (
          <div className="text-center text-primary-400 text-sm py-4">
            <div className="animate-spin w-4 h-4 border-2 border-primary-400 border-t-transparent rounded-full mx-auto mb-2"></div>
            Loading modules...
          </div>
        )}
        
        {/* Error state for Modules */}
        {flowType === 'sdk' && modulesError && (
          <div className="text-center text-red-500 text-sm py-4 bg-red-50 rounded-lg border border-red-200">
            <p className="font-medium mb-1">Failed to load modules</p>
            <p className="text-xs">{modulesError}</p>
          </div>
        )}
        
        {/* SDK Modules */}
        {flowType === 'sdk' && !modulesLoading && !modulesError && (
          <div className="space-y-2">
            {/* Generic Module - Only for SDK Flow */}
            <div
              className="group p-3.5 bg-white/80 rounded-xl cursor-move hover:shadow-md transition-all duration-200 shadow-sm border border-primary-100"
              draggable
              onDragStart={(e) => onDragStart(e, genericModule.id)}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary-50 text-primary-600 group-hover:bg-primary-100 transition-colors">
                  <ModuleIcon type={genericModule.icon} className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-primary-900 truncate">
                    {genericModule.label}
                  </div>
                  <div className="text-xs text-primary-600 truncate mt-0.5">
                    {genericModule.description}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Database Modules - Primary source for SDK */}
            {dbModules.length === 0 && !searchTerm && (
              <div className="text-center text-primary-400 text-xs py-4 bg-white/60 rounded-lg border border-dashed border-primary-200">
                No modules available in database.
              </div>
            )}
            {dbModules.map((module) => (
              <div
                key={module.id}
                className="group p-3.5 bg-white/80 rounded-xl hover:shadow-md transition-all duration-200 shadow-sm border cursor-move"
                style={{ borderColor: (module.color || '#6366F1') + '40' }}
                draggable
                onDragStart={(e) => onDragStartDbModule(e, module)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 flex items-center justify-center rounded-lg text-white flex-shrink-0"
                    style={{ backgroundColor: module.color || '#6366F1' }}
                  >
                    <ModuleIcon type={module.icon || 'module'} className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-primary-900 truncate">
                      {module.name}
                    </div>
                    <div className="text-xs text-primary-600 truncate mt-0.5">
                      {module.description}
                    </div>
                    {module.category && (
                      <div className="text-xs truncate mt-1 flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: module.color || '#6366F1' }}
                        />
                        <span style={{ color: module.color || '#6366F1' }} className="font-medium">
                          {module.category}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Fallback: Regular SDK Modules from JSON (if no DB modules) */}
            {dbModules.length === 0 && searchTerm && filteredModules.map((module) => (
              <div
                key={module.id}
                className="group p-3.5 bg-white/80 rounded-xl hover:shadow-md transition-all duration-200 shadow-sm border border-primary-100 cursor-move"
                draggable
                onDragStart={(e) => onDragStart(e, module.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary-50 text-primary-600 group-hover:bg-primary-100 transition-colors">
                    <ModuleIcon type={module.id} className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-primary-900 truncate">
                      {module.label}
                    </div>
                    <div className="text-xs text-primary-600 truncate mt-0.5">
                      {module.description}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* API Documentation from DB */}
        {flowType === 'api' && !apisLoading && !apisError && (
          <div className="space-y-2">
            {apiModules.length === 0 && (
              <div className="text-center text-primary-400 text-xs py-4 bg-white/60 rounded-lg border border-dashed border-primary-200">
                No APIs in database yet.
              </div>
            )}
            {apiModules.map((api) => (
              <div
                key={api.id}
                className="group p-3.5 bg-white/80 rounded-xl hover:shadow-md transition-all duration-200 shadow-sm border cursor-move"
                style={{ borderColor: api.color + '40' }}
                draggable
                onDragStart={(e) => onDragStartApiDoc(e, api)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 flex items-center justify-center rounded-lg flex-shrink-0"
                    style={{ backgroundColor: `${api.color}18`, color: api.color }}
                  >
                    <ModuleIcon type="api-module" className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-primary-900 truncate">
                      {api.label}
                    </div>
                    <div className="text-xs text-primary-600 truncate mt-0.5">
                      {api.description}
                    </div>
                    <div className="text-xs truncate mt-1 flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: api.color }}
                      />
                      <span style={{ color: api.color }} className="font-medium">
                        {api.category === 'india_api' ? 'India API' : 'Global API'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* End Statuses */}
      <div className="mb-6 relative z-10">
        <h3 className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-3">End Statuses</h3>
        <div className="space-y-2">
          {endStatuses.map((status) => (
            <div
              key={status.id}
              className="group p-3.5 bg-white/80 rounded-xl cursor-move hover:shadow-md transition-all duration-200 shadow-sm border border-primary-100"
              draggable
              onDragStart={(e) => onDragStart(e, status.id)}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary-50 group-hover:bg-primary-100 transition-colors">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: status.color }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-primary-900 truncate">
                    {status.label}
                  </div>
                  <div className="text-xs text-primary-600 truncate mt-0.5">
                    {status.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* No results message */}
      {searchTerm && (
        (flowType === 'sdk' && !modulesLoading && dbModules.length === 0 && filteredModules.length === 0) ||
        (flowType === 'api' && !apisLoading && apiModules.length === 0)
      ) && (
        <div className="text-center text-primary-400 text-sm py-8">
          No {flowType === 'api' ? 'APIs' : 'modules'} found matching "{searchTerm}"
        </div>
      )}
    </aside>
  );
}

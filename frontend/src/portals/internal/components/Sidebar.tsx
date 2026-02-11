import { useState } from 'react';
import { modules } from '../../shared/data/modules';
import ModuleIcon from '../../shared/components/ModuleIcon';
import { useFlowStore } from '../store/flowStore';

export default function Sidebar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSdkCollapsed, setIsSdkCollapsed] = useState(false);
  const flowType = useFlowStore((state) => state.flowType);
  const setFlowType = useFlowStore((state) => state.setFlowType);
  const sdkMode = useFlowStore((state) => state.sdkMode);
  const setSdkMode = useFlowStore((state) => state.setSdkMode);
  const flowInputs = useFlowStore((state) => state.flowInputs);
  const flowOutputs = useFlowStore((state) => state.flowOutputs);
  const setFlowInputs = useFlowStore((state) => state.setFlowInputs);
  const setFlowOutputs = useFlowStore((state) => state.setFlowOutputs);

  const onDragStart = (event: React.DragEvent, moduleType: string) => {
    event.dataTransfer.setData('application/reactflow', moduleType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const filteredModules = modules.filter(module =>
    module.id.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const conditionBox = {
    id: 'condition',
    label: 'Condition',
    description: 'Decision point in workflow',
    color: '#F59E0B',
    icon: '◊',
  };

  const apiModule = {
    id: 'api-module',
    label: 'Generic API',
    description: 'Custom API endpoint module',
    color: '#6366F1',
    icon: '🔗',
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

      {/* Flow Type Toggle */}
      <div className="mb-6 relative z-10">
        <div className="flex bg-white/90 rounded-xl p-1 border border-primary-200 mb-4">
          <button
            onClick={() => setFlowType('sdk')}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              flowType === 'sdk'
                ? 'bg-primary-500 text-white shadow-sm'
                : 'text-primary-600 hover:text-primary-700'
            }`}
          >
            SDK Flow
          </button>
          <button
            onClick={() => setFlowType('api')}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              flowType === 'api'
                ? 'bg-primary-500 text-white shadow-sm'
                : 'text-primary-600 hover:text-primary-700'
            }`}
          >
            API Flow
          </button>
        </div>

        {/* SDK Mode Toggle - only visible when SDK flow is selected */}
        {flowType === 'sdk' && (
          <div className="flex bg-white/60 rounded-full p-0.5 border border-primary-200/50 shadow-sm">
            <button
              onClick={() => setSdkMode('general')}
              className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                sdkMode === 'general'
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'text-primary-600 hover:text-primary-700 hover:bg-white/40'
              }`}
            >
              General
            </button>
            <button
              onClick={() => setSdkMode('advanced')}
              className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                sdkMode === 'advanced'
                  ? 'bg-primary-500 text-white shadow-sm'
                  : 'text-primary-600 hover:text-primary-700 hover:bg-white/40'
              }`}
            >
              Advanced
            </button>
          </div>
        )}
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative z-10">
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
            <div>
              <label className="text-xs font-medium text-primary-700 block mb-2">
                SDK Inputs
              </label>
              <textarea
                value={flowInputs}
                onChange={(e) => setFlowInputs(e.target.value)}
                className="w-full text-xs border border-primary-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary-400/30 focus:border-primary-400 transition-all text-primary-900 placeholder-primary-400 bg-white/80"
                rows={3}
                placeholder="user_id, document_type, session_token..."
              />
            </div>

            {/* SDK Outputs */}
            <div>
              <label className="text-xs font-medium text-primary-700 block mb-2">
                SDK Outputs
              </label>
              <textarea
                value={flowOutputs}
                onChange={(e) => setFlowOutputs(e.target.value)}
                className="w-full text-xs border border-primary-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary-400/30 focus:border-primary-400 transition-all text-primary-900 placeholder-primary-400 bg-white/80"
                rows={3}
                placeholder="verification_status, confidence_score..."
              />
            </div>
          </div>
        )}

        {/* Summary when collapsed */}
        {isSdkCollapsed && (flowInputs || flowOutputs) && (
          <div className="text-xs text-primary-700 bg-white/80 p-3 rounded-lg shadow-sm border border-primary-100">
            {flowInputs && (
              <div className="mb-2">
                <span className="font-medium">Inputs:</span>{' '}
                {flowInputs.substring(0, 40)}{flowInputs.length > 40 ? '...' : ''}
              </div>
            )}
            {flowOutputs && (
              <div>
                <span className="font-medium">Outputs:</span>{' '}
                {flowOutputs.substring(0, 40)}{flowOutputs.length > 40 ? '...' : ''}
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

      {/* API Module */}
      <div className="mb-6 relative z-10">
        <h3 className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-3">API</h3>
        <div
          className="group p-3.5 bg-white/80 rounded-xl cursor-move hover:shadow-md transition-all duration-200 shadow-sm border border-primary-100"
          draggable
          onDragStart={(e) => onDragStart(e, apiModule.id)}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary-50 text-primary-600 group-hover:bg-primary-100 transition-colors">
              <ModuleIcon type="api-module" className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm text-primary-900 truncate">
                {apiModule.label}
              </div>
              <div className="text-xs text-primary-600 truncate mt-0.5">
                {apiModule.description}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modules */}
      <div className="mb-6 relative z-10">
        <h3 className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-3">Modules</h3>
        <div className="space-y-2">
          {filteredModules.map((module) => (
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
                    {flowType === 'api' ? 'Drag to canvas, then click node for API details' : module.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
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

      {filteredModules.length === 0 && searchTerm && (
        <div className="text-center text-primary-400 text-sm py-8">
          No modules found matching "{searchTerm}"
        </div>
      )}
    </aside>
  );
}

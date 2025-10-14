import { useState } from 'react';
import { modules } from '../data/modules';
import { useFlowStore } from '../store/flowStore';

export default function Sidebar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSdkConfig, setShowSdkConfig] = useState(false);
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
    <aside className="w-80 bg-white border-r border-gray-200 p-4 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-1">Hypervision</h2>
        <p className="text-sm text-gray-600">Drag modules to the canvas</p>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search modules..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* SDK Configuration */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-700">Flow SDK Configuration</h3>
          <button
            onClick={() => setShowSdkConfig(!showSdkConfig)}
            className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
          >
            {showSdkConfig ? 'Hide' : 'Configure'}
          </button>
        </div>
        
        {showSdkConfig && (
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-gray-700 block mb-1">
                SDK Inputs
              </label>
              <textarea
                value={flowInputs}
                onChange={(e) => setFlowInputs(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded px-2 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="user_id, document_type, session_token..."
              />
            </div>
            
            <div>
              <label className="text-xs font-medium text-gray-700 block mb-1">
                SDK Outputs
              </label>
              <textarea
                value={flowOutputs}
                onChange={(e) => setFlowOutputs(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded px-2 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="verification_status, confidence_score..."
              />
            </div>
          </div>
        )}

        {/* Summary when collapsed */}
        {!showSdkConfig && (flowInputs || flowOutputs) && (
          <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
            {flowInputs && <div><strong>Inputs:</strong> {flowInputs.substring(0, 30)}{flowInputs.length > 30 ? '...' : ''}</div>}
            {flowOutputs && <div><strong>Outputs:</strong> {flowOutputs.substring(0, 30)}{flowOutputs.length > 30 ? '...' : ''}</div>}
          </div>
        )}
      </div>

      {/* Condition Box */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Logic</h3>
        <div
          className="p-3 bg-white border-2 rounded-lg cursor-move hover:shadow-md transition-shadow"
          style={{ borderColor: conditionBox.color }}
          draggable
          onDragStart={(e) => onDragStart(e, conditionBox.id)}
        >
          <div className="flex items-center gap-3">
            <div
              className="text-2xl w-10 h-10 flex items-center justify-center rounded-lg"
              style={{ backgroundColor: `${conditionBox.color}20` }}
            >
              {conditionBox.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-gray-800 truncate">
                {conditionBox.label}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {conditionBox.description}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* API Module */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">API</h3>
        <div
          className="p-3 bg-white border-2 rounded-lg cursor-move hover:shadow-md transition-shadow"
          style={{ borderColor: apiModule.color }}
          draggable
          onDragStart={(e) => onDragStart(e, apiModule.id)}
        >
          <div className="flex items-center gap-3">
            <div
              className="text-2xl w-10 h-10 flex items-center justify-center rounded-lg"
              style={{ backgroundColor: `${apiModule.color}20` }}
            >
              {apiModule.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-gray-800 truncate">
                {apiModule.label}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {apiModule.description}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modules */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Modules</h3>
        <div className="space-y-2">
          {filteredModules.map((module) => (
            <div
              key={module.id}
              className="p-3 bg-white border-2 rounded-lg cursor-move hover:shadow-md transition-shadow"
              style={{ borderColor: module.color }}
              draggable
              onDragStart={(e) => onDragStart(e, module.id)}
            >
              <div className="flex items-center gap-3">
                <div
                  className="text-2xl w-10 h-10 flex items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${module.color}20` }}
                >
                  {module.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-gray-800 truncate">
                    {module.label}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {module.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* End Statuses */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">End Statuses</h3>
        <div className="space-y-2">
          {endStatuses.map((status) => (
            <div
              key={status.id}
              className="p-3 bg-white border-2 rounded-lg cursor-move hover:shadow-md transition-shadow"
              style={{ borderColor: status.color }}
              draggable
              onDragStart={(e) => onDragStart(e, status.id)}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-lg border-2"
                  style={{ 
                    backgroundColor: `${status.color}20`,
                    borderColor: status.color
                  }}
                >
                  <div 
                    className="w-6 h-6 rounded-md"
                    style={{ backgroundColor: status.color }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-gray-800 truncate">
                    {status.label}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {status.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredModules.length === 0 && searchTerm && (
        <div className="text-center text-gray-500 text-sm">
          No modules found matching "{searchTerm}"
        </div>
      )}
    </aside>
  );
}

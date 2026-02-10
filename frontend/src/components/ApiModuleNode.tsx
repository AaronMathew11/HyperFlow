import { memo, useState } from 'react';
import { Handle, Position, NodeProps, NodeResizer } from 'reactflow';
import { useFlowStore } from '../store/flowStore';
import ModuleIcon from './ModuleIcon';

interface ApiModuleNodeData {
  title: string;
  endpoint: string;
  color: string;
  icon: string;
  cspUrls?: string[];
  ipAddresses?: string[];
}

function ApiModuleNode({ data, selected }: NodeProps<ApiModuleNodeData>) {
  const viewMode = useFlowStore((state) => state.viewMode);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingEndpoint, setIsEditingEndpoint] = useState(false);
  const [showTechDetails, setShowTechDetails] = useState(false);
  const [title, setTitle] = useState(data.title || 'API Module');
  const [endpoint, setEndpoint] = useState(data.endpoint || 'https://api.example.com/endpoint');

  const handleTitleDoubleClick = () => {
    setIsEditingTitle(true);
  };


  const handleTitleBlur = () => {
    setIsEditingTitle(false);
  };

  const handleEndpointBlur = () => {
    setIsEditingEndpoint(false);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEditingTitle(false);
    }
  };

  const handleEndpointKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEditingEndpoint(false);
    }
  };

  return (
    <div
      className="p-4 rounded-xl min-w-[200px] relative group border-2 bg-white shadow-sm hover:shadow-md h-full w-full flex flex-col justify-start"
      style={{
        borderColor: selected ? '#9393D0' : '#E8E8ED',
      }}
      title={`Endpoint: ${endpoint}`}
    >
      <NodeResizer
        color="#9393D0"
        isVisible={selected}
        minWidth={200}
        minHeight={100}
      />
      <Handle type="target" position={Position.Top} className="w-3 h-3" />

      <div className="flex items-center gap-3 mb-2">
        <div
          className="flex-shrink-0 flex items-center justify-center rounded-lg bg-primary-50 text-primary-600"
          style={{
            width: 'clamp(36px, 12%, 48px)',
            height: 'clamp(36px, 12%, 48px)',
          }}
        >
          <ModuleIcon
            type="api-module"
            style={{
              width: 'clamp(20px, 60%, 28px)',
              height: 'clamp(20px, 60%, 28px)',
            }}
          />
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          {/* Editable title */}
          {isEditingTitle ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleTitleBlur}
              onKeyDown={handleTitleKeyDown}
              className="w-full px-2 py-1 font-semibold border border-primary-200 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 text-primary-900 placeholder-primary-400"
              style={{ fontSize: 'clamp(13px, 3vw, 16px)' }}
              autoFocus
            />
          ) : (
            <div
              className="font-semibold text-primary-900 cursor-text hover:bg-primary-50 px-2 py-1 rounded-lg break-words"
              style={{ fontSize: 'clamp(13px, 3vw, 16px)' }}
              onDoubleClick={handleTitleDoubleClick}
              title="Double-click to edit title"
            >
              {title}
            </div>
          )}
          <div className="text-primary-600 break-words mt-0.5" style={{ fontSize: 'clamp(11px, 2.5vw, 13px)' }}>
            Generic API
          </div>
        </div>
      </div>

      {/* Hidden endpoint editor - only shown when editing */}
      {isEditingEndpoint && (
        <div className="mb-2">
          <label className="text-xs text-primary-700 font-medium block mb-1">Endpoint:</label>
          <input
            type="text"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            onBlur={handleEndpointBlur}
            onKeyDown={handleEndpointKeyDown}
            className="w-full px-3 py-1.5 text-xs border border-primary-200 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 text-primary-900 placeholder-primary-400"
            placeholder="https://api.example.com/endpoint"
            autoFocus
          />
        </div>
      )}

      {/* Endpoint edit button */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setIsEditingEndpoint(!isEditingEndpoint)}
          className="text-xs text-primary-600 font-medium hover:text-primary-700 transition-colors"
        >
          {isEditingEndpoint ? 'Done' : 'Edit Endpoint'}
        </button>
      </div>

      {/* Tech View Information - contained within node */}
      {viewMode === 'tech' && (
        <div className="border-t border-primary-100 pt-2 mt-auto w-full">
          <button
            onClick={() => setShowTechDetails(!showTechDetails)}
            className="text-xs text-primary-600 font-medium hover:text-primary-700 mb-2"
            style={{ fontSize: 'clamp(10px, 2vw, 12px)' }}
          >
            {showTechDetails ? 'Hide Details' : 'Show Tech Details'}
          </button>

          {showTechDetails && (
            <div className="space-y-2 w-full">
              <div className="w-full">
                <label className="text-xs text-primary-700 font-medium block mb-1" style={{ fontSize: 'clamp(10px, 2vw, 12px)' }}>
                  IP Addresses:
                </label>
                <div className="text-xs text-primary-800 bg-primary-50 p-2 rounded-lg border border-primary-100 break-words w-full" style={{ fontSize: 'clamp(9px, 1.8vw, 11px)' }}>
                  {data.ipAddresses?.join(', ') || 'Varies by endpoint'}
                </div>
              </div>
            </div>
          )}
        </div>
      )}


      {/* Tooltip on hover */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-primary-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-lg">
        {endpoint}
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
}

export default memo(ApiModuleNode);
import { memo, useState } from 'react';
import { Handle, Position, NodeProps, NodeResizer } from 'reactflow';
import { useFlowStore } from '../store/flowStore';

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
      className="px-4 py-3 shadow-lg rounded-lg border-2 bg-white min-w-[200px] relative group"
      style={{ borderColor: data.color }}
      title={`Endpoint: ${endpoint}`}
    >
      <NodeResizer
        color={data.color}
        isVisible={selected}
        minWidth={200}
        minHeight={80}
      />
      <Handle type="target" position={Position.Top} className="w-3 h-3" />

      <div className="flex items-center gap-3 mb-2">
        <div
          className="text-2xl w-10 h-10 flex items-center justify-center rounded-lg"
          style={{ backgroundColor: `${data.color}20` }}
        >
          {data.icon}
        </div>
        <div className="flex-1">
          {/* Editable title */}
          {isEditingTitle ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleTitleBlur}
              onKeyDown={handleTitleKeyDown}
              className="w-full px-2 py-1 text-sm font-semibold border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              autoFocus
            />
          ) : (
            <div
              className="font-semibold text-gray-800 text-sm cursor-text hover:bg-gray-50 px-2 py-1 rounded transition-colors"
              onDoubleClick={handleTitleDoubleClick}
              title="Double-click to edit title"
            >
              {title}
            </div>
          )}
          <div className="text-xs text-gray-500">Generic API</div>
        </div>
      </div>

      {/* Hidden endpoint editor - only shown when editing */}
      {isEditingEndpoint && (
        <div className="mb-2">
          <label className="text-xs text-gray-600 block mb-1">Endpoint:</label>
          <input
            type="text"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            onBlur={handleEndpointBlur}
            onKeyDown={handleEndpointKeyDown}
            className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="https://api.example.com/endpoint"
            autoFocus
          />
        </div>
      )}

      {/* Endpoint edit button */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setIsEditingEndpoint(!isEditingEndpoint)}
          className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
        >
          {isEditingEndpoint ? 'Done' : 'Edit Endpoint'}
        </button>
      </div>

      {/* Tech View Information */}
      {viewMode === 'tech' && (
        <div className="border-t border-gray-200 pt-2 mt-2">
          <button
            onClick={() => setShowTechDetails(!showTechDetails)}
            className="text-xs text-blue-600 hover:text-blue-800 mb-2"
          >
            {showTechDetails ? 'Hide Details' : 'Show Tech Details'}
          </button>
          
          {showTechDetails && (
            <div className="space-y-2">
              <div>
                <label className="text-xs text-gray-600 block">CSP URLs:</label>
                <div className="text-xs text-gray-700 bg-gray-50 p-1 rounded">
                  {data.cspUrls?.join(', ') || 'Custom API endpoints'}
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-600 block">IP Addresses:</label>
                <div className="text-xs text-gray-700 bg-gray-50 p-1 rounded">
                  {data.ipAddresses?.join(', ') || 'Varies by endpoint'}
                </div>
              </div>
            </div>
          )}
        </div>
      )}


      {/* Tooltip on hover */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
        {endpoint}
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
}

export default memo(ApiModuleNode);
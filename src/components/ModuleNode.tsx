import { memo, useState } from 'react';
import { Handle, Position, NodeProps, NodeResizer } from 'reactflow';
import { useFlowStore } from '../store/flowStore';

interface ModuleNodeData {
  label: string;
  moduleType: string;
  color: string;
  icon: string;
  cspUrls?: string[];
  ipAddresses?: string[];
}

function ModuleNode({ data, selected }: NodeProps<ModuleNodeData>) {
  const viewMode = useFlowStore((state) => state.viewMode);
  const [showTechDetails, setShowTechDetails] = useState(false);

  return (
    <div
      className="px-4 py-3 shadow-lg rounded-lg border-2 bg-white min-w-[200px] relative"
      style={{ borderColor: data.color }}
    >
      <NodeResizer
        color={data.color}
        isVisible={selected}
        minWidth={180}
        minHeight={60}
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
          <div className="font-semibold text-gray-800 text-sm">{data.label}</div>
          <div className="text-xs text-gray-500">{data.moduleType}</div>
        </div>
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
                  {data.cspUrls?.join(', ') || 'api.hypervision.ai, cdn.hypervision.ai'}
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-600 block">IP Addresses:</label>
                <div className="text-xs text-gray-700 bg-gray-50 p-1 rounded">
                  {data.ipAddresses?.join(', ') || '52.195.10.45, 13.230.115.23'}
                </div>
              </div>
            </div>
          )}
        </div>
      )}


      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
}

export default memo(ModuleNode);

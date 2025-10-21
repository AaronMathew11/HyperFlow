import { memo, useState } from 'react';
import { Handle, Position, NodeProps, NodeResizer } from 'reactflow';
import { useFlowStore } from '../store/flowStore';
import ModuleIcon from './ModuleIcon';

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
      className="p-4 rounded-xl min-w-[200px] relative border-2 bg-white shadow-sm hover:shadow-md h-full w-full flex flex-col justify-start"
      style={{
        borderColor: selected ? '#9393D0' : '#E8E8ED',
      }}
    >
      <NodeResizer
        color="#9393D0"
        isVisible={selected}
        minWidth={180}
        minHeight={80}
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
            type={data.moduleType}
            style={{
              width: 'clamp(20px, 60%, 28px)',
              height: 'clamp(20px, 60%, 28px)',
            }}
          />
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <div className="font-semibold text-primary-900 break-words" style={{ fontSize: 'clamp(13px, 3vw, 16px)' }}>
            {data.label}
          </div>
          <div className="text-primary-600 break-words mt-0.5" style={{ fontSize: 'clamp(11px, 2.5vw, 13px)' }}>
            {data.moduleType}
          </div>
        </div>
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
                  CSP URLs:
                </label>
                <div className="text-xs text-primary-800 bg-primary-50 p-2 rounded-lg border border-primary-100 break-words w-full" style={{ fontSize: 'clamp(9px, 1.8vw, 11px)' }}>
                  {data.cspUrls?.join(', ') || 'api.hypervision.ai, cdn.hypervision.ai'}
                </div>
              </div>
              <div className="w-full">
                <label className="text-xs text-primary-700 font-medium block mb-1" style={{ fontSize: 'clamp(10px, 2vw, 12px)' }}>
                  IP Addresses:
                </label>
                <div className="text-xs text-primary-800 bg-primary-50 p-2 rounded-lg border border-primary-100 break-words w-full" style={{ fontSize: 'clamp(9px, 1.8vw, 11px)' }}>
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

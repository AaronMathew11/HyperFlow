import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

interface ModuleNodeData {
  label: string;
  moduleType: string;
  color: string;
  icon: string;
}

function ModuleNode({ data }: NodeProps<ModuleNodeData>) {
  return (
    <div
      className="px-4 py-3 shadow-lg rounded-lg border-2 bg-white min-w-[200px]"
      style={{ borderColor: data.color }}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3" />

      <div className="flex items-center gap-3">
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

      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
}

export default memo(ModuleNode);

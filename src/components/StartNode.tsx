import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

interface StartNodeData {
  label: string;
  color: string;
  icon: string;
}

function StartNode({ data }: NodeProps<StartNodeData>) {
  return (
    <div
      className="px-6 py-4 shadow-lg rounded-full border-2 bg-white min-w-[120px] text-center"
      style={{ 
        borderColor: data.color,
        backgroundColor: `${data.color}10`
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <div 
          className="font-bold text-lg"
          style={{ color: data.color }}
        >
          {data.label}
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
}

export default memo(StartNode);
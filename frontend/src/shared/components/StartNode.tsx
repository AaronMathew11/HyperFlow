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
      className="px-6 py-4 rounded-full min-w-[120px] text-center border-2 bg-primary-500 shadow-md hover:shadow-lg"
      style={{
        borderColor: '#9393D0',
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="font-semibold text-lg text-white">
          {data.label}
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
}

export default memo(StartNode);
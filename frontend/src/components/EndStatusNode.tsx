import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

interface EndStatusNodeData {
  label: string;
  status: 'auto-approved' | 'auto-declined' | 'needs-review';
  color: string;
  icon: string;
}

function EndStatusNode({ data }: NodeProps<EndStatusNodeData>) {
  const getStatusColor = () => {
    switch (data.status) {
      case 'auto-approved':
        return '#34C759'; // Apple green
      case 'auto-declined':
        return '#FF3B30'; // Apple red
      case 'needs-review':
        return '#FF9500'; // Apple orange
      default:
        return data.color;
    }
  };

  const statusColor = getStatusColor();

  return (
    <div
      className="px-6 py-4 rounded-full min-w-[140px] text-center border-2 relative shadow-md hover:shadow-lg"
      style={{
        backgroundColor: statusColor,
        borderColor: statusColor,
      }}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3" />

      <div className="flex flex-col items-center justify-center">
        <div className="font-semibold text-base text-white">
          {data.label}
        </div>
      </div>
    </div>
  );
}

export default memo(EndStatusNode);
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
        return '#10B981'; // green
      case 'auto-declined':
        return '#EF4444'; // red
      case 'needs-review':
        return '#F59E0B'; // orange
      default:
        return data.color;
    }
  };

  const statusColor = getStatusColor();

  return (
    <div
      className="px-6 py-4 shadow-lg rounded-full border-2 bg-white min-w-[140px] text-center"
      style={{ 
        borderColor: statusColor,
        backgroundColor: `${statusColor}10`
      }}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3" />

      <div className="flex flex-col items-center justify-center">
        <div 
          className="font-bold text-lg"
          style={{ color: statusColor }}
        >
          {data.label}
        </div>
      </div>
    </div>
  );
}

export default memo(EndStatusNode);
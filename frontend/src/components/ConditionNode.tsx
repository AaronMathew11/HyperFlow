import { memo, useState } from 'react';
import { Handle, Position, NodeProps, NodeResizer } from 'reactflow';

interface ConditionNodeData {
  label: string;
  condition: string;
  color: string;
  icon: string;
}

function ConditionNode({ data, selected }: NodeProps<ConditionNodeData>) {
  const [isEditing, setIsEditing] = useState(false);
  const [condition, setCondition] = useState(data.condition || 'Enter condition...');

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
    }
  };

  return (
    <div className="relative" style={{ width: '140px', height: '140px' }}>
      <NodeResizer
        color="rgba(147, 147, 208, 0.8)"
        isVisible={selected}
        minWidth={120}
        minHeight={120}
        keepAspectRatio
      />
      {/* Input handle */}
      <Handle type="target" position={Position.Top} className="w-3 h-3" />

      {/* Diamond shape */}
      <div
        className="border-2 transform rotate-45 absolute bg-white shadow-sm"
        style={{
          width: '120px',
          height: '120px',
          top: '10px',
          left: '10px',
          borderColor: selected ? '#9393D0' : '#E8E8ED',
        }}
      >
        {/* Content inside diamond (counter-rotated) */}
        <div className="transform -rotate-45 w-full h-full flex justify-center items-center p-4">
          {/* Editable condition text */}
          {isEditing ? (
            <textarea
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className="w-full h-full resize-none border-none focus:outline-none text-center bg-transparent text-primary-900 font-semibold placeholder-primary-400"
              style={{ fontSize: 'clamp(10px, 2vw, 14px)' }}
              autoFocus
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center cursor-text hover:bg-primary-50 transition-colors text-center font-semibold text-primary-900"
              style={{ fontSize: 'clamp(10px, 2vw, 14px)' }}
              onDoubleClick={handleDoubleClick}
              title="Double-click to edit"
            >
              {condition}
            </div>
          )}
        </div>
      </div>

      {/* Output handles for True/False paths */}
      <Handle
        type="source"
        position={Position.Left}
        id="false"
        className="w-3 h-3"
        style={{ top: '50%' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="true"
        className="w-3 h-3"
        style={{ top: '50%' }}
      />

      {/* Labels for outputs */}
      <div className="absolute text-xs text-primary-700 font-semibold" style={{ top: '50%', left: '-35px', transform: 'translateY(-50%)' }}>
        False
      </div>
      <div className="absolute text-xs text-primary-700 font-semibold" style={{ top: '50%', right: '-35px', transform: 'translateY(-50%)' }}>
        True
      </div>
    </div>
  );
}

export default memo(ConditionNode);
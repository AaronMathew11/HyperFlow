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
  const [condition, setCondition] = useState(data.condition || 'Click to edit condition');

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleSaveCondition = () => {
    setIsEditing(false);
    data.condition = condition;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveCondition();
    }
    if (e.key === 'Escape') {
      setCondition(data.condition || 'Click to edit condition');
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
          {/* Condition text */}
          {isEditing ? (
            <textarea
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              onBlur={handleSaveCondition}
              onKeyDown={handleKeyPress}
              className="w-full h-full resize-none border-none outline-none bg-transparent text-center font-semibold text-primary-900 p-1 rounded"
              style={{ fontSize: 'clamp(10px, 2vw, 14px)' }}
              placeholder="Enter condition..."
              autoFocus
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center cursor-pointer hover:bg-primary-50 transition-colors text-center font-semibold text-primary-900 p-1 rounded break-words"
              style={{ fontSize: 'clamp(10px, 2vw, 14px)' }}
              onClick={handleDoubleClick}
              title="Click to edit condition"
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
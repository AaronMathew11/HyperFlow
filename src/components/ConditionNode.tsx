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
        color={data.color}
        isVisible={selected}
        minWidth={120}
        minHeight={120}
        keepAspectRatio
      />
      {/* Input handle */}
      <Handle type="target" position={Position.Top} className="w-3 h-3" />

      {/* Diamond shape */}
      <div
        className="shadow-lg border-2 bg-white transform rotate-45 absolute"
        style={{ 
          borderColor: data.color,
          width: '120px',
          height: '120px',
          top: '10px',
          left: '10px',
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
              className="w-full h-full resize-none border-none focus:outline-none text-center bg-transparent text-gray-800 font-medium"
              style={{ fontSize: 'clamp(10px, 2vw, 14px)' }}
              autoFocus
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center cursor-text hover:bg-gray-50 transition-colors text-center font-medium text-gray-800"
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
      <div className="absolute text-xs text-gray-500" style={{ top: '50%', left: '-30px', transform: 'translateY(-50%)' }}>
        False
      </div>
      <div className="absolute text-xs text-gray-500" style={{ top: '50%', right: '-30px', transform: 'translateY(-50%)' }}>
        True
      </div>
    </div>
  );
}

export default memo(ConditionNode);
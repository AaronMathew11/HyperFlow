import { memo, useState } from 'react';
import { Handle, Position, NodeProps, NodeResizer, useReactFlow } from 'reactflow';

interface GenericCardNodeData {
  title: string;
  description?: string;
  color: string;
}

function GenericCardNode({ id, data, selected }: NodeProps<GenericCardNodeData>) {
  const [title, setTitle] = useState(data.title || 'Custom Card');
  const [description, setDescription] = useState(data.description || '');
  const { setNodes } = useReactFlow();

  const accentColor = data.color || '#8B5CF6';
  const typeLabel = 'Custom Card';
  const typeIcon = (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  );

  const persist = () => {
    setNodes(nodes => nodes.map(n =>
      n.id !== id ? n : { ...n, data: { ...n.data, title, description } }
    ));
  };

  return (
    <div className="relative group w-full" onBlur={persist}>
      <NodeResizer
        color={accentColor}
        isVisible={selected}
        minWidth={180}
        minHeight={80}
      />

      {/* Target handles — receive connections from any side */}
      <Handle type="target" position={Position.Top} className="!w-3 !h-3 !border-2 !border-white" style={{ background: accentColor }} />
      <Handle type="target" position={Position.Left} id="in-left" className="!w-2.5 !h-2.5 !border-2 !border-white" style={{ background: '#94A3B8' }} />
      <Handle type="target" position={Position.Right} id="in-right" className="!w-2.5 !h-2.5 !border-2 !border-white" style={{ background: '#94A3B8' }} />

      {selected && (
        <div
          className="absolute -inset-[2px] rounded-xl pointer-events-none"
          style={{ boxShadow: `0 0 0 2px ${accentColor}, 0 0 16px ${accentColor}30` }}
        />
      )}

      <div
        className="rounded-xl overflow-hidden bg-white w-full"
        style={{
          border: selected ? `2px solid ${accentColor}` : '2px solid rgba(226,232,240,0.9)',
          boxShadow: selected ? '0 4px 16px rgba(0,0,0,0.08)' : '0 2px 8px rgba(0,0,0,0.04)',
          minWidth: 180,
        }}
      >
        {/* Accent bar */}
        <div style={{ height: 3, backgroundColor: accentColor }} />

        {/* Header */}
        <div className="px-3 pt-2.5 pb-1 flex items-center gap-2">
          <div
            className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${accentColor}18`, color: accentColor }}
          >
            {typeIcon}
          </div>
          <span
            className="text-[9px] font-bold uppercase tracking-wider"
            style={{ color: accentColor }}
          >
            {typeLabel}
          </span>
        </div>

        {/* Title */}
        <div className="px-3 pb-1">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-sm font-bold text-gray-900 bg-transparent border-0 focus:outline-none focus:border-b-2 pb-0.5"
            style={{ borderColor: accentColor }}
            placeholder="Activity name"
          />
        </div>

        {/* Description */}
        <div className="px-3 pb-3">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full text-[11px] text-gray-500 bg-transparent border-0 focus:outline-none resize-none leading-relaxed placeholder-gray-300"
            rows={2}
            placeholder="Describe this activity..."
          />
        </div>
      </div>

      {/* Source handles — start connections from any side */}
      <Handle type="source" position={Position.Bottom} className="!w-3 !h-3 !border-2 !border-white" style={{ background: accentColor }} />
      <Handle type="source" position={Position.Left} id="out-left" className="!w-2.5 !h-2.5 !border-2 !border-white" style={{ background: '#94A3B8' }} />
      <Handle type="source" position={Position.Right} id="out-right" className="!w-2.5 !h-2.5 !border-2 !border-white" style={{ background: '#94A3B8' }} />
    </div>
  );
}

export default memo(GenericCardNode);

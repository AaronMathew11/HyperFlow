import { memo, useState } from 'react';
import { NodeProps, NodeResizer, useReactFlow } from 'reactflow';

export interface ApiGroupNodeData {
  label: string;
  color?: string;
}

const GROUP_COLORS = [
  { label: 'Indigo', value: '#6366F1' },
  { label: 'Emerald', value: '#10B981' },
  { label: 'Rose', value: '#F43F5E' },
  { label: 'Amber', value: '#F59E0B' },
  { label: 'Sky', value: '#0EA5E9' },
  { label: 'Violet', value: '#8B5CF6' },
];

function ApiGroupNode({ id, data, selected }: NodeProps<ApiGroupNodeData>) {
  const { getNodes, setNodes } = useReactFlow();
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label || 'Product Group');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState(data.color || '#6366F1');
  
  // Check if group has children
  const nodes = getNodes();
  const childNodes = nodes.filter(node => node.parentNode === id);
  const hasChildren = childNodes.length > 0;

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };


  return (
    <div
      className="w-full h-full relative"
      style={{
        borderRadius: '16px',
        border: `2px dashed ${color}`,
        backgroundColor: hexToRgba(color, 0.04),
        minWidth: '220px',
        minHeight: '160px',
        cursor: 'default',
      }}
      onClick={(e) => {
        // Support Cmd+Click on Mac as alternative to right-click for ungrouping
        if (e.metaKey && hasChildren) {
          e.preventDefault();
          e.stopPropagation();
          
          // Trigger ungroup functionality
          const currentNodes = getNodes();
          const groupNode = currentNodes.find(n => n.id === id);
          
          if (groupNode) {
            setNodes((nodes) =>
              nodes.map((node) => {
                if (node.parentNode === id) {
                  return {
                    ...node,
                    parentNode: undefined,
                    extent: undefined,
                    position: {
                      x: groupNode.position.x + node.position.x + 20,
                      y: groupNode.position.y + node.position.y + 20,
                    },
                  };
                }
                return node;
              })
            );
          }
        }
      }}
    >
      <NodeResizer
        color={color}
        isVisible={selected}
        minWidth={350}
        minHeight={300}
        lineStyle={{ strokeWidth: 1.5 }}
        handleStyle={{ width: 8, height: 8, borderRadius: 2, backgroundColor: color }}
      />

      {/* Group label badge */}
      <div
        className="absolute top-0 left-5 -translate-y-1/2 flex items-center gap-1.5 shadow-md"
        style={{ borderRadius: '999px', backgroundColor: color, padding: '3px 12px' }}
      >
        {/* Color dot picker */}
        <button
          className="w-3 h-3 rounded-full border border-white/40 flex-shrink-0 hover:scale-110 transition-transform"
          style={{ backgroundColor: hexToRgba('#ffffff', 0.4) }}
          onClick={(e) => {
            e.stopPropagation();
            setShowColorPicker(!showColorPicker);
          }}
          title="Change color"
        />

        {isEditing ? (
          <input
            autoFocus
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => { if (e.key === 'Enter') setIsEditing(false); }}
            onClick={(e) => e.stopPropagation()}
            className="bg-transparent outline-none text-white font-semibold"
            style={{ fontSize: '11px', width: Math.max(80, label.length * 7) + 'px' }}
          />
        ) : (
          <span
            className="text-white font-semibold cursor-text select-none"
            style={{ fontSize: '11px' }}
            onDoubleClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
            title="Double-click to rename"
          >
            {label}
          </span>
        )}

      </div>

      {/* Color picker dropdown */}
      {showColorPicker && (
        <div
          className="absolute top-4 left-3 z-50 bg-white rounded-xl shadow-xl border border-gray-100 p-2 flex gap-1.5"
          style={{ top: 12 }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {GROUP_COLORS.map((c) => (
            <button
              key={c.value}
              className="w-5 h-5 rounded-full border-2 border-white hover:scale-110 transition-transform shadow-sm"
              style={{
                backgroundColor: c.value,
                outline: color === c.value ? `2px solid ${c.value}` : 'none',
                outlineOffset: '2px',
              }}
              onClick={(e) => {
                e.stopPropagation();
                setColor(c.value);
                setShowColorPicker(false);
                // Persist color to node data
                setNodes((nodes) =>
                  nodes.map((node) =>
                    node.id === id
                      ? { ...node, data: { ...node.data, color: c.value } }
                      : node
                  )
                );
              }}
              title={c.label}
            />
          ))}
        </div>
      )}

      {/* Subtle inner hint when empty */}
      {!hasChildren && (
        <div
          className="absolute inset-4 flex items-center justify-center pointer-events-none"
          style={{ opacity: 0.25 }}
        >
          <span className="text-xs font-medium" style={{ color }}>
            Drop nodes here to group them
          </span>
        </div>
      )}

    </div>
  );
}

export default memo(ApiGroupNode);

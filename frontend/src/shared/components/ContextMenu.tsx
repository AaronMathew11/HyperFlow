import { useEffect, useRef } from 'react';

interface ContextMenuProps {
  x: number;
  y: number;
  nodeId?: string;
  nodeType?: string;
  onClose: () => void;
  onAddNote: () => void;
  onDeleteNode?: () => void;
}

export default function ContextMenu({ x, y, nodeId, nodeType, onClose, onAddNote, onDeleteNode }: ContextMenuProps) {
  const _menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleAddNote = () => {
    onAddNote();
    onClose();
  };

  const handleDeleteNode = () => {
    if (onDeleteNode) {
      onDeleteNode();
    }
  };

  return (
    <div
      ref={menuRef}
      className="absolute z-50 rounded-lg shadow-lg border overflow-hidden"
      style={{
        left: x,
        top: y,
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.92) 100%)',
        backdropFilter: 'blur(40px) saturate(200%)',
        WebkitBackdropFilter: 'blur(40px) saturate(200%)',
        borderColor: 'rgba(6, 6, 61, 0.1)',
        boxShadow: 'inset -1px -1px 0 0 rgba(255, 255, 255, 0.5), 0 8px 32px rgba(6, 6, 61, 0.12)',
      }}
    >
      <div className="py-1 min-w-32">
        {!nodeId && (
          <button
            onClick={handleAddNote}
            className="w-full px-3 py-2 text-left text-sm text-primary-700 hover:bg-primary-50 transition-colors flex items-center gap-2"
          >
            <span className="text-yellow-500">📝</span>
            Add Note
          </button>
        )}
        {nodeId && onDeleteNode && nodeType !== 'startNode' && (
          <button
            onClick={handleDeleteNode}
            className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
          >
            <span className="text-red-500">🗑️</span>
            Delete Node
          </button>
        )}
        {nodeId && nodeType === 'startNode' && (
          <div className="px-3 py-2 text-sm text-gray-500 italic">
            Start node cannot be deleted
          </div>
        )}
      </div>
    </div>
  );
}
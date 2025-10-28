import { useState, useRef, useEffect } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

interface NoteData {
  text: string;
}

export default function NoteNode({ data, selected }: NodeProps<NoteData>) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(data.text || 'Click to edit note...');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    // Update the node data
    data.text = e.target.value;
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (text.trim() === '') {
      setText('Click to edit note...');
      data.text = 'Click to edit note...';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
    } else if (e.key === 'Enter' && e.ctrlKey) {
      setIsEditing(false);
    }
  };

  return (
    <div
      className={`relative bg-yellow-200 border-2 border-yellow-300 rounded-lg p-3 min-w-48 max-w-64 shadow-lg cursor-pointer transition-all duration-200 ${
        selected ? 'ring-2 ring-primary-400 ring-opacity-75' : ''
      }`}
      style={{
        transform: 'rotate(-1deg)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
      }}
      onDoubleClick={handleDoubleClick}
    >
      {/* Tape effect */}
      <div
        className="absolute -top-2 left-4 w-8 h-4 bg-yellow-100 border border-yellow-300 opacity-80"
        style={{ transform: 'rotate(15deg)' }}
      />
      
      {isEditing ? (
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-full h-20 bg-transparent border-none outline-none resize-none text-sm text-gray-800 placeholder-gray-500 font-handwriting"
          placeholder="Type your note here..."
          style={{ fontFamily: 'Comic Sans MS, cursive' }}
        />
      ) : (
        <div
          className="text-sm text-gray-800 whitespace-pre-wrap min-h-20 font-handwriting"
          style={{ fontFamily: 'Comic Sans MS, cursive' }}
        >
          {text}
        </div>
      )}

      {/* Corner fold */}
      <div
        className="absolute top-0 right-0 w-0 h-0 border-l-8 border-b-8 border-l-yellow-300 border-b-transparent"
      />

      {/* Instructions when not editing */}
      {!isEditing && (
        <div className="absolute -bottom-6 left-0 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
          Double-click to edit
        </div>
      )}
    </div>
  );
}
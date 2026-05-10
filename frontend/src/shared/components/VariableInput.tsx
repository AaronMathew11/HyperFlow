import { useState } from 'react';

interface VariableInputProps {
  label: string;
  variables: string[];
  placeholder: string;
  onAdd: (variable: string) => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, variable: string) => void;
}

export default function VariableInput({
  label,
  variables,
  placeholder,
  onAdd,
  onRemove,
  onUpdate,
}: VariableInputProps) {
  const [newVariable, setNewVariable] = useState('');

  const handleAdd = () => {
    if (newVariable.trim()) {
      onAdd(newVariable.trim());
      setNewVariable('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div>
      <label className="text-xs font-medium text-primary-700 block mb-2">
        {label}
      </label>
      
      {/* Existing variables */}
      <div className="space-y-2 mb-2">
        {variables.map((variable, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={variable}
              onChange={(e) => onUpdate(index, e.target.value)}
              className="flex-1 text-xs border border-primary-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400/30 focus:border-primary-400 transition-all text-primary-900 bg-white/80"
              placeholder={placeholder}
            />
            <button
              onClick={() => onRemove(index)}
              className="w-6 h-6 flex items-center justify-center rounded-md bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-colors"
              title="Remove variable"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Add new variable */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={newVariable}
          onChange={(e) => setNewVariable(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 text-xs border border-primary-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400/30 focus:border-primary-400 transition-all text-primary-900 placeholder-primary-400 bg-white/80"
          placeholder={`Add ${label.toLowerCase().slice(4)}...`}
        />
        <button
          onClick={handleAdd}
          disabled={!newVariable.trim()}
          className={`w-6 h-6 flex items-center justify-center rounded-md transition-colors ${
            newVariable.trim()
              ? 'bg-primary-50 hover:bg-primary-100 text-primary-600 hover:text-primary-700'
              : 'bg-gray-50 text-gray-400 cursor-not-allowed'
          }`}
          title="Add variable"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  );
}
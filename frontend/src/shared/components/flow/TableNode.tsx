import { memo, useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

export interface TableField {
    id: string;
    name: string;
    type: string;
}

export interface TableNodeData {
    name: string;
    fields: TableField[];
    color: string;
    isEditMode: boolean;
    onDelete: (id: string) => void;
    onAddField?: (nodeId: string, name: string, type: string) => void;
    onRemoveField?: (nodeId: string, fieldId: string) => void;
}

const TableNode = ({ id, data, selected }: NodeProps<TableNodeData>) => {
    const [newFieldName, setNewFieldName] = useState('');
    const [newFieldType, setNewFieldType] = useState('VARCHAR');
    const [showAddField, setShowAddField] = useState(false);

    const getColorClasses = (color: string) => {
        const colors: Record<string, { header: string; border: string }> = {
            blue: { header: 'bg-blue-600', border: 'border-blue-600' },
            purple: { header: 'bg-purple-600', border: 'border-purple-600' },
            green: { header: 'bg-green-600', border: 'border-green-600' },
            indigo: { header: 'bg-indigo-600', border: 'border-indigo-600' },
            red: { header: 'bg-red-600', border: 'border-red-600' },
            yellow: { header: 'bg-yellow-600', border: 'border-yellow-600' },
            pink: { header: 'bg-pink-600', border: 'border-pink-600' },
            teal: { header: 'bg-teal-600', border: 'border-teal-600' },
            gray: { header: 'bg-gray-600', border: 'border-gray-600' },
        };
        return colors[color] || colors.gray;
    };

    const colors = getColorClasses(data.color);

    const handleAddField = () => {
        if (newFieldName && data.onAddField) {
            data.onAddField(id, newFieldName, newFieldType);
            setNewFieldName('');
            setNewFieldType('VARCHAR');
            setShowAddField(false);
        }
    };

    return (
        <div className={`
            relative w-64 rounded-lg bg-white shadow-lg overflow-hidden
            border-2 ${colors.border}
            ${selected ? 'ring-2 ring-indigo-400 shadow-xl' : ''}
        `}>
            {/* Table Header */}
            <div className={`${colors.header} p-2 flex items-center justify-between text-white`}>
                <div className="font-bold flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                    <span className="text-sm">{data.name}</span>
                </div>
                {/* Delete Button (Edit Mode) */}
                {data.isEditMode && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            data.onDelete(id);
                        }}
                        className="text-white/80 hover:text-white hover:bg-white/20 rounded p-0.5 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Connection Handles - All Four Sides (Bidirectional) */}
            {/* Top Handles */}
            <Handle
                type="target"
                position={Position.Top}
                id="top-target"
                className="w-3 h-3 !bg-gray-400 !border-2 !border-white hover:!bg-blue-500 transition-colors"
                isConnectable={data.isEditMode}
            />
            <Handle
                type="source"
                position={Position.Top}
                id="top-source"
                className="w-3 h-3 !bg-gray-400 !border-2 !border-white hover:!bg-blue-500 transition-colors"
                isConnectable={data.isEditMode}
            />

            {/* Bottom Handles */}
            <Handle
                type="target"
                position={Position.Bottom}
                id="bottom-target"
                className="w-3 h-3 !bg-gray-400 !border-2 !border-white hover:!bg-blue-500 transition-colors"
                isConnectable={data.isEditMode}
            />
            <Handle
                type="source"
                position={Position.Bottom}
                id="bottom-source"
                className="w-3 h-3 !bg-gray-400 !border-2 !border-white hover:!bg-blue-500 transition-colors"
                isConnectable={data.isEditMode}
            />

            {/* Left Handles */}
            <Handle
                type="target"
                position={Position.Left}
                id="left-target"
                className="w-3 h-3 !bg-gray-400 !border-2 !border-white hover:!bg-blue-500 transition-colors"
                isConnectable={data.isEditMode}
            />
            <Handle
                type="source"
                position={Position.Left}
                id="left-source"
                className="w-3 h-3 !bg-gray-400 !border-2 !border-white hover:!bg-blue-500 transition-colors"
                isConnectable={data.isEditMode}
            />

            {/* Right Handles */}
            <Handle
                type="target"
                position={Position.Right}
                id="right-target"
                className="w-3 h-3 !bg-gray-400 !border-2 !border-white hover:!bg-blue-500 transition-colors"
                isConnectable={data.isEditMode}
            />
            <Handle
                type="source"
                position={Position.Right}
                id="right-source"
                className="w-3 h-3 !bg-gray-400 !border-2 !border-white hover:!bg-blue-500 transition-colors"
                isConnectable={data.isEditMode}
            />


            {/* Fields List */}
            <div className="bg-white">
                {data.fields.map((field, index) => (
                    <div
                        key={field.id}
                        className={`
                            px-3 py-1.5 flex justify-between items-center text-xs 
                            ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                            border-b last:border-0 border-gray-100 group
                        `}
                    >
                        <div className="flex items-center gap-2 overflow-hidden">
                            <span className="font-bold text-gray-800 truncate" title={field.name}>
                                {field.name}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500 font-mono text-[10px] uppercase">
                                {field.type}
                            </span>
                            {data.isEditMode && data.onRemoveField && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        data.onRemoveField?.(id, field.id);
                                    }}
                                    className="opacity-0 group-hover:opacity-100 text-red-500 hover:bg-red-50 rounded p-0.5 transition-all"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>

                        {/* Individual Field Handles - Optional, enable if granular connections needed */}
                        {/* <Handle type="source" position={Position.Right} id={`field-${field.id}`} style={{ top: 'auto', right: -6 }} /> */}
                    </div>
                ))}

                {/* Add Field Form (Edit Mode) */}
                {data.isEditMode && (
                    <div className="p-2 bg-gray-50 border-t border-gray-200">
                        {showAddField ? (
                            <div className="space-y-2">
                                <input
                                    type="text"
                                    placeholder="Field name"
                                    value={newFieldName}
                                    onChange={(e) => setNewFieldName(e.target.value)}
                                    className="w-full px-2 py-1 text-xs border rounded focus:ring-1 focus:ring-blue-500 outline-none"
                                    autoFocus
                                />
                                <div className="flex gap-1">
                                    <select
                                        value={newFieldType}
                                        onChange={(e) => setNewFieldType(e.target.value)}
                                        className="flex-1 px-2 py-1 text-xs border rounded focus:ring-1 focus:ring-blue-500 outline-none bg-white"
                                    >
                                        <option value="VARCHAR">VARCHAR</option>
                                        <option value="INT">INT</option>
                                        <option value="BOOLEAN">BOOLEAN</option>
                                        <option value="JSON">JSON</option>
                                        <option value="TIMESTAMP">TIMESTAMP</option>
                                        <option value="UUID">UUID</option>
                                    </select>
                                    <button
                                        onClick={handleAddField}
                                        className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
                                    >
                                        ✓
                                    </button>
                                    <button
                                        onClick={() => setShowAddField(false)}
                                        className="px-2 py-1 bg-gray-300 text-gray-700 rounded text-xs hover:bg-gray-400"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowAddField(true)}
                                className="w-full py-1 text-xs text-blue-600 font-medium hover:bg-blue-50 rounded border border-dashed border-blue-200 transition-colors"
                            >
                                + Add Field
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default memo(TableNode);

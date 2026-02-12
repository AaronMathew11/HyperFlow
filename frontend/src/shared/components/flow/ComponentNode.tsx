import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

export interface ComponentNodeData {
    name: string;
    description: string;
    laneId: string;
    color: string;
    documentationUrl?: string;
    isCustom?: boolean;
    isEditMode: boolean;
    onDelete: (id: string) => void;
    onViewDocs: (url: string) => void;
}

const ComponentNode = ({ id, data, selected }: NodeProps<ComponentNodeData>) => {
    const getColorClasses = (color: string) => {
        const colors: Record<string, { bg: string; border: string; text: string; header: string; hover: string }> = {
            blue: { bg: 'bg-blue-100', border: 'border-blue-500', text: 'text-blue-900', header: 'from-blue-500 to-blue-600', hover: 'hover:bg-blue-200' },
            purple: { bg: 'bg-purple-100', border: 'border-purple-500', text: 'text-purple-900', header: 'from-purple-500 to-purple-600', hover: 'hover:bg-purple-200' },
            green: { bg: 'bg-green-100', border: 'border-green-500', text: 'text-green-900', header: 'from-green-500 to-green-600', hover: 'hover:bg-green-200' },
            indigo: { bg: 'bg-indigo-100', border: 'border-indigo-500', text: 'text-indigo-900', header: 'from-indigo-500 to-indigo-600', hover: 'hover:bg-indigo-200' },
            red: { bg: 'bg-red-100', border: 'border-red-500', text: 'text-red-900', header: 'from-red-500 to-red-600', hover: 'hover:bg-red-200' },
            yellow: { bg: 'bg-yellow-100', border: 'border-yellow-500', text: 'text-yellow-900', header: 'from-yellow-500 to-yellow-600', hover: 'hover:bg-yellow-200' },
            pink: { bg: 'bg-pink-100', border: 'border-pink-500', text: 'text-pink-900', header: 'from-pink-500 to-pink-600', hover: 'hover:bg-pink-200' },
            teal: { bg: 'bg-teal-100', border: 'border-teal-500', text: 'text-teal-900', header: 'from-teal-500 to-teal-600', hover: 'hover:bg-teal-200' },
        };
        return colors[color] || colors.blue;
    };

    const colors = getColorClasses(data.color);

    return (
        <div className={`
            relative group w-64 rounded-lg border-2 shadow-md transition-all
            ${colors.bg} 
            ${selected ? 'border-indigo-500 ring-2 ring-indigo-200 shadow-xl' : colors.border}
            ${!data.isEditMode ? `${colors.hover} cursor-pointer` : ''}
        `}>
            {/* Input Handle (Left) */}
            <Handle
                type="target"
                position={Position.Left}
                className="w-3 h-3 !bg-gray-400 !border-2 !border-white hover:!bg-blue-500 transition-colors"
                isConnectable={data.isEditMode}
            />

            {/* Content */}
            <div
                className="p-4"
                onClick={(e) => {
                    if (!data.isEditMode && data.documentationUrl) {
                        e.stopPropagation();
                        data.onViewDocs(data.documentationUrl);
                    }
                }}
            >
                <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 bg-gradient-to-br ${colors.header} rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-sm`}>
                        {data.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <p className={`text-sm font-bold ${colors.text} truncate`}>{data.name}</p>
                            {data.isCustom && (
                                <span className="text-[10px] bg-yellow-200 text-yellow-800 px-1.5 py-0.5 rounded-full font-medium">Custom</span>
                            )}
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-2 mt-0.5">{data.description}</p>

                        {data.documentationUrl && !data.isEditMode && (
                            <p className="text-xs text-blue-600 mt-2 flex items-center gap-1 font-medium group-hover:underline">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                View Docs
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Delete Button (Edit Mode Only) */}
            {data.isEditMode && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        data.onDelete(id);
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 hover:scale-110"
                    title="Remove component"
                >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            )}

            {/* Output Handle (Right) */}
            <Handle
                type="source"
                position={Position.Right}
                className="w-3 h-3 !bg-gray-400 !border-2 !border-white hover:!bg-blue-500 transition-colors"
                isConnectable={data.isEditMode}
            />
        </div>
    );
};

export default memo(ComponentNode);

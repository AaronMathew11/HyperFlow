import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

export interface LaneHeaderData {
    name: string;
    color: string;
    width: number;
    isEditMode: boolean;
}

const LaneHeader = ({ data }: NodeProps<LaneHeaderData>) => {
    const getColorClasses = (color: string) => {
        const colors: Record<string, { header: string, body: string }> = {
            blue: { header: 'border-blue-500 bg-blue-50/50 text-blue-900', body: 'bg-blue-50/30' },
            purple: { header: 'border-purple-500 bg-purple-50/50 text-purple-900', body: 'bg-purple-50/30' },
            green: { header: 'border-green-500 bg-green-50/50 text-green-900', body: 'bg-green-50/30' },
            indigo: { header: 'border-indigo-500 bg-indigo-50/50 text-indigo-900', body: 'bg-indigo-50/30' },
            red: { header: 'border-red-500 bg-red-50/50 text-red-900', body: 'bg-red-50/30' },
            yellow: { header: 'border-yellow-500 bg-yellow-50/50 text-yellow-900', body: 'bg-yellow-50/30' },
            pink: { header: 'border-pink-500 bg-pink-50/50 text-pink-900', body: 'bg-pink-50/30' },
            teal: { header: 'border-teal-500 bg-teal-50/50 text-teal-900', body: 'bg-teal-50/30' },
        };
        return colors[color] || colors.blue;
    };

    const colors = getColorClasses(data.color);

    return (
        <div className="h-full flex flex-col" style={{ width: data.width }}>
            <div
                className={`
                h-12 border-t-4 shadow-sm flex items-center justify-center font-semibold tracking-wide flex-shrink-0
                ${colors.header}
            `}
            >
                <p className="text-sm uppercase">{data.name}</p>
            </div>
            <div className={`flex-1 border-r border-gray-200/50 ${colors.body}`} />

            {/* Hidden handles to satisfy React Flow but not used for connections */}
            <Handle type="target" position={Position.Top} className="opacity-0 pointer-events-none" />
            <Handle type="source" position={Position.Bottom} className="opacity-0 pointer-events-none" />
        </div>
    );
};

export default memo(LaneHeader);

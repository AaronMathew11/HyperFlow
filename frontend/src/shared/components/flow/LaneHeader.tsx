import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

export interface LaneHeaderData {
    name: string;
    icon: string;
    color: string;
    width: number;
    isEditMode: boolean;
}

const LaneHeader = ({ data }: NodeProps<LaneHeaderData>) => {
    const getColorClasses = (color: string) => {
        const colors: Record<string, { header: string }> = {
            blue: { header: 'from-blue-500 to-blue-600' },
            purple: { header: 'from-purple-500 to-purple-600' },
            green: { header: 'from-green-500 to-green-600' },
            indigo: { header: 'from-indigo-500 to-indigo-600' },
            red: { header: 'from-red-500 to-red-600' },
            yellow: { header: 'from-yellow-500 to-yellow-600' },
            pink: { header: 'from-pink-500 to-pink-600' },
            teal: { header: 'from-teal-500 to-teal-600' },
        };
        return colors[color] || colors.blue;
    };

    const colors = getColorClasses(data.color);

    return (
        <div
            className={`
                h-16 rounded-t-lg bg-gradient-to-r shadow-sm flex items-center justify-center gap-3 text-white
                ${colors.header}
            `}
            style={{ width: data.width }}
        >
            <div className="text-2xl drop-shadow-sm">{data.icon}</div>
            <p className="font-bold text-lg drop-shadow-sm">{data.name}</p>

            {/* Hidden handles to satisfy React Flow but not used for connections */}
            <Handle type="target" position={Position.Top} className="opacity-0 pointer-events-none" />
            <Handle type="source" position={Position.Bottom} className="opacity-0 pointer-events-none" />
        </div>
    );
};

export default memo(LaneHeader);

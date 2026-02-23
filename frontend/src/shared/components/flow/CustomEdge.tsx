import { memo } from 'react';
import { EdgeProps, getBezierPath, EdgeLabelRenderer, BaseEdge } from 'reactflow';

const CustomEdge = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
    label,
    data,
}: EdgeProps) => {
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
        curvature: 0.5, // Increased curvature for looser, smoother arrows
    });

    const isEditMode = data?.isEditMode;

    return (
        <>
            <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
            {(label || isEditMode) && (
                <EdgeLabelRenderer>
                    <div
                        style={{
                            position: 'absolute',
                            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                            pointerEvents: 'all',
                        }}
                        className="nodrag nopan"
                    >
                        {label && (
                            <div className="bg-white px-2 py-1 rounded shadow-sm border border-gray-200 text-xs font-bold text-gray-700">
                                {label}
                            </div>
                        )}
                        {isEditMode && (
                            <button
                                className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md absolute -top-3 -right-3 hover:bg-red-600 transition-colors"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    data?.onDelete(id);
                                }}
                            >
                                ×
                            </button>
                        )}
                    </div>
                </EdgeLabelRenderer>
            )}
        </>
    );
};

export default memo(CustomEdge);

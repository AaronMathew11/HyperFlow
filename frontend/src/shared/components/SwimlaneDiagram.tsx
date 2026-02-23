import { useCallback, useState, useMemo, useEffect } from 'react';
import ReactFlow, {
    addEdge,
    Connection,
    Edge,
    Node,
    useNodesState,
    useEdgesState,
    Background,
    Controls,
    MiniMap,
    Panel,
    MarkerType,
    ReactFlowProvider,
    useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import ComponentNode, { ComponentNodeData } from './flow/ComponentNode';
import TableNode, { TableNodeData } from './flow/TableNode';
import LaneHeader, { LaneHeaderData } from './flow/LaneHeader';
import CustomEdge from './flow/CustomEdge';
import { loadSwimlaneDiagram, saveSwimlaneDiagram, updateWorkflowEnvironmentDiagram, saveEnvironmentDiagram, loadEnvironmentDiagram } from '../lib/api';

interface Lane {
    id: string;
    name: string;
    enabled: boolean;
}

interface Component {
    id: string;
    name: string;
    description: string;
    defaultLane: string;
    documentationUrl?: string;
    isCustom?: boolean;
}

const PREDEFINED_COMPONENTS: Component[] = [
    { id: 'journey-starts', name: 'Journey Starts', description: 'User Lands on the application', defaultLane: 'client-frontend', documentationUrl: '#journey-starts' },
    { id: 'kyc-journey-begins', name: 'KYC Journey Begins', description: 'HyperVerge SDK journey begins', defaultLane: 'client-frontend', documentationUrl: '#kyc-journey-begins' },
    { id: 'hyperverge-sdk', name: 'Hyperverge SDK', description: 'KYC Workflow is performed here', defaultLane: 'hv-sdk', documentationUrl: '#hyperverge-sdk' },
    { id: 'sdk-journey-ends', name: 'SDK Journey Ends', description: 'Journey is completed', defaultLane: 'hv-sdk', documentationUrl: '#sdk-journey-ends' },
    { id: 'call-backend', name: 'Call Backend', description: 'Client FE calls Client BE to Notify completion of KYC', defaultLane: 'client-frontend', documentationUrl: '#call-backend' },
    { id: 'call-hv-be', name: 'Call HV BE', description: 'Client BE calls HV BE for PII Data', defaultLane: 'client-backend', documentationUrl: '#call-hv-be' },
    { id: 'results-api', name: 'Results API', description: 'User Final Status, PII data and workflow data is returned in Response', defaultLane: 'hv-backend', documentationUrl: '#results-api' },
    { id: 'outputs-api', name: 'Outputs API', description: 'User Final Status and PII data is returned in Response', defaultLane: 'hv-backend', documentationUrl: '#outputs-api' },
    { id: 'store-to-db', name: 'Store to DB', description: 'Store PII Data to DB and return status to Frontend', defaultLane: 'client-backend', documentationUrl: '#store-to-db' },
    { id: 'kyc-completed', name: 'KYC Completed', description: 'FE received status and proceeds with next steps', defaultLane: 'client-frontend', documentationUrl: '#kyc-completed' },
    { id: 'webhook', name: 'Webhook', description: 'Webhook triggered to Client BE to notify data availability', defaultLane: 'hv-backend', documentationUrl: '#webhook' },
];

const DEFAULT_LANES: Lane[] = [
    { id: 'client-frontend', name: 'Client Frontend', enabled: true },
    { id: 'client-backend', name: 'Client Backend', enabled: true },
    { id: 'hv-sdk', name: 'HyperVerge SDK', enabled: true },
    { id: 'hv-backend', name: 'HyperVerge Backend', enabled: true },
];

const LANE_WIDTH = 400;

interface SwimlaneDiagramProps {
    workflowId?: string;
    environmentId?: string;
    readOnly?: boolean;
    initialData?: { nodes: any[]; edges: any[] } | null;
}

function SwimlaneDiagramContent({ workflowId, environmentId, readOnly = false, initialData }: SwimlaneDiagramProps) {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [lanes, setLanes] = useState<Lane[]>(DEFAULT_LANES);
    const isEditMode = !readOnly;
    const [showLabelModal, setShowLabelModal] = useState(false);
    const [pendingConnection, setPendingConnection] = useState<Connection | null>(null);
    const [edgeLabel, setEdgeLabel] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<string | null>(null);

    // Custom UI State
    const [showCustomLaneForm, setShowCustomLaneForm] = useState(false);
    const [customLaneName, setCustomLaneName] = useState('');

    const [showCustomCompForm, setShowCustomCompForm] = useState(false);
    const [customCompName, setCustomCompName] = useState('');
    const [customCompDesc, setCustomCompDesc] = useState('');
    const [customCompDocUrl, setCustomCompDocUrl] = useState('');

    // Lane Drag/Drop State
    const [draggedLaneIndex, setDraggedLaneIndex] = useState<number | null>(null);

    const nodeTypes = useMemo(() => ({ component: ComponentNode, table: TableNode, laneHeader: LaneHeader }), []);
    const edgeTypes = useMemo(() => ({ custom: CustomEdge }), []);

    const availableColors = ['blue', 'purple', 'green', 'indigo', 'red', 'yellow', 'pink', 'teal'];

    // Convert to React Flow instance for saving
    const { toObject } = useReactFlow();

    // Load data
    useEffect(() => {
        // If initialData is provided, use it directly (for customer portal)
        if (initialData) {
            setNodes(initialData.nodes || []);
            setEdges(initialData.edges || []);
            return;
        }

        if (!workflowId && !environmentId) return;

        const loadData = async () => {
            try {
                let flowData = null;
                if (workflowId) {
                    flowData = await loadSwimlaneDiagram(workflowId, environmentId);
                } else if (environmentId) {
                    flowData = await loadEnvironmentDiagram(environmentId);
                }
                if (flowData) {
                    setNodes(flowData.nodes || []);
                    setEdges(flowData.edges || []);
                }
            } catch (err) {
                console.error("Failed to load diagram", err);
            }
        };

        loadData();
    }, [workflowId, environmentId, initialData, setNodes, setEdges]);

    const handleSave = async () => {
        if (!workflowId && !environmentId) return;

        setIsSaving(true);
        try {
            const flowData = toObject();
            const dataToSave = {
                nodes: flowData.nodes,
                edges: flowData.edges,
                flowInputs: '',
                flowOutputs: ''
            };

            let success = false;

            if (workflowId && environmentId) {
                success = await updateWorkflowEnvironmentDiagram(workflowId, environmentId, dataToSave);
            } else if (workflowId) {
                success = await saveSwimlaneDiagram(workflowId, dataToSave);
            } else if (environmentId) {
                success = await saveEnvironmentDiagram(environmentId, dataToSave);
            }

            if (success) {
                setLastSaved(new Date().toLocaleTimeString());
            } else {
                alert('Failed to save diagram');
            }
        } catch (error) {
            console.error('Error saving diagram:', error);
            alert('Error saving diagram');
        } finally {
            setIsSaving(false);
        }
    };

    // Initialize Lanes (skip when initialData is provided since saved data includes lane headers)
    useEffect(() => {
        if (initialData) return;

        const enabledLanes = lanes.filter(l => l.enabled);
        const laneNodes: Node[] = enabledLanes.map((lane, index) => ({
            id: `lane-${lane.id}`,
            type: 'laneHeader',
            position: { x: index * LANE_WIDTH, y: 0 },
            data: {
                name: lane.name,
                color: availableColors[index % availableColors.length],
                width: LANE_WIDTH,
                isEditMode
            } as LaneHeaderData,
            style: { width: LANE_WIDTH, height: 5000 },
            draggable: false,
            selectable: false,
            zIndex: -1,
        }));

        setNodes(nds => {
            // Remove old lane headers
            const contentNodes = nds.filter(n => n.type !== 'laneHeader');

            // Re-apply colors to components
            const updatedComponents = contentNodes.map(node => {
                if (node.type === 'component') {
                    const laneIndex = Math.max(0, Math.floor(node.position.x / LANE_WIDTH));
                    const color = availableColors[laneIndex % availableColors.length];
                    return {
                        ...node,
                        data: { ...node.data, color }
                    };
                }
                return node;
            });

            return [...laneNodes, ...updatedComponents];
        });
    }, [lanes, isEditMode, initialData, setNodes]);

    // Update component nodes edit mode
    useEffect(() => {
        setNodes(nds => nds.map(node => {
            // Logic to update isEditMode in node data
            if (node.type === 'component' || node.type === 'table') {
                return {
                    ...node,
                    data: { ...node.data, isEditMode }
                };
            }
            return node;
        }));

        setEdges(eds => eds.map(edge => ({
            ...edge,
            data: { ...edge.data, isEditMode, onDelete: handleEdgeDelete }
        })));
    }, [isEditMode, setNodes, setEdges]); // Removed handleEdgeDelete from dep array

    const handleEdgeDelete = useCallback((id: string) => {
        setEdges(eds => eds.filter(e => e.id !== id));
    }, [setEdges]);

    const onConnect = useCallback((params: Connection) => {
        setPendingConnection(params);
        setShowLabelModal(true);
    }, []);

    const confirmConnection = useCallback(() => {
        if (pendingConnection && pendingConnection.source && pendingConnection.target) {
            const newEdge: Edge = {
                ...pendingConnection,
                id: `e-${Date.now()}`,
                type: 'custom',
                markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 },
                style: { strokeWidth: 2 },
                label: edgeLabel || undefined,
                data: { isEditMode, onDelete: handleEdgeDelete },
                source: pendingConnection.source,
                target: pendingConnection.target,
            };
            setEdges((eds) => addEdge(newEdge, eds));
        }
        setShowLabelModal(false);
        setPendingConnection(null);
        setEdgeLabel('');
    }, [pendingConnection, edgeLabel, isEditMode, handleEdgeDelete, setEdges]);

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onNodeDrag = useCallback(
        (_event: React.MouseEvent, node: Node) => {
            if (node.type === 'component') {
                const laneIndex = Math.max(0, Math.floor(node.position.x / LANE_WIDTH));
                const color = availableColors[laneIndex % availableColors.length];

                // Only update if color changes to avoid excessive re-renders
                if (node.data.color !== color) {
                    setNodes((nds) => nds.map((n) => {
                        if (n.id === node.id) {
                            return {
                                ...n,
                                data: { ...n.data, color },
                            };
                        }
                        return n;
                    }));
                }
            }
        },
        [setNodes]
    );

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow');
            const componentData = JSON.parse(event.dataTransfer.getData('application/componentData'));

            if (typeof type === 'undefined' || !type || !componentData) {
                return;
            }

            // Get drop position
            const reactFlowBounds = document.querySelector('.react-flow')?.getBoundingClientRect();

            if (reactFlowBounds) {
                const position = {
                    x: event.clientX - reactFlowBounds.left - 128, // Center node
                    y: event.clientY - reactFlowBounds.top - 40,
                };

                // Determine color based on drop position
                const laneIndex = Math.max(0, Math.floor(position.x / LANE_WIDTH));
                const color = availableColors[laneIndex % availableColors.length];

                let newNode: Node;

                if (type === 'component') {
                    newNode = {
                        id: `${componentData.id}-${Date.now()}`,
                        type: 'component',
                        position,
                        data: {
                            ...componentData,
                            color, // Assign dynamic color
                            isEditMode,
                            onDelete: (id: string) => setNodes((nds) => nds.filter((n) => n.id !== id)),
                            onViewDocs: (url: string) => window.location.hash = url
                        } as ComponentNodeData,
                        zIndex: 2,
                    };
                } else if (type === 'table') {
                    newNode = {
                        id: `table-${Date.now()}`,
                        type: 'table',
                        position,
                        data: {
                            ...componentData,
                            isEditMode,
                            onDelete: (id: string) => setNodes((nds) => nds.filter((n) => n.id !== id)),
                            onAddField: (nodeId: string, name: string, fieldType: string) => {
                                setNodes(nds => nds.map(node => {
                                    if (node.id === nodeId) {
                                        return {
                                            ...node,
                                            data: {
                                                ...node.data,
                                                fields: [...node.data.fields, { id: Date.now().toString(), name, type: fieldType }]
                                            }
                                        };
                                    }
                                    return node;
                                }));
                            },
                            onRemoveField: (nodeId: string, fieldId: string) => {
                                setNodes(nds => nds.map(node => {
                                    if (node.id === nodeId) {
                                        return {
                                            ...node,
                                            data: {
                                                ...node.data,
                                                fields: node.data.fields.filter((f: any) => f.id !== fieldId)
                                            }
                                        };
                                    }
                                    return node;
                                }));
                            }
                        } as TableNodeData,
                        zIndex: 2,
                    };
                } else {
                    return;
                }

                setNodes((nds) => nds.concat(newNode));
            }
        },
        [isEditMode, setNodes]
    );

    const onDragStart = (event: React.DragEvent, nodeType: string, componentData: any) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.setData('application/componentData', JSON.stringify(componentData));
        event.dataTransfer.effectAllowed = 'move';
    };

    const handleLaneDragStart = (e: React.DragEvent, index: number) => {
        setDraggedLaneIndex(index);
        e.dataTransfer.effectAllowed = 'move';
        // Use a generic type to allow generic drag - but maybe customize so it doesn't conflict with node drops
        e.dataTransfer.setData('application/lane', index.toString());
    };

    const handleLaneDragOver = (e: React.DragEvent) => {
        if (e.dataTransfer.types.includes('application/lane')) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        }
    };

    const handleLaneDrop = (e: React.DragEvent, targetIndex: number) => {
        e.preventDefault();
        const draggedIdxStr = e.dataTransfer.getData('application/lane');
        if (!draggedIdxStr) return;

        const draggedIdx = parseInt(draggedIdxStr, 10);
        if (isNaN(draggedIdx) || draggedIdx === targetIndex) {
            setDraggedLaneIndex(null);
            return;
        }

        const newLanes = [...lanes];
        const [movedLane] = newLanes.splice(draggedIdx, 1);
        newLanes.splice(targetIndex, 0, movedLane);

        setLanes(newLanes);
        setDraggedLaneIndex(null);
    };

    const addCustomLane = () => {
        if (!customLaneName.trim()) return;
        const newLane: Lane = {
            id: `custom-${Date.now()}`,
            name: customLaneName,
            enabled: true,
        };
        setLanes(prev => [...prev, newLane]);
        setCustomLaneName('');
        setShowCustomLaneForm(false);
    };

    const addCustomComponent = () => {
        if (!customCompName.trim()) return;
        const newComp: Component = {
            id: `custom-${Date.now()}`,
            name: customCompName,
            description: customCompDesc || 'Custom Component',
            defaultLane: 'client-frontend',
            documentationUrl: customCompDocUrl,
            isCustom: true,
        };
        PREDEFINED_COMPONENTS.push(newComp);
        setCustomCompName('');
        setCustomCompDesc('');
        setCustomCompDocUrl('');
        setShowCustomCompForm(false);
    };

    return (
        <div className="flex flex-col h-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <div>
                    {/* Title or Breadcrumb can go here if needed, or keeping it clean */}
                </div>
                <div className="flex gap-3 items-center">
                    {lastSaved && <span className="text-xs text-gray-400 mr-2">Saved {lastSaved}</span>}
                    {(workflowId || environmentId) && !readOnly && (
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors bg-green-600 text-white hover:bg-green-700 disabled:opacity-50`}
                        >
                            {isSaving ? 'Saving...' : 'Save Diagram'}
                        </button>
                    )}


                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar (Edit Mode Only) */}
                {isEditMode && !readOnly && (
                    <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col max-h-full">
                        <div className="overflow-y-auto p-4 space-y-4 flex-1">
                            {/* Lanes Config */}
                            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">Lanes</h3>
                                <div className="space-y-2">
                                    {lanes.map((lane, index) => (
                                        <div
                                            key={lane.id}
                                            draggable
                                            onDragStart={(e) => handleLaneDragStart(e, index)}
                                            onDragOver={handleLaneDragOver}
                                            onDrop={(e) => handleLaneDrop(e, index)}
                                            className={`flex items-center gap-2 p-2 rounded border border-gray-100 cursor-grab active:cursor-grabbing transition-colors ${draggedLaneIndex === index ? 'bg-blue-50 border-blue-200 opacity-50' : 'bg-gray-50 hover:bg-gray-100'
                                                }`}
                                        >
                                            <div className="mr-1 text-gray-400 cursor-grab">⋮⋮</div>
                                            <input
                                                type="checkbox"
                                                checked={lane.enabled}
                                                onChange={() => setLanes(ls => ls.map(l => l.id === lane.id ? { ...l, enabled: !l.enabled } : l))}
                                                className="rounded text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="text-sm font-medium text-gray-700 flex-1 select-none">{lane.name}</span>

                                        </div>
                                    ))}
                                    {/* Custom Lane Form */}
                                    {showCustomLaneForm ? (
                                        <div className="mt-3 p-3 bg-blue-50 rounded border border-blue-100 space-y-2">
                                            <input
                                                type="text"
                                                placeholder="Lane Name"
                                                value={customLaneName}
                                                onChange={e => setCustomLaneName(e.target.value)}
                                                className="w-full px-2 py-1 text-sm border rounded"
                                            />

                                            <div className="flex gap-2">
                                                <button onClick={addCustomLane} className="flex-1 bg-blue-600 text-white text-xs py-1 rounded">Add</button>
                                                <button onClick={() => setShowCustomLaneForm(false)} className="flex-1 bg-gray-300 text-gray-700 text-xs py-1 rounded">Cancel</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setShowCustomLaneForm(true)}
                                            className="w-full mt-2 py-1.5 text-sm text-blue-600 border border-blue-200 rounded hover:bg-blue-50 transition-colors"
                                        >
                                            + Add Custom Lane
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Component Palette */}
                            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">Components</h3>
                                <div className="space-y-2">
                                    {PREDEFINED_COMPONENTS.map(comp => (
                                        <div
                                            key={comp.id}
                                            onDragStart={(event) => onDragStart(event, 'component', comp)}
                                            draggable
                                            className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm cursor-move hover:shadow-md transition-shadow flex items-center gap-3"
                                        >
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold bg-gray-400`}>
                                                {comp.name[0]}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">{comp.name}</p>
                                                <p className="text-xs text-gray-500">{comp.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {/* Custom Component Form */}
                                    {showCustomCompForm ? (
                                        <div className="mt-3 p-3 bg-yellow-50 rounded border border-yellow-100 space-y-2">
                                            <input
                                                value={customCompName}
                                                onChange={e => setCustomCompName(e.target.value)}
                                                className="w-full px-2 py-1 text-sm border rounded"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Description"
                                                value={customCompDesc}
                                                onChange={e => setCustomCompDesc(e.target.value)}
                                                className="w-full px-2 py-1 text-sm border rounded"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Documentation URL (optional)"
                                                value={customCompDocUrl}
                                                onChange={e => setCustomCompDocUrl(e.target.value)}
                                                className="w-full px-2 py-1 text-sm border rounded"
                                            />
                                            <div className="flex gap-2">
                                                <button onClick={addCustomComponent} className="flex-1 bg-yellow-600 text-white text-xs py-1 rounded">Add</button>
                                                <button onClick={() => setShowCustomCompForm(false)} className="flex-1 bg-gray-300 text-gray-700 text-xs py-1 rounded">Cancel</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setShowCustomCompForm(true)}
                                            className="w-full mt-2 py-1.5 text-sm text-yellow-600 border border-yellow-200 rounded hover:bg-yellow-50 transition-colors"
                                        >
                                            + Add Custom Component
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* React Flow Canvas */}
                <div className="flex-1 relative bg-gray-50">
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onDragOver={onDragOver}
                        onDrop={onDrop}
                        onNodeDrag={onNodeDrag}
                        nodeTypes={nodeTypes}
                        edgeTypes={edgeTypes}
                        panOnScroll
                        selectionOnDrag
                        panOnDrag={!isEditMode || undefined} // Allow regular panning in view mode, selection in edit
                        nodesDraggable={isEditMode}
                        connectOnClick={isEditMode}
                        deleteKeyCode={isEditMode ? 'Backspace' : null}
                    >
                        <Background gap={20} size={1} />
                        <Controls />
                        <MiniMap style={{ height: 120 }} zoomable pannable />
                        {isEditMode && <Panel position="top-right" className="bg-white p-2 rounded shadow-md text-xs text-gray-500">Drag components & draw connections</Panel>}
                    </ReactFlow>
                </div>
            </div>

            {/* Connection Label Modal */}
            {showLabelModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-96">
                        <h3 className="text-lg font-bold mb-4">Add Connection Label</h3>
                        <input
                            type="text"
                            placeholder="e.g., API Call, Response"
                            value={edgeLabel}
                            onChange={(e) => setEdgeLabel(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
                            autoFocus
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') confirmConnection();
                                if (e.key === 'Escape') {
                                    setShowLabelModal(false);
                                    setPendingConnection(null);
                                }
                            }}
                        />
                        <div className="flex gap-3">
                            <button onClick={confirmConnection} className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium">Add Connection</button>
                            <button onClick={() => { setShowLabelModal(false); setPendingConnection(null); }} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function SwimlaneDiagram(props: SwimlaneDiagramProps) {
    return (
        <ReactFlowProvider>
            <SwimlaneDiagramContent {...props} />
        </ReactFlowProvider>
    );
}

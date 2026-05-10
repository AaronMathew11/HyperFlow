import { useCallback, useState, useMemo, useEffect } from 'react';
import ReactFlow, {
    addEdge,
    Connection,
    ConnectionLineType,
    Edge,
    Node,
    useNodesState,
    useEdgesState,
    Background,
    BackgroundVariant,
    MiniMap,
    MarkerType,
    ReactFlowProvider,
    useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import ComponentNode, { ComponentNodeData } from './flow/ComponentNode';
import TableNode, { TableNodeData } from './flow/TableNode';
import LaneHeader, { LaneHeaderData } from './flow/LaneHeader';
import CustomEditableEdge from './CustomEditableEdge';
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

const glassStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
    backdropFilter: 'blur(40px) saturate(150%)',
    WebkitBackdropFilter: 'blur(40px) saturate(150%)',
    border: '1px solid rgba(255, 255, 255, 0.6)',
    boxShadow: '0 8px 32px rgba(6, 6, 61, 0.1), 0 2px 8px rgba(6, 6, 61, 0.05)',
};

const floatingBarStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
    backdropFilter: 'blur(40px) saturate(200%)',
    WebkitBackdropFilter: 'blur(40px) saturate(200%)',
    borderColor: 'rgba(6, 6, 61, 0.08)',
    boxShadow: 'inset -1px -1px 0 0 rgba(255, 255, 255, 0.5), 0 8px 32px rgba(6, 6, 61, 0.08)',
};

interface SwimlaneDiagramProps {
    workflowId?: string;
    environmentId?: string;
    readOnly?: boolean;
    initialData?: { nodes: any[]; edges: any[] } | null;
    boardName?: string;
    onBack?: () => void;
    breadcrumbData?: {
        client?: { name: string };
        businessUnit?: { name: string };
    };
    onBreadcrumbNavigation?: (level: 'clients' | 'businessUnits' | 'environments') => void;
}

function SwimlaneDiagramContent({ workflowId, environmentId, readOnly = false, initialData, boardName, onBack, breadcrumbData, onBreadcrumbNavigation }: SwimlaneDiagramProps) {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [lanes, setLanes] = useState<Lane[]>(DEFAULT_LANES);
    const isEditMode = !readOnly;
    const [showLabelModal, setShowLabelModal] = useState(false);
    const [pendingConnection, setPendingConnection] = useState<Connection | null>(null);
    const [edgeLabel, setEdgeLabel] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<string | null>(null);

    const [showCustomLaneForm, setShowCustomLaneForm] = useState(false);
    const [customLaneName, setCustomLaneName] = useState('');

    const [showCustomCompForm, setShowCustomCompForm] = useState(false);
    const [customCompName, setCustomCompName] = useState('');
    const [customCompDesc, setCustomCompDesc] = useState('');
    const [customCompDocUrl, setCustomCompDocUrl] = useState('');

    const [draggedLaneIndex, setDraggedLaneIndex] = useState<number | null>(null);

    const nodeTypes = useMemo(() => ({ component: ComponentNode, table: TableNode, laneHeader: LaneHeader }), []);
    const edgeTypes = useMemo(() => ({ custom: CustomEditableEdge }), []);

    const availableColors = ['blue', 'purple', 'green', 'indigo', 'red', 'yellow', 'pink', 'teal'];

    const { toObject, zoomIn, zoomOut, fitView } = useReactFlow();

    useEffect(() => {
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
            const contentNodes = nds.filter(n => n.type !== 'laneHeader');
            const updatedComponents = contentNodes.map(node => {
                if (node.type === 'component') {
                    const laneIndex = Math.max(0, Math.floor(node.position.x / LANE_WIDTH));
                    const color = availableColors[laneIndex % availableColors.length];
                    return { ...node, data: { ...node.data, color } };
                }
                return node;
            });
            return [...laneNodes, ...updatedComponents];
        });
    }, [lanes, isEditMode, initialData, setNodes]);

    useEffect(() => {
        setNodes(nds => nds.map(node => {
            if (node.type === 'component' || node.type === 'table') {
                return { ...node, data: { ...node.data, isEditMode } };
            }
            return node;
        }));
    }, [isEditMode, setNodes, setEdges]);

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
                source: pendingConnection.source,
                target: pendingConnection.target,
            };
            setEdges((eds) => addEdge(newEdge, eds));
        }
        setShowLabelModal(false);
        setPendingConnection(null);
        setEdgeLabel('');
    }, [pendingConnection, edgeLabel, setEdges]);

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onNodeDrag = useCallback(
        (_event: React.MouseEvent, node: Node) => {
            if (node.type === 'component') {
                const laneIndex = Math.max(0, Math.floor(node.position.x / LANE_WIDTH));
                const color = availableColors[laneIndex % availableColors.length];
                if (node.data.color !== color) {
                    setNodes((nds) => nds.map((n) => {
                        if (n.id === node.id) return { ...n, data: { ...n.data, color } };
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

            if (typeof type === 'undefined' || !type || !componentData) return;

            const reactFlowBounds = document.querySelector('.react-flow')?.getBoundingClientRect();

            if (reactFlowBounds) {
                const position = {
                    x: event.clientX - reactFlowBounds.left - 128,
                    y: event.clientY - reactFlowBounds.top - 40,
                };

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
                            color,
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
                                        return { ...node, data: { ...node.data, fields: [...node.data.fields, { id: Date.now().toString(), name, type: fieldType }] } };
                                    }
                                    return node;
                                }));
                            },
                            onRemoveField: (nodeId: string, fieldId: string) => {
                                setNodes(nds => nds.map(node => {
                                    if (node.id === nodeId) {
                                        return { ...node, data: { ...node.data, fields: node.data.fields.filter((f: any) => f.id !== fieldId) } };
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
        setLanes(prev => [...prev, { id: `custom-${Date.now()}`, name: customLaneName, enabled: true }]);
        setCustomLaneName('');
        setShowCustomLaneForm(false);
    };

    const addCustomComponent = () => {
        if (!customCompName.trim()) return;
        PREDEFINED_COMPONENTS.push({
            id: `custom-${Date.now()}`,
            name: customCompName,
            description: customCompDesc || 'Custom Component',
            defaultLane: 'client-frontend',
            documentationUrl: customCompDocUrl,
            isCustom: true,
        });
        setCustomCompName('');
        setCustomCompDesc('');
        setCustomCompDocUrl('');
        setShowCustomCompForm(false);
    };

    const handleBack = () => {
        if (onBack) onBack();
        else window.history.back();
    };

    return (
        <div
            className="relative h-screen w-screen overflow-hidden"
            style={{
                background: 'radial-gradient(circle at 20% 30%, rgba(147, 147, 208, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(6, 6, 61, 0.02) 0%, transparent 50%), linear-gradient(135deg, #FAFAFA 0%, #FFFFFF 100%)',
            }}
        >
            {/* Glass Sidebar — overlaid on canvas, same pattern as workflow */}
            {isEditMode && !readOnly && (
                <div className="absolute top-0 left-0 z-20 pointer-events-none h-full">
                    <div className="pointer-events-auto">
                <aside
                    className="w-80 p-5 overflow-y-auto relative m-4 rounded-2xl shadow-2xl"
                    style={{
                        ...glassStyle,
                        height: 'calc(100vh - 32px)',
                    }}
                >
                    {/* Subtle top highlight */}
                    <div
                        className="absolute top-0 left-0 right-0 h-px pointer-events-none rounded-t-2xl"
                        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%)' }}
                    />

                    {/* Header */}
                    <div className="mb-8 relative z-10">
                        <h2 className="text-2xl font-semibold text-primary-900 mb-1 tracking-tight">Hypervision</h2>
                        <p className="text-sm text-primary-600 font-medium">Drag components to build your environment diagram</p>
                    </div>

                    {/* Environment badge */}
                    <div className="mb-5 relative z-10">
                        <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/80 border border-gray-200">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#6366F1' }}>
                                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                                </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-gray-800">Environment Diagram</p>
                                <p className="text-xs text-gray-500">Swimlane architecture view</p>
                            </div>
                        </div>
                    </div>

                    {/* Lanes Section */}
                    <div className="mb-6 relative z-10">
                        <h3 className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-3">Lanes</h3>
                        <div className="space-y-2">
                            {lanes.map((lane, index) => (
                                <div
                                    key={lane.id}
                                    draggable
                                    onDragStart={(e) => handleLaneDragStart(e, index)}
                                    onDragOver={handleLaneDragOver}
                                    onDrop={(e) => handleLaneDrop(e, index)}
                                    className={`flex items-center gap-2.5 p-3 bg-white/80 rounded-xl border cursor-grab active:cursor-grabbing transition-all duration-200 shadow-sm ${draggedLaneIndex === index ? 'opacity-50 border-primary-300 bg-primary-50/50' : 'border-primary-100 hover:shadow-md'}`}
                                >
                                    <span className="text-primary-400 select-none text-sm">⋮⋮</span>
                                    <input
                                        type="checkbox"
                                        checked={lane.enabled}
                                        onChange={() => setLanes(ls => ls.map(l => l.id === lane.id ? { ...l, enabled: !l.enabled } : l))}
                                        className="rounded text-primary-600 focus:ring-primary-500 flex-shrink-0"
                                    />
                                    <span className="text-sm font-medium text-primary-900 flex-1 select-none">{lane.name}</span>
                                </div>
                            ))}

                            {showCustomLaneForm ? (
                                <div className="mt-2 p-3 bg-primary-50/60 rounded-xl border border-primary-100 space-y-2">
                                    <input
                                        type="text"
                                        placeholder="Lane name"
                                        value={customLaneName}
                                        onChange={e => setCustomLaneName(e.target.value)}
                                        className="w-full px-3 py-1.5 text-sm border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400/30 bg-white/80"
                                        onKeyDown={e => e.key === 'Enter' && addCustomLane()}
                                    />
                                    <div className="flex gap-2">
                                        <button onClick={addCustomLane} className="flex-1 bg-primary-600 text-white text-xs py-1.5 rounded-lg hover:bg-primary-700 transition-colors">Add</button>
                                        <button onClick={() => setShowCustomLaneForm(false)} className="flex-1 bg-gray-200 text-gray-700 text-xs py-1.5 rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setShowCustomLaneForm(true)}
                                    className="w-full mt-1 py-2 text-xs font-medium text-primary-600 border border-dashed border-primary-200 rounded-xl hover:bg-primary-50 transition-colors"
                                >
                                    + Add Custom Lane
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Components Section */}
                    <div className="mb-6 relative z-10">
                        <h3 className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-3">Components</h3>
                        <div className="space-y-2">
                            {PREDEFINED_COMPONENTS.map(comp => (
                                <div
                                    key={comp.id}
                                    onDragStart={(event) => onDragStart(event, 'component', comp)}
                                    draggable
                                    className="group p-3.5 bg-white/80 rounded-xl cursor-move hover:shadow-md transition-all duration-200 shadow-sm border border-primary-100"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-primary-50 text-primary-600 group-hover:bg-primary-100 transition-colors flex-shrink-0 text-sm font-bold">
                                            {comp.name[0]}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-sm text-primary-900 truncate">{comp.name}</p>
                                            <p className="text-xs text-primary-600 truncate mt-0.5">{comp.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {showCustomCompForm ? (
                                <div className="mt-2 p-3 bg-amber-50/60 rounded-xl border border-amber-100 space-y-2">
                                    <input
                                        placeholder="Component name"
                                        value={customCompName}
                                        onChange={e => setCustomCompName(e.target.value)}
                                        className="w-full px-3 py-1.5 text-sm border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/30 bg-white/80"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Description"
                                        value={customCompDesc}
                                        onChange={e => setCustomCompDesc(e.target.value)}
                                        className="w-full px-3 py-1.5 text-sm border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/30 bg-white/80"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Documentation URL (optional)"
                                        value={customCompDocUrl}
                                        onChange={e => setCustomCompDocUrl(e.target.value)}
                                        className="w-full px-3 py-1.5 text-sm border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/30 bg-white/80"
                                    />
                                    <div className="flex gap-2">
                                        <button onClick={addCustomComponent} className="flex-1 bg-amber-500 text-white text-xs py-1.5 rounded-lg hover:bg-amber-600 transition-colors">Add</button>
                                        <button onClick={() => setShowCustomCompForm(false)} className="flex-1 bg-gray-200 text-gray-700 text-xs py-1.5 rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setShowCustomCompForm(true)}
                                    className="w-full mt-1 py-2 text-xs font-medium text-amber-600 border border-dashed border-amber-200 rounded-xl hover:bg-amber-50 transition-colors"
                                >
                                    + Add Custom Component
                                </button>
                            )}
                        </div>
                    </div>
                </aside>
                    </div>
                </div>
            )}

            {/* Canvas Area — full screen, same as workflow */}
            <div className="absolute inset-0">
                {/* Floating Breadcrumb — top left */}
                <div
                    className="absolute top-4 left-4 z-30 rounded-xl p-2 flex items-center gap-2 border shadow-lg"
                    style={floatingBarStyle}
                >
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => onBreadcrumbNavigation ? onBreadcrumbNavigation('clients') : handleBack()}
                            className="px-2 py-1 text-xs font-medium text-primary-600 hover:text-primary-800 hover:bg-primary-50 rounded transition-all duration-200"
                        >
                            Clients
                        </button>

                        {breadcrumbData?.client && (
                            <>
                                <svg className="h-3 w-3 text-primary-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                                <button
                                    onClick={() => onBreadcrumbNavigation ? onBreadcrumbNavigation('businessUnits') : handleBack()}
                                    className="px-2 py-1 text-xs font-medium text-primary-600 hover:text-primary-800 hover:bg-primary-50 rounded transition-all duration-200"
                                >
                                    {breadcrumbData.client.name}
                                </button>
                            </>
                        )}

                        {breadcrumbData?.businessUnit && (
                            <>
                                <svg className="h-3 w-3 text-primary-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                                <button
                                    onClick={() => onBreadcrumbNavigation ? onBreadcrumbNavigation('environments') : handleBack()}
                                    className="px-2 py-1 text-xs font-medium text-primary-600 hover:text-primary-800 hover:bg-primary-50 rounded transition-all duration-200"
                                >
                                    {breadcrumbData.businessUnit.name}
                                </button>
                            </>
                        )}

                        {boardName && (
                            <>
                                <svg className="h-3 w-3 text-primary-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                                <span className="px-2 py-1 text-xs font-semibold text-primary-900">{boardName}</span>
                            </>
                        )}
                    </div>
                </div>

                {/* Floating Action Bar — top right */}
                <div
                    className="absolute top-4 right-4 z-30 rounded-xl p-2 flex gap-2 items-center border shadow-lg"
                    style={floatingBarStyle}
                >
                    {lastSaved && (
                        <span className="text-xs text-primary-500 px-2">
                            Saved {lastSaved}
                        </span>
                    )}
                    {(workflowId || environmentId) && !readOnly && (
                        <>
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2 ${isSaving ? 'bg-primary-100 text-primary-400 cursor-not-allowed' : 'bg-primary-600 text-white hover:bg-primary-700'}`}
                                title="Save Diagram"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M3 5a2 2 0 012-2h8.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V15a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                                    <path d="M7 3v4h6V3H7z" />
                                    <path d="M7 11v6h6v-6H7z" />
                                </svg>
                                {isSaving ? 'Saving...' : 'Save'}
                            </button>
                        </>
                    )}
                </div>

                {/* React Flow Canvas */}
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
                    panOnDrag={!isEditMode || undefined}
                    nodesDraggable={isEditMode}
                    connectOnClick={isEditMode}
                    connectionLineType={ConnectionLineType.Step}
                    connectionLineStyle={{ stroke: '#4F46E5', strokeWidth: 2, strokeDasharray: '6 3' }}
                    deleteKeyCode={isEditMode ? ['Backspace', 'Delete'] : null}
                >
                    <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#E8E8ED" />
                    <MiniMap nodeColor="#06063D" maskColor="rgba(255, 255, 255, 0.8)" style={{ height: 120 }} zoomable pannable />
                </ReactFlow>

                {/* Zoom Controls — bottom right */}
                <div className="fixed bottom-4 right-4 z-30 flex flex-col gap-1">
                    <button
                        onClick={() => zoomIn()}
                        className="w-10 h-10 bg-white/90 hover:bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all duration-200"
                        title="Zoom In"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </button>
                    <button
                        onClick={() => zoomOut()}
                        className="w-10 h-10 bg-white/90 hover:bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all duration-200"
                        title="Zoom Out"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                        </svg>
                    </button>
                    <button
                        onClick={() => fitView()}
                        className="w-10 h-10 bg-white/90 hover:bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all duration-200"
                        title="Fit View"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Connection Label Modal */}
            {showLabelModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-96">
                        <h3 className="text-lg font-bold mb-4 text-primary-900">Add Connection Label</h3>
                        <input
                            type="text"
                            placeholder="e.g., API Call, Response"
                            value={edgeLabel}
                            onChange={(e) => setEdgeLabel(e.target.value)}
                            className="w-full px-4 py-2 border border-primary-200 rounded-lg mb-4 focus:ring-2 focus:ring-primary-400/30 focus:border-primary-400 outline-none text-sm"
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
                            <button onClick={confirmConnection} className="flex-1 bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors text-sm">Add Connection</button>
                            <button onClick={() => { setShowLabelModal(false); setPendingConnection(null); }} className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm">Cancel</button>
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

import { useCallback, useRef, useState, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  BackgroundVariant,
  Node,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { useFlowStore } from '../store/flowStore';
import { useBoardStore } from '../store/boardStore';
import { Board } from '../../../shared/types';
import { modules } from '../../../shared/data/modules';
import ModuleNode from '../../../shared/components/ModuleNode';
import ConditionNode from '../../../shared/components/ConditionNode';
import EndStatusNode from '../../../shared/components/EndStatusNode';
import ApiModuleNode from '../../../shared/components/ApiModuleNode';
import ApiGroupNode from '../../../shared/components/ApiGroupNode';
import StartNode from '../../../shared/components/StartNode';
import Toolbar from './Toolbar';
import SdkNotes from '../../../shared/components/SdkNotes';
import NoteNode from '../../../shared/components/NoteNode';
import SdkInputsNode from '../../../shared/components/SdkInputsNode';
import ContextMenu from '../../../shared/components/ContextMenu';

const nodeTypes = {
  moduleNode: ModuleNode,
  conditionNode: ConditionNode,
  endStatusNode: EndStatusNode,
  apiModuleNode: ApiModuleNode,
  apiGroupNode: ApiGroupNode,
  startNode: StartNode,
  noteNode: NoteNode,
  sdkInputsNode: SdkInputsNode,
};

interface FlowCanvasProps {
  board: Board;
  onBack: () => void;
  readOnly?: boolean;
  breadcrumbData?: {
    client?: { id: string; name: string };
    businessUnit?: { id: string; name: string };
  };
  onBreadcrumbNavigation?: (level: 'clients' | 'businessUnits' | 'workflows') => void;
  initialData?: {
    nodes?: any[];
    edges?: any[];
    flowInputs?: string;
    flowOutputs?: string;
  } | null;
}

function FlowCanvas({ board, onBack, readOnly = false, breadcrumbData, onBreadcrumbNavigation, initialData }: FlowCanvasProps) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode, addEdge, deleteNode } = useFlowStore();
  const { saveCurrentBoardData, setCurrentBoard, loadBoardSnapshot } = useBoardStore();
  const { project } = useReactFlow();
  const viewMode = useFlowStore((state) => state.viewMode);
  const flowType = useFlowStore((state) => state.flowType);
  const flowInputs = useFlowStore((state) => state.flowInputs);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; nodeId?: string; nodeType?: string } | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const lastSavedNodesRef = useRef<string>('');
  const lastSavedEdgesRef = useRef<string>('');

  // Load board data from database on mount
  useEffect(() => {
    const loadData = async () => {
      // If initialData is provided, use it directly (for public access like customer portal)
      if (initialData && !isLoaded) {
        useFlowStore.setState({
          nodes: initialData.nodes || [],
          edges: initialData.edges || [],
          flowInputs: Array.isArray(initialData.flowInputs) ? initialData.flowInputs : (initialData.flowInputs ? [initialData.flowInputs] : []),
          flowOutputs: Array.isArray(initialData.flowOutputs) ? initialData.flowOutputs : (initialData.flowOutputs ? [initialData.flowOutputs] : []),
        });
        setIsLoaded(true);
        return;
      }

      if (board && !isLoaded) {
        setCurrentBoard(board);

        // Load snapshot from database
        const snapshot = await loadBoardSnapshot(board.id);

        if (snapshot) {
          useFlowStore.setState({
            nodes: snapshot.nodes || [],
            edges: snapshot.edges || [],
            flowInputs: Array.isArray(snapshot.flowInputs) ? snapshot.flowInputs : (snapshot.flowInputs ? [snapshot.flowInputs] : []),
            flowOutputs: Array.isArray(snapshot.flowOutputs) ? snapshot.flowOutputs : (snapshot.flowOutputs ? [snapshot.flowOutputs] : []),
          });

          // Store initial state for change detection
          lastSavedNodesRef.current = JSON.stringify(snapshot.nodes || []);
          lastSavedEdgesRef.current = JSON.stringify(snapshot.edges || []);
        }

        setIsLoaded(true);
      }
    };

    loadData();
  }, [board, isLoaded, setCurrentBoard, loadBoardSnapshot, initialData]);

  // Keyboard shortcut for save (Ctrl/Cmd + S) - disabled in readOnly mode
  useEffect(() => {
    if (readOnly) return;

    const handleKeyDown = async (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        const { flowInputs, flowOutputs } = useFlowStore.getState();
        const success = await saveCurrentBoardData({
          nodes,
          edges,
          flowInputs: flowInputs.join(', '),
          flowOutputs: flowOutputs.join(', '),
        });

        if (success) {
          lastSavedNodesRef.current = JSON.stringify(nodes);
          lastSavedEdgesRef.current = JSON.stringify(edges);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nodes, edges, saveCurrentBoardData, readOnly]);

  // Auto-save functionality - save changes every 30 seconds if there are changes (disabled in readOnly mode)
  useEffect(() => {
    if (!isLoaded || readOnly) return;

    const saveInterval = setInterval(async () => {
      const currentNodes = JSON.stringify(nodes);
      const currentEdges = JSON.stringify(edges);

      // Only save if there are actual changes
      if (currentNodes !== lastSavedNodesRef.current ||
        currentEdges !== lastSavedEdgesRef.current) {
        const { flowInputs, flowOutputs } = useFlowStore.getState();
        const success = await saveCurrentBoardData({
          nodes,
          edges,
          flowInputs: flowInputs.join(', '),
          flowOutputs: flowOutputs.join(', '),
        });

        if (success) {
          lastSavedNodesRef.current = currentNodes;
          lastSavedEdgesRef.current = currentEdges;
        }
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(saveInterval);
  }, [nodes, edges, isLoaded, saveCurrentBoardData, readOnly]);

  // Warn user about unsaved changes before leaving
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const currentNodes = JSON.stringify(nodes);
      const currentEdges = JSON.stringify(edges);
      const hasUnsavedChanges =
        currentNodes !== lastSavedNodesRef.current ||
        currentEdges !== lastSavedEdgesRef.current;

      if (hasUnsavedChanges && isLoaded) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [nodes, edges, isLoaded]);

  // Dynamically manage SDK inputs node
  useEffect(() => {
    const startNode = nodes.find(node => node.type === 'startNode');
    const existingSdkInputsNode = nodes.find(node => node.type === 'sdkInputsNode');

    const shouldShowSdkInputs = viewMode === 'tech' && flowInputs && startNode;

    if (shouldShowSdkInputs && !existingSdkInputsNode) {
      // Add SDK inputs node
      const sdkInputsNode = {
        id: `sdk-inputs-${Date.now()}`,
        type: 'sdkInputsNode',
        position: {
          x: startNode.position.x + 250,
          y: startNode.position.y - 10,
        },
        data: {
          label: 'SDK Inputs',
        },
      };
      addNode(sdkInputsNode);
    } else if (!shouldShowSdkInputs && existingSdkInputsNode) {
      // Remove SDK inputs node
      deleteNode(existingSdkInputsNode.id);
    }
  }, [viewMode, flowInputs, nodes, addNode, deleteNode]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const handleContextMenu = useCallback((event: React.MouseEvent) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
    if (!reactFlowBounds) return;

    const clickX = event.clientX - reactFlowBounds.left;
    const clickY = event.clientY - reactFlowBounds.top;
    
    // Convert screen coordinates to flow coordinates
    const flowPosition = project({ x: clickX, y: clickY });
    
    // Check if click is inside any group
    const currentNodes = useFlowStore.getState().nodes;
    const groups = currentNodes.filter(n => n.type === 'apiGroupNode');
    
    let isInsideGroup = false;
    for (const group of groups) {
      const groupW = (group.style?.width as number) || 380;
      const groupH = (group.style?.height as number) || 240;
      
      if (
        flowPosition.x >= group.position.x &&
        flowPosition.y >= group.position.y &&
        flowPosition.x <= group.position.x + groupW &&
        flowPosition.y <= group.position.y + groupH
      ) {
        isInsideGroup = true;
        break;
      }
    }

    // Only show context menu if NOT inside a group
    if (!isInsideGroup) {
      setContextMenu({
        x: clickX,
        y: clickY,
      });
    }
  }, [project]);

  const handleNodeContextMenu = useCallback((event: React.MouseEvent, node: Node) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
    if (!reactFlowBounds) return;

    setContextMenu({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
      nodeId: node.id,
      nodeType: node.type,
    });
  }, []);

  const addNote = useCallback((x: number, y: number) => {
    // Convert screen coordinates to flow coordinates
    const position = project({ x, y });

    const newNote = {
      id: `note-${Date.now()}`,
      type: 'noteNode',
      position,
      data: {
        text: 'Click to edit note...',
      },
    };
    addNode(newNote);
  }, [addNode, project]);

  const handleAddNote = useCallback(() => {
    if (contextMenu) {
      addNote(contextMenu.x, contextMenu.y);
    }
  }, [contextMenu, addNote]);

  const handleDeleteNode = useCallback(() => {
    if (contextMenu?.nodeId) {
      // Check if trying to delete start node
      if (contextMenu.nodeType === 'startNode') {
        alert('Cannot delete Start node. The Start node is required for the flow.');
        setContextMenu(null);
        return;
      }
      deleteNode(contextMenu.nodeId);
      setContextMenu(null);
    }
  }, [contextMenu, deleteNode]);

  const handleUngroupAll = useCallback(() => {
    if (!contextMenu?.nodeId) return;
    
    const groupId = contextMenu.nodeId;
    const currentNodes = useFlowStore.getState().nodes;
    const groupNode = currentNodes.find(n => n.id === groupId);
    
    if (!groupNode) return;
    
    useFlowStore.setState({
      nodes: currentNodes.map((node) => {
        if (node.parentNode === groupId) {
          // Remove from group and adjust position
          return {
            ...node,
            parentNode: undefined,
            extent: undefined,
            position: {
              x: groupNode.position.x + node.position.x + 20, // Offset slightly
              y: groupNode.position.y + node.position.y + 20,
            },
          };
        }
        return node;
      }),
    });
  }, [contextMenu]);

  const handleUngroupNode = useCallback(() => {
    if (!contextMenu?.nodeId) return;
    
    const nodeId = contextMenu.nodeId;
    const currentNodes = useFlowStore.getState().nodes;
    const nodeToUngroup = currentNodes.find(n => n.id === nodeId);
    const groupNode = nodeToUngroup?.parentNode ? currentNodes.find(n => n.id === nodeToUngroup.parentNode) : null;
    
    if (!nodeToUngroup || !groupNode) return;
    
    useFlowStore.setState({
      nodes: currentNodes.map((node) => {
        if (node.id === nodeId) {
          // Remove this specific node from group and adjust position
          return {
            ...node,
            parentNode: undefined,
            extent: undefined,
            position: {
              x: groupNode.position.x + node.position.x + 20, // Offset slightly
              y: groupNode.position.y + node.position.y + 20,
            },
          };
        }
        return node;
      }),
    });
  }, [contextMenu]);

  const handlePaneClick = useCallback(() => {
    setContextMenu(null);
  }, []);

  // When a node is dragged and released, check if it landed inside a group or outside
  const onNodeDragStop = useCallback((_event: React.MouseEvent, draggedNode: Node) => {
    // Don't assign groups themselves as children
    if (draggedNode.type === 'apiGroupNode') return;

    const currentNodes = useFlowStore.getState().nodes;
    const groups = currentNodes.filter(n => n.type === 'apiGroupNode');
    
    // draggedNode.positionAbsolute contains the absolute canvas coordinates
    const nx = draggedNode.positionAbsolute?.x ?? draggedNode.position.x;
    const ny = draggedNode.positionAbsolute?.y ?? draggedNode.position.y;

    let targetGroup: Node | null = null;

    for (const group of groups) {
      const groupX = group.positionAbsolute?.x ?? group.position.x;
      const groupY = group.positionAbsolute?.y ?? group.position.y;
      const groupW = (group.style?.width as number) || 300;
      const groupH = (group.style?.height as number) || 200;

      // Check intersection
      if (
        nx > groupX &&
        ny > groupY &&
        nx < groupX + groupW &&
        ny < groupY + groupH
      ) {
        targetGroup = group;
        break;
      }
    }

    if (targetGroup) {
      if (draggedNode.parentNode !== targetGroup.id) {
        // Parent changed or node was newly parented
        const groupX = targetGroup.positionAbsolute?.x ?? targetGroup.position.x;
        const groupY = targetGroup.positionAbsolute?.y ?? targetGroup.position.y;
        
        useFlowStore.setState({
          nodes: currentNodes.map(n => {
            if (n.id === draggedNode.id) {
              const { extent, ...rest } = n;
              return {
                ...n,
                parentNode: group.id,
                extent: 'parent' as const,
                zIndex: 1,
                position: {
                  x: nx - groupX,
                  y: ny - groupY,
                },
              };
            }
            return n;
          }),
        });
      }
    } else {
      // Dropped outside of any group
      if (draggedNode.parentNode) {
        // It was inside a group, now un-parent it
        useFlowStore.setState({
          nodes: currentNodes.map(n => {
            if (n.id === draggedNode.id) {
              const { parentNode, extent, ...rest } = n;
              return {
                ...rest,
                position: {
                  x: nx,
                  y: ny,
                },
              };
            }
            return n;
          }),
        });
      }
    }
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type || !reactFlowBounds) {
        return;
      }

      // Use project to convert screen coordinates to flow coordinates
      // This accounts for zoom and pan transformations
      const position = project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      // Check if this is the first node (excluding start nodes)
      const existingNodes = nodes.filter(node => node.type !== 'startNode');
      const isFirstNode = existingNodes.length === 0;
      const existingStartNode = nodes.find(node => node.type === 'startNode');

      let startNodeId: string | null = null;

      if (type === 'condition') {
        // Prevent starting flow with a condition
        if (isFirstNode) {
          alert('Error: Cannot start a flow with a condition. Please add a module first.');
          return;
        }

        // Handle condition box
        const newNode = {
          id: `condition-${Date.now()}`,
          type: 'conditionNode',
          position,
          data: {
            label: 'Condition',
            condition: 'Enter condition...',
            color: '#F59E0B',
            icon: '◊',
          },
        };
        addNode(newNode);
      } else if (type.startsWith('end-status-')) {
        // Prevent starting flow with end status
        if (isFirstNode) {
          alert('Error: Cannot start a flow with an end status. Please add a module first.');
          return;
        }

        // Handle end status nodes
        const statusType = type.replace('end-status-', '') as 'auto-approved' | 'auto-declined' | 'needs-review';
        const statusConfig = {
          'auto-approved': { label: 'Auto Approved', icon: '', color: '#10B981' },
          'auto-declined': { label: 'Auto Declined', icon: '', color: '#EF4444' },
          'needs-review': { label: 'Needs Review', icon: '', color: '#F59E0B' },
        };

        const config = statusConfig[statusType];
        const newNode = {
          id: `${type}-${Date.now()}`,
          type: 'endStatusNode',
          position,
          data: {
            label: config.label,
            status: statusType,
            color: config.color,
            icon: config.icon,
            ...(statusType === 'auto-declined' && {
              resumeFrom: 'Fetch Geo IP details',
              reason: 'User outside India'
            }),
            ...(statusType === 'needs-review' && {
              reason: 'Manual review required'
            })
          },
        };
        addNode(newNode);
      } else if (type === 'api-group') {
        // Add a new group container node
        const newGroup = {
          id: `api-group-${Date.now()}`,
          type: 'apiGroupNode',
          position,
          style: { width: 500, height: 450 },
          data: {
            label: flowType === 'api' ? 'Product Group' : 'Module Group',
            color: '#6366F1',
          },
          zIndex: 0,
        };
        addNode(newGroup);
      } else if (type === 'api-documentation') {
        // Read the API metadata passed from the sidebar
        const apiDocRaw = event.dataTransfer.getData('application/apidoc');
        if (!apiDocRaw) return;
        const apiDoc = JSON.parse(apiDocRaw);

        // Check if drop position is inside a group — auto-assign as child
        const currentNodes = useFlowStore.getState().nodes;
        const groups = currentNodes.filter(n => n.type === 'apiGroupNode');
        let parentNodeId: string | undefined;
        let childPosition = position;
        for (const group of groups) {
          const gw = (group.style?.width as number) || 380;
          const gh = (group.style?.height as number) || 240;
          if (
            position.x > group.position.x &&
            position.y > group.position.y &&
            position.x < group.position.x + gw &&
            position.y < group.position.y + gh
          ) {
            parentNodeId = group.id;
            childPosition = {
              x: position.x - group.position.x,
              y: position.y - group.position.y,
            };
            break;
          }
        }

        const newNode: Node = {
          id: `api-doc-${apiDoc.id}-${Date.now()}`,
          type: 'apiModuleNode',
          position: childPosition,
          data: {
            title: apiDoc.name,
            endpoint: apiDoc.url,
            color: apiDoc.color,
            icon: '🌐',
            description: apiDoc.description,
            curlExample: apiDoc.curlExample,
            successResponse: apiDoc.successResponse,
            failureResponses: apiDoc.failureResponses,
            errorDetails: apiDoc.errorDetails,
            inputs: apiDoc.inputs,
            outputs: apiDoc.outputs,
          },
          ...(parentNodeId ? { parentNode: parentNodeId, extent: 'parent' as const, zIndex: 1 } : {}),
        };
        addNode(newNode);
      } else if (type === 'api-module') {
        // Create start node if this is the first module and no start node exists
        if (isFirstNode && !existingStartNode) {
          startNodeId = `start-${Date.now()}`;
          const startNode = {
            id: startNodeId,
            type: 'startNode',
            position: {
              x: position.x,
              y: position.y - 120,
            },
            data: {
              label: 'Start',
              color: '#22C55E',
              icon: '',
            },
          };
          addNode(startNode);
        }

        // Check if drop position is inside a group — auto-assign as child
        const currentNodes = useFlowStore.getState().nodes;
        const groups = currentNodes.filter(n => n.type === 'apiGroupNode');
        let parentNodeId: string | undefined;
        let childPosition = position;
        for (const group of groups) {
          const gw = (group.style?.width as number) || 380;
          const gh = (group.style?.height as number) || 240;
          if (
            position.x > group.position.x &&
            position.y > group.position.y &&
            position.x < group.position.x + gw &&
            position.y < group.position.y + gh
          ) {
            parentNodeId = group.id;
            childPosition = {
              x: position.x - group.position.x,
              y: position.y - group.position.y,
            };
            break;
          }
        }

        // Handle API module
        const newNode: Node = {
          id: `api-module-${Date.now()}`,
          type: 'apiModuleNode',
          position: childPosition,
          data: {
            title: 'Generic API',
            endpoint: 'https://api.example.com/endpoint',
            color: '#6366F1',
            icon: '🔗',
            isGeneric: true,
            description: '',
            method: 'POST',
            successNote: '',
            failureNote: '',
            curlExample: '',
            inputs: [],
            outputs: [],
          },
          ...(parentNodeId ? { parentNode: parentNodeId, extent: 'parent' as const, zIndex: 1 } : {}),
        };
        addNode(newNode);

        // Auto-connect to start node if this is the first module
        if (isFirstNode && startNodeId) {
          const edge = {
            id: `${startNodeId}-${newNode.id}`,
            source: startNodeId,
            target: newNode.id,
            type: 'default',
          };
          addEdge(edge);
        }
      } else {
        // Create start node if this is the first module and no start node exists
        if (isFirstNode && !existingStartNode) {
          startNodeId = `start-${Date.now()}`;
          const startNode = {
            id: startNodeId,
            type: 'startNode',
            position: {
              x: position.x,
              y: position.y - 120,
            },
            data: {
              label: 'Start',
              color: '#22C55E',
              icon: '',
            },
          };
          addNode(startNode);
        }

        // Handle module
        const module = modules.find((m) => m.id === type);
        if (!module) return;

        const newNode = {
          id: `${type}-${Date.now()}`,
          type: 'moduleNode',
          position,
          data: {
            label: module.label,
            moduleType: module.id,
            color: module.color,
            icon: module.icon,
            cspUrls: module.cspUrls,
            ipAddresses: module.ipAddresses,
          },
        };
        addNode(newNode);

        // Auto-connect to start node if this is the first module
        if (isFirstNode && startNodeId) {
          const edge = {
            id: `${startNodeId}-${newNode.id}`,
            source: startNodeId,
            target: newNode.id,
            type: 'default',
          };
          addEdge(edge);
        }
      }
    },
    [addNode, addEdge, nodes, project]
  );

  return (
    <div className="flex-1 h-full relative overflow-hidden" ref={reactFlowWrapper}>
      {/* Glass effect background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 20% 30%, rgba(147, 147, 208, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(6, 6, 61, 0.02) 0%, transparent 50%), linear-gradient(135deg, #FAFAFA 0%, #FFFFFF 100%)',
        }}
      />

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={readOnly ? undefined : onNodesChange}
        onEdgesChange={readOnly ? undefined : onEdgesChange}
        onConnect={readOnly ? undefined : onConnect}
        onDrop={readOnly ? undefined : onDrop}
        onDragOver={readOnly ? undefined : onDragOver}
        onNodeDragStop={readOnly ? undefined : onNodeDragStop}
        onContextMenu={readOnly ? undefined : handleContextMenu}
        onNodeContextMenu={readOnly ? undefined : handleNodeContextMenu}
        onPaneClick={handlePaneClick}
        nodeTypes={nodeTypes}
        fitView
        selectionOnDrag={!readOnly}
        panOnDrag={[1, 2]}
        panOnScroll
        zoomOnScroll
        zoomOnPinch
        zoomOnDoubleClick={false}
        deleteKeyCode={readOnly ? null : ['Delete', 'Backspace']}
        nodesDraggable={!readOnly}
        nodesConnectable={!readOnly}
        elementsSelectable={!readOnly}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#E8E8ED" />
        <Controls />
        <MiniMap nodeColor="#06063D" maskColor="rgba(255, 255, 255, 0.8)" />
        <Toolbar
          onBack={onBack}
          boardName={board.name}
          boardId={board.id}
          readOnly={readOnly}
          breadcrumbData={breadcrumbData}
          onBreadcrumbNavigation={onBreadcrumbNavigation}
        />
        {!readOnly && <SdkNotes />}
      </ReactFlow>

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          nodeId={contextMenu.nodeId}
          nodeType={contextMenu.nodeType}
          onClose={() => setContextMenu(null)}
          onAddNote={handleAddNote}
          onDeleteNode={handleDeleteNode}
          onUngroupAll={handleUngroupAll}
          onUngroupNode={handleUngroupNode}
          hasChildren={contextMenu.nodeId ? nodes.some(n => n.parentNode === contextMenu.nodeId) : false}
          isInGroup={contextMenu.nodeId ? !!nodes.find(n => n.id === contextMenu.nodeId)?.parentNode : false}
        />
      )}
    </div>
  );
}

interface CanvasProps {
  board: Board;
  onBack: () => void;
  readOnly?: boolean;
  breadcrumbData?: {
    client?: { id: string; name: string };
    businessUnit?: { id: string; name: string };
  };
  onBreadcrumbNavigation?: (level: 'clients' | 'businessUnits' | 'workflows') => void;
  initialData?: {
    nodes?: any[];
    edges?: any[];
    flowInputs?: string;
    flowOutputs?: string;
  } | null;
}

export default function Canvas({ board, onBack, readOnly = false, breadcrumbData, onBreadcrumbNavigation, initialData }: CanvasProps) {
  return (
    <ReactFlowProvider>
      <FlowCanvas
        board={board}
        onBack={onBack}
        readOnly={readOnly}
        breadcrumbData={breadcrumbData}
        onBreadcrumbNavigation={onBreadcrumbNavigation}
        initialData={initialData}
      />
    </ReactFlowProvider>
  );
}

import { useCallback, useRef, useState, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  BackgroundVariant,
  Node,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { useFlowStore } from '../store/flowStore';
import { useBoardStore } from '../store/boardStore';
import { Board } from '../types';
import { modules } from '../data/modules';
import ModuleNode from './ModuleNode';
import ConditionNode from './ConditionNode';
import EndStatusNode from './EndStatusNode';
import ApiModuleNode from './ApiModuleNode';
import StartNode from './StartNode';
import Toolbar from './Toolbar';
import SdkNotes from './SdkNotes';
import NoteNode from './NoteNode';
import ContextMenu from './ContextMenu';

const nodeTypes = {
  moduleNode: ModuleNode,
  conditionNode: ConditionNode,
  endStatusNode: EndStatusNode,
  apiModuleNode: ApiModuleNode,
  startNode: StartNode,
  noteNode: NoteNode,
};

interface FlowCanvasProps {
  board: Board;
  onBack: () => void;
}

function FlowCanvas({ board, onBack }: FlowCanvasProps) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode, addEdge, deleteNode } = useFlowStore();
  const { saveCurrentBoardData, setCurrentBoard, loadBoardSnapshot } = useBoardStore();
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; nodeId?: string; nodeType?: string } | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const lastSavedNodesRef = useRef<string>('');
  const lastSavedEdgesRef = useRef<string>('');

  // Load board data from database on mount
  useEffect(() => {
    const loadData = async () => {
      if (board && !isLoaded) {
        setCurrentBoard(board);

        // Load snapshot from database
        const snapshot = await loadBoardSnapshot(board.id);

        if (snapshot) {
          useFlowStore.setState({
            nodes: snapshot.nodes || [],
            edges: snapshot.edges || [],
            flowInputs: snapshot.flowInputs || '',
            flowOutputs: snapshot.flowOutputs || '',
          });

          // Store initial state for change detection
          lastSavedNodesRef.current = JSON.stringify(snapshot.nodes || []);
          lastSavedEdgesRef.current = JSON.stringify(snapshot.edges || []);
        }

        setIsLoaded(true);
      }
    };

    loadData();
  }, [board, isLoaded, setCurrentBoard, loadBoardSnapshot]);

  // Keyboard shortcut for save (Ctrl/Cmd + S)
  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        const { flowInputs, flowOutputs } = useFlowStore.getState();
        const success = await saveCurrentBoardData({
          nodes,
          edges,
          flowInputs,
          flowOutputs,
        });

        if (success) {
          lastSavedNodesRef.current = JSON.stringify(nodes);
          lastSavedEdgesRef.current = JSON.stringify(edges);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nodes, edges, saveCurrentBoardData]);

  // Auto-save functionality - save changes every 30 seconds if there are changes
  useEffect(() => {
    if (!isLoaded) return;

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
          flowInputs,
          flowOutputs,
        });

        if (success) {
          lastSavedNodesRef.current = currentNodes;
          lastSavedEdgesRef.current = currentEdges;
        }
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(saveInterval);
  }, [nodes, edges, isLoaded, saveCurrentBoardData]);

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

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const handleContextMenu = useCallback((event: React.MouseEvent) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
    if (!reactFlowBounds) return;

    setContextMenu({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
  }, []);

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
    const newNote = {
      id: `note-${Date.now()}`,
      type: 'noteNode',
      position: { x: x - 100, y: y - 50 },
      data: {
        text: 'Click to edit note...',
      },
    };
    addNode(newNote);
  }, [addNode]);

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

  const handlePaneClick = useCallback(() => {
    setContextMenu(null);
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type || !reactFlowBounds) {
        return;
      }

      const position = {
        x: event.clientX - reactFlowBounds.left - 100,
        y: event.clientY - reactFlowBounds.top - 50,
      };

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
          },
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

        // Handle API module
        const newNode = {
          id: `api-module-${Date.now()}`,
          type: 'apiModuleNode',
          position,
          data: {
            title: 'API Module',
            endpoint: 'https://api.example.com/endpoint',
            color: '#6366F1',
            icon: '🔗',
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
    [addNode, addEdge, nodes]
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
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onContextMenu={handleContextMenu}
        onNodeContextMenu={handleNodeContextMenu}
        onPaneClick={handlePaneClick}
        nodeTypes={nodeTypes}
        fitView
        selectionOnDrag
        panOnDrag={[1, 2]}
        panOnScroll
        zoomOnScroll
        zoomOnPinch
        zoomOnDoubleClick={false}
        deleteKeyCode={"Delete"}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#E8E8ED" />
        <Controls />
        <MiniMap nodeColor="#06063D" maskColor="rgba(255, 255, 255, 0.8)" />
        <Toolbar onBack={onBack} boardName={board.name} />
        <SdkNotes />
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
        />
      )}
    </div>
  );
}

interface CanvasProps {
  board: Board;
  onBack: () => void;
}

export default function Canvas({ board, onBack }: CanvasProps) {
  return (
    <ReactFlowProvider>
      <FlowCanvas board={board} onBack={onBack} />
    </ReactFlowProvider>
  );
}

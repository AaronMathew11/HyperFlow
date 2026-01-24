import { useCallback, useRef, useState } from 'react';
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

function FlowCanvas() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode, addEdge, deleteNode } = useFlowStore();
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; nodeId?: string; nodeType?: string } | null>(null);

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
        <Toolbar />
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

export default function Canvas() {
  return (
    <ReactFlowProvider>
      <FlowCanvas />
    </ReactFlowProvider>
  );
}

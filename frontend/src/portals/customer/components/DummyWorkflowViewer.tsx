import React, { useCallback, useMemo } from 'react';
import ReactFlow, {
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  BackgroundVariant,
  addEdge,
  Connection,
  Position,
  ReactFlowProvider,
  NodeProps,
  Handle,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Workflow } from '../../../shared/types';

// Simple node components for customer portal (without store dependencies)
const SimpleStartNode = ({ data }: NodeProps) => (
  <div className="px-6 py-4 rounded-full min-w-[120px] text-center border-2 bg-green-500 text-white shadow-md">
    <div className="font-semibold text-lg">{data.label}</div>
    <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
  </div>
);

const SimpleModuleNode = ({ data }: NodeProps) => (
  <div className="p-4 rounded-xl min-w-[200px] border-2 border-blue-300 bg-white shadow-md">
    <Handle type="target" position={Position.Top} className="w-3 h-3" />
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
        <div className="w-6 h-6 bg-blue-500 rounded"></div>
      </div>
      <div>
        <div className="font-semibold text-gray-900">{data.label}</div>
        <div className="text-sm text-gray-600">{data.moduleType}</div>
      </div>
    </div>
    <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
  </div>
);

const SimpleConditionNode = ({ data }: NodeProps) => (
  <div className="p-4 rounded-lg min-w-[180px] border-2 border-yellow-400 bg-yellow-50 shadow-md">
    <Handle type="target" position={Position.Top} className="w-3 h-3" />
    <div className="text-center">
      <div className="font-semibold text-gray-900 mb-2">{data.label}</div>
      <div className="text-sm text-gray-600">{data.condition}</div>
    </div>
    <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
  </div>
);

const SimpleEndStatusNode = ({ data }: NodeProps) => (
  <div className={`p-4 rounded-xl min-w-[150px] border-2 shadow-md text-center ${
    data.status === 'auto-approved' ? 'border-green-400 bg-green-50' :
    data.status === 'auto-declined' ? 'border-red-400 bg-red-50' :
    'border-yellow-400 bg-yellow-50'
  }`}>
    <Handle type="target" position={Position.Top} className="w-3 h-3" />
    <div className="font-semibold text-gray-900">{data.label}</div>
  </div>
);

interface DummyWorkflowViewerProps {
  workflow: Workflow;
}

function DummyWorkflowViewerContent({ workflow }: DummyWorkflowViewerProps) {
  // Generate different dummy flows based on workflow ID
  const generateWorkflowNodes = (workflowId: string): { nodes: Node[], edges: Edge[] } => {
    switch (workflowId) {
      case 'wf-1': // KYC Document Verification
        return {
          nodes: [
            {
              id: '1',
              type: 'startNode',
              position: { x: 400, y: 50 },
              data: { 
                label: 'Start KYC', 
                color: '#22C55E'
              },
            },
            {
              id: '2',
              type: 'moduleNode',
              position: { x: 400, y: 150 },
              data: { 
                label: 'Document Upload',
                moduleType: 'document-verification',
                color: '#3B82F6'
              },
            },
            {
              id: '3',
              type: 'moduleNode',
              position: { x: 400, y: 250 },
              data: { 
                label: 'Face Verification',
                moduleType: 'face-verification',
                color: '#8B5CF6'
              },
            },
            {
              id: '4',
              type: 'conditionNode',
              position: { x: 400, y: 350 },
              data: { 
                label: 'Document Valid?',
                condition: 'document.status === "verified"',
                color: '#F59E0B'
              },
            },
            {
              id: '5',
              type: 'endStatusNode',
              position: { x: 250, y: 450 },
              data: { 
                label: 'Verification Complete',
                status: 'auto-approved',
                color: '#10B981'
              },
            },
            {
              id: '6',
              type: 'endStatusNode',
              position: { x: 550, y: 450 },
              data: { 
                label: 'Verification Failed',
                status: 'auto-declined',
                color: '#EF4444'
              },
            },
          ],
          edges: [
            { id: 'e1-2', source: '1', target: '2', animated: true },
            { id: 'e2-3', source: '2', target: '3', animated: true },
            { id: 'e3-4', source: '3', target: '4', animated: true },
            { id: 'e4-5', source: '4', target: '5', label: 'Valid', animated: true },
            { id: 'e4-6', source: '4', target: '6', label: 'Invalid', animated: true },
          ],
        };

      case 'wf-2': // Onboarding Flow
        return {
          nodes: [
            {
              id: '1',
              type: 'startNode',
              position: { x: 400, y: 50 },
              data: { 
                label: 'Start Onboarding',
                color: '#22C55E'
              },
            },
            {
              id: '2',
              type: 'moduleNode',
              position: { x: 400, y: 150 },
              data: { 
                label: 'Basic Details',
                moduleType: 'data-collection',
                color: '#06B6D4'
              },
            },
            {
              id: '3',
              type: 'conditionNode',
              position: { x: 400, y: 250 },
              data: { 
                label: 'Risk Assessment',
                condition: 'riskScore > 0.7',
                color: '#F59E0B'
              },
            },
            {
              id: '4',
              type: 'moduleNode',
              position: { x: 200, y: 350 },
              data: { 
                label: 'Additional Verification',
                moduleType: 'enhanced-verification',
                color: '#DC2626'
              },
            },
            {
              id: '5',
              type: 'moduleNode',
              position: { x: 600, y: 350 },
              data: { 
                label: 'Standard Process',
                moduleType: 'basic-verification',
                color: '#059669'
              },
            },
            {
              id: '6',
              type: 'endStatusNode',
              position: { x: 400, y: 450 },
              data: { 
                label: 'Account Created',
                status: 'auto-approved',
                color: '#10B981'
              },
            },
          ],
          edges: [
            { id: 'e1-2', source: '1', target: '2', animated: true },
            { id: 'e2-3', source: '2', target: '3', animated: true },
            { id: 'e3-4', source: '3', target: '4', label: 'High Risk', animated: true },
            { id: 'e3-5', source: '3', target: '5', label: 'Low Risk', animated: true },
            { id: 'e4-6', source: '4', target: '6', animated: true },
            { id: 'e5-6', source: '5', target: '6', animated: true },
          ],
        };

      case 'wf-3': // Risk Assessment Workflow
        return {
          nodes: [
            {
              id: '1',
              type: 'startNode',
              position: { x: 400, y: 50 },
              data: { 
                label: 'Start Assessment',
                color: '#22C55E'
              },
            },
            {
              id: '2',
              type: 'moduleNode',
              position: { x: 200, y: 150 },
              data: { 
                label: 'Credit Check',
                moduleType: 'credit-verification',
                color: '#7C3AED'
              },
            },
            {
              id: '3',
              type: 'moduleNode',
              position: { x: 600, y: 150 },
              data: { 
                label: 'Background Verification',
                moduleType: 'background-check',
                color: '#DB2777'
              },
            },
            {
              id: '4',
              type: 'moduleNode',
              position: { x: 400, y: 250 },
              data: { 
                label: 'Calculate Score',
                moduleType: 'risk-scoring',
                color: '#F97316'
              },
            },
            {
              id: '5',
              type: 'endStatusNode',
              position: { x: 400, y: 350 },
              data: { 
                label: 'Risk Score Generated',
                status: 'auto-approved',
                color: '#10B981'
              },
            },
          ],
          edges: [
            { id: 'e1-2', source: '1', target: '2', animated: true },
            { id: 'e1-3', source: '1', target: '3', animated: true },
            { id: 'e2-4', source: '2', target: '4', animated: true },
            { id: 'e3-4', source: '3', target: '4', animated: true },
            { id: 'e4-5', source: '4', target: '5', animated: true },
          ],
        };

      default:
        return {
          nodes: [
            {
              id: '1',
              type: 'startNode',
              position: { x: 400, y: 50 },
              data: { 
                label: 'Default Start',
                color: '#22C55E'
              },
            },
            {
              id: '2',
              type: 'moduleNode',
              position: { x: 400, y: 150 },
              data: { 
                label: 'Default Module',
                moduleType: 'generic-module',
                color: '#6B7280'
              },
            },
            {
              id: '3',
              type: 'endStatusNode',
              position: { x: 400, y: 250 },
              data: { 
                label: 'Complete',
                status: 'auto-approved',
                color: '#10B981'
              },
            },
          ],
          edges: [
            { id: 'e1-2', source: '1', target: '2', animated: true },
            { id: 'e2-3', source: '2', target: '3', animated: true },
          ],
        };
    }
  };

  const nodeTypes = useMemo(() => ({
    startNode: SimpleStartNode,
    moduleNode: SimpleModuleNode,
    conditionNode: SimpleConditionNode,
    endStatusNode: SimpleEndStatusNode,
  }), []);
  
  const { nodes: initialNodes, edges: initialEdges } = generateWorkflowNodes(workflow.id);
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  if (!nodes.length) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No workflow nodes to display</p>
          <p className="text-sm text-gray-500 mt-2">Workflow ID: {workflow.id}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full" style={{ height: '100%', width: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.2}
        maxZoom={2}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
      >
        <Controls showInteractive={false} />
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
      </ReactFlow>
    </div>
  );
}

export default function DummyWorkflowViewer(props: DummyWorkflowViewerProps) {
  return (
    <ReactFlowProvider>
      <DummyWorkflowViewerContent {...props} />
    </ReactFlowProvider>
  );
}
import { create } from 'zustand';
import { Node, Edge, addEdge, Connection, applyNodeChanges, applyEdgeChanges, NodeChange, EdgeChange } from 'reactflow';

interface FlowState {
  nodes: Node[];
  edges: Edge[];
  viewMode: 'business' | 'tech';
  flowInputs: string;
  flowOutputs: string;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  addNode: (node: Node) => void;
  addEdge: (edge: Edge) => void;
  deleteNode: (nodeId: string) => void;
  deleteEdge: (edgeId: string) => void;
  clearFlow: () => void;
  toggleViewMode: () => void;
  setFlowInputs: (inputs: string) => void;
  setFlowOutputs: (outputs: string) => void;
}

export const useFlowStore = create<FlowState>((set, get) => ({
  nodes: [],
  edges: [],
  viewMode: 'business',
  flowInputs: '',
  flowOutputs: '',
  onNodesChange: (changes) => {
    const currentNodes = get().nodes;
    const currentEdges = get().edges;
    
    // Find nodes that are being removed
    const removedNodeIds = changes
      .filter((change) => change.type === 'remove')
      .map((change) => change.id)
      .filter((id): id is string => id !== undefined);
    
    // Update nodes
    const updatedNodes = applyNodeChanges(changes, currentNodes);
    
    // Remove edges connected to deleted nodes
    const updatedEdges = removedNodeIds.length > 0
      ? currentEdges.filter(
          (edge) => !removedNodeIds.includes(edge.source) && !removedNodeIds.includes(edge.target)
        )
      : currentEdges;
    
    set({
      nodes: updatedNodes,
      edges: updatedEdges,
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },
  addEdge: (edge) => {
    set({
      edges: [...get().edges, edge],
    });
  },
  deleteNode: (nodeId: string) => {
    set({
      nodes: get().nodes.filter(node => node.id !== nodeId),
      edges: get().edges.filter(edge => edge.source !== nodeId && edge.target !== nodeId),
    });
  },
  deleteEdge: (edgeId: string) => {
    set({
      edges: get().edges.filter(edge => edge.id !== edgeId),
    });
  },
  clearFlow: () => {
    set({
      nodes: [],
      edges: [],
    });
  },
  toggleViewMode: () => {
    set({
      viewMode: get().viewMode === 'business' ? 'tech' : 'business',
    });
  },
  setFlowInputs: (inputs: string) => {
    set({ flowInputs: inputs });
  },
  setFlowOutputs: (outputs: string) => {
    set({ flowOutputs: outputs });
  },
}));

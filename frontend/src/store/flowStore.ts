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
    
    // Filter out removal changes for start nodes
    const filteredChanges = changes.filter((change) => {
      if (change.type === 'remove') {
        const nodeToDelete = currentNodes.find(node => node.id === change.id);
        // Prevent deletion of start nodes
        if (nodeToDelete?.type === 'startNode') {
          return false;
        }
      }
      return true;
    });
    
    // Find nodes that are being removed (after filtering)
    const removedNodeIds = filteredChanges
      .filter((change) => change.type === 'remove')
      .map((change) => change.id)
      .filter((id): id is string => id !== undefined);
    
    // Update nodes with filtered changes
    const updatedNodes = applyNodeChanges(filteredChanges, currentNodes);
    
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
    const currentNodes = get().nodes;
    const currentEdges = get().edges;
    
    // Filter out removal changes for edges connected to start nodes
    const filteredChanges = changes.filter((change) => {
      if (change.type === 'remove') {
        const edgeToDelete = currentEdges.find(edge => edge.id === change.id);
        if (edgeToDelete) {
          // Check if the edge is connected to a start node
          const sourceNode = currentNodes.find(node => node.id === edgeToDelete.source);
          if (sourceNode?.type === 'startNode') {
            return false; // Prevent deletion of edges from start nodes
          }
        }
      }
      return true;
    });
    
    set({
      edges: applyEdgeChanges(filteredChanges, currentEdges),
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
    const nodeToDelete = get().nodes.find(node => node.id === nodeId);
    
    // Prevent deletion of start nodes
    if (nodeToDelete?.type === 'startNode') {
      return;
    }
    
    set({
      nodes: get().nodes.filter(node => node.id !== nodeId),
      edges: get().edges.filter(edge => edge.source !== nodeId && edge.target !== nodeId),
    });
  },
  deleteEdge: (edgeId: string) => {
    const currentNodes = get().nodes;
    const edgeToDelete = get().edges.find(edge => edge.id === edgeId);
    
    // Prevent deletion of edges connected to start nodes
    if (edgeToDelete) {
      const sourceNode = currentNodes.find(node => node.id === edgeToDelete.source);
      if (sourceNode?.type === 'startNode') {
        return; // Prevent deletion of edges from start nodes
      }
    }
    
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

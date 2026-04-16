import { create } from 'zustand';
import { Node, Edge, addEdge, Connection, applyNodeChanges, applyEdgeChanges, NodeChange, EdgeChange, updateEdge } from 'reactflow';

interface FlowState {
  nodes: Node[];
  edges: Edge[];
  viewMode: 'business' | 'tech';
  flowType: 'sdk' | 'api';
  sdkMode: 'general' | 'advanced';
  flowInputs: string[];
  flowOutputs: string[];
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  onEdgeUpdate: (oldEdge: Edge, newConnection: Connection) => void;
  addNode: (node: Node) => void;
  addEdge: (edge: Edge) => void;
  deleteNode: (nodeId: string) => void;
  deleteEdge: (edgeId: string) => void;
  clearFlow: () => void;
  toggleViewMode: () => void;
  setFlowType: (type: 'sdk' | 'api') => void;
  setSdkMode: (mode: 'general' | 'advanced') => void;
  setFlowInputs: (inputs: string[]) => void;
  setFlowOutputs: (outputs: string[]) => void;
  addFlowInput: (input: string) => void;
  removeFlowInput: (index: number) => void;
  updateFlowInput: (index: number, input: string) => void;
  addFlowOutput: (output: string) => void;
  removeFlowOutput: (index: number) => void;
  updateFlowOutput: (index: number, output: string) => void;
}

export const useFlowStore = create<FlowState>((set, get) => ({
  nodes: [],
  edges: [],
  viewMode: 'business',
  flowType: 'sdk',
  sdkMode: 'general',
  flowInputs: [],
  flowOutputs: [],
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
    let edgeProps: any = { ...connection };

    if (connection.sourceHandle === 'success') {
      edgeProps = {
        ...edgeProps,
        style: { stroke: '#10B981', strokeWidth: 2 },
        label: 'True',
        labelStyle: { fill: '#10B981', fontWeight: 700, fontSize: 12 },
        labelBgStyle: { fill: '#ffffff', color: '#fff', fillOpacity: 0.8 },
      };
    } else if (connection.sourceHandle === 'failure') {
      edgeProps = {
        ...edgeProps,
        style: { stroke: '#EF4444', strokeWidth: 2 },
        label: 'False',
        labelStyle: { fill: '#EF4444', fontWeight: 700, fontSize: 12 },
        labelBgStyle: { fill: '#ffffff', color: '#fff', fillOpacity: 0.8 },
      };
    }

    set({
      edges: addEdge(edgeProps, get().edges),
    });
  },
  onEdgeUpdate: (oldEdge, newConnection) => {
    set({
      edges: updateEdge(oldEdge, newConnection, get().edges),
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
  setFlowType: (type: 'sdk' | 'api') => {
    // Reset the canvas when switching between SDK and API — nodes are different across types
    if (get().flowType !== type) {
      set({ flowType: type, nodes: [], edges: [] });
    }
  },
  setSdkMode: (mode: 'general' | 'advanced') => {
    set({ sdkMode: mode });
  },
  setFlowInputs: (inputs: string[]) => {
    set({ flowInputs: inputs });
  },
  setFlowOutputs: (outputs: string[]) => {
    set({ flowOutputs: outputs });
  },
  addFlowInput: (input: string) => {
    set((state) => ({ flowInputs: [...state.flowInputs, input] }));
  },
  removeFlowInput: (index: number) => {
    set((state) => ({
      flowInputs: state.flowInputs.filter((_, i) => i !== index)
    }));
  },
  updateFlowInput: (index: number, input: string) => {
    set((state) => ({
      flowInputs: state.flowInputs.map((item, i) => i === index ? input : item)
    }));
  },
  addFlowOutput: (output: string) => {
    set((state) => ({ flowOutputs: [...state.flowOutputs, output] }));
  },
  removeFlowOutput: (index: number) => {
    set((state) => ({
      flowOutputs: state.flowOutputs.filter((_, i) => i !== index)
    }));
  },
  updateFlowOutput: (index: number, output: string) => {
    set((state) => ({
      flowOutputs: state.flowOutputs.map((item, i) => i === index ? output : item)
    }));
  },
}));

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
    set({
      nodes: applyNodeChanges(changes, get().nodes),
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

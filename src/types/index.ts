export interface ModuleType {
  id: string;
  label: string;
  description: string;
  color: string;
  icon: string;
}

export interface FlowNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    label: string;
    moduleType: string;
    color: string;
    icon: string;
  };
}

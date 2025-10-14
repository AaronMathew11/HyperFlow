export interface ModuleType {
  id: string;
  label: string;
  description: string;
  color: string;
  icon: string;
  cspUrls?: string[];
  ipAddresses?: string[];
}

export interface FlowNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    label?: string;
    title?: string;
    endpoint?: string;
    moduleType?: string;
    condition?: string;
    status?: 'auto-approved' | 'auto-declined' | 'needs-review';
    color: string;
    icon: string;
    // Technical info
    cspUrls?: string[];
    ipAddresses?: string[];
  };
}

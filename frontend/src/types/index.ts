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

export interface Board {
  id: string;
  name: string;
  description?: string;
  user_id: string;
  flow_data: {
    nodes: any[];
    edges: any[];
    flowInputs?: string;
    flowOutputs?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      boards: {
        Row: Board;
        Insert: Omit<Board, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Board, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
}

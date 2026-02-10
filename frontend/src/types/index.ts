export interface ApiInfo {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  inputVariables: string[];
  outputVariables: string[];
  successCriteria: string;
  failureCriteria?: string;
  documentationUrl: string;
  curlExample: string;
  nextApiRecommendations: string[];
}

export interface ModuleType {
  id: string;
  label: string;
  description: string;
  color: string;
  icon: string;
  cspUrls?: string[];
  ipAddresses?: string[];
  apiInfo?: ApiInfo;
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
    resumeFrom?: string;
    reason?: string;
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

// ============ NEW HIERARCHY TYPES ============

export interface Client {
  id: string;
  name: string;
  description?: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

export interface BusinessUnit {
  id: string;
  name: string;
  description?: string;
  client_id: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  business_unit_id: string;
  owner_id: string;
  flow_data: {
    nodes: any[];
    edges: any[];
    flowInputs?: string;
    flowOutputs?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface BUPermission {
  id: string;
  business_unit_id: string;
  user_id: string;
  role: 'viewer' | 'editor';
  created_at: string;
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

export interface AccessLink {
  id: string;
  board_id: string;
  role: 'viewer' | 'editor';
  expires_at: string | null;
  created_at: string;
}

export interface CreateLinkResponse {
  linkId: string;
  password: string;
  expiresAt: string | null;
  shareUrl: string;
}

export interface PublicBoardData {
  board: Board;
  role: 'viewer' | 'editor';
}

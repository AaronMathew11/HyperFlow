import React, { useCallback, useMemo } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  BackgroundVariant,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Environment } from '../../../shared/types';

// Custom node component for swimlane items
const SwimlaneNode = ({ data }: { data: any }) => {
  const { title, subtitle, isInteractive, swimlane, onClick, isHeader } = data;

  const swimlaneColors: Record<string, string> = {
    frontend: '#6366F1', // Primary blue
    sdk: '#10B981',     // Green
    backend: '#8B5CF6', // Purple  
    hyperverge: '#F59E0B' // Amber
  };

  if (isHeader) {
    return (
      <div
        className="w-36 h-16 rounded-xl p-3 text-center border border-gray-200 shadow-sm"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
          backdropFilter: 'blur(20px) saturate(150%)',
          WebkitBackdropFilter: 'blur(20px) saturate(150%)',
        }}
      >
        <div className="flex items-center justify-center mb-1">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: swimlaneColors[swimlane] }}
          />
        </div>
        <p className="text-xs font-semibold text-gray-800 leading-tight">{title}</p>
        {subtitle && (
          <p className="text-xs text-gray-500 leading-tight">{subtitle}</p>
        )}
      </div>
    );
  }

  return (
    <div
      className={`w-36 h-20 rounded-xl p-3 text-center transition-all duration-200 border shadow-sm ${
        isInteractive 
          ? 'cursor-pointer hover:shadow-md hover:scale-105 bg-white/90 border-gray-200' 
          : 'bg-white/50 border-gray-100 opacity-60'
      }`}
      style={{
        background: isInteractive 
          ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%)',
        backdropFilter: 'blur(20px) saturate(150%)',
        WebkitBackdropFilter: 'blur(20px) saturate(150%)',
      }}
      onClick={isInteractive ? onClick : undefined}
    >
      <div 
        className={`w-6 h-6 rounded-lg mx-auto mb-1.5 flex items-center justify-center text-white`}
        style={{ 
          backgroundColor: isInteractive ? swimlaneColors[swimlane] : '#9CA3AF'
        }}
      >
        {data.icon}
      </div>
      <p className={`text-xs font-medium leading-tight ${
        isInteractive ? 'text-gray-800' : 'text-gray-400'
      }`}>
        {title}
      </p>
      {subtitle && (
        <p className={`text-xs leading-tight ${
          isInteractive ? 'text-gray-500' : 'text-gray-400'
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

interface InteractiveSwimlaneProps {
  environments: Environment[];
  environmentFormData?: Record<string, any>; // Form data from environment configurations
}

export default function InteractiveSwimlane({ environments, environmentFormData }: InteractiveSwimlaneProps) {
  // Determine which components should be interactive based on environment configs
  const getInteractiveComponents = () => {
    const interactive = {
      resultsApi: false,
      outputsApi: false,
      webhooks: false,
      sdk: false,
      apiIntegration: false
    };

    // Check environment form data to determine what's enabled
    environments.forEach(env => {
      const envData = environmentFormData?.[env.id];
      if (envData) {
        if (envData.usesResultsApi) interactive.resultsApi = true;
        if (envData.usesOutputsApi) interactive.outputsApi = true;
        if (envData.reliesOnWebhooks) interactive.webhooks = true;
        if (envData.integrationType === 'sdk') interactive.sdk = true;
        if (envData.integrationType === 'api') interactive.apiIntegration = true;
      }
    });

    return interactive;
  };

  const interactive = getInteractiveComponents();

  const nodeTypes = useMemo(() => ({ swimlaneNode: SwimlaneNode }), []);

  // Define nodes based on your swimlane diagram
  const initialNodes: Node[] = [
    // Swimlane Headers
    {
      id: 'header-1',
      type: 'swimlaneNode',
      position: { x: 0, y: 0 },
      data: {
        title: 'CLIENT FRONTEND',
        subtitle: '',
        isHeader: true,
        swimlane: 'frontend'
      },
      draggable: false,
      selectable: false
    },
    {
      id: 'header-2',
      type: 'swimlaneNode',
      position: { x: 200, y: 0 },
      data: {
        title: 'CLIENT BACKEND',
        subtitle: '',
        isHeader: true,
        swimlane: 'backend'
      },
      draggable: false,
      selectable: false
    },
    {
      id: 'header-3',
      type: 'swimlaneNode',
      position: { x: 400, y: 0 },
      data: {
        title: 'HYPERVERGE SDK',
        subtitle: '',
        isHeader: true,
        swimlane: 'sdk'
      },
      draggable: false,
      selectable: false
    },
    {
      id: 'header-4',
      type: 'swimlaneNode',
      position: { x: 600, y: 0 },
      data: {
        title: 'HYPERVERGE BACKEND',
        subtitle: '',
        isHeader: true,
        swimlane: 'hyperverge'
      },
      draggable: false,
      selectable: false
    },

    // Components Row 1
    {
      id: 'journey-starts',
      type: 'swimlaneNode',
      position: { x: 0, y: 100 },
      data: {
        title: 'Journey Starts',
        subtitle: 'User Lands on the application',
        isInteractive: true,
        swimlane: 'frontend',
        icon: <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
        onClick: () => window.open('https://documentation.hyperverge.co/docs/getting-started', '_blank')
      },
      draggable: false
    },
    {
      id: 'kyc-journey-begins',
      type: 'swimlaneNode',
      position: { x: 200, y: 100 },
      data: {
        title: 'KYC Journey Begins',
        subtitle: 'HyperVerge SDK Journey begins',
        isInteractive: interactive.sdk || interactive.apiIntegration,
        swimlane: 'backend',
        icon: <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
        onClick: () => window.open('https://documentation.hyperverge.co/docs/frontend-integration', '_blank')
      },
      draggable: false
    },
    {
      id: 'hyperverge-sdk',
      type: 'swimlaneNode',
      position: { x: 400, y: 100 },
      data: {
        title: 'Hyperverge SDK',
        subtitle: 'KYC Workflow is performed here',
        isInteractive: interactive.sdk,
        swimlane: 'sdk',
        icon: <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
        onClick: () => window.open('https://documentation.hyperverge.co/docs/sdk-integration', '_blank')
      },
      draggable: false
    },
    {
      id: 'sdk-journey-ends',
      type: 'swimlaneNode',
      position: { x: 600, y: 100 },
      data: {
        title: 'SDK Journey Ends',
        subtitle: 'Journey is completed',
        isInteractive: interactive.sdk,
        swimlane: 'hyperverge',
        icon: <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
        onClick: () => window.open('https://documentation.hyperverge.co/docs/document-processing', '_blank')
      },
      draggable: false
    },

    // Components Row 2
    {
      id: 'call-backend',
      type: 'swimlaneNode',
      position: { x: 200, y: 200 },
      data: {
        title: 'Call Backend',
        subtitle: 'Client FE calls Client BE to Notify completion of KYC',
        isInteractive: interactive.apiIntegration || interactive.resultsApi || interactive.webhooks,
        swimlane: 'backend',
        icon: <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h6a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h6a2 2 0 002-2v-4a2 2 0 00-2-2m8-8a2 2 0 012 2v4a2 2 0 01-2 2m0 0h4a2 2 0 012-2v4a2 2 0 01-2 2h-4m0-6v6" /></svg>,
        onClick: () => window.open('https://documentation.hyperverge.co/docs/backend-integration', '_blank')
      },
      draggable: false
    }
  ];

  // Define edges based on flow paths
  const initialEdges: Edge[] = [
    // Journey flow
    {
      id: 'e1-2',
      source: 'journey-starts',
      target: 'kyc-journey-begins',
      animated: true,
      style: { stroke: '#6366F1', strokeWidth: 2 }
    },
    {
      id: 'e2-3',
      source: 'kyc-journey-begins',
      target: 'hyperverge-sdk',
      animated: interactive.sdk || interactive.apiIntegration,
      style: { 
        stroke: (interactive.sdk || interactive.apiIntegration) ? '#10B981' : '#9CA3AF',
        strokeWidth: 2
      }
    },
    {
      id: 'e3-4',
      source: 'hyperverge-sdk',
      target: 'sdk-journey-ends',
      animated: interactive.sdk,
      style: { 
        stroke: interactive.sdk ? '#F59E0B' : '#9CA3AF',
        strokeWidth: 2
      }
    },
    {
      id: 'e4-5',
      source: 'kyc-journey-begins',
      target: 'call-backend',
      animated: interactive.apiIntegration || interactive.webhooks,
      style: { 
        stroke: (interactive.apiIntegration || interactive.webhooks) ? '#8B5CF6' : '#9CA3AF',
        strokeWidth: 2
      }
    }
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div 
      className="h-96 rounded-xl border border-gray-200 shadow-lg overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
        backdropFilter: 'blur(40px) saturate(150%)',
        WebkitBackdropFilter: 'blur(40px) saturate(150%)',
        boxShadow: '0 8px 32px rgba(6, 6, 61, 0.1), 0 2px 8px rgba(6, 6, 61, 0.05)',
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.5}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
      >
        <Controls 
          style={{ 
            background: 'rgba(255, 255, 255, 0.9)', 
            border: '1px solid rgba(6, 6, 61, 0.1)',
            borderRadius: '8px',
            boxShadow: '0 4px 16px rgba(6, 6, 61, 0.08)'
          }}
        />
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={20} 
          size={1} 
          color="rgba(6, 6, 61, 0.05)" 
        />
      </ReactFlow>
    </div>
  );
}
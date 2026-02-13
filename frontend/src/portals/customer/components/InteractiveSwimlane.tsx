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
  const { title, subtitle, isInteractive, swimlane, onClick } = data;
  
  const swimlaneColors = {
    frontend: 'border-yellow-300 bg-yellow-50',
    sdk: 'border-blue-300 bg-blue-50', 
    backend: 'border-green-300 bg-green-50',
    hyperverge: 'border-purple-300 bg-purple-50'
  };

  const iconColors = {
    frontend: 'text-yellow-600 bg-yellow-100',
    sdk: 'text-blue-600 bg-blue-100',
    backend: 'text-green-600 bg-green-100', 
    hyperverge: 'text-purple-600 bg-purple-100'
  };

  return (
    <div 
      className={`w-32 h-20 rounded-lg border-2 p-3 text-center transition-all ${
        isInteractive 
          ? `${swimlaneColors[swimlane]} cursor-pointer hover:shadow-md hover:scale-105 opacity-100` 
          : 'border-gray-200 bg-gray-50 opacity-50'
      }`}
      onClick={isInteractive ? onClick : undefined}
    >
      <div className={`w-6 h-6 rounded-full mx-auto mb-1 flex items-center justify-center ${
        isInteractive ? iconColors[swimlane] : 'bg-gray-200 text-gray-400'
      }`}>
        {data.icon}
      </div>
      <p className={`text-xs font-medium ${isInteractive ? 'text-gray-700' : 'text-gray-400'}`}>
        {title}
      </p>
      {subtitle && (
        <p className={`text-xs ${isInteractive ? 'text-gray-500' : 'text-gray-400'}`}>
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
        title: 'HDFC AMC Front End', 
        subtitle: '(Website/App)',
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
        title: 'HyperVerge SDK', 
        subtitle: 'on HDFC AMC Front End',
        isHeader: true,
        swimlane: 'sdk'
      },
      draggable: false,
      selectable: false
    },
    { 
      id: 'header-3', 
      type: 'swimlaneNode',
      position: { x: 400, y: 0 }, 
      data: { 
        title: 'HDFC AMC', 
        subtitle: 'Back End',
        isHeader: true,
        swimlane: 'backend'
      },
      draggable: false,
      selectable: false
    },
    { 
      id: 'header-4', 
      type: 'swimlaneNode',
      position: { x: 600, y: 0 }, 
      data: { 
        title: "HyperVerge's", 
        subtitle: 'Back End',
        isHeader: true,
        swimlane: 'hyperverge'
      },
      draggable: false,
      selectable: false
    },

    // Frontend Components
    { 
      id: 'frontend-ui', 
      type: 'swimlaneNode',
      position: { x: 0, y: 100 }, 
      data: { 
        title: 'User Interface',
        subtitle: 'Web/Mobile',
        isInteractive: true, // Always interactive
        swimlane: 'frontend',
        icon: <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
        onClick: () => window.open('https://documentation.hyperverge.co/docs/getting-started', '_blank')
      },
      draggable: false
    },
    { 
      id: 'frontend-verification', 
      type: 'swimlaneNode',
      position: { x: 0, y: 200 }, 
      data: { 
        title: 'User Verification',
        subtitle: 'Document Capture',
        isInteractive: interactive.sdk || interactive.apiIntegration,
        swimlane: 'frontend',
        icon: <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
        onClick: () => window.open('https://documentation.hyperverge.co/docs/frontend-integration', '_blank')
      },
      draggable: false
    },

    // SDK Components
    { 
      id: 'sdk-main', 
      type: 'swimlaneNode',
      position: { x: 200, y: 100 }, 
      data: { 
        title: 'HyperVerge SDK',
        subtitle: 'Client Integration',
        isInteractive: interactive.sdk,
        swimlane: 'sdk',
        icon: <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
        onClick: () => window.open('https://documentation.hyperverge.co/docs/sdk-integration', '_blank')
      },
      draggable: false
    },
    { 
      id: 'sdk-processing', 
      type: 'swimlaneNode',
      position: { x: 200, y: 200 }, 
      data: { 
        title: 'Document Processing',
        subtitle: 'AI Verification',
        isInteractive: interactive.sdk,
        swimlane: 'sdk',
        icon: <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
        onClick: () => window.open('https://documentation.hyperverge.co/docs/document-processing', '_blank')
      },
      draggable: false
    },

    // Backend Components
    { 
      id: 'backend-api', 
      type: 'swimlaneNode',
      position: { x: 400, y: 100 }, 
      data: { 
        title: 'API Server',
        subtitle: 'Backend Services',
        isInteractive: interactive.apiIntegration || interactive.resultsApi || interactive.webhooks,
        swimlane: 'backend',
        icon: <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h6a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h6a2 2 0 002-2v-4a2 2 0 00-2-2m8-8a2 2 0 012 2v4a2 2 0 01-2 2m0 0h4a2 2 0 012-2v4a2 2 0 01-2 2h-4m0-6v6" /></svg>,
        onClick: () => window.open('https://documentation.hyperverge.co/docs/backend-integration', '_blank')
      },
      draggable: false
    },
    { 
      id: 'backend-webhook', 
      type: 'swimlaneNode',
      position: { x: 400, y: 200 }, 
      data: { 
        title: 'Webhook Handler',
        subtitle: 'Result Processing',
        isInteractive: interactive.webhooks,
        swimlane: 'backend',
        icon: <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4 19h6v-2H4v2zM4 15h8v-2H4v2zM4 11h8V9H4v2z" /></svg>,
        onClick: () => window.open('https://documentation.hyperverge.co/accessing-results/results-webhook/', '_blank')
      },
      draggable: false
    },

    // HyperVerge Backend Components  
    { 
      id: 'hv-processing', 
      type: 'swimlaneNode',
      position: { x: 600, y: 100 }, 
      data: { 
        title: 'AI Processing',
        subtitle: 'ML Models',
        isInteractive: interactive.sdk || interactive.apiIntegration,
        swimlane: 'hyperverge',
        icon: <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
        onClick: () => window.open('https://documentation.hyperverge.co/docs/api-reference', '_blank')
      },
      draggable: false
    },
    { 
      id: 'hv-results', 
      type: 'swimlaneNode',
      position: { x: 600, y: 200 }, 
      data: { 
        title: 'Results API',
        subtitle: 'Response Data',
        isInteractive: interactive.resultsApi || interactive.outputsApi,
        swimlane: 'hyperverge',
        icon: <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
        onClick: () => window.open('https://documentation.hyperverge.co/docs/api-endpoints', '_blank')
      },
      draggable: false
    }
  ];

  // Define edges based on flow paths
  const initialEdges: Edge[] = [
    // Frontend to SDK
    { 
      id: 'e1-2', 
      source: 'frontend-verification', 
      target: 'sdk-main',
      animated: interactive.sdk,
      style: { stroke: interactive.sdk ? '#3B82F6' : '#D1D5DB' }
    },
    // SDK to Processing
    { 
      id: 'e2-3', 
      source: 'sdk-main', 
      target: 'sdk-processing',
      animated: interactive.sdk,
      style: { stroke: interactive.sdk ? '#3B82F6' : '#D1D5DB' }
    },
    // SDK to Backend
    { 
      id: 'e3-4', 
      source: 'sdk-processing', 
      target: 'backend-api',
      animated: interactive.sdk || interactive.apiIntegration,
      style: { stroke: (interactive.sdk || interactive.apiIntegration) ? '#3B82F6' : '#D1D5DB' }
    },
    // Backend to HyperVerge
    { 
      id: 'e4-5', 
      source: 'backend-api', 
      target: 'hv-processing',
      animated: interactive.sdk || interactive.apiIntegration,
      style: { stroke: (interactive.sdk || interactive.apiIntegration) ? '#3B82F6' : '#D1D5DB' }
    },
    // HyperVerge Processing to Results
    { 
      id: 'e5-6', 
      source: 'hv-processing', 
      target: 'hv-results',
      animated: interactive.resultsApi || interactive.outputsApi,
      style: { stroke: (interactive.resultsApi || interactive.outputsApi) ? '#10B981' : '#D1D5DB' }
    },
    // Results back to webhook (if webhooks enabled)
    ...(interactive.webhooks ? [{
      id: 'e6-7', 
      source: 'hv-results', 
      target: 'backend-webhook',
      animated: true,
      style: { stroke: '#10B981' }
    }] : [])
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="h-96 bg-white rounded-lg border border-gray-200">
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
      >
        <Controls />
        <Background variant={BackgroundVariant.Dots} />
      </ReactFlow>
    </div>
  );
}
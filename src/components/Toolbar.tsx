import { useReactFlow } from 'reactflow';
import { useFlowStore } from '../store/flowStore';

export default function Toolbar() {
  const { fitView, zoomIn, zoomOut } = useReactFlow();
  const clearFlow = useFlowStore((state) => state.clearFlow);
  const nodes = useFlowStore((state) => state.nodes);
  const edges = useFlowStore((state) => state.edges);

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear the entire flowchart?')) {
      clearFlow();
    }
  };

  const handleExportJSON = () => {
    const flow = {
      nodes,
      edges,
    };
    const dataStr = JSON.stringify(flow, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `hypervision-flow-${Date.now()}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="absolute top-4 right-4 z-10 bg-white rounded-lg shadow-lg border border-gray-200 p-2 flex gap-2">
      <button
        onClick={() => zoomIn()}
        className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded transition-colors"
        title="Zoom In"
      >
        +
      </button>
      <button
        onClick={() => zoomOut()}
        className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded transition-colors"
        title="Zoom Out"
      >
        -
      </button>
      <button
        onClick={() => fitView()}
        className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded transition-colors"
        title="Fit View"
      >
        Fit
      </button>
      <div className="w-px bg-gray-300" />
      <button
        onClick={handleExportJSON}
        className="px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded transition-colors"
        title="Export as JSON"
      >
        Export
      </button>
      <button
        onClick={handleClear}
        className="px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded transition-colors"
        title="Clear Canvas"
      >
        Clear
      </button>
    </div>
  );
}

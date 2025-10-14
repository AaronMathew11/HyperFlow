import { useReactFlow } from 'reactflow';
import { useFlowStore } from '../store/flowStore';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function Toolbar() {
  const { fitView, zoomIn, zoomOut } = useReactFlow();
  const clearFlow = useFlowStore((state) => state.clearFlow);
  const nodes = useFlowStore((state) => state.nodes);
  const edges = useFlowStore((state) => state.edges);
  const viewMode = useFlowStore((state) => state.viewMode);
  const toggleViewMode = useFlowStore((state) => state.toggleViewMode);

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

  const handleExportPDF = async () => {
    try {
      const reactFlowWrapper = document.querySelector('.react-flow') as HTMLElement;
      if (!reactFlowWrapper) {
        alert('Could not find flowchart to export');
        return;
      }

      // Hide UI elements before capturing
      const toolbar = document.querySelector('.absolute.top-4.right-4') as HTMLElement;
      const controls = document.querySelector('.react-flow__controls') as HTMLElement;
      const minimap = document.querySelector('.react-flow__minimap') as HTMLElement;
      const sdkNotes = document.querySelector('[class*="absolute"][class*="top-16"]') as HTMLElement;
      
      const elementsToHide = [toolbar, controls, minimap, sdkNotes].filter(Boolean);
      elementsToHide.forEach(el => {
        if (el) el.style.display = 'none';
      });

      // Wait a bit for the DOM to update
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(reactFlowWrapper, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        logging: false,
      } as any);

      // Restore UI elements
      elementsToHide.forEach(el => {
        if (el) el.style.display = '';
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`hypervision-flow-${Date.now()}.pdf`);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to export PDF. Please try again.');
    }
  };

  return (
    <div className="absolute top-4 right-4 z-10 bg-white rounded-lg shadow-lg border border-gray-200 p-2 flex gap-2">
      {/* View Mode Toggle */}
      <button
        onClick={toggleViewMode}
        className={`px-3 py-2 text-sm font-medium rounded transition-colors ${
          viewMode === 'business' 
            ? 'bg-blue-100 text-blue-700 border border-blue-300' 
            : 'bg-purple-100 text-purple-700 border border-purple-300'
        }`}
        title={`Switch to ${viewMode === 'business' ? 'Tech' : 'Business'} View`}
      >
        {viewMode === 'business' ? '🏢 Business' : '⚙️ Tech'}
      </button>
      <div className="w-px bg-gray-300" />
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
      <div className="relative group">
        <button
          className="px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded transition-colors"
          title="Export Options"
        >
          Export ▼
        </button>
        <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20 min-w-32">
          <button
            onClick={handleExportPDF}
            className="block w-full px-3 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 rounded-t-lg"
          >
            PDF
          </button>
          <button
            onClick={handleExportJSON}
            className="block w-full px-3 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 rounded-b-lg"
          >
            JSON
          </button>
        </div>
      </div>
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

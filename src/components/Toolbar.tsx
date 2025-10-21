import { useReactFlow } from 'reactflow';
import { useFlowStore } from '../store/flowStore';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useAuth } from '../contexts/AuthContext';

export default function Toolbar() {
  const { fitView, zoomIn, zoomOut, setNodes } = useReactFlow();
  const clearFlow = useFlowStore((state) => state.clearFlow);
  const nodes = useFlowStore((state) => state.nodes);
  const edges = useFlowStore((state) => state.edges);
  const viewMode = useFlowStore((state) => state.viewMode);
  const toggleViewMode = useFlowStore((state) => state.toggleViewMode);
  const { user, signOut } = useAuth();

  const handleSelectAll = () => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        selected: true,
      }))
    );
  };

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
      if (nodes.length === 0) {
        alert('No nodes to export. Please add some nodes to your flowchart first.');
        return;
      }

      // Store original viewport
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
      const sidebar = document.querySelector('aside') as HTMLElement;
      const glassOverlay = reactFlowWrapper.querySelector('.absolute.inset-0.pointer-events-none') as HTMLElement;

      const elementsToHide = [toolbar, controls, minimap, sdkNotes, sidebar, glassOverlay].filter(Boolean);
      elementsToHide.forEach(el => {
        if (el) el.style.display = 'none';
      });

      // Temporarily remove backdrop filters for better rendering
      const glassElements = document.querySelectorAll('[style*="backdrop-filter"]') as NodeListOf<HTMLElement>;
      const originalBackdrops: string[] = [];
      glassElements.forEach((el, index) => {
        originalBackdrops[index] = el.style.backdropFilter;
        el.style.backdropFilter = 'none';
        el.style.webkitBackdropFilter = 'none';
      });

      // Pre-process: Get computed styles before cloning
      const originalElements = reactFlowWrapper.querySelectorAll('*');
      const computedStyles = new Map();
      originalElements.forEach((el: any, index) => {
        const computed = window.getComputedStyle(el);
        computedStyles.set(index, {
          fontSize: computed.fontSize,
          width: computed.width,
          height: computed.height,
        });
      });

      // Fit all nodes into view for export
      fitView({ padding: 0.2, duration: 0 });

      // Wait for the view to update and fonts to render
      await new Promise(resolve => setTimeout(resolve, 300));

      const canvas = await html2canvas(reactFlowWrapper, {
        backgroundColor: '#ffffff',
        scale: 3,
        useCORS: true,
        logging: false,
        imageTimeout: 0,
        ignoreElements: (element) => {
          // Ignore glass overlay, sidebar, and tooltips
          return element.classList.contains('pointer-events-none') ||
                 element.tagName === 'ASIDE' ||
                 element.classList.contains('react-flow__minimap') ||
                 element.classList.contains('react-flow__controls');
        },
        onclone: (clonedDoc) => {
          const clonedWrapper = clonedDoc.querySelector('.react-flow') as HTMLElement;
          if (clonedWrapper) {
            // Remove glass background overlay
            const overlay = clonedWrapper.querySelector('.absolute.inset-0.pointer-events-none') as HTMLElement;
            if (overlay) overlay.remove();

            // Set clean white background
            clonedWrapper.style.background = '#ffffff';

            // Fix clamp() styles using pre-computed values
            const allElements = clonedWrapper.querySelectorAll('*');
            allElements.forEach((el: any, index) => {
              const computed = computedStyles.get(index);
              if (!computed) return;

              // Replace clamp with computed values
              if (el.style.fontSize && el.style.fontSize.includes('clamp')) {
                el.style.fontSize = computed.fontSize;
              }
              if (el.style.width && el.style.width.includes('clamp')) {
                el.style.width = computed.width;
              }
              if (el.style.height && el.style.height.includes('clamp')) {
                el.style.height = computed.height;
              }
            });

            // Hide buttons
            const buttons = clonedWrapper.querySelectorAll('button');
            buttons.forEach((btn: any) => {
              btn.style.display = 'none';
            });
          }
        }
      } as any);

      // Restore backdrop filters
      glassElements.forEach((el, index) => {
        el.style.backdropFilter = originalBackdrops[index];
        el.style.webkitBackdropFilter = originalBackdrops[index];
      });

      // Restore UI elements
      elementsToHide.forEach(el => {
        if (el) el.style.display = '';
      });

      const imgData = canvas.toDataURL('image/png');

      // Calculate proper PDF dimensions while maintaining aspect ratio
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const maxWidth = 1200;
      const maxHeight = 1600;

      let pdfWidth = imgWidth;
      let pdfHeight = imgHeight;

      // Scale down if image is too large
      if (imgWidth > maxWidth || imgHeight > maxHeight) {
        const widthRatio = maxWidth / imgWidth;
        const heightRatio = maxHeight / imgHeight;
        const ratio = Math.min(widthRatio, heightRatio);

        pdfWidth = imgWidth * ratio;
        pdfHeight = imgHeight * ratio;
      }

      const pdf = new jsPDF({
        orientation: pdfWidth > pdfHeight ? 'landscape' : 'portrait',
        unit: 'px',
        format: [pdfWidth, pdfHeight]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`hypervision-flow-${Date.now()}.pdf`);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to export PDF. Please try again.');
    }
  };

  return (
    <div
      className="absolute top-4 right-4 z-10 rounded-xl p-2 flex gap-2 border shadow-lg"
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
        backdropFilter: 'blur(40px) saturate(200%)',
        WebkitBackdropFilter: 'blur(40px) saturate(200%)',
        borderColor: 'rgba(6, 6, 61, 0.08)',
        boxShadow: 'inset -1px -1px 0 0 rgba(255, 255, 255, 0.5), 0 8px 32px rgba(6, 6, 61, 0.08)',
      }}
    >
      {/* View Mode Toggle */}
      <button
        onClick={toggleViewMode}
        className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
          viewMode === 'business'
            ? 'bg-primary-100 text-primary-700 border border-primary-200 shadow-sm'
            : 'bg-primary-600 text-white border border-primary-700 shadow-sm'
        }`}
        title={`Switch to ${viewMode === 'business' ? 'Tech' : 'Business'} View`}
      >
        {viewMode === 'business' ? 'Business' : 'Tech'}
      </button>
      <div className="w-px bg-primary-200" />
      <button
        onClick={() => zoomIn()}
        className="px-3 py-2 text-sm font-medium text-primary-700 hover:bg-primary-50 rounded-lg transition-all duration-200"
        title="Zoom In"
      >
        +
      </button>
      <button
        onClick={() => zoomOut()}
        className="px-3 py-2 text-sm font-medium text-primary-700 hover:bg-primary-50 rounded-lg transition-all duration-200"
        title="Zoom Out"
      >
        -
      </button>
      <button
        onClick={() => fitView()}
        className="px-3 py-2 text-sm font-medium text-primary-700 hover:bg-primary-50 rounded-lg transition-all duration-200"
        title="Fit View"
      >
        Fit
      </button>
      <button
        onClick={handleSelectAll}
        className="px-3 py-2 text-sm font-medium text-primary-700 hover:bg-primary-50 rounded-lg transition-all duration-200"
        title="Select All (Ctrl/Cmd + A)"
      >
        Select All
      </button>
      <div className="w-px bg-primary-200" />
      <div className="relative group">
        <button
          className="px-3 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
          title="Export Options"
        >
          Export ▼
        </button>
        <div
          className="absolute right-0 top-full mt-2 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20 min-w-32 border overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.92) 100%)',
            backdropFilter: 'blur(40px) saturate(200%)',
            WebkitBackdropFilter: 'blur(40px) saturate(200%)',
            borderColor: 'rgba(6, 6, 61, 0.1)',
            boxShadow: 'inset -1px -1px 0 0 rgba(255, 255, 255, 0.5), 0 8px 32px rgba(6, 6, 61, 0.12)',
          }}
        >
          <button
            onClick={handleExportPDF}
            className="block w-full px-3 py-2 text-sm text-left text-primary-700 hover:bg-primary-50 transition-colors"
          >
            PDF
          </button>
          <button
            onClick={handleExportJSON}
            className="block w-full px-3 py-2 text-sm text-left text-primary-700 hover:bg-primary-50 transition-colors"
          >
            JSON
          </button>
        </div>
      </div>
      <button
        onClick={handleClear}
        className="px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
        title="Clear Canvas"
      >
        Clear
      </button>
      <div className="w-px bg-primary-200" />
      {/* User Menu */}
      <div className="relative group">
        <button
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-primary-700 hover:bg-primary-50 rounded-lg transition-all duration-200"
          title={user?.email || 'User'}
        >
          {user?.user_metadata?.avatar_url ? (
            <img
              src={user.user_metadata.avatar_url}
              alt="Profile"
              className="w-6 h-6 rounded-full"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center text-white text-xs font-bold">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="hidden md:inline">{user?.user_metadata?.name || user?.email?.split('@')[0]}</span>
        </button>
        <div
          className="absolute right-0 top-full mt-2 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20 min-w-48 border overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.92) 100%)',
            backdropFilter: 'blur(40px) saturate(200%)',
            WebkitBackdropFilter: 'blur(40px) saturate(200%)',
            borderColor: 'rgba(6, 6, 61, 0.1)',
            boxShadow: 'inset -1px -1px 0 0 rgba(255, 255, 255, 0.5), 0 8px 32px rgba(6, 6, 61, 0.12)',
          }}
        >
          <div className="px-3 py-2 border-b border-primary-100">
            <p className="text-xs text-primary-600">Signed in as</p>
            <p className="text-sm font-medium text-primary-900 truncate">{user?.email}</p>
          </div>
          <button
            onClick={signOut}
            className="block w-full px-3 py-2 text-sm text-left text-red-600 hover:bg-red-50 transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

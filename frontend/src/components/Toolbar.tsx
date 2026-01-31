import { useState } from 'react';
import { useReactFlow } from 'reactflow';
import { useFlowStore } from '../store/flowStore';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useAuth } from '../contexts/AuthContext';
import ShareLinkModal from './ShareLinkModal';

interface ToolbarProps {
  onBack: () => void;
  boardName: string;
  boardId?: string;
  readOnly?: boolean;
}

export default function Toolbar({ onBack, boardName, boardId, readOnly = false }: ToolbarProps) {
  const { fitView, zoomIn, zoomOut, setNodes } = useReactFlow();
  const clearFlow = useFlowStore((state) => state.clearFlow);
  const nodes = useFlowStore((state) => state.nodes);
  const edges = useFlowStore((state) => state.edges);
  const viewMode = useFlowStore((state) => state.viewMode);
  const toggleViewMode = useFlowStore((state) => state.toggleViewMode);
  const { user, signOut } = useAuth();
  const [showShareModal, setShowShareModal] = useState(false);

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

      // Get the React Flow wrapper
      const reactFlowWrapper = document.querySelector('.react-flow') as HTMLElement;
      if (!reactFlowWrapper) {
        alert('Could not find flowchart to export');
        return;
      }

      // Fit all nodes into view for export with generous padding
      fitView({ padding: 0.2, duration: 0 });

      // Wait longer for the view to update and ensure all elements are rendered
      await new Promise(resolve => setTimeout(resolve, 800));

      // Calculate the bounds of all nodes to determine content area
      const nodeElements = reactFlowWrapper.querySelectorAll('.react-flow__node');

      if (nodeElements.length === 0) {
        alert('No nodes found to export');
        return;
      }

      // Get the viewport element for transformation info
      const viewport = document.querySelector('.react-flow__viewport') as HTMLElement;
      if (!viewport) {
        alert('Could not find flowchart viewport');
        return;
      }

      const canvas = await html2canvas(reactFlowWrapper, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true,
        imageTimeout: 15000,
        removeContainer: false,
        foreignObjectRendering: true,
        width: reactFlowWrapper.offsetWidth,
        height: reactFlowWrapper.offsetHeight,
        x: 0,
        y: 0,
        // Don't ignore any elements - capture everything in the viewport
        ignoreElements: (element: Element) => {
          // Only ignore UI elements that shouldn't be exported
          return element.classList.contains('react-flow__handle') ||
            element.classList.contains('react-flow__controls') ||
            element.classList.contains('react-flow__minimap') ||
            element.tagName === 'ASIDE' ||
            element.tagName === 'BUTTON' ||
            element.classList.contains('tooltip') ||
            (element as HTMLElement).style?.position === 'absolute' &&
            (element.classList.contains('top-4') || element.classList.contains('top-16'));
        },
        onclone: (clonedDoc: Document) => {
          // Apply styles to ensure proper rendering
          const clonedWrapper = clonedDoc.querySelector('.react-flow') as HTMLElement;
          if (clonedWrapper) {
            // Set clean white background and remove glass overlay
            clonedWrapper.style.backgroundColor = '#ffffff';
            clonedWrapper.style.background = '#ffffff';

            // Remove glass background overlay
            const overlay = clonedWrapper.querySelector('.absolute.inset-0.pointer-events-none') as HTMLElement;
            if (overlay) overlay.remove();

            const clonedViewport = clonedWrapper.querySelector('.react-flow__viewport') as HTMLElement;
            if (clonedViewport) {
              // Ensure all edges are visible
              const edges = clonedViewport.querySelectorAll('.react-flow__edge');
              edges.forEach((edge: Element) => {
                (edge as HTMLElement).style.display = 'block';
                (edge as HTMLElement).style.visibility = 'visible';
                (edge as HTMLElement).style.opacity = '1';
              });

              // Ensure all nodes are visible and positioned correctly
              const nodes = clonedViewport.querySelectorAll('.react-flow__node');
              nodes.forEach((node: Element) => {
                (node as HTMLElement).style.display = 'block';
                (node as HTMLElement).style.visibility = 'visible';
                (node as HTMLElement).style.opacity = '1';
              });
            }

            // Hide all UI elements
            const uiElements = clonedWrapper.querySelectorAll('aside, .react-flow__controls, .react-flow__minimap, .react-flow__handle, button');
            uiElements.forEach((element: Element) => {
              (element as HTMLElement).style.display = 'none';
            });

            // Hide toolbar and other absolute positioned UI elements
            const toolbars = clonedWrapper.querySelectorAll('[class*="absolute"][class*="top-4"], [class*="absolute"][class*="top-16"]');
            toolbars.forEach((element: Element) => {
              (element as HTMLElement).style.display = 'none';
            });
          }
        }
      });

      const imgData = canvas.toDataURL('image/png', 1.0);

      // Calculate PDF dimensions
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      // Use A4 proportions but scale to fit content
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
    <>
      {/* Back Button and Board Name */}
      <div
        className="absolute top-4 left-4 z-10 rounded-xl p-2 flex items-center gap-3 border shadow-lg"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
          backdropFilter: 'blur(40px) saturate(200%)',
          WebkitBackdropFilter: 'blur(40px) saturate(200%)',
          borderColor: 'rgba(6, 6, 61, 0.08)',
          boxShadow: 'inset -1px -1px 0 0 rgba(255, 255, 255, 0.5), 0 8px 32px rgba(6, 6, 61, 0.08)',
        }}
      >
        <button
          onClick={onBack}
          className="px-3 py-2 text-sm font-medium text-primary-700 hover:bg-primary-50 rounded-lg transition-all duration-200 flex items-center gap-2"
          title="Back to Boards"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </button>
        <div className="w-px h-6 bg-primary-200" />
        <div className="px-2">
          <p className="text-xs text-primary-600">Board</p>
          <p className="text-sm font-semibold text-primary-900">{boardName}</p>
        </div>
      </div>

      {/* Main Toolbar */}
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
          className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${viewMode === 'business'
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
        {boardId && !readOnly && (
          <>
            <button
              onClick={() => setShowShareModal(true)}
              className="px-3 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 flex items-center gap-1"
              title="Share Board"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
              Share
            </button>
            <div className="w-px bg-primary-200" />
          </>
        )}
        {!readOnly && (
          <button
            onClick={handleClear}
            className="px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            title="Clear Canvas"
          >
            Clear
          </button>
        )}
        {!readOnly && <div className="w-px bg-primary-200" />}
        {/* User Menu - only show when not in read-only mode */}
        {!readOnly && (
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
        )}
      </div>

      {/* Share Link Modal */}
      {boardId && (
        <ShareLinkModal
          isOpen={showShareModal}
          boardId={boardId}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </>
  );
}

import { memo, useState } from 'react';
import { Handle, Position, NodeProps, NodeResizer } from 'reactflow';
import { useFlowStore } from '../../portals/internal/store/flowStore';
import { modules } from '../data/modules';
import ModuleIcon from './ModuleIcon';
import ApiModal from './ApiModal';

interface ModuleNodeData {
  label: string;
  moduleType: string;
  color: string;
  icon: string;
  cspUrls?: string[];
  ipAddresses?: string[];
}

function ModuleNode({ data, selected }: NodeProps<ModuleNodeData>) {
  const viewMode = useFlowStore((state) => state.viewMode);
  const flowType = useFlowStore((state) => state.flowType);
  const sdkMode = useFlowStore((state) => state.sdkMode);
  const [showTechDetails, setShowTechDetails] = useState(false);
  const [showApiModal, setShowApiModal] = useState(false);
  const [editingField, setEditingField] = useState<'description' | 'success' | 'failure' | null>(null);
  const [editValues, setEditValues] = useState({
    description: '',
    success: '',
    failure: ''
  });

  const selectedModule = modules.find(m => m.id === data.moduleType) || null;


  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedModule?.apiInfo) {
      setShowApiModal(true);
    }
  };

  const handleEditClick = (field: 'description' | 'success' | 'failure', currentValue: string) => {
    setEditingField(field);
    setEditValues({ ...editValues, [field]: currentValue });
  };

  const handleEditSave = (field: 'description' | 'success' | 'failure') => {
    // Update the module data (this would typically save to a store/database)
    const newValue = editValues[field];
    if (selectedModule) {
      if (field === 'description') {
        selectedModule.description = newValue;
      } else if (field === 'success' && selectedModule.apiInfo) {
        selectedModule.apiInfo.successCriteria = newValue;
      } else if (field === 'failure' && selectedModule.apiInfo) {
        selectedModule.apiInfo.failureCriteria = newValue;
      }
    }
    setEditingField(null);
  };

  const handleEditCancel = () => {
    setEditingField(null);
  };

  return (
    <>
      <div
        className="p-4 rounded-xl min-w-[200px] relative border-2 bg-white shadow-sm hover:shadow-md h-full w-full flex flex-col justify-start"
        style={{
          borderColor: selected ? '#9393D0' : '#E8E8ED',
        }}
      >
        {/* Info button - top right corner (only in API flow) */}
        {flowType === 'api' && selectedModule?.apiInfo && (
          <button
            onClick={handleInfoClick}
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center text-blue-600 transition-colors z-10"
            title="View API details"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        )}
        <NodeResizer
          color="#9393D0"
          isVisible={selected}
          minWidth={180}
          minHeight={80}
        />
        <Handle type="target" position={Position.Top} className="w-3 h-3" />

        <div className="flex items-center gap-3 mb-2">
          <div
            className="flex-shrink-0 flex items-center justify-center rounded-lg bg-primary-50 text-primary-600"
            style={{
              width: 'clamp(36px, 12%, 48px)',
              height: 'clamp(36px, 12%, 48px)',
            }}
          >
            <ModuleIcon
              type={data.moduleType}
              style={{
                width: 'clamp(20px, 60%, 28px)',
                height: 'clamp(20px, 60%, 28px)',
              }}
            />
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <div className="font-semibold text-primary-900 break-words" style={{ fontSize: 'clamp(13px, 3vw, 16px)' }}>
                {data.label}
              </div>
              {flowType === 'api' && selectedModule?.apiInfo && (
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  API
                </span>
              )}
            </div>
            <div className="text-primary-600 break-words mt-0.5" style={{ fontSize: 'clamp(11px, 2.5vw, 13px)' }}>
              {data.moduleType}
            </div>
          </div>
        </div>

        {/* SDK Flow - Show description, success, and failure criteria directly on node (Advanced mode only) */}
        {flowType === 'sdk' && sdkMode === 'advanced' && selectedModule && (
          <div className="mt-3 space-y-2">
            {/* Description */}
            <div className="group relative">
              {editingField === 'description' ? (
                <div className="space-y-1">
                  <textarea
                    value={editValues.description}
                    onChange={(e) => setEditValues({ ...editValues, description: e.target.value })}
                    className="w-full text-xs p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                    rows={2}
                    autoFocus
                  />
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEditSave('description')}
                      className="px-2 py-0.5 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleEditCancel}
                      className="px-2 py-0.5 bg-gray-500 text-white text-xs rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className="text-xs text-gray-700 break-words leading-relaxed cursor-pointer hover:bg-gray-50 p-1 rounded relative"
                  onClick={() => handleEditClick('description', selectedModule.description || 'This API fetches verification information for the submitted document.')}
                >
                  {selectedModule.description || 'This API fetches verification information for the submitted document.'}
                  <svg className="w-3 h-3 text-gray-400 absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
              )}
            </div>

            <div className="space-y-1">
              {/* Success */}
              <div className="group relative">
                <span className="text-xs font-semibold text-green-700">Success:</span>
                {editingField === 'success' ? (
                  <div className="mt-0.5 space-y-1">
                    <textarea
                      value={editValues.success}
                      onChange={(e) => setEditValues({ ...editValues, success: e.target.value })}
                      className="w-full text-xs p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-1 focus:ring-green-500"
                      rows={2}
                      autoFocus
                    />
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEditSave('success')}
                        className="px-2 py-0.5 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleEditCancel}
                        className="px-2 py-0.5 bg-gray-500 text-white text-xs rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="text-xs text-gray-800 mt-0.5 leading-relaxed cursor-pointer hover:bg-green-50 p-1 rounded relative"
                    onClick={() => handleEditClick('success', selectedModule.apiInfo?.successCriteria || 'Document is verified successfully.')}
                  >
                    {selectedModule.apiInfo?.successCriteria || 'Document is verified successfully.'}
                    <svg className="w-3 h-3 text-gray-400 absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Failure */}
              <div className="group relative">
                <span className="text-xs font-semibold text-red-700">Failure:</span>
                {editingField === 'failure' ? (
                  <div className="mt-0.5 space-y-1">
                    <textarea
                      value={editValues.failure}
                      onChange={(e) => setEditValues({ ...editValues, failure: e.target.value })}
                      className="w-full text-xs p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-1 focus:ring-red-500"
                      rows={2}
                      autoFocus
                    />
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEditSave('failure')}
                        className="px-2 py-0.5 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleEditCancel}
                        className="px-2 py-0.5 bg-gray-500 text-white text-xs rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="text-xs text-gray-800 mt-0.5 leading-relaxed cursor-pointer hover:bg-red-50 p-1 rounded relative"
                    onClick={() => handleEditClick('failure', selectedModule.apiInfo?.failureCriteria || 'Document verification failed. Invalid or unclear document.')}
                  >
                    {selectedModule.apiInfo?.failureCriteria || 'Document verification failed. Invalid or unclear document.'}
                    <svg className="w-3 h-3 text-gray-400 absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tech View Information - contained within node */}
        {viewMode === 'tech' && (
          <div className="border-t border-primary-100 pt-2 mt-auto w-full">
            <button
              onClick={() => setShowTechDetails(!showTechDetails)}
              className="text-xs text-primary-600 font-medium hover:text-primary-700 mb-2"
              style={{ fontSize: 'clamp(10px, 2vw, 12px)' }}
            >
              {showTechDetails ? 'Hide Details' : 'Show Tech Details'}
            </button>

            {showTechDetails && (
              <div className="space-y-2 w-full">
                {/* SDK Flow - Show only CSP URLs and IP addresses */}
                {flowType === 'sdk' && (
                  <>
                    <div className="w-full">
                      <label className="text-xs text-primary-700 font-medium block mb-1" style={{ fontSize: 'clamp(10px, 2vw, 12px)' }}>
                        CSP URLs:
                      </label>
                      <div className="text-xs text-primary-800 bg-primary-50 p-2 rounded-lg border border-primary-100 break-words w-full" style={{ fontSize: 'clamp(9px, 1.8vw, 11px)' }}>
                        {data.cspUrls?.join(', ') || 'api.hypervision.ai, cdn.hypervision.ai'}
                      </div>
                    </div>
                    <div className="w-full">
                      <label className="text-xs text-primary-700 font-medium block mb-1" style={{ fontSize: 'clamp(10px, 2vw, 12px)' }}>
                        IP Addresses:
                      </label>
                      <div className="text-xs text-primary-800 bg-primary-50 p-2 rounded-lg border border-primary-100 break-words w-full" style={{ fontSize: 'clamp(9px, 1.8vw, 11px)' }}>
                        {data.ipAddresses?.join(', ') || '52.195.10.45, 13.230.115.23'}
                      </div>
                    </div>
                  </>
                )}

                {/* API Flow - Show only IP addresses */}
                {flowType === 'api' && (
                  <div className="w-full">
                    <label className="text-xs text-primary-700 font-medium block mb-1" style={{ fontSize: 'clamp(10px, 2vw, 12px)' }}>
                      IP Addresses:
                    </label>
                    <div className="text-xs text-primary-800 bg-primary-50 p-2 rounded-lg border border-primary-100 break-words w-full" style={{ fontSize: 'clamp(9px, 1.8vw, 11px)' }}>
                      {data.ipAddresses?.join(', ') || '52.195.10.45, 13.230.115.23'}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}


        <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
      </div>

      {/* API Modal */}
      <ApiModal
        selectedModule={selectedModule}
        isOpen={showApiModal}
        onClose={() => setShowApiModal(false)}
      />
    </>
  );
}

export default memo(ModuleNode);

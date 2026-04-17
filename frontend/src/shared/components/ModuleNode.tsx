import { memo, useState, useMemo } from 'react';
import { Handle, Position, NodeProps, NodeResizer, useReactFlow } from 'reactflow';
import { useFlowStore } from '../../portals/internal/store/flowStore';
import { modules } from '../data/modules';
import ModuleIcon from './ModuleIcon';
import ApiModal from './ApiModal';
import { extractCspUrlsForModule } from '../utils/cspUtils';

interface ModuleNodeData {
  label: string;
  moduleType: string;
  color: string;
  icon: string;
  cspUrls?: string[];
  ipAddresses?: string[];
  isGeneric?: boolean;
}

function ModuleNode({ data, selected, id }: NodeProps<ModuleNodeData>) {
  const { getNodes, setNodes } = useReactFlow();
  const viewMode = useFlowStore((state) => state.viewMode);
  const flowType = useFlowStore((state) => state.flowType);
  const sdkMode = useFlowStore((state) => state.sdkMode);
  const [showTechDetails, setShowTechDetails] = useState(false);
  const [showApiModal, setShowApiModal] = useState(false);
  const [editingField, setEditingField] = useState<'description' | 'success' | 'failure' | 'title' | 'moduleType' | null>(null);
  const [editValues, setEditValues] = useState({
    description: '',
    success: '',
    failure: '',
    title: data.label,
    moduleType: ''
  });

  const isGeneric = data.isGeneric ?? false;
  const selectedModule = isGeneric ? null : modules.find(m => m.id === data.moduleType) || null;
  
  // Get group information for this node
  const nodes = getNodes();
  const currentNode = nodes.find(node => node.id === id);
  const parentGroupNode = currentNode?.parentNode ? nodes.find(node => node.id === currentNode.parentNode) : null;
  const groupColor = parentGroupNode?.data?.color || null;
  
  // Dynamically extract CSP URLs using the CSP script logic
  const dynamicCspUrls = useMemo(() => {
    if (!selectedModule) return [];
    return extractCspUrlsForModule(selectedModule);
  }, [selectedModule]);


  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedModule?.apiInfo) {
      setShowApiModal(true);
    }
  };

  const handleEditClick = (field: 'description' | 'success' | 'failure' | 'title' | 'moduleType', currentValue: string) => {
    setEditingField(field);
    setEditValues({ ...editValues, [field]: currentValue });
  };

  const handleEditSave = (field: 'description' | 'success' | 'failure' | 'title' | 'moduleType') => {
    const newValue = editValues[field];
    
    if (isGeneric) {
      // For generic modules, update the node data directly
      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === id
            ? {
                ...node,
                data: {
                  ...node.data,
                  label: field === 'title' ? newValue : node.data.label,
                  description: field === 'description' ? newValue : (node.data as any).description,
                  moduleType: field === 'moduleType' ? newValue : (node.data as any).moduleType,
                  success: field === 'success' ? newValue : (node.data as any).success,
                  failure: field === 'failure' ? newValue : (node.data as any).failure,
                },
              }
            : node
        )
      );
    } else if (selectedModule) {
      // For regular modules, update the module data
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
        {/* Group indicator circle - top right corner */}
        <div className="absolute top-2 right-2 flex items-center gap-1">
          {/* Group membership indicator */}
          {groupColor && (
            <div
              className="w-3 h-3 rounded-full border border-white shadow-sm"
              style={{ backgroundColor: groupColor }}
              title="Part of group"
            />
          )}
          
          {/* Info button - (only in API flow) */}
          {flowType === 'api' && selectedModule?.apiInfo && (
            <button
              onClick={handleInfoClick}
              className="w-6 h-6 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center text-blue-600 transition-colors z-10"
              title="View API details"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          )}
        </div>
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
              {isGeneric && editingField === 'title' ? (
                <div className="flex-1 space-y-1">
                  <input
                    value={editValues.title}
                    onChange={(e) => setEditValues({ ...editValues, title: e.target.value })}
                    className="w-full text-sm font-semibold p-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    autoFocus
                  />
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEditSave('title')}
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
                  className={`font-semibold text-primary-900 break-words ${isGeneric ? 'cursor-pointer hover:bg-gray-100 px-1 rounded' : ''}`}
                  style={{ fontSize: 'clamp(13px, 3vw, 16px)' }}
                  onClick={isGeneric ? () => handleEditClick('title', data.label) : undefined}
                  title={isGeneric ? 'Click to edit title' : undefined}
                >
                  {data.label}
                </div>
              )}
              {flowType === 'api' && selectedModule?.apiInfo && (
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  API
                </span>
              )}
              {isGeneric && (
                <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                  Generic
                </span>
              )}
            </div>
            <div className="text-primary-600 break-words mt-0.5" style={{ fontSize: 'clamp(11px, 2.5vw, 13px)' }}>
              {isGeneric ? (
                editingField === 'moduleType' ? (
                  <div className="space-y-1">
                    <input
                      value={editValues.moduleType || 'Custom Module'}
                      onChange={(e) => setEditValues({ ...editValues, moduleType: e.target.value })}
                      className="w-full text-xs p-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      autoFocus
                    />
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEditSave('moduleType')}
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
                    className="cursor-pointer hover:bg-gray-100 px-1 rounded"
                    onClick={() => handleEditClick('moduleType', (data as any).moduleType || 'Custom Module')}
                    title="Click to edit module type"
                  >
                    {(data as any).moduleType || 'Custom Module'}
                  </div>
                )
              ) : (
                data.moduleType
              )}
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

        {/* Generic Module - Show editable description in SDK Flow */}
        {isGeneric && flowType === 'sdk' && (
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
                    placeholder="Describe what this module does..."
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
                  className="text-xs text-gray-700 break-words leading-relaxed cursor-pointer hover:bg-gray-50 p-2 rounded border border-dashed border-gray-300"
                  onClick={() => handleEditClick('description', (data as any).description || 'Click to add description...')}
                  title="Click to edit description"
                >
                  {(data as any).description || 'Click to add description...'}
                  <svg className="w-3 h-3 text-gray-400 float-right mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Success and Failure Criteria - Only in Advanced Mode */}
            {sdkMode === 'advanced' && (
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
                        placeholder="Define success criteria..."
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
                      onClick={() => handleEditClick('success', (data as any).success || 'Click to add success criteria...')}
                      title="Click to edit success criteria"
                    >
                      {(data as any).success || 'Click to add success criteria...'}
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
                        placeholder="Define failure criteria..."
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
                      onClick={() => handleEditClick('failure', (data as any).failure || 'Click to add failure criteria...')}
                      title="Click to edit failure criteria"
                    >
                      {(data as any).failure || 'Click to add failure criteria...'}
                      <svg className="w-3 h-3 text-gray-400 absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tech View Information - contained within node */}
        {viewMode === 'tech' && dynamicCspUrls.length > 0 && (
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
                {/* SDK Flow - Show only CSP URLs when available */}
                {flowType === 'sdk' && (
                  <div className="w-full">
                    <label className="text-xs text-primary-700 font-medium block mb-1" style={{ fontSize: 'clamp(10px, 2vw, 12px)' }}>
                      CSP URLs:
                    </label>
                    <div className="text-xs text-primary-800 bg-primary-50 p-2 rounded-lg border border-primary-100 break-words w-full" style={{ fontSize: 'clamp(9px, 1.8vw, 11px)' }}>
                      {dynamicCspUrls.join(', ')}
                    </div>
                  </div>
                )}

                {/* API Flow - Show CSP URLs when available */}
                {flowType === 'api' && (
                  <div className="w-full">
                    <label className="text-xs text-primary-700 font-medium block mb-1" style={{ fontSize: 'clamp(10px, 2vw, 12px)' }}>
                      CSP URLs:
                    </label>
                    <div className="text-xs text-primary-800 bg-primary-50 p-2 rounded-lg border border-primary-100 break-words w-full" style={{ fontSize: 'clamp(9px, 1.8vw, 11px)' }}>
                      {dynamicCspUrls.join(', ')}
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

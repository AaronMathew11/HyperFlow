import { memo, useState, useMemo, useEffect } from 'react';
import { Handle, Position, NodeProps, useUpdateNodeInternals } from 'reactflow';
import { useFlowStore } from '../../portals/internal/store/flowStore';
import { modules } from '../data/modules';

interface EndStatusNodeData {
  label: string;
  status: 'auto-approved' | 'auto-declined' | 'needs-review';
  color: string;
  icon: string;
  resumeFrom?: string;
  reason?: string;
}

function EndStatusNode({ id, data }: NodeProps<EndStatusNodeData>) {
  const updateNodeInternals = useUpdateNodeInternals();
  useEffect(() => { updateNodeInternals(id); }, [id, updateNodeInternals]);
  const [editingField, setEditingField] = useState<'reason' | 'resumeFrom' | null>(null);
  const [editValues, setEditValues] = useState({
    reason: data.reason || '',
    resumeFrom: data.resumeFrom || ''
  });
  const flowType = useFlowStore((state) => state.flowType);
  const sdkMode = useFlowStore((state) => state.sdkMode);
  const nodes = useFlowStore((state) => state.nodes);

  // Get available modules from current flow
  const availableModules = useMemo(() => {
    const moduleNodes = nodes.filter(node => 
      node.type === 'moduleNode' || node.type === 'apiModuleNode'
    );
    
    const moduleOptions = moduleNodes.map(node => {
      // For API modules, use the node's data label
      if (node.type === 'apiModuleNode') {
        return {
          id: node.id,
          label: node.data?.label || 'API Module',
          type: 'api'
        };
      }
      
      // For regular modules, find the module data
      const moduleData = modules.find(m => m.id === node.data?.moduleType);
      return {
        id: node.id,
        label: moduleData?.label || node.data?.label || 'Module',
        type: 'sdk'
      };
    });

    return moduleOptions;
  }, [nodes]);

  const getStatusColor = () => {
    switch (data.status) {
      case 'auto-approved':
        return '#34C759'; // Apple green
      case 'auto-declined':
        return '#FF3B30'; // Apple red
      case 'needs-review':
        return '#FF9500'; // Apple orange
      default:
        return data.color;
    }
  };

  const handleEditClick = (field: 'reason' | 'resumeFrom', currentValue: string) => {
    setEditingField(field);
    setEditValues({ ...editValues, [field]: currentValue });
  };

  const handleEditSave = (field: 'reason' | 'resumeFrom') => {
    const newValue = editValues[field];
    if (field === 'reason') {
      data.reason = newValue;
    } else if (field === 'resumeFrom') {
      data.resumeFrom = newValue;
    }
    setEditingField(null);
  };

  const handleEditCancel = () => {
    setEditingField(null);
    setEditValues({
      reason: data.reason || '',
      resumeFrom: data.resumeFrom || ''
    });
  };

  const statusColor = getStatusColor();
  const shouldShowExtraInfo = (data.status === 'auto-declined' || data.status === 'needs-review') && flowType === 'sdk' && sdkMode === 'advanced';

  return (
    <div
      className="relative shadow-md hover:shadow-lg"
      style={{ minWidth: shouldShowExtraInfo ? '200px' : '140px' }}
    >
      <Handle type="target" position={Position.Top}    id="in-top"    style={{ background: 'transparent', border: 'none', width: 20, height: 20, left: '50%', transform: 'translateX(-50%)' }} />
      <Handle type="target" position={Position.Bottom} id="in-bottom" style={{ background: 'transparent', border: 'none', width: 20, height: 20, left: '50%', transform: 'translateX(-50%)' }} />
      <Handle type="target" position={Position.Left}   id="in-left"   style={{ background: 'transparent', border: 'none', width: 20, height: 20, top: '50%',  transform: 'translateY(-50%)' }} />
      <Handle type="target" position={Position.Right}  id="in-right"  style={{ background: 'transparent', border: 'none', width: 20, height: 20, top: '50%',  transform: 'translateY(-50%)' }} />

      {/* Main Status Node */}
      <div
        className="px-6 py-4 rounded-full text-center border-2"
        style={{
          backgroundColor: statusColor,
          borderColor: statusColor,
        }}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="font-semibold text-base text-white">
            {data.label}
          </div>
        </div>
      </div>

      {/* Additional Information for Declined/Needs Review in Tech View */}
      {shouldShowExtraInfo && (
        <div
          className="mt-3 p-3 bg-white rounded-lg border-2 shadow-sm"
          style={{ borderColor: statusColor }}
        >
          {data.status === 'auto-declined' && (
            <>
              {/* Resume From Field */}
              <div className="mb-2 group">
                <label className="text-xs font-medium text-red-700 block mb-1">
                  Resume from:
                </label>
                {editingField === 'resumeFrom' ? (
                  <div className="space-y-1">
                    {availableModules.length > 0 ? (
                      <select
                        value={editValues.resumeFrom}
                        onChange={(e) => setEditValues({ ...editValues, resumeFrom: e.target.value })}
                        className="w-full text-xs p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500 bg-white"
                        autoFocus
                      >
                        <option value="">Select module to resume from...</option>
                        {availableModules.map((module) => (
                          <option key={module.id} value={module.label}>
                            {module.label} {module.type === 'api' ? '(API)' : '(SDK)'}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded border border-gray-200">
                        No modules available in the current flow. Add modules to the canvas first.
                      </div>
                    )}
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEditSave('resumeFrom')}
                        className={`px-2 py-0.5 text-white text-xs rounded ${
                          availableModules.length === 0 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-green-500 hover:bg-green-600'
                        }`}
                        disabled={availableModules.length === 0}
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
                    className="text-xs text-red-600 bg-red-50 p-2 rounded border border-red-200 cursor-pointer hover:bg-red-100 relative"
                    onClick={() => handleEditClick('resumeFrom', data.resumeFrom || (availableModules.length > 0 ? '' : 'No modules in flow'))}
                  >
                    {data.resumeFrom || (availableModules.length > 0 ? 'Click to select module' : 'No modules in flow')}
                    <svg className="w-3 h-3 text-red-400 absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Reason Field */}
              <div className="group">
                <label className="text-xs font-medium text-red-700 block mb-1">
                  Reason:
                </label>
                {editingField === 'reason' ? (
                  <div className="space-y-1">
                    <textarea
                      value={editValues.reason}
                      onChange={(e) => setEditValues({ ...editValues, reason: e.target.value })}
                      className="w-full text-xs p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-1 focus:ring-red-500"
                      rows={2}
                      autoFocus
                    />
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEditSave('reason')}
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
                    className="text-xs text-red-600 bg-red-50 p-2 rounded border border-red-200 cursor-pointer hover:bg-red-100 relative"
                    onClick={() => handleEditClick('reason', data.reason || 'Document verification failed')}
                  >
                    {data.reason || 'Document verification failed'}
                    <svg className="w-3 h-3 text-red-400 absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                )}
              </div>
            </>
          )}

          {data.status === 'needs-review' && (
            <div className="group">
              <label className="text-xs font-medium text-orange-700 block mb-1">
                Reason:
              </label>
              {editingField === 'reason' ? (
                <div className="space-y-1">
                  <textarea
                    value={editValues.reason}
                    onChange={(e) => setEditValues({ ...editValues, reason: e.target.value })}
                    className="w-full text-xs p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-1 focus:ring-orange-500"
                    rows={2}
                    autoFocus
                  />
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEditSave('reason')}
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
                  className="text-xs text-orange-600 bg-orange-50 p-2 rounded border border-orange-200 cursor-pointer hover:bg-orange-100 relative"
                  onClick={() => handleEditClick('reason', data.reason || 'Manual review required')}
                >
                  {data.reason || 'Manual review required'}
                  <svg className="w-3 h-3 text-orange-400 absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default memo(EndStatusNode);
import { memo, useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { useFlowStore } from '../store/flowStore';

interface EndStatusNodeData {
  label: string;
  status: 'auto-approved' | 'auto-declined' | 'needs-review';
  color: string;
  icon: string;
  resumeFrom?: string;
  reason?: string;
}

function EndStatusNode({ data }: NodeProps<EndStatusNodeData>) {
  const [showDetails, setShowDetails] = useState(false);
  const [editingField, setEditingField] = useState<'reason' | 'resumeFrom' | null>(null);
  const [editValues, setEditValues] = useState({
    reason: data.reason || '',
    resumeFrom: data.resumeFrom || ''
  });
  const viewMode = useFlowStore((state) => state.viewMode);
  const flowType = useFlowStore((state) => state.flowType);
  const sdkMode = useFlowStore((state) => state.sdkMode);
  
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
    setEditValues({...editValues, [field]: currentValue});
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
      <Handle type="target" position={Position.Top} className="w-3 h-3" />

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
                    <input
                      type="text"
                      value={editValues.resumeFrom}
                      onChange={(e) => setEditValues({...editValues, resumeFrom: e.target.value})}
                      className="w-full text-xs p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                      autoFocus
                    />
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEditSave('resumeFrom')}
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
                    onClick={() => handleEditClick('resumeFrom', data.resumeFrom || 'ID Card Validation')}
                  >
                    {data.resumeFrom || 'ID Card Validation'}
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
                      onChange={(e) => setEditValues({...editValues, reason: e.target.value})}
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
                    onChange={(e) => setEditValues({...editValues, reason: e.target.value})}
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
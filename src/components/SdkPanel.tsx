import { useState } from 'react';
import { useFlowStore } from '../store/flowStore';

export default function SdkPanel() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const flowInputs = useFlowStore((state) => state.flowInputs);
  const flowOutputs = useFlowStore((state) => state.flowOutputs);
  const setFlowInputs = useFlowStore((state) => state.setFlowInputs);
  const setFlowOutputs = useFlowStore((state) => state.setFlowOutputs);
  const viewMode = useFlowStore((state) => state.viewMode);

  // Only show in tech view
  if (viewMode !== 'tech') {
    return null;
  }

  return (
    <div
      className="absolute bottom-4 left-4 w-80 z-30 rounded-2xl shadow-2xl"
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)',
        backdropFilter: 'blur(80px) saturate(180%)',
        WebkitBackdropFilter: 'blur(80px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        boxShadow: 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.9), 0 30px 80px rgba(6, 6, 61, 0.2), 0 0 0 1.5px rgba(6, 6, 61, 0.08)',
      }}
    >
      {/* Glass shimmer effect */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, transparent 30%, rgba(6, 6, 61, 0.04) 100%)'
        }}
      />

      <div className="relative z-10 p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-primary-900 tracking-tight">
            SDK Configuration
          </h3>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-xs text-primary-600 font-medium hover:text-primary-700 transition-colors"
          >
            {isCollapsed ? 'Expand' : 'Collapse'}
          </button>
        </div>

        {!isCollapsed && (
          <div className="space-y-4">
            {/* SDK Inputs */}
            <div>
              <label className="text-xs font-medium text-primary-700 block mb-2">
                SDK Inputs
              </label>
              <textarea
                value={flowInputs}
                onChange={(e) => setFlowInputs(e.target.value)}
                className="w-full text-xs border border-primary-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary-400/30 focus:border-primary-400 transition-all text-primary-900 placeholder-primary-400 bg-white/80"
                rows={4}
                placeholder="user_id, document_type, session_token..."
              />
            </div>

            {/* SDK Outputs */}
            <div>
              <label className="text-xs font-medium text-primary-700 block mb-2">
                SDK Outputs
              </label>
              <textarea
                value={flowOutputs}
                onChange={(e) => setFlowOutputs(e.target.value)}
                className="w-full text-xs border border-primary-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-primary-400/30 focus:border-primary-400 transition-all text-primary-900 placeholder-primary-400 bg-white/80"
                rows={4}
                placeholder="verification_status, confidence_score..."
              />
            </div>
          </div>
        )}

        {/* Summary when collapsed */}
        {isCollapsed && (flowInputs || flowOutputs) && (
          <div className="text-xs text-primary-700 bg-white/80 p-3 rounded-lg shadow-sm border border-primary-100">
            {flowInputs && (
              <div className="mb-2">
                <span className="font-medium">Inputs:</span>{' '}
                {flowInputs.substring(0, 40)}{flowInputs.length > 40 ? '...' : ''}
              </div>
            )}
            {flowOutputs && (
              <div>
                <span className="font-medium">Outputs:</span>{' '}
                {flowOutputs.substring(0, 40)}{flowOutputs.length > 40 ? '...' : ''}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
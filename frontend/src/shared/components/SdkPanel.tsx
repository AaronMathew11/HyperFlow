import { useState } from 'react';
import { useFlowStore } from '../../portals/internal/store/flowStore';
import VariableInput from './VariableInput';

export default function SdkPanel() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const flowInputs = useFlowStore((state) => state.flowInputs);
  const flowOutputs = useFlowStore((state) => state.flowOutputs);
  const addFlowInput = useFlowStore((state) => state.addFlowInput);
  const removeFlowInput = useFlowStore((state) => state.removeFlowInput);
  const updateFlowInput = useFlowStore((state) => state.updateFlowInput);
  const addFlowOutput = useFlowStore((state) => state.addFlowOutput);
  const removeFlowOutput = useFlowStore((state) => state.removeFlowOutput);
  const updateFlowOutput = useFlowStore((state) => state.updateFlowOutput);
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
            <VariableInput
              label="SDK Inputs"
              variables={flowInputs}
              placeholder="user_id"
              onAdd={addFlowInput}
              onRemove={removeFlowInput}
              onUpdate={updateFlowInput}
            />

            {/* SDK Outputs */}
            <VariableInput
              label="SDK Outputs"
              variables={flowOutputs}
              placeholder="verification_status"
              onAdd={addFlowOutput}
              onRemove={removeFlowOutput}
              onUpdate={updateFlowOutput}
            />
          </div>
        )}

        {/* Summary when collapsed */}
        {isCollapsed && (flowInputs.length > 0 || flowOutputs.length > 0) && (
          <div className="text-xs text-primary-700 bg-white/80 p-3 rounded-lg shadow-sm border border-primary-100">
            {flowInputs.length > 0 && (
              <div className="mb-2">
                <span className="font-medium">Inputs:</span>{' '}
                {flowInputs.slice(0, 3).join(', ')}{flowInputs.length > 3 ? '...' : ''}
              </div>
            )}
            {flowOutputs.length > 0 && (
              <div>
                <span className="font-medium">Outputs:</span>{' '}
                {flowOutputs.slice(0, 3).join(', ')}{flowOutputs.length > 3 ? '...' : ''}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
import { memo } from 'react';
import { useFlowStore } from '../store/flowStore';

function SdkNotes() {
  const viewMode = useFlowStore((state) => state.viewMode);
  const flowInputs = useFlowStore((state) => state.flowInputs);
  const flowOutputs = useFlowStore((state) => state.flowOutputs);

  if (viewMode !== 'tech' || (!flowInputs && !flowOutputs)) return null;

  return (
    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-20 flex flex-col gap-3">
      {/* SDK Inputs Note */}
      {flowInputs && (
        <div
          className="rounded-xl p-3 max-w-80 shadow-lg border"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            borderColor: 'rgba(6, 6, 61, 0.15)',
          }}
        >
          <div className="text-xs font-bold text-primary-700 mb-1 flex items-center">
            <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
            SDK Inputs
          </div>
          <div className="text-xs text-primary-900 whitespace-pre-wrap break-words">{flowInputs}</div>
        </div>
      )}

      {/* SDK Outputs Note */}
      {flowOutputs && (
        <div
          className="rounded-xl p-3 max-w-80 shadow-lg border"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            borderColor: 'rgba(6, 6, 61, 0.15)',
          }}
        >
          <div className="text-xs font-bold text-primary-700 mb-1 flex items-center">
            <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
            SDK Outputs
          </div>
          <div className="text-xs text-primary-900 whitespace-pre-wrap break-words">{flowOutputs}</div>
        </div>
      )}
    </div>
  );
}

export default memo(SdkNotes);
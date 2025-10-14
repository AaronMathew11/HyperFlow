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
        <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-3 max-w-80 shadow-lg">
          <div className="text-xs font-bold text-yellow-800 mb-1 flex items-center">
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
            SDK Inputs
          </div>
          <div className="text-xs text-yellow-900 whitespace-pre-wrap break-words">{flowInputs}</div>
        </div>
      )}

      {/* SDK Outputs Note */}
      {flowOutputs && (
        <div className="bg-green-100 border-2 border-green-400 rounded-lg p-3 max-w-80 shadow-lg">
          <div className="text-xs font-bold text-green-800 mb-1 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            SDK Outputs
          </div>
          <div className="text-xs text-green-900 whitespace-pre-wrap break-words">{flowOutputs}</div>
        </div>
      )}
    </div>
  );
}

export default memo(SdkNotes);
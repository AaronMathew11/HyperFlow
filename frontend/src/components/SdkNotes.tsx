import { memo } from 'react';
import { useFlowStore } from '../store/flowStore';

function SdkNotes() {
  const viewMode = useFlowStore((state) => state.viewMode);
  const flowOutputs = useFlowStore((state) => state.flowOutputs);

  if (viewMode !== 'tech') return null;

  return (
    <>
      {/* SDK Outputs - Fixed position on right side */}
      {flowOutputs && (
        <div className="fixed top-24 right-4 z-10">
          <div
            className="rounded-lg p-3 w-56 shadow-lg border"
            style={{
              background: 'rgba(59, 130, 246, 0.08)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderColor: 'rgba(59, 130, 246, 0.25)',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-blue-500 rounded-md flex items-center justify-center">
                <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div className="text-xs font-semibold text-blue-800">SDK Outputs</div>
            </div>
            <div className="bg-white/70 rounded-md p-2 border border-blue-200/30">
              <div className="text-xs text-gray-800 whitespace-pre-wrap break-words font-mono leading-tight">
                {flowOutputs}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(SdkNotes);
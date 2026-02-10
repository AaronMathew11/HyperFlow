import { memo } from 'react';
import { NodeProps } from 'reactflow';
import { useFlowStore } from '../store/flowStore';

interface SdkInputsNodeData {
  label: string;
}

function SdkInputsNode({ data }: NodeProps<SdkInputsNodeData>) {
  const flowInputs = useFlowStore((state) => state.flowInputs);

  if (!flowInputs) return null;

  return (
    <div
      className="rounded-lg p-3 w-48 shadow-lg border pointer-events-none"
      style={{
        background: 'rgba(34, 197, 94, 0.08)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderColor: 'rgba(34, 197, 94, 0.25)',
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className="w-4 h-4 bg-green-500 rounded-md flex items-center justify-center">
          <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <div className="text-xs font-semibold text-green-800">SDK Inputs</div>
      </div>
      <div className="bg-white/70 rounded-md p-2 border border-green-200/30">
        <div className="text-xs text-gray-800 whitespace-pre-wrap break-words font-mono leading-tight">
          {flowInputs}
        </div>
      </div>
    </div>
  );
}

export default memo(SdkInputsNode);
import { useState, useEffect } from 'react';
import Canvas from '../../internal/components/Canvas';
import { Workflow } from '../../../shared/types';
import { useFlowStore } from '../../internal/store/flowStore';

interface FlowData {
  nodes: any[];
  edges: any[];
  flowInputs?: string;
  flowOutputs?: string;
  flowType?: 'sdk' | 'api';
}

interface Props {
  workflow: Workflow;
  flowData: FlowData;
}

function parseList(value?: string): string[] {
  if (!value) return [];
  return value.split(',').map(s => s.trim()).filter(Boolean);
}

const CHAR_LIMIT = 120;

function ExpandableText({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const needsTruncation = text.length > CHAR_LIMIT;
  return (
    <span className="text-sm text-gray-600 leading-relaxed">
      {needsTruncation && !expanded ? text.slice(0, CHAR_LIMIT) + '…' : text}
      {needsTruncation && (
        <button
          onClick={() => setExpanded(v => !v)}
          className="ml-1 text-indigo-500 hover:text-indigo-700 text-xs font-medium focus:outline-none"
        >
          {expanded ? 'see less' : 'see more'}
        </button>
      )}
    </span>
  );
}

export default function CustomerFlowViewer({ workflow, flowData }: Props) {
  const [ioExpanded, setIoExpanded] = useState(false);
  const viewMode = useFlowStore(s => s.viewMode);
  const toggleViewMode = useFlowStore(s => s.toggleViewMode);

  const flowType = flowData.flowType ?? workflow.flow_type ?? 'sdk';
  const isApiFlow = flowType === 'api';

  const inputs = parseList(flowData.flowInputs);
  const outputs = parseList(flowData.flowOutputs);
  const hasIO = isApiFlow && (inputs.length > 0 || outputs.length > 0);

  // Reset to business view when switching workflows
  useEffect(() => {
    if (viewMode !== 'business') toggleViewMode();
    setIoExpanded(false);
  }, [workflow.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const board = {
    id: workflow.id,
    name: workflow.name,
    description: workflow.description || '',
    user_id: '',
    flow_data: flowData,
    created_at: workflow.created_at || new Date().toISOString(),
    updated_at: workflow.updated_at || new Date().toISOString(),
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">

      {/* ── Subheader ─────────────────────────────────────────────────── */}
      <div className="flex-shrink-0 bg-white border-b border-gray-100 px-5 py-2.5 flex items-center gap-3 shadow-sm">

        {/* Business / Tech pill toggle */}
        <div className="flex bg-gray-100 rounded-lg p-0.5 gap-0.5">
          <button
            onClick={() => viewMode === 'tech' && toggleViewMode()}
            className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
              viewMode === 'business'
                ? 'bg-white shadow text-indigo-700 ring-1 ring-indigo-100'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Business View
          </button>
          <button
            onClick={() => viewMode === 'business' && toggleViewMode()}
            className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
              viewMode === 'tech'
                ? 'bg-white shadow text-indigo-700 ring-1 ring-indigo-100'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Technical View
          </button>
        </div>

        {/* Contextual hint */}
        <span className="text-xs text-gray-400 hidden sm:block">
          {viewMode === 'business'
            ? 'Shows success & failure outcomes per step'
            : 'Shows conditions, endpoints & I/O per step'}
        </span>

        {/* Flow type badge */}
        {isApiFlow && (
          <span className="ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider">
            API Flow
          </span>
        )}

        {/* I/O toggle — only for API flows with data */}
        {hasIO && (
          <button
            onClick={() => setIoExpanded(v => !v)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              ioExpanded
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                : 'bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
            Inputs & Outputs
            <svg
              className={`w-3 h-3 transition-transform ${ioExpanded ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>

      {/* ── Expandable I/O panel ───────────────────────────────────────── */}
      {hasIO && ioExpanded && (
        <div className="flex-shrink-0 border-b border-indigo-100 bg-gradient-to-r from-indigo-50/80 via-white to-purple-50/60 px-6 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">

            {inputs.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <p className="text-xs font-bold text-indigo-700 uppercase tracking-wider">Flow Inputs</p>
                  <span className="text-[10px] text-indigo-400">({inputs.length})</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {inputs.map((v, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-indigo-200 rounded-lg text-xs text-indigo-800 font-mono shadow-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {outputs.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                    </svg>
                  </div>
                  <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Flow Outputs</p>
                  <span className="text-[10px] text-emerald-400">({outputs.length})</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {outputs.map((v, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-emerald-200 rounded-lg text-xs text-emerald-800 font-mono shadow-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ── Workflow description ────────────────────────────────────────── */}
      {workflow.description && (
        <div className="flex-shrink-0 bg-gray-50 border-b border-gray-100 px-5 py-2.5">
          <ExpandableText text={workflow.description} />
        </div>
      )}

      {/* ── Canvas ─────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-hidden">
        <Canvas
          key={workflow.id}
          board={board}
          onBack={() => {}}
          readOnly={true}
          initialData={flowData}
        />
      </div>

    </div>
  );
}

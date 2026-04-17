import { memo, useState, useCallback, useRef, useMemo } from 'react';
import { Handle, Position, NodeProps, NodeResizer, useReactFlow } from 'reactflow';
import { useFlowStore } from '../../portals/internal/store/flowStore';
import type { ModuleType } from '../types/index';

interface ApiInput {
  name: string;
  type: string;
  required?: boolean;
}

interface ApiOutput {
  name: string;
  type: string;
}

interface ApiModuleNodeData {
  title: string;
  endpoint: string;
  color: string;
  icon: string;
  description?: string;
  method?: string;
  docUrl?: string;
  successNote?: string;
  failureNote?: string;
  curlExample?: string;
  successResponse?: any;
  failureResponses?: any;
  errorDetails?: any;
  cspUrls?: string[];
  ipAddresses?: string[];
  inputs?: ApiInput[];
  outputs?: ApiOutput[];
  isGeneric?: boolean;
  readOnly?: boolean; // true in customer portal, false/undefined in internal
}

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

const METHOD_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  GET:    { bg: '#ECFDF5', text: '#059669', border: '#A7F3D0' },
  POST:   { bg: '#EEF2FF', text: '#4F46E5', border: '#C7D2FE' },
  PUT:    { bg: '#FFFBEB', text: '#D97706', border: '#FDE68A' },
  PATCH:  { bg: '#FFF7ED', text: '#EA580C', border: '#FDBA74' },
  DELETE: { bg: '#FEF2F2', text: '#DC2626', border: '#FCA5A5' },
};

function deriveMethod(curlExample?: string, storedMethod?: string): string {
  if (storedMethod && METHODS.includes(storedMethod)) return storedMethod;
  if (curlExample) {
    const match = curlExample.match(/-X\s+(\w+)/i);
    if (match) return match[1].toUpperCase();
  }
  return 'POST';
}

function extractKeys(obj: any): string[] {
  try {
    const parsed = typeof obj === 'string' ? JSON.parse(obj) : obj;
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      const inner = parsed.data || parsed.result || parsed.response || parsed;
      if (typeof inner === 'object' && !Array.isArray(inner)) {
        return Object.keys(inner).slice(0, 6);
      }
    }
  } catch { /* ignore */ }
  return [];
}

// ── tiny inline input ───────────────────────────────────────────────────────
function InlineInput({
  value, onChange, placeholder, className = '', multiline = false,
}: {
  value: string; onChange: (v: string) => void; placeholder?: string;
  className?: string; multiline?: boolean;
}) {
  if (multiline) {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={2}
        className={`w-full text-[11px] bg-white/80 border border-indigo-200 rounded-lg px-2 py-1.5 resize-none focus:outline-none focus:ring-1 focus:ring-indigo-400 text-gray-800 placeholder-gray-400 ${className}`}
      />
    );
  }
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full text-[11px] bg-white/80 border border-indigo-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-400 text-gray-800 placeholder-gray-400 ${className}`}
    />
  );
}

// ── variable row (input/output) ───────────────────────────────────────────
function VarRow({
  name, type, required, accentColor, onRemove, onChangeName, onChangeType,
}: {
  name: string; type: string; required?: boolean; accentColor: string;
  onRemove: () => void; onChangeName: (v: string) => void; onChangeType: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-1 group/row">
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: required ? '#EF4444' : accentColor }}
      />
      <input
        value={name}
        onChange={(e) => onChangeName(e.target.value)}
        placeholder="field_name"
        className="flex-1 min-w-0 text-[10px] font-mono bg-transparent border-b border-transparent focus:border-indigo-300 focus:outline-none text-gray-700 placeholder-gray-300 px-0.5"
      />
      <input
        value={type}
        onChange={(e) => onChangeType(e.target.value)}
        placeholder="string"
        className="w-12 text-[10px] text-gray-400 font-mono bg-transparent border-b border-transparent focus:border-indigo-300 focus:outline-none px-0.5"
      />
      <button
        onClick={onRemove}
        className="opacity-0 group-hover/row:opacity-100 ml-0.5 text-gray-300 hover:text-red-400 transition-all flex-shrink-0"
      >
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

function ApiModuleNode({ id, data, selected }: NodeProps<ApiModuleNodeData>) {
  const viewMode = useFlowStore((state) => state.viewMode);
  const flowType = useFlowStore((state) => state.flowType);
  const sdkMode = useFlowStore((state) => state.sdkMode);
  const { setNodes, getNodes } = useReactFlow();

  // ── local editable state ────────────────────────────────────────────────
  const [title, setTitle] = useState(data.title || 'Generic Module');
  const [endpoint, setEndpoint] = useState(data.endpoint || 'https://');
  const [description, setDescription] = useState(data.description || '');
  const [method, setMethod] = useState(deriveMethod(data.curlExample, data.method));
  const [successNote, setSuccessNote] = useState(data.successNote || '');
  const [failureNote, setFailureNote] = useState(data.failureNote || '');
  const [docUrl, setDocUrl] = useState(data.docUrl || data.endpoint || '');
  const [inputs, setInputs] = useState<ApiInput[]>(data.inputs || []);
  const [outputs, setOutputs] = useState<ApiOutput[]>(data.outputs || []);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [moduleDescription, setModuleDescription] = useState(data.moduleDescription || 'Custom Module');
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  // Get group information for this node
  const nodes = getNodes();
  const currentNode = nodes.find(node => node.id === id);
  const parentGroupNode = currentNode?.parentNode ? nodes.find(node => node.id === currentNode.parentNode) : null;
  const groupColor = parentGroupNode?.data?.color || null;
  
  const isGeneric = data.isGeneric ?? false;
  // editable = not readOnly (internal portal). Generic nodes are always editable when not readOnly.
  // Doc-linked nodes are also editable internally (title, description, doc URL, inputs, outputs).
  const isEditable = !(data.readOnly ?? false);
  const accentColor = data.color || '#6366F1';
  const methodStyle = METHOD_COLORS[method] || METHOD_COLORS.POST;

  // Debug logging
  console.log('ApiModuleNode Debug:', { flowType, isGeneric, accentColor, title });

  // Output keys for non-generic nodes (read-only doc nodes)
  const outputKeys = data.outputs?.map(o => o.name) ?? extractKeys(data.successResponse);
  // Persist all local state back into the node data store
  const persistData = useCallback(() => {
    setNodes((nodes) =>
      nodes.map((n) =>
        n.id === id
          ? {
              ...n,
              data: {
                ...n.data,
                title,
                endpoint,
                description,
                method,
                docUrl,
                successNote,
                failureNote,
                inputs,
                outputs,
                moduleDescription,
              },
            }
          : n
      )
    );
  }, [id, setNodes, title, endpoint, description, method, docUrl, successNote, failureNote, inputs, outputs, moduleDescription]);

  // Auto-persist on blur of the whole node area
  const nodeRef = useRef<HTMLDivElement>(null);

  const addInput = () => setInputs([...inputs, { name: '', type: 'string' }]);
  const addOutput = () => setOutputs([...outputs, { name: '', type: 'string' }]);
  const removeInput = (i: number) => setInputs(inputs.filter((_, idx) => idx !== i));
  const removeOutput = (i: number) => setOutputs(outputs.filter((_, idx) => idx !== i));
  const updateInput = (i: number, field: 'name' | 'type', val: string) =>
    setInputs(inputs.map((inp, idx) => idx === i ? { ...inp, [field]: val } : inp));
  const updateOutput = (i: number, field: 'name' | 'type', val: string) =>
    setOutputs(outputs.map((out, idx) => idx === i ? { ...out, [field]: val } : out));

  return (
    <div className="relative group" ref={nodeRef} onBlur={isEditable ? persistData : undefined}>
      <NodeResizer
        color={flowType === 'sdk' ? accentColor : "#9393D0"}
        isVisible={selected}
        minWidth={flowType === 'sdk' ? 280 : 200}
        minHeight={isGeneric ? (viewMode === 'tech' ? 380 : 220) : (viewMode === 'tech' ? 260 : 180)}
      />
      <Handle
        type="target"
        position={Position.Top}
        className={flowType === 'sdk' ? "!w-3 !h-3 !border-2 !border-white" : "w-3 h-3"}
        style={flowType === 'sdk' ? { background: accentColor } : {}}
      />

      {flowType === 'sdk' && selected && (
        <div
          className="absolute -inset-[2px] rounded-2xl pointer-events-none"
          style={{ boxShadow: `0 0 0 2px ${accentColor}, 0 0 20px ${accentColor}35` }}
        />
      )}

      {/* Card - Different styles for SDK vs API flow */}
      <div
        className="p-4 rounded-xl min-w-[200px] relative border-2 bg-white shadow-sm hover:shadow-md h-full w-full flex flex-col justify-start"
        style={{
          borderColor: selected ? '#9393D0' : '#E8E8ED',
        }}
      >
        {/* Group indicator circle - top right corner */}
        {groupColor && (
          <div
            className="absolute top-2 right-2 w-3 h-3 rounded-full border border-white shadow-sm"
            style={{ backgroundColor: groupColor, zIndex: 20 }}
            title="Part of group"
          />
        )}

        <div className="flex items-center gap-3 mb-2">
          <div
            className="flex-shrink-0 flex items-center justify-center rounded-lg bg-primary-50 text-primary-600"
            style={{
              width: 'clamp(36px, 12%, 48px)',
              height: 'clamp(36px, 12%, 48px)',
            }}
          >
            {isGeneric ? (
              <svg 
                style={{
                  width: 'clamp(20px, 60%, 28px)',
                  height: 'clamp(20px, 60%, 28px)'
                }}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" 
                />
              </svg>
            ) : (
              <span style={{
                width: 'clamp(20px, 60%, 28px)',
                height: 'clamp(20px, 60%, 28px)',
                fontSize: 'clamp(16px, 2.5vw, 20px)'
              }}>
                {data.icon || '🔗'}
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <div className="font-semibold text-primary-900 break-words" style={{ fontSize: 'clamp(13px, 3vw, 16px)' }}>
                {isEditingTitle ? (
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={() => setIsEditingTitle(false)}
                    onKeyDown={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
                    className="w-full bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                    placeholder="Enter module title..."
                    autoFocus
                  />
                ) : (
                  <span
                    className={isGeneric ? "cursor-pointer hover:text-blue-600" : ""}
                    onClick={() => isGeneric && setIsEditingTitle(true)}
                  >
                    {title || 'Untitled Module'}
                  </span>
                )}
              </div>
              {flowType === 'api' && (
                isGeneric ? (
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full border-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    {METHODS.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                ) : (
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                    {method}
                  </span>
                )
              )}
            </div>
            <div className="text-primary-600 break-words mt-0.5" style={{ fontSize: 'clamp(11px, 2.5vw, 13px)' }}>
              {flowType === 'api' ? (isGeneric ? 'Generic Module' : 'REST API') : (
                isGeneric ? (
                  isEditingDescription ? (
                    <input
                      value={moduleDescription}
                      onChange={(e) => setModuleDescription(e.target.value)}
                      onBlur={() => setIsEditingDescription(false)}
                      onKeyDown={(e) => e.key === 'Enter' && setIsEditingDescription(false)}
                      className="w-full bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none text-primary-600"
                      placeholder="Enter module type..."
                      autoFocus
                      style={{ fontSize: 'clamp(11px, 2.5vw, 13px)' }}
                    />
                  ) : (
                    <span
                      className="cursor-pointer hover:text-blue-600"
                      onClick={() => setIsEditingDescription(true)}
                    >
                      {moduleDescription}
                    </span>
                  )
                ) : 'api-module'
              )}
            </div>
          </div>
        </div>

        {/* SDK Flow - Show description, success, and failure criteria directly on node (Advanced mode only) */}
        {flowType === 'sdk' && sdkMode === 'advanced' && (
          <div className="mt-3 space-y-2">
            {/* Description */}
            <div className="group relative">
              {isGeneric ? (
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what this module does..."
                  rows={2}
                  className="w-full text-xs p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              ) : (
                <div className="text-xs text-gray-700 break-words leading-relaxed">
                  {data.description || 'This API fetches verification information for the submitted document.'}
                </div>
              )}
            </div>

            <div className="space-y-1">
              {/* Success */}
              <div className="group relative">
                <span className="text-xs font-semibold text-green-700">Success:</span>
                <div className="text-xs text-green-600 mt-0.5">
                  {data.successNote || 'Returns expected JSON payload with verification results.'}
                </div>
              </div>

              {/* Failure */}
              <div className="group relative">
                <span className="text-xs font-semibold text-red-700">Failure:</span>
                <div className="text-xs text-red-600 mt-0.5">
                  {data.failureNote || 'Returns error message with details about the failure.'}
                </div>
              </div>
            </div>

            {/* Endpoint URL */}
            {isGeneric && (
              <div className="mt-2">
                <label className="text-xs font-semibold text-gray-700">Endpoint:</label>
                <input
                  type="text"
                  value={endpoint}
                  onChange={(e) => setEndpoint(e.target.value)}
                  placeholder="https://api.example.com/endpoint"
                  className="w-full text-xs p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1"
                />
              </div>
            )}
          </div>
        )}


        {/* ── TECH VIEW BODY ── */}
        {viewMode === 'tech' && !isGeneric && (
          <div className="px-4 pb-4 flex flex-col gap-2.5 border-t border-gray-100 pt-3">

            {/* Documentation link */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1 block">Documentation</label>
              {isEditable ? (
                <div className="flex items-center gap-1.5 rounded-lg overflow-hidden border border-indigo-200 bg-indigo-50/60">
                  <svg className="w-3 h-3 ml-2.5 flex-shrink-0 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <input
                    type="text"
                    value={docUrl}
                    onChange={(e) => setDocUrl(e.target.value)}
                    placeholder="https://docs.example.com/api"
                    className="flex-1 text-[10px] font-mono bg-transparent focus:outline-none py-1.5 pr-2.5 text-indigo-700 placeholder-indigo-300"
                  />
                </div>
              ) : (
                <a
                  href={data.docUrl || data.endpoint}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:opacity-80 transition-opacity group/link"
                  style={{ background: `${accentColor}0C`, border: `1px solid ${accentColor}1A` }}
                >
                  <svg className="w-3 h-3 flex-shrink-0" style={{ color: accentColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span
                    className="text-[10px] font-mono truncate group-hover/link:underline"
                    style={{ color: accentColor }}
                    title={data.docUrl || data.endpoint}
                  >
                    {data.docUrl || data.endpoint}
                  </span>
                </a>
              )}
            </div>

            {/* Inputs / Outputs */}
            <div className="grid grid-cols-2 gap-2">
              {/* Inputs */}
              <div
                className="rounded-xl p-2.5 border"
                style={{ background: `${accentColor}07`, borderColor: `${accentColor}25` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-3 h-3 flex-shrink-0" style={{ color: accentColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: accentColor }}>Inputs</span>
                  </div>
                  {isEditable && (
                    <button onClick={addInput} className="text-[9px] font-bold hover:opacity-80 transition-opacity" style={{ color: accentColor }}>
                      + Add
                    </button>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  {isEditable ? (
                    inputs.length > 0 ? inputs.map((inp, i) => (
                      <VarRow
                        key={i}
                        name={inp.name}
                        type={inp.type}
                        required={inp.required}
                        accentColor={accentColor}
                        onRemove={() => removeInput(i)}
                        onChangeName={(v) => updateInput(i, 'name', v)}
                        onChangeType={(v) => updateInput(i, 'type', v)}
                      />
                    )) : (
                      <span className="text-[10px] text-gray-400 italic">Click + Add</span>
                    )
                  ) : (
                    data.inputs && data.inputs.length > 0 ? data.inputs.slice(0, 6).map((inp) => (
                      <div key={inp.name} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: inp.required ? '#EF4444' : '#9CA3AF' }} />
                        <span className="text-[10px] font-mono text-gray-700 truncate">{inp.name}</span>
                        <span className="text-[9px] text-gray-400 ml-auto">{inp.type}</span>
                      </div>
                    )) : (
                      <span className="text-[10px] text-gray-400 italic">No inputs defined</span>
                    )
                  )}
                </div>
              </div>

              {/* Outputs */}
              <div className="bg-emerald-50 rounded-xl p-2.5 border border-emerald-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-3 h-3 text-emerald-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Outputs</span>
                  </div>
                  {isEditable && (
                    <button onClick={addOutput} className="text-[9px] font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
                      + Add
                    </button>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  {isEditable ? (
                    outputs.length > 0 ? outputs.map((out, i) => (
                      <VarRow
                        key={i}
                        name={out.name}
                        type={out.type}
                        accentColor="#10B981"
                        onRemove={() => removeOutput(i)}
                        onChangeName={(v) => updateOutput(i, 'name', v)}
                        onChangeType={(v) => updateOutput(i, 'type', v)}
                      />
                    )) : (
                      <span className="text-[10px] text-gray-400 italic">Click + Add</span>
                    )
                  ) : (
                    data.outputs && data.outputs.length > 0 ? data.outputs.slice(0, 6).map((out) => (
                      <div key={out.name} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span className="text-[10px] font-mono text-gray-700 truncate">{out.name}</span>
                        <span className="text-[9px] text-gray-400 ml-auto">{out.type}</span>
                      </div>
                    )) : outputKeys.length > 0 ? outputKeys.map((k) => (
                      <div key={k} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span className="text-[10px] font-mono text-gray-700 truncate">{k}</span>
                      </div>
                    )) : (
                      <span className="text-[10px] text-gray-400 italic">No outputs defined</span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div
          className="px-4 py-1.5 flex items-center justify-between border-t"
          style={{ borderColor: 'rgba(226,232,240,0.5)', background: 'rgba(248,250,252,0.7)' }}
        >
          {!isGeneric && (
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#10B981' }} />
              <span className="text-[10px] text-gray-400 font-medium">Active</span>
            </div>
          )}
          {/* Only show view mode tag for non-generic modules */}
          {!isGeneric && (
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{
                background: viewMode === 'business' ? '#EEF2FF' : '#0f0f1a',
                color: viewMode === 'business' ? '#6366F1' : '#60A5FA',
              }}
            >
              {viewMode === 'business' ? 'Business' : 'Tech'} View
            </span>
          )}
        </div>
      </div>

      <Handle 
        type="source" 
        position={Position.Bottom} 
        className={flowType === 'sdk' ? "!w-3 !h-3 !border-2 !border-white" : "w-3 h-3"} 
        style={flowType === 'sdk' ? { background: accentColor } : {}}
      />

      {flowType === 'sdk' && (
        <style>{`
          .custom-scrollbar::-webkit-scrollbar { width: 3px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 4px; }
        `}</style>
      )}
    </div>
  );
}

export default memo(ApiModuleNode);
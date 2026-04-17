import { memo, useState, useCallback, useRef, useMemo, useEffect } from 'react';
import { Handle, Position, NodeProps, NodeResizer, useReactFlow, useUpdateNodeInternals } from 'reactflow';
import { useFlowStore } from '../../portals/internal/store/flowStore';
import type { ModuleType } from '../types/index';
import { extractCspUrlsForModule } from '../utils/cspUtils';

interface ApiInput {
  name: string;
  type: string;
  required?: boolean;
}

interface ApiOutput {
  name: string;
  type: string;
  required?: boolean;
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
  condition?: string;
  isGeneric?: boolean;
  readOnly?: boolean;
}

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

const METHOD_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  GET: { bg: '#ECFDF5', text: '#059669', border: '#A7F3D0' },
  POST: { bg: '#EEF2FF', text: '#4F46E5', border: '#C7D2FE' },
  PUT: { bg: '#FFFBEB', text: '#D97706', border: '#FDE68A' },
  PATCH: { bg: '#FFF7ED', text: '#EA580C', border: '#FDBA74' },
  DELETE: { bg: '#FEF2F2', text: '#DC2626', border: '#FCA5A5' },
};

function deriveMethod(curlExample?: string, storedMethod?: string): string {
  if (storedMethod && METHODS.includes(storedMethod)) return storedMethod;
  if (curlExample) {
    // matches both -X GET and --request GET
    const match = curlExample.match(/(?:-X|--request)\s+(\w+)/i);
    if (match) return match[1].toUpperCase();
    // no explicit method + no request body → implicit GET
    if (!/(?:\s-d|\s--data|\s--data-raw|\s-F|\s--form)\s/.test(curlExample)) return 'GET';
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

function VarRow({
  name, type, required, onRemove, onChangeName, onChangeType, onToggleRequired,
}: {
  name: string; type: string; required?: boolean;
  onRemove: () => void; onChangeName: (v: string) => void; onChangeType: (v: string) => void;
  onToggleRequired?: () => void;
}) {
  return (
    <div className="flex items-center gap-1 group/row">
      <button
        onClick={onToggleRequired}
        title={required ? 'Required — click to make optional' : 'Optional — click to make required'}
        className="w-2 h-2 rounded-full flex-shrink-0 hover:scale-125 focus:outline-none transition-transform cursor-pointer"
        style={{ background: required ? '#EF4444' : '#9CA3AF' }}
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

// Card minimum width — height grows with content
const CARD_WIDTH = 300;

function ApiModuleNode({ id, data, selected }: NodeProps<ApiModuleNodeData>) {
  const viewMode = useFlowStore((state) => state.viewMode);
  const flowType = useFlowStore((state) => state.flowType);
  const { setNodes, getNodes } = useReactFlow();
  const updateNodeInternals = useUpdateNodeInternals();

  // Get parent group color for group indicator
  const nodes = getNodes();
  const currentNode = nodes.find(n => n.id === id);
  const parentGroup = currentNode?.parentNode ? nodes.find(n => n.id === currentNode.parentNode) : null;
  const groupColor = parentGroup?.data?.color;

  const [title, setTitle] = useState(data.title || 'Generic API');
  const [endpoint] = useState(data.endpoint || 'https://');
  const [description, setDescription] = useState(data.description || '');
  const [method, setMethod] = useState(deriveMethod(data.curlExample, data.method));
  const [successNote, setSuccessNote] = useState(data.successNote || '');
  const [failureNote, setFailureNote] = useState(data.failureNote || '');
  const [docUrl, setDocUrl] = useState(data.docUrl || data.endpoint || '');
  const [inputs, setInputs] = useState<ApiInput[]>(data.inputs || []);
  const [outputs, setOutputs] = useState<ApiOutput[]>(data.outputs || []);
  const [condition, setCondition] = useState(data.condition || '');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [showInputs, setShowInputs] = useState(false);
  const [showOutputs, setShowOutputs] = useState(false);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

  // Dynamically clear fixed heights so the node shrinks when content is hidden
  useEffect(() => {
    setNodes((nodes) =>
      nodes.map((n) => {
        if (n.id === id && n.style?.height) {
          const { height, ...restStyle } = n.style;
          return { ...n, style: restStyle, width: n.width, height: undefined };
        }
        return n;
      })
    );

    if (nodeRef.current) {
      const parentNode = nodeRef.current.closest('.react-flow__node') as HTMLElement;
      if (parentNode) {
        parentNode.style.height = 'auto'; // Force height to auto so it shrinks
        parentNode.style.minHeight = 'min-content';
      }
      // Give DOM time to reflow before repositioning handles
      requestAnimationFrame(() => {
        updateNodeInternals(id);
      });
    }
  }, [viewMode, showInputs, showOutputs, inputs.length, outputs.length, id, setNodes, updateNodeInternals]);

  const tempModule: ModuleType = useMemo(() => ({
    id: 'temp-api-module',
    label: title,
    description: 'Generic API Module',
    color: data.color,
    icon: data.icon,
    cspUrls: data.cspUrls,
    ipAddresses: data.ipAddresses,
    apiInfo: {
      endpoint,
      method: 'POST' as const,
      inputVariables: [],
      outputVariables: [],
      successCriteria: '',
      documentationUrl: '',
      curlExample: '',
      nextApiRecommendations: [],
    },
  }), [title, endpoint, data.color, data.icon, data.cspUrls, data.ipAddresses]);

  const dynamicCspUrls = useMemo(() => extractCspUrlsForModule(tempModule), [tempModule]);

  const isGeneric = data.isGeneric ?? false;
  const isEditable = !(data.readOnly ?? false);
  const accentColor = data.color || '#6366F1';
  const methodStyle = METHOD_COLORS[method] || METHOD_COLORS.POST;
  const outputKeys = data.outputs?.map(o => o.name) ?? extractKeys(data.successResponse);

  const nodeRef = useRef<HTMLDivElement>(null);

  const persistData = useCallback(() => {
    setNodes((nodes) =>
      nodes.map((n) =>
        n.id !== id ? n : {
          ...n,
          data: { ...n.data, title, endpoint, description, method, docUrl, successNote, failureNote, inputs, outputs, cspUrls: dynamicCspUrls, condition },
        }
      )
    );
  }, [id, setNodes, title, endpoint, description, method, docUrl, successNote, failureNote, inputs, outputs, dynamicCspUrls, condition]);

  const addInput = () => setInputs(p => [...p, { name: '', type: 'string', required: false }]);
  const addOutput = () => setOutputs(p => [...p, { name: '', type: 'string' }]);
  const removeInput = (i: number) => setInputs(p => p.filter((_, idx) => idx !== i));
  const removeOutput = (i: number) => setOutputs(p => p.filter((_, idx) => idx !== i));
  const updateInput = (i: number, f: 'name' | 'type', v: string) =>
    setInputs(p => p.map((x, idx) => idx === i ? { ...x, [f]: v } : x));
  const updateOutput = (i: number, f: 'name' | 'type', v: string) =>
    setOutputs(p => p.map((x, idx) => idx === i ? { ...x, [f]: v } : x));
  const toggleInputRequired = (i: number) =>
    setInputs(p => p.map((x, idx) => idx === i ? { ...x, required: !x.required } : x));
  const toggleOutputRequired = (i: number) =>
    setOutputs(p => p.map((x, idx) => idx === i ? { ...x, required: !x.required } : x));

  return (
    <div className="relative group w-full" ref={nodeRef} onBlur={isEditable ? persistData : undefined}>
      <NodeResizer
        color={flowType === 'sdk' ? accentColor : "#9393D0"}
        isVisible={selected}
        minWidth={CARD_WIDTH}
        minHeight={120}
      />
      <Handle
        type="target"
        position={Position.Top}
        className={flowType === 'sdk' ? "!w-3 !h-3 !border-2 !border-white" : "w-3 h-3"}
        style={flowType === 'sdk' ? { background: accentColor } : {}}
      />

      {selected && (
        <div
          className="absolute -inset-[2px] rounded-2xl pointer-events-none"
          style={{ boxShadow: `0 0 0 2px ${accentColor}, 0 0 20px ${accentColor}35` }}
        />
      )}

      {/* Card — height grows with content */}
      <div
        className="rounded-2xl flex flex-col overflow-hidden w-full"
        style={{
          background: 'linear-gradient(150deg, #ffffff 0%, #f8f9ff 100%)',
          border: selected ? `2px solid ${accentColor}` : '2px solid rgba(226,232,240,0.9)',
          boxShadow: selected
            ? `0 8px 30px ${accentColor}20, 0 2px 8px rgba(0,0,0,0.07)`
            : '0 2px 12px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.04)',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
      >
        {/* Accent bar */}
        <div style={{ height: 3, flexShrink: 0, background: `linear-gradient(90deg, ${accentColor}, ${accentColor}70)` }} />

        {/* Group indicator circle - top right corner */}
        {groupColor && (
          <div
            className="absolute top-2 right-2 w-3 h-3 rounded-full border border-white shadow-sm"
            style={{ backgroundColor: groupColor, zIndex: 20 }}
            title="Part of group"
          />
        )}

        {/* ── HEADER (fixed height) ── */}
        <div className="px-4 pt-3 pb-2.5" style={{ flexShrink: 0 }}>
          <div className="flex items-center gap-3">
            {/* Icon */}
            <div
              className="flex-shrink-0 flex items-center justify-center rounded-xl text-white"
              style={{
                width: 36, height: 36,
                background: `linear-gradient(135deg, ${accentColor}, ${accentColor}bb)`,
                fontSize: 16,
                boxShadow: `0 3px 10px ${accentColor}40`,
              }}
            >
              {data.icon || '🔗'}
            </div>

            <div className="flex-1 min-w-0">
              {/* Method + type */}
              <div className="flex items-center gap-1.5 mb-1">
                {isEditable ? (
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="text-[10px] font-bold rounded px-1 py-0.5 border focus:outline-none cursor-pointer flex-shrink-0"
                    style={{ background: methodStyle.bg, color: methodStyle.text, borderColor: methodStyle.border }}
                  >
                    {METHODS.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                ) : (
                  <span
                    className="flex-shrink-0 px-1.5 py-0.5 text-[10px] font-bold rounded tracking-wider"
                    style={{ background: methodStyle.bg, color: methodStyle.text, border: `1px solid ${methodStyle.border}` }}
                  >
                    {method}
                  </span>
                )}
                <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider truncate">
                  {isGeneric ? 'Generic API' : 'REST API'}
                </span>
              </div>

              {/* Title — always single line */}
              {isEditable && isEditingTitle ? (
                <input
                  type="text"
                  value={title}
                  autoFocus
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={() => setIsEditingTitle(false)}
                  onKeyDown={(e) => { if (e.key === 'Enter') setIsEditingTitle(false); }}
                  className="w-full text-sm font-bold text-gray-900 bg-transparent border-0 border-b-2 focus:outline-none pb-0.5"
                  style={{ borderColor: accentColor }}
                />
              ) : (
                <div
                  className="text-sm font-bold text-gray-900 truncate leading-snug"
                  title={title}
                  onDoubleClick={isEditable ? () => setIsEditingTitle(true) : undefined}
                  style={{ cursor: isEditable ? 'text' : 'default' }}
                >
                  {title}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {isEditable ? (
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what this API does..."
              rows={2}
              className="mt-2 w-full text-[11px] bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 resize-none focus:outline-none focus:ring-1 focus:ring-indigo-300 text-gray-700 placeholder-gray-400"
            />
          ) : data.description ? (
            <div className="mt-1.5">
              <p
                className="text-[11px] text-gray-500 leading-relaxed"
                style={descriptionExpanded ? undefined : {
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {data.description}
              </p>
              {data.description.length > 80 && (
                <button
                  className="text-[10px] text-indigo-500 hover:text-indigo-700 font-medium mt-0.5 focus:outline-none"
                  onClick={() => setDescriptionExpanded(v => !v)}
                >
                  {descriptionExpanded ? '...see less' : '...see more'}
                </button>
              )}
            </div>
          ) : null}
        </div>

        {/* ── BODY (grows with content) ── */}
        <div className="border-t border-gray-100">

          {/* BUSINESS VIEW */}
          {viewMode === 'business' && (
            <div className="px-4 py-3 flex flex-col gap-2">
              {/* Success */}
              <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Success</span>
                  <span className="ml-auto text-[9px] bg-emerald-200 text-emerald-700 px-1.5 py-0.5 rounded-full font-semibold">200 OK</span>
                </div>
                {isEditable ? (
                  <InlineInput value={successNote} onChange={setSuccessNote} placeholder="e.g. Returns user verification result..." multiline />
                ) : (
                  <p
                    className="text-[11px] text-emerald-800 leading-relaxed"
                    style={{ overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
                  >
                    {successNote || (data.successResponse ? 'Returns expected JSON payload.' : 'Standard 200 OK response.')}
                  </p>
                )}
                {!isEditable && outputKeys.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {outputKeys.slice(0, 4).map((k) => (
                      <span key={k} className="text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-mono">{k}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* Failure */}
              <div className="bg-red-50 rounded-xl p-3 border border-red-100">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider">Failure</span>
                  {(data.failureResponses || data.errorDetails) && (
                    <span className="ml-auto text-[9px] bg-red-200 text-red-700 px-1.5 py-0.5 rounded-full font-semibold">4xx / 5xx</span>
                  )}
                </div>
                {isEditable ? (
                  <InlineInput value={failureNote} onChange={setFailureNote} placeholder="e.g. Returns 401 if token is invalid..." multiline />
                ) : (
                  <p
                    className="text-[11px] text-red-800 leading-relaxed"
                    style={{ overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
                  >
                    {failureNote ? `Error: ${failureNote}` : 'Returns error code and details on failure.'}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* TECH VIEW */}
          {viewMode === 'tech' && (
            <div className="px-4 py-3 flex flex-col gap-2.5">

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
                      className="flex-1 text-[10px] font-mono bg-transparent focus:outline-none py-1.5 pr-2.5 text-indigo-700 placeholder-indigo-300 min-w-0"
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
                    <span className="text-[10px] font-mono truncate group-hover/link:underline" style={{ color: accentColor }}>
                      {data.docUrl || data.endpoint}
                    </span>
                  </a>
                )}
              </div>

              {/* Inputs — collapsible */}
              <div className="rounded-xl border overflow-hidden" style={{ borderColor: `${accentColor}25` }}>
                <button
                  onClick={() => setShowInputs(v => !v)}
                  className="w-full flex items-center gap-1.5 px-2.5 py-2"
                  style={{ background: `${accentColor}0D` }}
                >
                  <svg className="w-3 h-3 flex-shrink-0" style={{ color: accentColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: accentColor }}>Inputs</span>
                  <span className="text-[9px] text-gray-400 font-medium">
                    {isEditable ? inputs.length : (data.inputs?.length ?? 0)}
                  </span>
                  <svg
                    className="w-3 h-3 text-gray-400 ml-auto transition-transform"
                    style={{ transform: showInputs ? 'rotate(0deg)' : 'rotate(-90deg)' }}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  {isEditable && showInputs && (
                    <span
                      role="button"
                      className="text-[9px] font-bold hover:opacity-80 ml-1"
                      style={{ color: accentColor }}
                      onClick={(e) => { e.stopPropagation(); addInput(); }}
                    >+ Add</span>
                  )}
                </button>
                {showInputs && (
                  <div className="px-2.5 pb-2.5 pt-1.5 flex flex-col gap-1" style={{ background: `${accentColor}05` }}>
                    {isEditable ? (
                      inputs.length > 0
                        ? inputs.map((inp, i) => (
                          <VarRow key={i} name={inp.name} type={inp.type} required={inp.required}
                            onRemove={() => removeInput(i)} onChangeName={(v) => updateInput(i, 'name', v)} onChangeType={(v) => updateInput(i, 'type', v)}
                            onToggleRequired={() => toggleInputRequired(i)} />
                        ))
                        : <span className="text-[10px] text-gray-400 italic">Click + Add</span>
                    ) : (
                      data.inputs && data.inputs.length > 0
                        ? data.inputs.map((inp) => (
                          <div key={inp.name} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" title={inp.required ? 'Required' : 'Optional'} style={{ background: inp.required ? '#EF4444' : '#9CA3AF' }} />
                            <span className="text-[10px] font-mono text-gray-700 truncate">{inp.name}</span>
                            <span className="text-[9px] text-gray-400 ml-auto flex-shrink-0">{inp.type}</span>
                          </div>
                        ))
                        : <span className="text-[10px] text-gray-400 italic">None</span>
                    )}
                  </div>
                )}
              </div>

              {/* Outputs — collapsible */}
              <div className="rounded-xl border border-emerald-100 overflow-hidden">
                <button
                  onClick={() => setShowOutputs(v => !v)}
                  className="w-full flex items-center gap-1.5 px-2.5 py-2 bg-emerald-50"
                >
                  <svg className="w-3 h-3 text-emerald-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Outputs</span>
                  <span className="text-[9px] text-gray-400 font-medium">
                    {isEditable ? outputs.length : (data.outputs?.length ?? outputKeys.length)}
                  </span>
                  <svg
                    className="w-3 h-3 text-gray-400 ml-auto transition-transform"
                    style={{ transform: showOutputs ? 'rotate(0deg)' : 'rotate(-90deg)' }}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  {isEditable && showOutputs && (
                    <span
                      role="button"
                      className="text-[9px] font-bold text-emerald-600 hover:text-emerald-700 ml-1"
                      onClick={(e) => { e.stopPropagation(); addOutput(); }}
                    >+ Add</span>
                  )}
                </button>
                {showOutputs && (
                  <div className="px-2.5 pb-2.5 pt-1.5 flex flex-col gap-1 bg-emerald-50/40">
                    {isEditable ? (
                      outputs.length > 0
                        ? outputs.map((out, i) => (
                          <VarRow key={i} name={out.name} type={out.type}
                            onRemove={() => removeOutput(i)} onChangeName={(v) => updateOutput(i, 'name', v)} onChangeType={(v) => updateOutput(i, 'type', v)}
                            onToggleRequired={() => toggleOutputRequired(i)} />
                        ))
                        : <span className="text-[10px] text-gray-400 italic">Click + Add</span>
                    ) : (
                      (data.outputs && data.outputs.length > 0 ? data.outputs : outputKeys.map(k => ({ name: k, type: '' })))
                        .map((out) => (
                          <div key={out.name} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                            <span className="text-[10px] font-mono text-gray-700 truncate">{out.name}</span>
                            {out.type && <span className="text-[9px] text-gray-400 ml-auto flex-shrink-0">{out.type}</span>}
                          </div>
                        ))
                    )}
                    {!isEditable && (data.outputs?.length ?? outputKeys.length) === 0 && (
                      <span className="text-[10px] text-gray-400 italic">None</span>
                    )}
                  </div>
                )}
              </div>

              {/* Condition */}
              <div className="rounded-xl border border-blue-100 overflow-hidden">
                <div className="w-full flex items-center gap-1.5 px-2.5 py-2 bg-blue-50">
                  <svg className="w-3 h-3 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">Condition</span>
                </div>
                <div className="p-2.5 bg-blue-50/40">
                  {isEditable ? (
                    <InlineInput value={condition} onChange={setCondition} placeholder="e.g. response.status == 'success'" multiline />
                  ) : (
                    <div className="text-[10px] font-mono text-gray-700 whitespace-pre-wrap break-words">
                      {condition || <span className="italic text-gray-400">None</span>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="px-4 py-1.5 flex items-center justify-between border-t flex-shrink-0"
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

      {/* Success path — bottom left (green) */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="success"
        className="!w-3 !h-3 !border-2 !border-white"
        style={{ background: '#10B981', left: '25%' }}
        title="Success path"
      />

      {/* Failure path — bottom right (red) */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="failure"
        className="!w-3 !h-3 !border-2 !border-white"
        style={{ background: '#EF4444', left: '75%' }}
        title="Failure path"
      />

      <style>{`
        .api-node-scroll::-webkit-scrollbar { width: 3px; }
        .api-node-scroll::-webkit-scrollbar-track { background: transparent; }
        .api-node-scroll::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 4px; }
      `}</style>
    </div>
  );
}

export default memo(ApiModuleNode);

import { useState, useRef, useEffect, memo } from 'react';
import { EdgeLabelRenderer, EdgeProps, Position, useStoreApi } from 'reactflow';

interface Pt { x: number; y: number; }

/** Orthogonal polyline with rounded quadratic-Bézier corners */
function orthoPath(pts: Pt[], r = 10): string {
  if (pts.length < 2) return '';
  if (pts.length === 2)
    return `M ${pts[0].x},${pts[0].y} L ${pts[1].x},${pts[1].y}`;

  let d = `M ${pts[0].x},${pts[0].y}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const p = pts[i - 1], c = pts[i], n = pts[i + 1];
    const d1x = c.x - p.x, d1y = c.y - p.y;
    const d2x = n.x - c.x, d2y = n.y - c.y;
    const l1 = Math.hypot(d1x, d1y), l2 = Math.hypot(d2x, d2y);
    if (!l1 || !l2) { d += ` L ${c.x},${c.y}`; continue; }
    const rad = Math.min(r, l1 / 2, l2 / 2);
    const bx = c.x - (d1x / l1) * rad, by = c.y - (d1y / l1) * rad;
    const ax = c.x + (d2x / l2) * rad, ay = c.y + (d2y / l2) * rad;
    d += ` L ${bx},${by} Q ${c.x},${c.y} ${ax},${ay}`;
  }
  d += ` L ${pts[pts.length - 1].x},${pts[pts.length - 1].y}`;
  return d;
}

function CustomEditableEdge({
  id,
  sourceX, sourceY, targetX, targetY,
  sourcePosition,
  style = {}, markerEnd,
  label, labelStyle, labelBgStyle,
  selected,
}: EdgeProps) {
  // Single offset: moves the elbow segment on one axis only
  const [elbowOffset, setElbowOffset] = useState(0);
  const [hovered, setHovered] = useState(false);

  // Determine routing direction from the source handle position.
  // HVH (source on top/bottom): outer segments are vertical, middle segment is
  //   horizontal → dragging moves Y only.
  // VHV (source on left/right): outer segments are horizontal, middle segment
  //   is vertical → dragging moves X only.
  const isHVH = sourcePosition !== Position.Left && sourcePosition !== Position.Right;

  // Build the four orthogonal points
  let pts: Pt[];
  if (isHVH) {
    const midY = (sourceY + targetY) / 2 + elbowOffset;
    pts = [
      { x: sourceX, y: sourceY },
      { x: sourceX, y: midY },
      { x: targetX, y: midY },
      { x: targetX, y: targetY },
    ];
  } else {
    const midX = (sourceX + targetX) / 2 + elbowOffset;
    pts = [
      { x: sourceX, y: sourceY },
      { x: midX,    y: sourceY },
      { x: midX,    y: targetY },
      { x: targetX, y: targetY },
    ];
  }
  const fullPath = orthoPath(pts);

  // Grab handle sits at the midpoint of the draggable middle segment
  const handlePt: Pt = isHVH
    ? { x: (sourceX + targetX) / 2, y: pts[1].y }
    : { x: pts[1].x, y: (sourceY + targetY) / 2 };

  // ── Drag via window listeners (stable, no stale-closure issues) ────────────
  const isDraggingRef = useRef(false);
  const dragRef = useRef<{ start: number; initOffset: number } | null>(null);
  const storeApi = useStoreApi();

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!isDraggingRef.current || !dragRef.current) return;
      const tz = (storeApi.getState() as any).transform[2] as number;
      const delta = isHVH
        ? (e.clientY - dragRef.current.start) / tz
        : (e.clientX - dragRef.current.start) / tz;
      setElbowOffset(dragRef.current.initOffset + delta);
    };
    const onUp = () => { isDraggingRef.current = false; dragRef.current = null; };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHVH]); // re-bind only if routing direction flips

  const startDrag = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    isDraggingRef.current = true;
    dragRef.current = {
      start: isHVH ? e.clientY : e.clientX,
      initOffset: elbowOffset,
    };
  };

  // ── Visual ─────────────────────────────────────────────────────────────────
  const baseStroke = (style as any).stroke as string | undefined;
  const baseWidth  = parseFloat(String((style as any).strokeWidth ?? '1.5')) || 1.5;
  const strokeColor = selected ? '#4F46E5' : hovered ? '#818CF8' : (baseStroke ?? '#b1b1b7');
  const strokeWidth = selected ? 2.5 : hovered ? 2 : baseWidth;

  return (
    <>
      {/* Wide transparent hit-area */}
      <path
        d={fullPath}
        fill="none"
        strokeWidth={16}
        strokeOpacity={0}
        style={{ cursor: isDraggingRef.current ? 'grabbing' : isHVH ? 'ns-resize' : 'ew-resize', pointerEvents: 'stroke' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onPointerDown={startDrag}
      />

      {/* Visible edge */}
      <path
        id={id}
        d={fullPath}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        markerEnd={markerEnd}
        style={{
          ...style,
          stroke: strokeColor,
          strokeWidth,
          transition: 'stroke 0.12s, stroke-width 0.12s',
          pointerEvents: 'none',
        }}
      />

      <EdgeLabelRenderer>
        {/* Grab handle — shown on selection so user knows where to drag */}
        {selected && (
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%,-50%) translate(${handlePt.x}px,${handlePt.y}px)`,
              pointerEvents: 'all',
              zIndex: 20,
              cursor: isHVH ? 'ns-resize' : 'ew-resize',
            }}
            onPointerDown={startDrag}
          >
            <div
              className="bg-white border-2 border-indigo-500 rounded-full shadow-md"
              style={{ width: 10, height: 10 }}
            />
          </div>
        )}

        {/* Label */}
        {label && (
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%,-50%) translate(${handlePt.x}px,${handlePt.y}px)`,
              background: (labelBgStyle as any)?.fill ?? '#fff',
              color: (labelStyle as any)?.fill ?? '#374151',
              pointerEvents: 'none',
              marginTop: -22,
            }}
            className="px-1.5 py-0.5 rounded text-[10px] font-bold whitespace-nowrap shadow-sm border border-gray-100"
          >
            {label}
          </div>
        )}
      </EdgeLabelRenderer>
    </>
  );
}

export default memo(CustomEditableEdge);

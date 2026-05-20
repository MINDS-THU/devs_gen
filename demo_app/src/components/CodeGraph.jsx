import { useEffect, useRef, useState, useMemo } from 'react'

export default function CodeGraph({ graphKey, graph, selectedCodeNodeId, setSelectedCodeNodeId, compact = false }) {
  const ATOMIC_HALF_W = compact ? 70 : 78
  const ATOMIC_HALF_H = compact ? 22 : 23
  const COUPLED_HALF_W = compact ? 98 : 108
  const COUPLED_HALF_H = compact ? 26 : 27
  const GROUP_PAD_X = compact ? 14 : 18
  const GROUP_PAD_Y = compact ? 12 : 16
  const GROUP_LABEL_H = compact ? 14 : 16
  const SVG_W = compact ? 1120 : 1360
  const SVG_H = compact ? 470 : 560
  const EDGE_START_GAP = 1
  const EDGE_END_GAP = 11

  const getNodeHalfSize = (node) => {
    if (node?.modelType === 'coupled') return { w: COUPLED_HALF_W, h: COUPLED_HALF_H }
    return { w: ATOMIC_HALF_W, h: ATOMIC_HALF_H }
  }

  const splitNodeLabel = (label) => {
    const text = String(label || '')
    const withParen = text.split(' (')
    if (withParen.length > 1) {
      const head = withParen[0]
      const tail = `(${withParen.slice(1).join(' (')}`
      return [head, tail]
    }
    if (text.length <= 24) return [text]
    const mid = Math.floor(text.length / 2)
    let cut = text.lastIndexOf('_', mid)
    if (cut < 6) cut = text.indexOf('_', mid)
    if (cut > 5 && cut < text.length - 5) {
      return [text.slice(0, cut), text.slice(cut + 1)]
    }
    return [text]
  }

  const rayRectDistance = (ux, uy, halfW, halfH) => {
    const tx = Math.abs(ux) < 1e-6 ? Number.POSITIVE_INFINITY : halfW / Math.abs(ux)
    const ty = Math.abs(uy) < 1e-6 ? Number.POSITIVE_INFINITY : halfH / Math.abs(uy)
    return Math.min(tx, ty)
  }

  const [positions, setPositions] = useState(() => Object.fromEntries(graph.nodes.map((n) => [n.id, { x: n.x, y: n.y }])))
  const [dragEnabled, setDragEnabled] = useState(true)
  const [dragging, setDragging] = useState(null)
  const svgRef = useRef(null)

  useEffect(() => {
    setPositions(Object.fromEntries(graph.nodes.map((n) => [n.id, { x: n.x, y: n.y }])))
    setDragging(null)
    setDragEnabled(true)
  }, [graphKey, graph])

  const nodeById = Object.fromEntries(
    graph.nodes.map((n) => {
      const p = positions[n.id] || { x: n.x, y: n.y }
      return [n.id, { ...n, x: p.x, y: p.y }]
    })
  )

  const computedGroups = (graph.groups || []).map((g) => {
    if (!g.members || g.members.length === 0) return g
    const members = g.members.map((id) => nodeById[id]).filter(Boolean)
    if (members.length === 0) return g

    const minX = Math.min(...members.map((n) => n.x - getNodeHalfSize(n).w))
    const maxX = Math.max(...members.map((n) => n.x + getNodeHalfSize(n).w))
    const minY = Math.min(...members.map((n) => n.y - getNodeHalfSize(n).h))
    const maxY = Math.max(...members.map((n) => n.y + getNodeHalfSize(n).h))

    const x = Math.max(8, minX - GROUP_PAD_X)
    const y = Math.max(8, minY - GROUP_PAD_Y - GROUP_LABEL_H)
    const w = Math.min(SVG_W - 16 - x, maxX - minX + GROUP_PAD_X * 2)
    const h = Math.min(SVG_H - 16 - y, maxY - minY + GROUP_PAD_Y * 2 + GROUP_LABEL_H)
    return { ...g, x, y, w, h }
  })

  const getSvgPoint = (evt) => {
    const svg = svgRef.current
    if (!svg) return null
    const pt = svg.createSVGPoint()
    pt.x = evt.clientX
    pt.y = evt.clientY
    const ctm = svg.getScreenCTM()
    if (!ctm) return null
    return pt.matrixTransform(ctm.inverse())
  }

  const onNodeDown = (evt, node) => {
    if (!dragEnabled) return
    evt.preventDefault()
    const p = getSvgPoint(evt)
    if (!p) return
    setDragging({ id: node.id, dx: node.x - p.x, dy: node.y - p.y })
  }

  const onMove = (evt) => {
    if (!dragging) return
    const p = getSvgPoint(evt)
    if (!p) return
    const node = nodeById[dragging.id]
    const half = getNodeHalfSize(node)
    const nx = Math.max(half.w + 6, Math.min(SVG_W - half.w - 6, p.x + dragging.dx))
    const ny = Math.max(half.h + 6, Math.min(SVG_H - half.h - 6, p.y + dragging.dy))
    setPositions((s) => ({ ...s, [dragging.id]: { x: nx, y: ny } }))
  }

  const onUp = () => setDragging(null)
  const markerId = `arrow-${graphKey}`
  const pairEdgeOffsets = useMemo(() => {
    const pairMap = new Map()
    graph.edges.forEach(([src, dst], idx) => {
      const key = src < dst ? `${src}__${dst}` : `${dst}__${src}`
      const arr = pairMap.get(key) || []
      arr.push(idx)
      pairMap.set(key, arr)
    })
    const offsets = {}
    for (const indices of pairMap.values()) {
      const n = indices.length
      indices.forEach((edgeIdx, order) => {
        const centered = order - (n - 1) / 2
        offsets[edgeIdx] = centered * (compact ? 18 : 24)
      })
    }
    return offsets
  }, [graph.edges, compact])

  const getEdgeStyle = (label) => {
    const t = String(label || '')
    if (t.startsWith('EIC')) {
      return { stroke: '#0369a1', text: '#075985', dash: undefined, marker: true }
    }
    if (t.startsWith('EOC')) {
      return { stroke: '#047857', text: '#065f46', dash: undefined, marker: true }
    }
    if (t.startsWith('IC')) {
      return { stroke: '#475569', text: '#475569', dash: undefined, marker: true }
    }
    if (t === 'contains') {
      return { stroke: '#94a3b8', text: '#64748b', dash: '4 3', marker: false }
    }
    return { stroke: '#64748b', text: '#64748b', dash: undefined, marker: true }
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-[11px] text-slate-500">
        <span className="text-slate-500">Static layout optimized for readability; optional drag mode for manual tuning.</span>
        <button
          onClick={() => setDragEnabled((v) => !v)}
          className={`rounded-md border px-2 py-1 ${dragEnabled ? 'border-cyan-500 bg-cyan-50 text-cyan-700' : 'border-slate-300 bg-white text-slate-700'}`}
        >
          {dragEnabled ? 'Drag: ON' : 'Drag: OFF'}
        </button>
      </div>
      <div className={`mb-2 flex flex-wrap items-center gap-3 ${compact ? 'text-[9px]' : 'text-[10px]'} text-slate-500`}>
        <span className="inline-flex items-center gap-1"><span className="inline-block h-[2px] w-4 bg-[#0369a1]" />EIC: External Input Coupling</span>
        <span className="inline-flex items-center gap-1"><span className="inline-block h-[2px] w-4 bg-[#475569]" />IC: Internal Coupling</span>
        <span className="inline-flex items-center gap-1"><span className="inline-block h-[2px] w-4 bg-[#047857]" />EOC: External Output Coupling</span>
        <span className="inline-flex items-center gap-1"><span className="inline-block h-[2px] w-4 border-t border-dashed border-[#94a3b8]" />contains</span>
      </div>
      <div className="overflow-x-auto pb-1">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className={`${compact ? 'h-[390px] w-full max-w-full' : 'h-[460px] w-[1360px] max-w-none'} rounded-xl border border-slate-200 bg-white`}
        onMouseMove={onMove}
        onMouseUp={onUp}
        onMouseLeave={onUp}
      >
      <defs>
        <marker id={markerId} markerWidth="12" markerHeight="12" refX="9" refY="4" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,8 L10,4 z" fill="#475569" />
        </marker>
      </defs>
      {computedGroups.map((g, idx) => (
        <g key={`group-${idx}`}>
          <rect
            x={g.x}
            y={g.y}
            width={g.w}
            height={g.h}
            rx={12}
            fill="rgba(99, 102, 241, 0.05)"
            stroke="#818cf8"
            strokeDasharray="6 4"
            strokeWidth="1.2"
          />
          <text x={g.x + 10} y={g.y + 16} fill="#4338ca" fontSize="10">
            {g.label}
          </text>
        </g>
      ))}
      {graph.edges.map(([src, dst, label], idx) => {
        const a = nodeById[src]
        const b = nodeById[dst]
        if (!a || !b) return null
        const rawLabel = String(label || '')
        const edgeStyle = getEdgeStyle(rawLabel)
        const displayLabel = rawLabel === 'contains'
          ? 'contains'
          : rawLabel
            .replace(/^EIC[^:]*:\s*/i, '')
            .replace(/^EOC[^:]*:\s*/i, '')
            .replace(/^IC[^:]*:\s*/i, '')
        const aHalf = getNodeHalfSize(a)
        const bHalf = getNodeHalfSize(b)
        const dx = b.x - a.x
        const dy = b.y - a.y
        const len = Math.hypot(dx, dy) || 1
        const ux = dx / len
        const uy = dy / len
        const srcDist = rayRectDistance(ux, uy, aHalf.w, aHalf.h)
        const dstDist = rayRectDistance(ux, uy, bHalf.w, bHalf.h)
        const sx = a.x + ux * (srcDist + EDGE_START_GAP)
        const sy = a.y + uy * (srcDist + EDGE_START_GAP)
        const ex = b.x - ux * (dstDist + EDGE_END_GAP)
        const ey = b.y - uy * (dstDist + EDGE_END_GAP)
        const pairKey = src < dst ? `${src}__${dst}` : `${dst}__${src}`
        const [canonAId, canonBId] = pairKey.split('__')
        const canonA = nodeById[canonAId]
        const canonB = nodeById[canonBId]
        const cdx = (canonB?.x ?? b.x) - (canonA?.x ?? a.x)
        const cdy = (canonB?.y ?? b.y) - (canonA?.y ?? a.y)
        const clen = Math.hypot(cdx, cdy) || 1
        const cnx = -cdy / clen
        const cny = cdx / clen
        const bend = pairEdgeOffsets[idx] || 0
        const mx = (sx + ex) / 2
        const my = (sy + ey) / 2
        const cx = mx + cnx * bend
        const cy = my + cny * bend
        const pathD = bend === 0 ? `M ${sx} ${sy} L ${ex} ${ey}` : `M ${sx} ${sy} Q ${cx} ${cy} ${ex} ${ey}`
        const labelX = bend === 0 ? mx : mx + cnx * (bend * 0.45)
        const labelY = bend === 0 ? my - 4 : my + cny * (bend * 0.45) - 4
        return (
          <g key={`${src}-${dst}-${idx}`}>
            <path
              d={pathD}
              fill="none"
              stroke={edgeStyle.stroke}
              strokeWidth={edgeStyle.dash ? '1.2' : '1.5'}
              strokeDasharray={edgeStyle.dash}
              markerEnd={edgeStyle.marker ? `url(#${markerId})` : undefined}
            />
            <text x={labelX} y={labelY} fill={edgeStyle.text} fontSize="10" textAnchor="middle">
              {displayLabel}
            </text>
          </g>
        )
      })}
      {graph.nodes.map((n) => {
        const p = nodeById[n.id]
        const active = p.id === selectedCodeNodeId
        const coupled = p.modelType === 'coupled'
        const omitted = /omitted|\.\.\./i.test(String(p.label || ''))
        const half = getNodeHalfSize(p)
        const labelLines = splitNodeLabel(p.label)
        const fill = active ? '#e0f2fe' : omitted ? '#fff7ed' : coupled ? '#eef2ff' : '#f8fafc'
        const stroke = active ? '#0ea5e9' : omitted ? '#f59e0b' : coupled ? '#6366f1' : '#cbd5e1'
        return (
          <g
            key={p.id}
            onClick={() => setSelectedCodeNodeId(p.id)}
            onMouseDown={(evt) => onNodeDown(evt, p)}
            style={{ cursor: dragEnabled ? 'grab' : 'pointer' }}
          >
            <rect
              x={p.x - half.w}
              y={p.y - half.h}
              width={half.w * 2}
              height={half.h * 2}
              rx={10}
              fill={fill}
              stroke={stroke}
              strokeWidth={coupled ? 2 : 1.5}
              strokeDasharray={omitted ? '5 3' : undefined}
            />
            <text x={p.x} y={labelLines.length > 1 ? p.y - 8 : p.y - 2} fill="#0f172a" fontSize="11" textAnchor="middle">
              {labelLines.map((line, i) => (
                <tspan key={`${p.id}-label-${i}`} x={p.x} dy={i === 0 ? 0 : 12}>
                  {line}
                </tspan>
              ))}
            </text>
            <text x={p.x} y={labelLines.length > 1 ? p.y + 14 : p.y + 11} fill={omitted ? '#b45309' : '#0369a1'} fontSize="9" textAnchor="middle">
              in:{p.ports.in.length} out:{p.ports.out.length}
            </text>
          </g>
        )
      })}
      </svg>
      </div>
    </div>
  )
}

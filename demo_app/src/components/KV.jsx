export default function KV({ title, items, compact = false }) {
  return (
    <div className="mb-3">
      <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-600">{title}</h4>
      <div className={`flex flex-wrap gap-1.5 ${compact ? 'text-[11px]' : 'text-xs'}`}>
        {items.map((it) => (
          <span key={typeof it === 'string' ? it : `${it.name}:${it.type || ''}`} className="rounded-md border border-slate-300 bg-slate-50 px-2 py-1 text-slate-700">
            {typeof it === 'string' ? it : `${it.name}: ${it.type || '?'}`}
          </span>
        ))}
      </div>
    </div>
  )
}

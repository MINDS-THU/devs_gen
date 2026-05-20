export default function ChatTurn({ role, title, children }) {
  const style = {
    system: 'border-cyan-200 bg-cyan-50',
    user: 'border-slate-300 bg-slate-50',
    tool_calling: 'border-emerald-200 bg-emerald-50',
    reasoning: 'border-indigo-200 bg-indigo-50',
    reply: 'border-amber-300 bg-amber-50',
  }

  if (role === 'system') {
    return (
      <div className={`rounded-xl border p-3 ${style[role]}`}>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-700">{title}</p>
        {children}
      </div>
    )
  }

  const align = role === 'user' ? 'justify-end' : 'justify-start'
  const widthClass = role === 'user' ? 'max-w-[84%]' : 'max-w-[98%]'

  return (
    <div className={`flex ${align}`}>
      <div className={`w-full ${widthClass} rounded-xl border p-3 ${style[role] || 'border-slate-200 bg-white'}`}>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-700">{title}</p>
        {children}
      </div>
    </div>
  )
}

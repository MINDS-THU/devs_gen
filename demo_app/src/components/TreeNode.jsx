import { ChevronDown } from 'lucide-react'

export default function TreeNode({ node, depth, openTree, setOpenTree, selectedTreeNodeId, setSelectedTreeNodeId }) {
  const isOpen = openTree[node.id] ?? false
  const hasChildren = node.children.length > 0
  const active = selectedTreeNodeId === node.id
  return (
    <div className="mb-2">
      <div
        className={`flex items-center gap-2 rounded-lg border px-2 py-2 text-xs ${
          active
            ? node.type === 'coupled'
              ? 'border-indigo-400 bg-indigo-50 text-indigo-800'
              : 'border-sky-400 bg-sky-50 text-sky-700'
            : node.type === 'coupled'
              ? 'border-indigo-200 bg-indigo-50/40 text-slate-700'
              : 'border-slate-200 bg-white text-slate-700'
        }`}
        style={{ marginLeft: `${depth * 18}px` }}
      >
        {hasChildren ? (
          <button
            className="rounded p-0.5 hover:bg-slate-700"
            onClick={() => setOpenTree((s) => ({ ...s, [node.id]: !isOpen }))}
          >
            <ChevronDown className={`size-3 transition ${isOpen ? '' : '-rotate-90'}`} />
          </button>
        ) : (
          <span className="inline-block size-3" />
        )}
        <button className="text-left" onClick={() => setSelectedTreeNodeId(node.id)}>
          <span className="font-semibold">{depth > 0 ? '↳ ' : ''}{node.name}</span>
          <span className="ml-2 rounded-full border border-slate-300 px-2 py-0.5 text-[10px] uppercase text-slate-500">{node.type}</span>
          {hasChildren && <span className="ml-2 text-[10px] text-slate-500">contains {node.children.length} submodels</span>}
        </button>
      </div>
      {hasChildren && isOpen && (
        <div className="mt-1 border-l border-slate-300 pl-1">
          {node.children.map((c) => (
            <TreeNode
              key={c.id}
              node={c}
              depth={depth + 1}
              openTree={openTree}
              setOpenTree={setOpenTree}
              selectedTreeNodeId={selectedTreeNodeId}
              setSelectedTreeNodeId={setSelectedTreeNodeId}
            />
          ))}
        </div>
      )}
    </div>
  )
}

import { useMemo, useState } from 'react'
import { Bot, CircleX } from 'lucide-react'
import { findTreeNode, findGraphNode, getMethodViews, withUnknownType } from '../utils/helpers.js'
import {
  WORKFLOW_DEMO_DATA,
  WETLAB_SPEC_EXAMPLE,
  ICU_SPEC_EXAMPLE,
  WETLAB_DIRECT_OUTPUT_RAW,
  ICU_DIRECT_OUTPUT_RAW,
  WETLAB_ASSIST_OUTPUT_RAW,
  ICU_ASSIST_OUTPUT_RAW,
  DIRECT_SYSTEM_PROMPT,
  DIRECT_USER_PROMPT_SUFFIX,
  AGENT_WORKFLOW_SYSTEM_PROMPT,
} from '../data/cases.js'
import Panel from './Panel.jsx'
import ChatTurn from './ChatTurn.jsx'
import TreeNode from './TreeNode.jsx'
import CodeGraph from './CodeGraph.jsx'
import KV from './KV.jsx'

export default function WorkflowAgentDemo({ activeCase }) {
  const cfg = WORKFLOW_DEMO_DATA[activeCase.id]
  const specText = activeCase.id === 'wetlab' ? WETLAB_SPEC_EXAMPLE : ICU_SPEC_EXAMPLE
  const directOutput = activeCase.id === 'wetlab' ? WETLAB_DIRECT_OUTPUT_RAW : ICU_DIRECT_OUTPUT_RAW
  const assistOutput = activeCase.id === 'wetlab' ? WETLAB_ASSIST_OUTPUT_RAW : ICU_ASSIST_OUTPUT_RAW
  const caseLabel = activeCase.id === 'wetlab' ? 'Wet-Lab' : 'ICU'
  const directUserPrompt = useMemo(
    () => `${activeCase.inputText}\n\n${DIRECT_USER_PROMPT_SUFFIX}`,
    [activeCase]
  )
  const [wfOpenTree, setWfOpenTree] = useState(() => ({ [activeCase.planTree.id]: true }))
  const [wfSelectedTreeNodeId, setWfSelectedTreeNodeId] = useState(activeCase.planTree.id)
  const [wfSelectedCodeNodeId, setWfSelectedCodeNodeId] = useState(activeCase.codeGraph.nodes[0]?.id || '')

  const wfSelectedTreeNode = useMemo(
    () => findTreeNode(activeCase.planTree, wfSelectedTreeNodeId) ?? activeCase.planTree,
    [activeCase, wfSelectedTreeNodeId]
  )

  const wfSelectedCodeNode = useMemo(
    () => findGraphNode(activeCase.codeGraph.nodes, wfSelectedCodeNodeId) ?? activeCase.codeGraph.nodes[0],
    [activeCase, wfSelectedCodeNodeId]
  )

  const constructToolCall = useMemo(
    () => `{"type":"tool_call","name":"construct_devs_model","arguments":{"spec_yaml":"<see spec block below>"}}`,
    []
  )

  if (!cfg) return null

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[150px_minmax(0,1fr)]">
      <aside className="hidden lg:block">
        <div className="sticky top-4 rounded-xl border border-slate-200 bg-white p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-700">On this page</p>
          <div className="space-y-1 text-xs">
            <a href="#wf-agent" className="block rounded px-2 py-1 text-emerald-700 hover:bg-slate-100">Model-assisted run</a>
            <a href="#wf-direct" className="block rounded px-2 py-1 text-rose-700 hover:bg-slate-100">Direct run</a>
          </div>
        </div>
      </aside>

      <div className="min-w-0 space-y-4">

      <div id="wf-agent" className="scroll-mt-24">
      <Panel icon={<Bot className="size-4" />} title={`Model-Assisted Run (${caseLabel})`}>
        <div className="space-y-3">
          <ChatTurn role="system" title="system">
            <pre className="max-h-40 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{AGENT_WORKFLOW_SYSTEM_PROMPT}</pre>
          </ChatTurn>

          <ChatTurn role="user" title="user">
            <pre className="max-h-56 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{cfg.firstUserPrompt}</pre>
          </ChatTurn>

          <ChatTurn role="tool_calling" title="tool call">
            <p className="mb-1 text-[11px] font-semibold text-slate-600">Specification passed to <code>construct_devs_model</code></p>
            <pre className="max-h-20 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{constructToolCall}</pre>
            <pre className="mt-2 max-h-64 overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-white p-2 text-[11px] text-slate-700">{specText}</pre>

            <div className="mt-2 rounded-xl border border-slate-200 bg-white p-3">
              <p className="mb-2 text-[11px] text-slate-700">
                The tool call runs DEVS-Gen's two-stage construction process.
              </p>
              <div className="grid w-full gap-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-700">Stage 1: Structural Planning (Top-Down)</p>
                  <div className="grid gap-3 lg:grid-cols-[0.95fr_1fr]">
                    <div className="rounded-2xl border border-slate-200 bg-white p-3">
                      <TreeNode
                        node={activeCase.planTree}
                        depth={0}
                        openTree={wfOpenTree}
                        setOpenTree={setWfOpenTree}
                        selectedTreeNodeId={wfSelectedTreeNodeId}
                        setSelectedTreeNodeId={setWfSelectedTreeNodeId}
                      />
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-3">
                      <h3 className="mb-1 text-sm font-semibold text-slate-800">{wfSelectedTreeNode.name}</h3>
                      <p className="mb-2 text-xs text-slate-500">{wfSelectedTreeNode.type} · {wfSelectedTreeNode.summary}</p>
                      <KV title="init args" items={wfSelectedTreeNode.initArgsTyped || withUnknownType(wfSelectedTreeNode.initArgs)} />
                      <KV title="input ports" items={wfSelectedTreeNode.portsTyped?.input || withUnknownType(wfSelectedTreeNode.ports?.input || [])} />
                      <KV title="output ports" items={wfSelectedTreeNode.portsTyped?.output || withUnknownType(wfSelectedTreeNode.ports?.output || [])} />
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-700">Stage 2: Behavioral Synthesis (Bottom-Up)</p>
                  <div className="grid gap-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-3">
                      <CodeGraph
                        key={activeCase.id}
                        graphKey={`workflow-${activeCase.id}`}
                        graph={activeCase.codeGraph}
                        selectedCodeNodeId={wfSelectedCodeNodeId}
                        setSelectedCodeNodeId={setWfSelectedCodeNodeId}
                        compact
                      />
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-3">
                      <h3 className="mb-1 text-sm font-semibold text-slate-800">{wfSelectedCodeNode.label}</h3>
                      <p className="mb-2 text-xs text-slate-500">file: {wfSelectedCodeNode.file}</p>
                      <KV title="input ports" items={wfSelectedCodeNode.portsTyped?.in || withUnknownType(wfSelectedCodeNode.ports.in)} compact />
                      <KV title="output ports" items={wfSelectedCodeNode.portsTyped?.out || withUnknownType(wfSelectedCodeNode.ports.out)} compact />
                      <div className="mt-2 space-y-2">
                        {getMethodViews(wfSelectedCodeNode).map((m) => (
                          <details key={m.name} className="rounded-lg border border-slate-200 bg-white p-2">
                            <summary className="cursor-pointer text-xs text-sky-700">{m.name} · {m.paperName}</summary>
                            <pre className="mt-1 whitespace-pre-wrap break-words text-[11px] text-slate-700">{String(m.code)}</pre>
                          </details>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2 rounded-lg border border-slate-200 bg-white p-2">
              <p className="mb-1 text-[11px] font-semibold text-slate-600">Tool result and execution contract</p>
              <pre className="max-h-28 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{cfg.constructResult}</pre>
            </div>
          </ChatTurn>

          <ChatTurn role="reasoning" title="reasoning">
            <pre className="max-h-32 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{cfg.reasoningBeforeRuns}</pre>
          </ChatTurn>

          <ChatTurn role="tool_calling" title="tool call · candidate A">
            <pre className="max-h-32 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{cfg.runAInput}</pre>
            <pre className="mt-2 max-h-28 overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-white p-2 text-[11px] text-slate-700">{cfg.runAResult}</pre>
          </ChatTurn>

          <ChatTurn role="tool_calling" title="tool call · candidate B">
            <pre className="max-h-32 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{cfg.runBInput}</pre>
            <pre className="mt-2 max-h-28 overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-white p-2 text-[11px] text-slate-700">{cfg.runBResult}</pre>
          </ChatTurn>

          <ChatTurn role="tool_calling" title="tool call · candidate C">
            <pre className="max-h-32 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{cfg.runCInput}</pre>
            <pre className="mt-2 max-h-28 overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-white p-2 text-[11px] text-slate-700">{cfg.runCResult}</pre>
          </ChatTurn>

          <ChatTurn role="reasoning" title="reasoning">
            <pre className="max-h-32 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{cfg.reasoningAfterRuns}</pre>
          </ChatTurn>

          <ChatTurn role="reply" title="reply">
            <pre className="max-h-72 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{assistOutput}</pre>
          </ChatTurn>
        </div>
      </Panel>
      </div>

      <div id="wf-direct" className="scroll-mt-24">
      <Panel icon={<CircleX className="size-4" />} title="Direct Run">
        <div className="space-y-3">
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[11px]">
            <span className="font-mono text-slate-700">GPT-5.4</span>
            <span className="ml-2 text-slate-600">Only the final response is shown.</span>
          </div>

          <ChatTurn role="system" title="system">
            <pre className="max-h-28 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{DIRECT_SYSTEM_PROMPT}</pre>
          </ChatTurn>

          <ChatTurn role="user" title="user">
            <pre className="max-h-52 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{directUserPrompt}</pre>
          </ChatTurn>

          <ChatTurn role="reply" title="reply">
            <pre className="max-h-72 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{directOutput}</pre>
          </ChatTurn>
        </div>
      </Panel>
      </div>
      </div>
      </div>
    </div>
  )
}

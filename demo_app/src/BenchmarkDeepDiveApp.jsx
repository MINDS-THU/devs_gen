import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Bot,
  CheckCircle2,
  FileJson2,
  GitBranch,
  Network,
} from 'lucide-react'
import { findTreeNode, findGraphNode, getMethodViews, withUnknownType } from './utils/helpers'
import { defaultTreeOpen } from './data/constants'
import { BENCHMARK_CASE_ID, CASES, VISIBLE_CASES, SA_INPUT_SECTIONS } from './data/cases'
import Panel from './components/Panel'
import TreeNode from './components/TreeNode'
import KV from './components/KV'
import CodeGraph from './components/CodeGraph'

const activeCase = VISIBLE_CASES.find((c) => c.id === BENCHMARK_CASE_ID) ?? CASES[0]

export default function BenchmarkDeepDiveApp() {
  const [openTree, setOpenTree] = useState(defaultTreeOpen)
  const [selectedTreeNodeId, setSelectedTreeNodeId] = useState(
    CASES.find((c) => c.id === BENCHMARK_CASE_ID)?.planTree?.id || 'sa-root'
  )
  const [selectedCodeNodeId, setSelectedCodeNodeId] = useState('n1')

  const benchmarkInputSections = useMemo(() => SA_INPUT_SECTIONS, [])

  useEffect(() => {
    setSelectedTreeNodeId(activeCase.planTree.id)
    setSelectedCodeNodeId(activeCase.codeGraph.nodes[0].id)
  }, [])

  const selectedTreeNode = useMemo(
    () => findTreeNode(activeCase.planTree, selectedTreeNodeId) ?? activeCase.planTree,
    [activeCase, selectedTreeNodeId]
  )

  const selectedCodeNode = useMemo(
    () => findGraphNode(activeCase.codeGraph.nodes, selectedCodeNodeId) ?? activeCase.codeGraph.nodes[0],
    [activeCase, selectedCodeNodeId]
  )

  const benchmarkEvalAsset = useMemo(
    () => activeCase.evalFlow.find((s) => s.id === 's1') ?? null,
    [activeCase]
  )

  const benchmarkEvalProcess = useMemo(
    () => activeCase.evalFlow.filter((s) => s.id !== 's1'),
    [activeCase]
  )

  return (
    <div className="mx-auto min-h-screen w-full max-w-[1400px] overflow-x-visible px-4 py-7 md:px-6">
      <div className="grid gap-4">

        {/* Panel 1: Input Specification */}
        <Panel icon={<FileJson2 className="size-4" />} title="From Benchmark: Input Specification Given to Generator">
          <div className="mb-2 rounded-lg border border-sky-200 bg-sky-50 p-2">
            <p className="text-xs font-semibold text-sky-900">Exact LLM input for this benchmark scene.</p>
            <p className="mt-1 text-[11px] text-slate-700">The three blocks below are fed together as one task requirement package.</p>
          </div>
          <div className="grid gap-3 xl:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">General Implementation Requirements</p>
              <pre className="mt-2 max-h-[360px] overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-white p-2 text-[11px] text-slate-700">
                {benchmarkInputSections.general}
              </pre>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">Behavioral Description (Spec<sub>beh</sub>)</p>
              <pre className="mt-2 max-h-[360px] overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-white p-2 text-[11px] text-slate-700">
                {benchmarkInputSections.scenario}
              </pre>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">Operational Configuration (Spec<sub>ope</sub>)</p>
              <pre className="mt-2 max-h-[360px] overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-white p-2 text-[11px] text-slate-700">
                {benchmarkInputSections.interface}
              </pre>
            </div>
          </div>
        </Panel>

        {/* DEVS-GEN workflow sidebar + panels */}
        <div className="grid w-full items-start gap-4 lg:grid-cols-[170px_minmax(0,1fr)]">
          <div className="self-start lg:sticky lg:top-4">
            <div className="flex w-full flex-col items-center">
              <p className="text-center text-[11px] font-semibold text-sky-700">From panel 1 input</p>
              <div className="my-1 h-12 border-l-2 border-sky-400" />
              <p className="-mt-1 mb-1 text-sky-500">↓</p>

              <div className="w-full rounded-2xl border-2 border-cyan-300 bg-cyan-50 p-3 shadow-sm">
                <div className="mb-2 flex items-center gap-2 text-cyan-800">
                  <Bot className="size-4" />
                  <p className="text-xs font-semibold uppercase tracking-wide">DEVS-GEN workflow</p>
                </div>
                <p className="mb-2 text-[11px] text-slate-700">
                  This is the DEVS-GEN path used in this demo. In the benchmark pipeline, this generation stage can be replaced by other frameworks.
                </p>
                <div className="space-y-2 text-[11px] text-slate-700">
                  <div className="rounded-lg border border-slate-200 bg-white p-2">
                    <p className="font-semibold text-indigo-700">Stage 1: Structural Planning (from Natural Language to PlanTree)</p>
                    <p>Generate model decomposition and interface skeleton.</p>
                  </div>
                  <div className="flex justify-center text-slate-500">↓</div>
                  <div className="rounded-lg border border-slate-200 bg-white p-2">
                    <p className="font-semibold text-violet-700">Stage 2: Behavioral Synthesizing (from PlanTree to DEVS Model)</p>
                    <p>Generate executable wiring and DEVS behavior methods.</p>
                  </div>
                </div>
              </div>

              <div className="my-1 h-14 border-l-2 border-emerald-400" />
              <p className="-mt-1 mb-1 text-emerald-500">↓</p>
              <p className="text-center text-[11px] font-semibold text-emerald-700">Evaluation of the Generated DEVS Model</p>
            </div>
          </div>

          <div className="grid min-w-0 gap-4">
            {/* Panel 2: Stage 1 - Structural Planning */}
            <Panel icon={<GitBranch className="size-4" />} title="Stage 1: Structural Planning (from Natural Language to PlanTree)">
              <p className="mb-2 text-xs text-slate-600">
                This panel shows the structural generation result for this scene: model decomposition and interface skeleton.
              </p>
              <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
                <div className="rounded-2xl border border-slate-200 bg-white p-3">
                  <TreeNode
                    node={activeCase.planTree}
                    depth={0}
                    openTree={openTree}
                    setOpenTree={setOpenTree}
                    selectedTreeNodeId={selectedTreeNodeId}
                    setSelectedTreeNodeId={setSelectedTreeNodeId}
                  />
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <h3 className="mb-2 text-sm font-semibold text-slate-800">{selectedTreeNode.name}</h3>
                  <p className="mb-3 text-xs text-slate-500">{selectedTreeNode.type} · {selectedTreeNode.summary}</p>
                  <div className="mb-3 rounded-xl border border-cyan-200 bg-cyan-50 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">ModelPlan Interface</p>
                    <p className="mt-1 text-[11px] text-slate-600">
                      Includes <code>model_init_args</code>, <code>input_ports</code>, <code>output_ports</code>, and output trace schema obligations.
                    </p>
                    <div className="mt-2">
                      <KV title="init args" items={selectedTreeNode.initArgsTyped || withUnknownType(selectedTreeNode.initArgs)} />
                      <KV title="input ports" items={selectedTreeNode.portsTyped?.input || withUnknownType(selectedTreeNode.ports?.input || [])} />
                      <KV title="output ports" items={selectedTreeNode.portsTyped?.output || withUnknownType(selectedTreeNode.ports?.output || [])} />
                    </div>
                    <details className="rounded-lg border border-slate-200 bg-white p-2">
                      <summary className="cursor-pointer text-xs text-sky-700">ModelPlan typed schema details (args + ports)</summary>
                      <pre className="mt-2 max-h-52 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">
                        {selectedTreeNode.details?.schemas || 'No embedded schema detail for this node.'}
                      </pre>
                    </details>
                    <details className="mt-2 rounded-lg border border-slate-200 bg-white p-2">
                      <summary className="cursor-pointer text-xs text-sky-700">ModelPlan logging requirements</summary>
                      <pre className="mt-2 max-h-44 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">
                        {selectedTreeNode.details?.logging || 'No embedded full logging text for this node.'}
                      </pre>
                    </details>
                  </div>

                  <div className="mb-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-700">ModelPlan</p>
                    <details className="mb-2 rounded-lg border border-slate-200 bg-white p-2">
                      <summary className="cursor-pointer text-xs text-sky-700">Function semantics</summary>
                      <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">
                        {selectedTreeNode.details?.function || 'No embedded full function text for this node.'}
                      </pre>
                    </details>
                  </div>

                  <details className="mt-2 rounded-lg border border-slate-200 bg-white p-2">
                    <summary className="cursor-pointer text-xs text-sky-700">Raw node object (full available detail)</summary>
                    <pre className="mt-2 max-h-64 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">
                      {JSON.stringify(selectedTreeNode, null, 2)}
                    </pre>
                  </details>
                </div>
              </div>
            </Panel>

            {/* Panel 3: Stage 2 - Behavioral Synthesizing */}
            <Panel icon={<Network className="size-4" />} title="Stage 2: Behavioral Synthesizing (from PlanTree to DEVS Model)">
              <p className="mb-2 text-xs text-slate-600">
                This panel shows the behavioral generation result: executable wiring and DEVS transition/output methods used in evaluation.
              </p>
              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-3">
                  <CodeGraph
                    graphKey={activeCase.id}
                    graph={activeCase.codeGraph}
                    selectedCodeNodeId={selectedCodeNodeId}
                    setSelectedCodeNodeId={setSelectedCodeNodeId}
                  />
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <h3 className="mb-1 text-sm font-semibold text-slate-800">{selectedCodeNode.label}</h3>
                  <p className="mb-2 text-xs text-slate-500">file: {selectedCodeNode.file}</p>
                  <KV title="input ports" items={selectedCodeNode.portsTyped?.in || withUnknownType(selectedCodeNode.ports.in)} compact />
                  <KV title="output ports" items={selectedCodeNode.portsTyped?.out || withUnknownType(selectedCodeNode.ports.out)} compact />
                  <h4 className="mb-2 mt-3 text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Behavioral semantics (DEVS transition/output functions)
                  </h4>
                  <div className="space-y-2">
                    {getMethodViews(selectedCodeNode).map((m) => (
                      <details key={m.name} className="rounded-lg border border-slate-200 bg-white p-2">
                        <summary className="cursor-pointer text-xs text-sky-700">{m.name} · {m.paperName}</summary>
                        <p className="mb-1 mt-2 text-[11px] text-slate-600">{m.intro}</p>
                        <pre className="mt-1 whitespace-pre-wrap break-words text-[11px] text-slate-700">{String(m.code)}</pre>
                      </details>
                    ))}
                  </div>
                </div>
              </div>
            </Panel>
          </div>
        </div>

        {/* Panel 4: Evaluation */}
        <Panel icon={<CheckCircle2 className="size-4" />} title="Evaluation of the Generated DEVS Model">
          <p className="mb-2 text-xs text-slate-600">
            This stage is the actual benchmark evaluation: run test suite cases, read traces from the generated model, apply checker rules, then aggregate final metrics.
          </p>

          {benchmarkEvalAsset && (
            <div className="mb-2 rounded-lg border border-slate-200 bg-slate-50 p-2">
              <p className="text-xs font-semibold text-slate-700">Evaluation assets</p>
              <p className="mt-1 text-[11px] text-slate-600">
                Test suite D and per-case input d_i=(I,J) are loaded from benchmark configuration.
              </p>
              {benchmarkEvalAsset.sampleSelectionNote && (
                <p className="mt-1 text-[11px] text-slate-600">{benchmarkEvalAsset.sampleSelectionNote}</p>
              )}
              <pre className="mt-2 max-h-44 overflow-auto whitespace-pre-wrap break-words rounded-md border border-slate-200 bg-white p-2 text-[11px] text-slate-700">{benchmarkEvalAsset.sampleConfig}</pre>
            </div>
          )}

          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-700">Evaluation process on the generated model (Step 1-3)</p>
          <div className="space-y-2">
            {benchmarkEvalProcess.map((s, idx) => (
              <div key={s.id} className="rounded-lg border border-slate-200 bg-white p-2">
                <p className="text-xs font-semibold text-sky-700">Step {idx + 1} · {s.title}</p>

                {s.id === 's2' && (
                  <div className="mt-2">
                    <p className="text-[11px] font-semibold text-slate-700">Selected generated log trace excerpt</p>
                    {s.sampleLogNote && (
                      <p className="mt-1 text-[11px] text-slate-600">{s.sampleLogNote}</p>
                    )}
                    <pre className="mt-1 max-h-52 overflow-auto whitespace-pre-wrap break-words rounded-md border border-slate-200 bg-slate-50 p-2 text-[11px] text-slate-700">{s.sampleLogs}</pre>
                  </div>
                )}

                {s.id === 's3' && (
                  <div className="mt-2">
                    <p className="mt-1 text-[11px] text-slate-600">
                      Rules run over relevant events and event relations in T_i; checker accumulates evidence by repeated add_case(...) calls.
                    </p>
                    <div className="mt-2 space-y-2">
                      {activeCase.evalRuleGroups.map((grp) => (
                        <details key={grp.group} className="rounded-lg border border-slate-200 bg-slate-50 p-2" open>
                          <summary className="cursor-pointer text-xs font-semibold text-indigo-700">{grp.group}</summary>
                          <div className="mt-2 space-y-2">
                            {grp.rules.map((r) => (
                              <details key={r.name} className="rounded-md border border-slate-200 bg-white p-2">
                                <summary className="cursor-pointer text-[11px] font-semibold text-sky-700">{r.name}</summary>
                                <p className="mt-1 text-[11px] text-slate-700">{r.what}</p>
                                <p className="mt-1 text-[11px] text-slate-600">Granularity: {r.granularity}</p>
                                <p className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-slate-500">Checker core flow</p>
                                <pre className="mt-1 max-h-36 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{r.checkerCode}</pre>
                              </details>
                            ))}
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                )}

                {s.id === 's4' && s.formula && (
                  <div className="mt-2">
                    <p className="text-[11px] font-semibold text-slate-700">Metric equations</p>
                    <pre className="mt-1 max-h-48 overflow-auto whitespace-pre-wrap break-words rounded-md border border-slate-200 bg-slate-50 p-2 text-[11px] text-slate-700">{s.formula}</pre>
                    {s.workedExample && (
                      <>
                        <p className="mt-2 text-[11px] font-semibold text-slate-700">Worked example</p>
                        <pre className="mt-1 max-h-48 overflow-auto whitespace-pre-wrap break-words rounded-md border border-slate-200 bg-slate-50 p-2 text-[11px] text-slate-700">{s.workedExample}</pre>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Panel>

      </div>
    </div>
  )
}

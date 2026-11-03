import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import {
  Bot,
  CheckCircle2,
  FileJson2,
  GitBranch,
  MonitorPlay,
  Network,
} from 'lucide-react'
import { findTreeNode, findGraphNode, getMethodViews, withUnknownType, splitAbpInputText } from './utils/helpers'
import { defaultTreeOpen } from './data/constants'
import {
  BENCHMARK_CASE_ID,
  CASE_CATALOG,
  GENERATION_CASE_IDS,
  INITIAL_CASE,
  isKnownCase,
  loadCase,
  WORKFLOW_CASE_IDS,
} from './data/demoCases'
import Panel from './components/Panel'
import TreeNode from './components/TreeNode'
import KV from './components/KV'
import CodeGraph from './components/CodeGraph'
const WorkflowAgentDemo = lazy(() => import('./components/WorkflowAgentDemo'))

export default function App() {
  const [topTab, setTopTab] = useState(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : ''
    if (hash === 'usage' || WORKFLOW_CASE_IDS.includes(hash)) return 'workflow'
    return 'benchmark'
  })
  const [activeCaseId, setActiveCaseId] = useState(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : ''
    if (hash === 'usage') return 'icu'
    if (isKnownCase(hash)) return hash
    return BENCHMARK_CASE_ID
  })
  const [activeCase, setActiveCase] = useState(INITIAL_CASE)
  const [caseLoading, setCaseLoading] = useState(activeCaseId !== INITIAL_CASE.id)

  const benchmarkInputSections = useMemo(
    () => splitAbpInputText(activeCase.inputText),
    [activeCase.inputText]
  )

  const tabCases = useMemo(() => {
    if (topTab === 'benchmark') return CASE_CATALOG.filter((c) => GENERATION_CASE_IDS.includes(c.id))
    if (topTab === 'workflow') return CASE_CATALOG.filter((c) => WORKFLOW_CASE_IDS.includes(c.id))
    return []
  }, [topTab])

  const [openTree, setOpenTree] = useState(() => ({ ...defaultTreeOpen, [activeCase.planTree.id]: true }))
  const [selectedTreeNodeId, setSelectedTreeNodeId] = useState(activeCase.planTree.id)
  const [selectedCodeNodeId, setSelectedCodeNodeId] = useState(activeCase.codeGraph.nodes[0].id)

  useEffect(() => {
    let cancelled = false
    loadCase(activeCaseId).then((nextCase) => {
      if (cancelled) return
      setActiveCase(nextCase)
      setOpenTree({ [nextCase.planTree.id]: true })
      setSelectedTreeNodeId(nextCase.planTree.id)
      setSelectedCodeNodeId(nextCase.codeGraph.nodes[0].id)
      setCaseLoading(false)
    })
    return () => {
      cancelled = true
    }
  }, [activeCaseId])

  const activateCase = (caseId) => {
    const nextCaseId = isKnownCase(caseId) ? caseId : BENCHMARK_CASE_ID
    if (nextCaseId === activeCaseId) return
    setCaseLoading(true)
    setActiveCaseId(nextCaseId)
    history.replaceState(null, '', `#${nextCaseId}`)
  }

  const selectGroup = (group) => {
    setTopTab(group)
    const nextCaseId = group === 'benchmark' ? BENCHMARK_CASE_ID : 'icu'
    activateCase(nextCaseId)
  }

  const selectCase = (caseId) => {
    activateCase(caseId)
  }

  const selectedTreeNode = useMemo(
    () => findTreeNode(activeCase.planTree, selectedTreeNodeId) ?? activeCase.planTree,
    [activeCase, selectedTreeNodeId]
  )

  const selectedCodeNode = useMemo(
    () => findGraphNode(activeCase.codeGraph.nodes, selectedCodeNodeId) ?? activeCase.codeGraph.nodes[0],
    [activeCase, selectedCodeNodeId]
  )

  const benchmarkEvalAsset = useMemo(
    () => activeCase.evalFlow?.find((s) => s.id === 's1') ?? null,
    [activeCase]
  )

  const benchmarkEvalProcess = useMemo(
    () => activeCase.evalFlow?.filter((s) => s.id !== 's1') ?? [],
    [activeCase]
  )

  return (
    <div className="mx-auto min-h-screen w-full max-w-[1400px] overflow-x-visible px-4 py-7 md:px-6">
      <section className="mb-5 rounded-2xl border-2 border-sky-300 bg-sky-50 p-3">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-sky-800">Click to switch view</p>
        <div className="grid gap-2 md:grid-cols-2">
          <button
            type="button"
            onClick={() => selectGroup('benchmark')}
            className={`rounded-xl border-2 px-4 py-3 text-left text-sm font-semibold transition ${
              topTab === 'benchmark'
                ? 'border-sky-600 bg-sky-600 text-white shadow'
                : 'border-sky-300 bg-white text-sky-800 hover:border-sky-500'
            }`}
          >
            Generation &amp; Evaluation
          </button>
          <button
            type="button"
            onClick={() => selectGroup('workflow')}
            className={`rounded-xl border-2 px-4 py-3 text-left text-sm font-semibold transition ${
              topTab === 'workflow'
                ? 'border-indigo-600 bg-indigo-600 text-white shadow'
                : 'border-indigo-300 bg-white text-indigo-800 hover:border-indigo-500'
            }`}
          >
            Downstream Use
          </button>
        </div>
        {topTab === 'benchmark' && (
          <p className="mt-2 text-[11px] text-sky-800">
            Strategic Airlift shows how a specification becomes a simulator and how its event traces are evaluated.
          </p>
        )}
        {topTab === 'workflow' && (
          <p className="mt-2 text-[11px] text-indigo-800">
            ICU and Wet-Lab illustrate how a generated simulator can support downstream decisions. These examples are separate from the benchmark evaluation.
          </p>
        )}
      </section>

      {(topTab === 'benchmark' || topTab === 'workflow') && (
      <>
      <section className={`mb-5 grid gap-3 ${tabCases.length >= 3 ? 'md:grid-cols-3' : tabCases.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
        {tabCases.map((c) => (
          <button
            key={c.id}
            onClick={() => selectCase(c.id)}
            className={`rounded-2xl border p-4 text-left transition ${
              activeCaseId === c.id
                ? topTab === 'benchmark'
                  ? 'border-sky-500 bg-sky-50 shadow-sm'
                  : 'border-emerald-400 bg-emerald-50 shadow-sm'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <h2 className="text-sm font-semibold text-slate-800 md:text-base">{c.shortTitle}</h2>
            <p className="mt-1 text-xs text-slate-500">{c.scope}</p>
          </button>
        ))}
      </section>

      <div className="grid gap-4">
        {caseLoading ? (
          <Panel icon={<Network className="size-4" />} title="Loading example">
            <p className="text-xs text-slate-600">Loading the selected example data…</p>
          </Panel>
        ) : (
        <>
        {topTab === 'workflow' && (
          <Suspense fallback={<p className="text-xs text-slate-600">Loading downstream-use view…</p>}>
            <WorkflowAgentDemo key={activeCase.id} activeCase={activeCase} />
          </Suspense>
        )}

        {topTab !== 'workflow' && (
        <>
        {activeCase.id === BENCHMARK_CASE_ID && (
          <Panel icon={<FileJson2 className="size-4" />} title="Benchmark Specification Given to DEVS-Gen">
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
        )}
        {activeCase.id !== BENCHMARK_CASE_ID && (
          <Panel icon={<FileJson2 className="size-4" />} title="1) Specification Given to DEVS-Gen">
            <p className="mb-2 text-xs text-slate-600">
              Specification supplied to DEVS-Gen for this benchmark scenario.
            </p>
            <pre className="max-h-[420px] overflow-auto whitespace-pre-wrap break-words rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-700">
              {activeCase.inputText}
            </pre>
          </Panel>
        )}

        {activeCase.id === BENCHMARK_CASE_ID && (
          <div className="grid w-full items-start gap-4 lg:grid-cols-[170px_minmax(0,1fr)]">
            <div className="self-start lg:sticky lg:top-4">
              <div className="flex w-full flex-col items-center">
                <p className="text-center text-[11px] font-semibold text-sky-700">From panel 1 input</p>
                <div className="my-1 h-12 border-l-2 border-sky-400" />
                <p className="-mt-1 mb-1 text-sky-500">↓</p>

                <div className="w-full rounded-2xl border-2 border-cyan-300 bg-cyan-50 p-3 shadow-sm">
                  <div className="mb-2 flex items-center gap-2 text-cyan-800">
                    <Bot className="size-4" />
                    <p className="text-xs font-semibold uppercase tracking-wide">DEVS-Gen workflow</p>
                  </div>
                  <p className="mb-2 text-[11px] text-slate-700">
                    DEVS-Gen first plans the model hierarchy and interfaces, then synthesizes the simulator project bottom-up. The benchmark applies the same evaluator to DEVS-Gen and baseline outputs.
                  </p>
                  <div className="space-y-2 text-[11px] text-slate-700">
                    <div className="rounded-lg border border-slate-200 bg-white p-2">
                      <p className="font-semibold text-indigo-700">Stage 1: Structural Planning (Top-Down)</p>
                      <p>Generate the model hierarchy and component interfaces.</p>
                    </div>
                    <div className="flex justify-center text-slate-500">↓</div>
                    <div className="rounded-lg border border-slate-200 bg-white p-2">
                      <p className="font-semibold text-violet-700">Stage 2: Behavioral Synthesis (Bottom-Up)</p>
                      <p>Generate DEVS components from the PlanTree and assemble the simulator project.</p>
                    </div>
                  </div>
                </div>

                <div className="my-1 h-14 border-l-2 border-emerald-400" />
                <p className="-mt-1 mb-1 text-emerald-500">↓</p>
                <p className="text-center text-[11px] font-semibold text-emerald-700">Evaluation of the Generated Simulator</p>
              </div>
            </div>

            <div className="grid min-w-0 gap-4">
              <Panel icon={<GitBranch className="size-4" />} title="Stage 1: Structural Planning (from Natural Language to PlanTree)">
                <p className="mb-2 text-xs text-slate-600">
                  This panel shows the resulting PlanTree: the model hierarchy and component interfaces.
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
                        <summary className="cursor-pointer text-xs text-sky-700">Port and Argument Schemas</summary>
                        <pre className="mt-2 max-h-52 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">
                          {selectedTreeNode.details?.schemas || 'No port or argument schema is recorded for this node.'}
                        </pre>
                      </details>
                      <details className="mt-2 rounded-lg border border-slate-200 bg-white p-2">
                        <summary className="cursor-pointer text-xs text-sky-700">Logging Requirements</summary>
                        <pre className="mt-2 max-h-44 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">
                          {selectedTreeNode.details?.logging || 'No logging requirements are recorded for this node.'}
                        </pre>
                      </details>
                    </div>

                    <div className="mb-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-700">ModelPlan</p>
                      <details className="mb-2 rounded-lg border border-slate-200 bg-white p-2">
                        <summary className="cursor-pointer text-xs text-sky-700">Functional Responsibility</summary>
                        <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">
                          {selectedTreeNode.details?.function || 'No functional responsibility is recorded for this node.'}
                        </pre>
                      </details>
                    </div>

                    <details className="mt-2 rounded-lg border border-slate-200 bg-white p-2">
                      <summary className="cursor-pointer text-xs text-sky-700">PlanTree Node Data</summary>
                      <pre className="mt-2 max-h-64 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">
                        {JSON.stringify(selectedTreeNode, null, 2)}
                      </pre>
                    </details>
                  </div>
                </div>
              </Panel>

              <Panel icon={<Network className="size-4" />} title="Stage 2: Behavioral Synthesis (Bottom-Up)">
                <p className="mb-2 text-xs text-slate-600">
                  This panel shows the generated component wiring and DEVS transition and output methods used in evaluation.
                </p>
                <div className="space-y-4">
                  <div className="rounded-2xl border border-slate-200 bg-white p-3">
                    <CodeGraph
                      key={activeCase.id}
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
        )}

        {activeCase.id !== BENCHMARK_CASE_ID && (
        <>
        <Panel
          icon={<GitBranch className="size-4" />}
          title="2) PlanTree"
        >
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
                  <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">
                  ModelPlan Interface
                </p>
                <div className="mt-2">
                  <KV title="init args" items={selectedTreeNode.initArgsTyped || withUnknownType(selectedTreeNode.initArgs)} />
                  <KV title="input ports" items={selectedTreeNode.portsTyped?.input || withUnknownType(selectedTreeNode.ports?.input || [])} />
                  <KV title="output ports" items={selectedTreeNode.portsTyped?.output || withUnknownType(selectedTreeNode.ports?.output || [])} />
                </div>
                <details className="rounded-lg border border-slate-200 bg-white p-2">
                  <summary className="cursor-pointer text-xs text-sky-700">
                    Port and Argument Schemas
                  </summary>
                  <pre className="mt-2 max-h-52 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">
                    {selectedTreeNode.details?.schemas || 'No port or argument schema is recorded for this node.'}
                  </pre>
                </details>
                <details className="mt-2 rounded-lg border border-slate-200 bg-white p-2">
                  <summary className="cursor-pointer text-xs text-sky-700">
                    Logging Requirements
                  </summary>
                  <pre className="mt-2 max-h-44 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">
                    {selectedTreeNode.details?.logging || 'No logging requirements are recorded for this node.'}
                  </pre>
                </details>
              </div>

              <div className="mb-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-700">ModelPlan</p>
                <details className="mb-2 rounded-lg border border-slate-200 bg-white p-2">
                  <summary className="cursor-pointer text-xs text-sky-700">
                    Functional Responsibility
                  </summary>
                  <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">
                    {selectedTreeNode.details?.function || 'No functional responsibility is recorded for this node.'}
                  </pre>
                </details>
              </div>

              <details className="mt-2 rounded-lg border border-slate-200 bg-white p-2">
                <summary className="cursor-pointer text-xs text-sky-700">PlanTree Node Data</summary>
                <pre className="mt-2 max-h-64 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">
                  {JSON.stringify(selectedTreeNode, null, 2)}
                </pre>
              </details>
            </div>
          </div>
        </Panel>

        <Panel
          icon={<Network className="size-4" />}
          title="3) Generated Components and DEVS Methods"
        >
          <div className="grid gap-4 xl:grid-cols-[1.18fr_1fr]">
            <div className="rounded-2xl border border-slate-200 bg-white p-3">
              <CodeGraph
                key={activeCase.id}
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
                DEVS Transition and Output Functions
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
        </>
        )}

        {GENERATION_CASE_IDS.includes(activeCase.id) && activeCase.evalFlow?.length > 0 && (
          <Panel icon={<CheckCircle2 className="size-4" />} title={activeCase.id === BENCHMARK_CASE_ID ? 'Evaluation of the Generated Simulator' : '4) Benchmark Evaluation'}>
            <p className="mb-2 text-xs text-slate-600">
              The benchmark runs the test cases, checks the simulator traces against the requirements, and aggregates the resulting scores.
            </p>

            {benchmarkEvalAsset && (
              <div className="mb-2 rounded-lg border border-slate-200 bg-slate-50 p-2">
                <p className="text-xs font-semibold text-slate-700">Evaluation assets</p>
                <p className="mt-1 text-[11px] text-slate-600">
                  Test suite D and per-case input d_i=(I,J)—initialization I and optional input stream J—are loaded from the benchmark configuration.
                </p>
                {benchmarkEvalAsset.sampleSelectionNote && (
                  <p className="mt-1 text-[11px] text-slate-600">{benchmarkEvalAsset.sampleSelectionNote}</p>
                )}
                <pre className="mt-2 max-h-44 overflow-auto whitespace-pre-wrap break-words rounded-md border border-slate-200 bg-white p-2 text-[11px] text-slate-700">{benchmarkEvalAsset.sampleConfig}</pre>
              </div>
            )}

            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-700">Evaluation process</p>
            <div className="space-y-2">
              {benchmarkEvalProcess.map((s, idx) => (
                  <div key={s.id} className="rounded-lg border border-slate-200 bg-white p-2">
                    <p className="text-xs font-semibold text-sky-700">Step {idx + 1} · {s.title}</p>

                    {s.id === 's2' && (
                      <div className="mt-2">
                        <p className="text-[11px] font-semibold text-slate-700">Trace excerpt</p>
                        {s.sampleLogNote && (
                          <p className="mt-1 text-[11px] text-slate-600">{s.sampleLogNote}</p>
                        )}
                        <pre className="mt-1 max-h-52 overflow-auto whitespace-pre-wrap break-words rounded-md border border-slate-200 bg-slate-50 p-2 text-[11px] text-slate-700">{s.sampleLogs}</pre>
                      </div>
                    )}

                    {s.id === 's3' && (
                      <div className="mt-2">
                        <p className="mt-1 text-[11px] text-slate-600">
                          Rules run over relevant events and event relations in T_i. The checker records evidence for each operational or behavioral requirement.
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
        )}

        {activeCase.id === BENCHMARK_CASE_ID && (
          <Panel icon={<MonitorPlay className="size-4" />} title="Event-Driven Visualization">
            <p className="mb-3 text-xs text-slate-600">
              Events emitted by the generated simulator drive aircraft, pallet, and status updates in the scene. The simulator remains responsible for task state, event scheduling, and transition logic.
            </p>
            <video
              className="block w-full rounded-xl border border-slate-200 bg-slate-950"
              controls
              muted
              loop
              playsInline
              preload="metadata"
              poster="static/images/sa_visualization_poster.jpg"
            >
              <source src="static/videos/strategic_airlift_visualization.mp4" type="video/mp4" />
              Your browser does not support embedded MP4 video.
            </video>
          </Panel>
        )}

        </>
        )}
        </>
        )}
      </div>
      </>
      )}

    </div>
  )
}

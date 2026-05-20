import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Bot,
  CircleX,
  CheckCircle2,
  ChevronDown,
  FileJson2,
  GitBranch,
  Network,
  Route,
} from 'lucide-react'
import { findTreeNode, findGraphNode, getMethodViews, withUnknownType, splitAbpInputText, initAi2InteractiveState } from './utils/helpers'
import { defaultTreeOpen } from './data/constants'
import { VISIBLE_CASES, BENCHMARK_CASE_ID, SA_INPUT_SECTIONS, CASES, WETLAB_SPEC_PROMPT_TEMPLATE, WETLAB_SPEC_EXAMPLE, WETLAB_DIRECT_PROMPT_TEMPLATE, WETLAB_DIRECT_CALL_TYPE, WETLAB_ASSIST_PROMPT_TEMPLATE, WETLAB_ASSIST_CALL_TYPE, WETLAB_DIRECT_OUTPUT_RAW, WETLAB_ASSIST_OUTPUT_RAW, ICU_SPEC_EXAMPLE, ICU_DIRECT_CALL_TYPE, ICU_ASSIST_CALL_TYPE, ICU_DIRECT_OUTPUT_RAW, ICU_ASSIST_OUTPUT_RAW } from './data/cases'
import Panel from './components/Panel'
import TreeNode from './components/TreeNode'
import KV from './components/KV'
import CodeGraph from './components/CodeGraph'
import ChatTurn from './components/ChatTurn'
import WorkflowAgentDemo from './components/WorkflowAgentDemo'
export default function App() {
  const [topTab, setTopTab] = useState(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : ''
    if (hash === 'usage' || hash === 'icu' || hash === 'wetlab') return 'workflow'
    return 'benchmark'
  })
  const [activeCaseId, setActiveCaseId] = useState(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : ''
    if (hash === 'icu') return 'icu'
    if (hash === 'wetlab') return 'wetlab'
    return BENCHMARK_CASE_ID
  })
  const activeCase = useMemo(
    () => VISIBLE_CASES.find((c) => c.id === activeCaseId) ?? VISIBLE_CASES[0],
    [activeCaseId]
  )

  const benchmarkInputSections = useMemo(
    () => (activeCase.id === BENCHMARK_CASE_ID ? SA_INPUT_SECTIONS : splitAbpInputText(activeCase.inputText)),
    [activeCase]
  )

  const tabCases = useMemo(() => {
    if (topTab === 'benchmark') return VISIBLE_CASES.filter((c) => c.id === BENCHMARK_CASE_ID)
    if (topTab === 'workflow') return VISIBLE_CASES.filter((c) => c.id === 'wetlab' || c.id === 'icu')
    return []
  }, [topTab])

  const [openTree, setOpenTree] = useState(defaultTreeOpen)
  const [selectedTreeNodeId, setSelectedTreeNodeId] = useState(
    CASES.find((c) => c.id === BENCHMARK_CASE_ID)?.planTree?.id || 'abp-root'
  )
  const [selectedCodeNodeId, setSelectedCodeNodeId] = useState('n1')
  const [ai2State, setAi2State] = useState(initAi2InteractiveState())

  useEffect(() => {
    if (topTab === 'benchmark' && activeCaseId !== BENCHMARK_CASE_ID) {
      setActiveCaseId(BENCHMARK_CASE_ID)
      return
    }
    if (topTab === 'workflow' && activeCaseId !== 'wetlab' && activeCaseId !== 'icu') {
      setActiveCaseId('wetlab')
    }
  }, [topTab, activeCaseId])

  useEffect(() => {
    setSelectedTreeNodeId(activeCase.planTree.id)
    setSelectedCodeNodeId(activeCase.codeGraph.nodes[0].id)
  }, [activeCaseId, activeCase])

  const selectedTreeNode = useMemo(
    () => findTreeNode(activeCase.planTree, selectedTreeNodeId) ?? activeCase.planTree,
    [activeCase, selectedTreeNodeId]
  )

  const selectedCodeNode = useMemo(
    () => findGraphNode(activeCase.codeGraph.nodes, selectedCodeNodeId) ?? activeCase.codeGraph.nodes[0],
    [activeCase, selectedCodeNodeId]
  )

  const benchmarkEvalAsset = useMemo(
    () => (activeCase.id === BENCHMARK_CASE_ID ? activeCase.evalFlow.find((s) => s.id === 's1') ?? null : null),
    [activeCase]
  )

  const benchmarkEvalProcess = useMemo(
    () => (activeCase.id === BENCHMARK_CASE_ID ? activeCase.evalFlow.filter((s) => s.id !== 's1') : []),
    [activeCase]
  )

  const runAi2Command = (cmd) => {
    setAi2State((s) => {
      if (cmd === 'reset') return initAi2InteractiveState()
      const n = structuredClone(s)
      n.t += 1
      let ok = true
      let error = null
      const mug = n.objects.mug_1

      if (cmd === 'open_drawer') n.receptacles.drawer_1.open = true
      if (cmd === 'close_fridge') n.receptacles.fridge_1.open = false
      if (cmd === 'pickup_mug') {
        if (!n.agentHolding && mug.parent) {
          n.agentHolding = 'mug_1'
          mug.held = true
          mug.parent = null
        } else {
          ok = false
          error = 'cannot_pickup_mug'
        }
      }
      if (cmd === 'put_mug_drawer') {
        if (n.agentHolding === 'mug_1' && n.receptacles.drawer_1.open) {
          n.agentHolding = null
          mug.held = false
          mug.parent = 'drawer_1'
        } else {
          ok = false
          error = 'cannot_put_mug_drawer'
        }
      }

      const misplaced = Object.entries(n.goals)
        .filter(([obj, target]) => n.objects[obj].parent !== target)
        .map(([obj]) => obj)
      const recMismatch = Object.entries(n.receptacles)
        .filter(([_, r]) => r.open !== r.goalOpen)
        .map(([name]) => name)
      const totalChecks = Object.keys(n.goals).length + Object.keys(n.receptacles).length
      const mismatchCount = misplaced.length + recMismatch.length
      const fraction = Math.max(0, Math.min(1, 1 - mismatchCount / totalChecks))

      n.logs.push(
        JSON.stringify({
          time: n.t,
          cmd,
          ok,
          error,
          misplaced_objects: misplaced,
          receptacle_mismatches: recMismatch,
          fraction_complete: Number(fraction.toFixed(3)),
          done: mismatchCount === 0,
        })
      )
      return n
    })
  }

  return (
    <div className="mx-auto min-h-screen w-full max-w-[1400px] overflow-x-visible px-4 py-7 md:px-6">
      <section className="mb-5 rounded-2xl border-2 border-sky-300 bg-sky-50 p-3">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-sky-800">Click to switch view</p>
        <div className="grid gap-2 md:grid-cols-2">
          <button
            type="button"
            onClick={() => { setTopTab('benchmark'); setActiveCaseId(BENCHMARK_CASE_ID); window.location.hash = 'benchmark' }}
            className={`rounded-xl border-2 px-4 py-3 text-left text-sm font-semibold transition ${
              topTab === 'benchmark'
                ? 'border-sky-600 bg-sky-600 text-white shadow'
                : 'border-sky-300 bg-white text-sky-800 hover:border-sky-500'
            }`}
          >
            Benchmark Deep Dive
          </button>
          <button
            type="button"
            onClick={() => { setTopTab('workflow'); setActiveCaseId('wetlab'); window.location.hash = 'usage' }}
            className={`rounded-xl border-2 px-4 py-3 text-left text-sm font-semibold transition ${
              topTab === 'workflow'
                ? 'border-indigo-600 bg-indigo-600 text-white shadow'
                : 'border-indigo-300 bg-white text-indigo-800 hover:border-indigo-500'
            }`}
          >
            Real-World Usage
          </button>
        </div>
        {topTab === 'benchmark' && (
          <p className="mt-2 text-[11px] text-sky-800">
            Standard benchmark pipeline: specification Spec=(Spec<sub>ope</sub>, Spec<sub>beh</sub>) -&gt; generated executable simulator M -&gt; checker computes Score<sub>ope</sub> and Score<sub>beh</sub>.
          </p>
        )}
        {topTab === 'workflow' && (
          <p className="mt-2 text-[11px] text-indigo-800">
            In real planning tasks, LLMs must reason over complex, uncertain scenarios. Direct reasoning often fails; our model-assisted workflow uses executable DEVS simulations to ground decisions in evidence.
          </p>
        )}
      </section>

      {(topTab === 'benchmark' || topTab === 'workflow') && (
      <>
      {topTab === 'workflow' && (
      <section className="mb-5 grid gap-3 md:grid-cols-2">
        {tabCases.map((c) => (
          <button
            key={c.id}
            onClick={() => { setActiveCaseId(c.id); window.location.hash = c.id === 'wetlab' ? 'wetlab' : 'icu' }}
            className={`rounded-2xl border p-4 text-left transition ${
              activeCaseId === c.id
                ? 'border-emerald-400 bg-emerald-50'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <h2 className="text-sm font-semibold text-slate-800 md:text-base">{c.title}</h2>
            <p className="mt-1 text-xs text-slate-500">{c.tag}</p>
          </button>
        ))}
      </section>
      )}

      <div className="grid gap-4">
        {topTab === 'workflow' && <WorkflowAgentDemo activeCase={activeCase} />}

        {topTab !== 'workflow' && (
        <>
        {activeCase.id === BENCHMARK_CASE_ID && (
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
        )}

        {activeCase.id === 'wetlab' && (
          <>
            <Panel icon={<FileJson2 className="size-4" />} title="1) Task">
              <pre className="max-h-[420px] overflow-auto whitespace-pre-wrap break-words rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-700">
                {activeCase.inputText}
              </pre>
            </Panel>

            <Panel icon={<FileJson2 className="size-4" />} title="2) Model Spec Generation">
              <p className="mb-3 text-xs text-slate-600">We prompt GPT-5.4 to generate this model spec from the task definition.</p>
              <div className="space-y-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">Prompt template for model spec generation</p>
                  <pre className="mt-2 max-h-[320px] overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-white p-2 text-[11px] text-slate-700">
                    {WETLAB_SPEC_PROMPT_TEMPLATE}
                  </pre>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">Generated model spec (scene_2_spec.yaml)</p>
                  <pre className="mt-2 max-h-[320px] overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-white p-2 text-[11px] text-slate-700">
                    {WETLAB_SPEC_EXAMPLE}
                  </pre>
                </div>
              </div>
            </Panel>
          </>
        )}

        {activeCase.id === 'icu' && (
          <>
            <Panel icon={<FileJson2 className="size-4" />} title="1) Task">
              <pre className="max-h-[420px] overflow-auto whitespace-pre-wrap break-words rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-700">
                {activeCase.inputText}
              </pre>
            </Panel>

            <Panel icon={<FileJson2 className="size-4" />} title="2) Model Spec Generation">
              <p className="mb-3 text-xs text-slate-600">We prompt GPT-5.4 to generate this model spec from the task definition.</p>
              <div className="space-y-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">Prompt template for model spec generation</p>
                  <pre className="mt-2 max-h-[320px] overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-white p-2 text-[11px] text-slate-700">
                    {WETLAB_SPEC_PROMPT_TEMPLATE}
                  </pre>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">Generated model spec (scene_1_spec.yaml)</p>
                  <pre className="mt-2 max-h-[320px] overflow-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-white p-2 text-[11px] text-slate-700">
                    {ICU_SPEC_EXAMPLE}
                  </pre>
                </div>
              </div>
            </Panel>
          </>
        )}

        {activeCase.id !== 'wetlab' && activeCase.id !== 'icu' && activeCase.id !== BENCHMARK_CASE_ID && (
          <Panel icon={<FileJson2 className="size-4" />} title="1) Full Original System Input">
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
        )}

        {activeCase.id !== BENCHMARK_CASE_ID && (
        <>
        <Panel
          icon={<GitBranch className="size-4" />}
          title={
            activeCase.id === BENCHMARK_CASE_ID
              ? '2) Generation Output A: Stage 1 Structural Planning (PlanTree / Algorithm 2)'
              : activeCase.id === 'wetlab' || activeCase.id === 'icu'
                ? '3) Modeling Plan Tree (expand + inspect)'
                : '2) Modeling Plan Tree (expand + inspect)'
          }
        >
          {activeCase.id === BENCHMARK_CASE_ID && (
            <div className="mb-2 rounded-xl border border-amber-300 bg-amber-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">Generated by DEVS-GEN (not benchmark asset)</p>
              <p className="mt-1 text-[12px] text-slate-700">
                We feed the benchmark scenario specification (panel 1) into our DEVS-GEN framework. This panel shows Stage 1 structural planning output: model decomposition and interfaces.
              </p>
            </div>
          )}
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
                  {activeCase.id === BENCHMARK_CASE_ID ? 'ModelPlan Interface' : 'Interface overview'}
                </p>
                {activeCase.id === BENCHMARK_CASE_ID && (
                  <p className="mt-1 text-[11px] text-slate-600">
                    Includes <code>model_init_args</code>, <code>input_ports</code>, <code>output_ports</code>, and output trace schema obligations.
                  </p>
                )}
                <div className="mt-2">
                  <KV title="init args" items={selectedTreeNode.initArgsTyped || withUnknownType(selectedTreeNode.initArgs)} />
                  <KV title="input ports" items={selectedTreeNode.portsTyped?.input || withUnknownType(selectedTreeNode.ports?.input || [])} />
                  <KV title="output ports" items={selectedTreeNode.portsTyped?.output || withUnknownType(selectedTreeNode.ports?.output || [])} />
                </div>
                <details className="rounded-lg border border-slate-200 bg-white p-2">
                  <summary className="cursor-pointer text-xs text-sky-700">
                    {activeCase.id === BENCHMARK_CASE_ID ? 'ModelPlan typed schema details (args + ports)' : 'Typed schemas (args + ports)'}
                  </summary>
                  <pre className="mt-2 max-h-52 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">
                    {selectedTreeNode.details?.schemas || 'No embedded schema detail for this node.'}
                  </pre>
                </details>
                <details className="mt-2 rounded-lg border border-slate-200 bg-white p-2">
                  <summary className="cursor-pointer text-xs text-sky-700">
                    {activeCase.id === BENCHMARK_CASE_ID ? 'ModelPlan logging requirements' : 'Logging detail (expanded)'}
                  </summary>
                  <pre className="mt-2 max-h-44 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">
                    {selectedTreeNode.details?.logging || 'No embedded full logging text for this node.'}
                  </pre>
                </details>
              </div>

              <div className="mb-2 rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-700">ModelPlan</p>
                <details className="mb-2 rounded-lg border border-slate-200 bg-white p-2">
                  <summary className="cursor-pointer text-xs text-sky-700">
                    {activeCase.id === BENCHMARK_CASE_ID ? 'Function semantics' : 'Function description (expanded)'}
                  </summary>
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

        <Panel
          icon={<Network className="size-4" />}
          title={
            activeCase.id === BENCHMARK_CASE_ID
              ? '3) Generation Output B: Stage 2 Behavioral Synthesizing (Code Topology + DEVS Methods)'
              : activeCase.id === 'wetlab' || activeCase.id === 'icu'
                ? '4) Code Topology + IO Ports + Method Details'
                : '3) Code Topology + IO Ports + Method Details'
          }
        >
          {activeCase.id === BENCHMARK_CASE_ID && (
            <div className="mb-2 rounded-xl border border-amber-300 bg-amber-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">Generated by DEVS-GEN (not benchmark asset)</p>
              <p className="mt-1 text-[12px] text-slate-700">
                This is Stage 2 (Behavioral Synthesizing) from the same scenario specification. DEVS-GEN produces executable wiring and transition logic, which are exactly what panel 4 evaluates.
              </p>
            </div>
          )}
          <div className="grid gap-4 xl:grid-cols-[1.18fr_1fr]">
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
                {activeCase.id === BENCHMARK_CASE_ID ? 'Behavioral semantics (DEVS transition/output functions)' : 'DEVS methods (paper-aligned naming)'}
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

        {activeCase.id === BENCHMARK_CASE_ID && (
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
        )}

        {activeCase.id === 'wetlab' && (
          <Panel icon={<CheckCircle2 className="size-4" />} title="5) Direct vs Model-assisted Reasoning Comparison">
            <div className="grid gap-3 xl:grid-cols-2">
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-3">
                <p className="text-sm font-semibold uppercase tracking-wide text-rose-700">Direct run(wrong)</p>
                <div className="mt-2 rounded-lg border border-rose-200 bg-white p-2">
                  <p className="text-xs font-semibold text-slate-700">(1) Original prompt template</p>
                  <pre className="mt-1 max-h-44 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{WETLAB_DIRECT_PROMPT_TEMPLATE}</pre>
                </div>
                <div className="mt-2 rounded-lg border border-rose-200 bg-white p-2">
                  <p className="text-xs font-semibold text-slate-700">(2) Calling type</p>
                  <pre className="mt-1 max-h-20 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{WETLAB_DIRECT_CALL_TYPE}</pre>
                </div>
                <div className="mt-2 rounded-lg border border-rose-200 bg-white p-2">
                  <p className="text-xs font-semibold text-slate-700">(3) Raw reply text</p>
                  <pre className="mt-1 max-h-64 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{WETLAB_DIRECT_OUTPUT_RAW}</pre>
                </div>
              </div>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Model-assisted workflow run(right)</p>
                <div className="mt-2 rounded-lg border border-emerald-200 bg-white p-2">
                  <p className="text-xs font-semibold text-slate-700">(1) Original prompt template</p>
                  <pre className="mt-1 max-h-44 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{WETLAB_ASSIST_PROMPT_TEMPLATE}</pre>
                </div>
                <div className="mt-2 rounded-lg border border-emerald-200 bg-white p-2">
                  <p className="text-xs font-semibold text-slate-700">(2) Calling type</p>
                  <pre className="mt-1 max-h-20 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{WETLAB_ASSIST_CALL_TYPE}</pre>
                </div>
                <div className="mt-2 rounded-lg border border-emerald-200 bg-white p-2">
                  <p className="text-xs font-semibold text-slate-700">(3) Raw reply text</p>
                  <pre className="mt-1 max-h-64 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{WETLAB_ASSIST_OUTPUT_RAW}</pre>
                </div>
              </div>
            </div>

          </Panel>
        )}

        {activeCase.id === 'icu' && (
          <Panel icon={<CheckCircle2 className="size-4" />} title="5) Direct vs Model-assisted Reasoning Comparison">
            <div className="grid gap-3 xl:grid-cols-2">
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-3">
                <p className="text-sm font-semibold uppercase tracking-wide text-rose-700">Direct run(wrong)</p>
                <div className="mt-2 rounded-lg border border-rose-200 bg-white p-2">
                  <p className="text-xs font-semibold text-slate-700">(1) Original prompt template</p>
                  <pre className="mt-1 max-h-44 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{WETLAB_DIRECT_PROMPT_TEMPLATE}</pre>
                </div>
                <div className="mt-2 rounded-lg border border-rose-200 bg-white p-2">
                  <p className="text-xs font-semibold text-slate-700">(2) Calling type</p>
                  <pre className="mt-1 max-h-20 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{ICU_DIRECT_CALL_TYPE}</pre>
                </div>
                <div className="mt-2 rounded-lg border border-rose-200 bg-white p-2">
                  <p className="text-xs font-semibold text-slate-700">(3) Raw reply text</p>
                  <pre className="mt-1 max-h-64 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{ICU_DIRECT_OUTPUT_RAW}</pre>
                </div>
              </div>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Model-assisted workflow run(right)</p>
                <div className="mt-2 rounded-lg border border-emerald-200 bg-white p-2">
                  <p className="text-xs font-semibold text-slate-700">(1) Original prompt template</p>
                  <pre className="mt-1 max-h-44 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{WETLAB_ASSIST_PROMPT_TEMPLATE}</pre>
                </div>
                <div className="mt-2 rounded-lg border border-emerald-200 bg-white p-2">
                  <p className="text-xs font-semibold text-slate-700">(2) Calling type</p>
                  <pre className="mt-1 max-h-20 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{ICU_ASSIST_CALL_TYPE}</pre>
                </div>
                <div className="mt-2 rounded-lg border border-emerald-200 bg-white p-2">
                  <p className="text-xs font-semibold text-slate-700">(3) Raw reply text</p>
                  <pre className="mt-1 max-h-64 overflow-auto whitespace-pre-wrap break-words text-[11px] text-slate-700">{ICU_ASSIST_OUTPUT_RAW}</pre>
                </div>
              </div>
            </div>

          </Panel>
        )}

        {activeCase.interactive?.type === 'ai2thor' && (
          <Panel icon={<Route className="size-4" />} title="5) Interactive Demo (complex world model)">
            <div className="mb-3 flex flex-wrap gap-2">
              {[
                ['compare_to_goal', 'compare_to_goal'],
                ['open_drawer', 'open_drawer'],
                ['pickup_mug', 'pickup_mug'],
                ['put_mug_drawer', 'put_mug_drawer'],
                ['close_fridge', 'close_fridge'],
                ['reset', 'reset'],
              ].map(([label, cmd]) => (
                <button
                  key={cmd}
                  onClick={() => runAi2Command(cmd)}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-700 hover:border-sky-400"
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="mb-3 grid gap-2 md:grid-cols-2 lg:grid-cols-4">
              {[
                `time=${ai2State.t}`,
                `holding=${ai2State.agentHolding ?? 'none'}`,
                `mug_1.parent=${ai2State.objects.mug_1.parent ?? 'held'}`,
                `fridge_open=${ai2State.receptacles.fridge_1.open}`,
                `drawer_open=${ai2State.receptacles.drawer_1.open}`,
                `apple_1.parent=${ai2State.objects.apple_1.parent}`,
              ].map((x) => (
                <div key={x} className="rounded-lg border border-slate-200 bg-white px-3 py-2 font-mono text-xs text-slate-700">
                  {x}
                </div>
              ))}
            </div>
            <pre className="max-h-60 overflow-auto whitespace-pre-wrap break-words rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-700">
              {ai2State.logs.join('\n') || 'No events yet'}
            </pre>
          </Panel>
        )}
        </>
        )}
      </div>
      </>
      )}

    </div>
  )
}

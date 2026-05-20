import { PAPER_METHOD_META } from '../data/constants.js'

export function findTreeNode(node, id) {
  if (node.id === id) return node
  for (const child of node.children) {
    const got = findTreeNode(child, id)
    if (got) return got
  }
  return null
}

export function findGraphNode(nodes, id) {
  return nodes.find((n) => n.id === id) || null
}

export function getMethodViews(node) {
  const methods = node?.methods || {}
  const ordered = ['__init__', 'initialize', 'ta', 'deltint', 'deltext', 'lambdaf', 'deltconf', 'exit']
  const presentOrdered = ordered.filter((name) => Object.prototype.hasOwnProperty.call(methods, name))
  const extras = Object.keys(methods).filter((name) => !ordered.includes(name))
  const names = [...presentOrdered, ...extras]

  return names.map((name) => {
    const raw = methods[name]
    const meta = PAPER_METHOD_META[name] || {
      paperName: 'Helper / Internal Method',
      intro: 'Project-specific helper used by DEVS transitions or output logic.',
    }
    if (typeof raw === 'string') {
      return {
        name,
        paperName: meta.paperName,
        intro: meta.intro,
        code: raw,
      }
    }
    return {
      name,
      paperName: raw.paperName || meta.paperName,
      intro: raw.intro || meta.intro,
      code: raw.code || '',
    }
  })
}

export function normalizeBlockIndent(text = '') {
  const lines = String(text).split('\n')
  const nonEmpty = lines.filter((line) => line.trim().length > 0)
  if (nonEmpty.length === 0) return ''
  const minIndent = Math.min(...nonEmpty.map((line) => (line.match(/^ */)?.[0].length ?? 0)))
  return lines.map((line) => line.slice(Math.min(minIndent, line.length))).join('\n').trim()
}

export function splitAbpInputText(inputText = '') {
  const m = String(inputText).match(/general:\s*\|\n([\s\S]*?)\n\s*scenario:\s*\|\n([\s\S]*?)\n\s*args_input_output:\s*\|\n([\s\S]*)$/)
  if (!m) {
    return {
      general: String(inputText).trim(),
      scenario: '',
      interface: '',
    }
  }
  return {
    general: normalizeBlockIndent(m[1]),
    scenario: normalizeBlockIndent(m[2]),
    interface: normalizeBlockIndent(m[3]),
  }
}

export function withUnknownType(items = []) {
  return items.map((x) => (typeof x === 'string' ? { name: x, type: '?' } : x))
}

export function initAi2InteractiveState() {
  return {
    t: 0,
    agentHolding: null,
    objects: {
      mug_1: { parent: 'counter', held: false },
      apple_1: { parent: 'fridge_1', held: false },
    },
    receptacles: {
      drawer_1: { open: false, goalOpen: false },
      fridge_1: { open: true, goalOpen: false },
    },
    goals: {
      mug_1: 'drawer_1',
      apple_1: 'fridge_1',
    },
    logs: [],
  }
}

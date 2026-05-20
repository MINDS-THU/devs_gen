import { splitAbpInputText } from '../utils/helpers'

export const PAPER_METHOD_META = {
  ta: {
    paperName: 'ta(s) Time Advance',
    intro: 'Defines the time until the next internal transition from current state s.',
  },
  deltint: {
    paperName: 'delta_int(s) Internal Transition',
    intro: 'State update when scheduled internal event fires.',
  },
  deltext: {
    paperName: 'delta_ext(s, e, x) External Transition',
    intro: 'State update on external input x after elapsed time e.',
  },
  lambdaf: {
    paperName: 'lambda(s) Output Function',
    intro: 'Computes outputs emitted just before internal transition.',
  },
  deltconf: {
    paperName: 'delta_con(s, x) Confluent Transition',
    intro: 'Conflict resolution when external and internal events coincide.',
  },
  __init__: {
    paperName: 'Model Constructor / Coupling Definition',
    intro: 'Declares ports, init args, and (for coupled models) wiring relations.',
  },
  initialize: {
    paperName: 'Initialization Routine',
    intro: 'Resets model state and schedules initial phase before simulation starts.',
  },
  exit: {
    paperName: 'Finalization Routine',
    intro: 'Final cleanup/final logging hook after simulation completes.',
  },
}

export const XDEVS_DEFAULTS = {
  ta: `def ta(self) -> float:\n    return self.sigma`,
  deltconf: `def deltcon(self):\n    \"\"\"Confluent transitions of the atomic model. By default, internal transition is triggered first.\"\"\"\n    self.deltint()\n    self.deltext(0)`,
}

export const defaultTreeOpen = {
  'sa-root': true,
  'sa-ops': true,
  'sa-fleet': true,
  'sa-aircraft-unit-template': true,
  'sa-aircraft-mission': true,
  'sa-aircraft-mission-sm': true,
  'sa-aircraft-mission-log': true,
  'icu-root': true,
  'icu-sim': true,
  'wetlab-root': true,
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

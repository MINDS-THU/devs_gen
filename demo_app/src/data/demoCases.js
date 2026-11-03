import strategicAirliftCase from './showcase_cases/sa.json'

export const BENCHMARK_CASE_ID = 'sa'
export const GENERATION_CASE_IDS = ['sa']
export const WORKFLOW_CASE_IDS = ['icu', 'wetlab']

export const CASE_PRESENTATION = {
  sa: {
    shortTitle: 'Strategic Airlift',
    scope: "The paper's running example, including generation and benchmark evaluation.",
  },
  icu: {
    shortTitle: 'ICU Sepsis Treatment',
    scope: 'An illustrative downstream-use example, separate from the benchmark evaluation.',
  },
  wetlab: {
    shortTitle: 'Wet-Lab Scheduling',
    scope: 'An illustrative downstream-use example, separate from the benchmark evaluation.',
  },
}

export const CASE_CATALOG = Object.entries(CASE_PRESENTATION).map(([id, presentation]) => ({
  id,
  ...presentation,
}))

export const INITIAL_CASE = strategicAirliftCase

const CASE_LOADERS = {
  sa: () => Promise.resolve(strategicAirliftCase),
  icu: () => import('./showcase_cases/icu.json').then((module) => module.default),
  wetlab: () => import('./showcase_cases/wetlab.json').then((module) => module.default),
}

export function isKnownCase(caseId) {
  return Object.prototype.hasOwnProperty.call(CASE_LOADERS, caseId)
}

export function loadCase(caseId) {
  return (CASE_LOADERS[caseId] || CASE_LOADERS.sa)()
}

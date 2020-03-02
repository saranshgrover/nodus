import { getPreciseTime } from '../../server/tools'

export const parseAdvancementCondition = condition => {
  if (!condition) {
    return ''
  }
  switch (condition.type) {
    case 'ranking':
      return `Top ${parseInt(condition.level)}`
    case 'percent':
      return `${parseInt(condition.leve)}%`
    case 'attemptResult':
      return `Better than ${getPreciseTime(condition.level)}`
    default:
      return ''
  }
}

export const parseCutoff = cutoff => {
  return `${getPreciseTime(cutoff.attemptResult)} seconds in ${
    cutoff.numberOfAttempts
  } results`
}

const formatMbldAttempt = (attempt) => {
	const { solved, attempted, centiseconds } = decodeMbldAttempt(attempt)
	const clockFormat = new Date(centiseconds * 10)
		.toISOString()
		.substr(11, 8)
		.replace(/^[0:]*(?!\.)/g, '')
	return `${solved}/${attempted} ${clockFormat}`
}

export const formatAttemptResult = (
	attemptResult,
	eventId,
	isAverage = false
) => {
	if (attemptResult === 0) return ''
	if (attemptResult === -1) return 'DNF'
	if (attemptResult === -2) return 'DNS'
	if (eventId === '333fm') {
		return isAverage
			? (attemptResult / 100).toFixed(2)
			: attemptResult.toString()
	}
	if (eventId === '333mbf') return formatMbldAttempt(attemptResult)
	return centisecondsToClockFormat(attemptResult)
}
export const decodeMbldAttempt = (value) => {
	if (value <= 0) return { solved: 0, attempted: 0, centiseconds: value }
	const missed = value % 100
	const seconds = Math.floor(value / 100) % 1e5
	const points = 99 - (Math.floor(value / 1e7) % 100)
	const solved = points + missed
	const attempted = solved + missed
	const centiseconds = seconds === 99999 ? null : seconds * 100
	return { solved, attempted, centiseconds }
}
export const centisecondsToClockFormat = (centiseconds) => {
	if (!Number.isFinite(centiseconds)) return null
	if (centiseconds === 0) return ''
	if (centiseconds === -1) return 'DNF'
	if (centiseconds === -2) return 'DNS'
	return new Date(centiseconds * 10)
		.toISOString()
		.substr(11, 11)
		.replace(/^[0:]*(?!\.)/g, '')
}

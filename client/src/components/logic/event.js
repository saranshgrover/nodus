import { getPreciseTime } from '../../logic/tools'

export const activityKey = {
	'222': '2x2',
	'333': '3x3',
	'444': '4x4',
	'555': '5x5',
	'666': '6x6',
	'777': '7x7',
	pyram: 'Pyraminx',
	'333oh': '3x3 One Handed',
	'333bf': '3x3 Blindfolded',
	'444bf': '4x4 Blindfolded',
	'555bf': '5x5 Blindfolded',
	skewb: 'Skewb',
	clock: 'Clock',
	'333ft': '3x3 with Feet',
	'333mbf': '3x3 Multiple Blindfolded',
	'333fm': 'Fewest Moves',
	sq1: 'Square 1',
	minx: 'Megaminx',
}

export const parseAdvancementCondition = (condition) => {
	if (!condition) {
		return 'N/A'
	}
	switch (condition.type) {
		case 'ranking':
			return `Top ${parseInt(condition.level)}`
		case 'percent':
			return `${parseInt(condition.level)}%`
		case 'attemptResult':
			return `Better than ${getPreciseTime(condition.level)}`
		default:
			return ''
	}
}

export const parseCutoff = (cutoff) => {
	return cutoff
		? `${getPreciseTime(cutoff.attemptResult)} seconds in ${
				cutoff.numberOfAttempts
		  } results`
		: 'None'
}

/**
 * Builds an additional round if possible.
 * @param {WCIF Event} event
 */
export const buildDefaultRound = (event) => {}

/**
 *
 * @param {string} activity
 */
export const getEventFromActivity = (activity) =>
	`${activityKey[activity.slice(0, activity.indexOf('-'))]} Round ${
		activity[activity.indexOf('-') + 2]
	} `

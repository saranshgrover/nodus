export const parseActivityCode = (activityCode) => {
	const [, e, r, g, a] = activityCode.match(
		/(\w+)(?:-r(\d+))?(?:-g(\d+))?(?:-a(\d+))?/
	)
	return {
		eventId: e,
		roundNumber: r && parseInt(r, 10),
		groupNumber: g && parseInt(g, 10),
		attemptNumber: a && parseInt(a, 10),
	}
}
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

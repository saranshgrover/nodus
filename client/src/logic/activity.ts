import { Person } from 'generated/graphql'

export const parseActivityCode = (activityCode: string) => {
	console.log(activityCode)
	//@ts-ignore
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

export const activityToString = (activityCode: string, short = false) => {
	const {
		eventId,
		roundNumber,
		groupNumber,
		attemptNumber,
	} = parseActivityCode(activityCode)
	if (eventId === 'other') {
		return null
	}
	const r = short ? 'R' : 'Round '
	const g = short ? 'G' : 'Group '
	const a = short ? 'A' : 'Attempt '
	return `${eventId ? activityKey[eventId] : ''} ${
		roundNumber ? `${r}${roundNumber}` : ''
	} ${groupNumber ? `${g}${groupNumber}` : ''} ${
		attemptNumber ? `${a}${attemptNumber}` : ''
	} `
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
export const getGroupsOf = (roundActivity: string, activities: any) => {
	let groups: any[] = []
	for (const activity of activities) {
		if (
			activity.activityCode.includes(roundActivity) &&
			!groups.includes(activity.activityCode) &&
			activity.childActivities === undefined
		) {
			groups.push({
				activity: activity.activityCode,
				room: activity.room.name,
				startTime: activity.startTime,
			})
		}
	}
	return groups
}
export const getAssignmentsFromActivityId = (
	activityId: number,
	wcif: any
): Array<Array<Person>> => {
	let compete = []
	let staff = []
	const persons = wcif.persons
	for (const person of persons) {
		for (const assignment of person.assignments) {
			if (assignment.activityId === activityId) {
				assignment.assignmentCode === 'competitor'
					? compete.push(person)
					: staff.push(person)
			}
		}
	}
	return [compete, staff]
}

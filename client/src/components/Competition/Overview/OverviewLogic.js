import { getPreciseTime } from '../../../logic/tools'
import moment from 'moment'
import { getExtensionData } from '../../../logic/wcif'

const findEarlierActivityId = (activity1, activity2, schedule) => {
	let aTime
	let bTime
	schedule.venues.forEach((venue) =>
		venue.rooms.forEach((room) =>
			room.activities.forEach((activity) => {
				activity.childActivities.forEach((childActivity) => {
					if (childActivity.id === activity1)
						aTime = new Date(childActivity.startTime)
					else if (childActivity.id === activity2)
						bTime = new Date(childActivity.startTime)
				})
			})
		)
	)
	return aTime - bTime
}

/**
 *
 * Returns an array of the users assignments in order of the schedule.
 *
 * @param  userInfo
 * @param  wcif
 */
export const getMyAssignmentsInOrder = (wcaId, wcif) => {
	const regExp = /\d{4}[A-Z]{4}\d{2}/
	const isWcaId = regExp.test(wcaId)
	const user = wcif.persons.find((person) =>
		isWcaId ? person.wcaId === wcaId : person.wcaUserId === parseInt(wcaId)
	)
	if (!user) return null
	const userAssignments = user.assignments
	const schedule = wcif.schedule
	return userAssignments.sort((a, b) =>
		findEarlierActivityId(a.activityId, b.activityId, schedule)
	)
}

export const getMyEventsInOrder = (wcaId, wcif) => {
	const regExp = /\d{4}[A-Z]{4}\d{2}/
	const isWcaId = regExp.test(wcaId)
	const userEvents = wcif.persons.find((person) =>
		isWcaId ? person.wcaId === wcaId : person.wcaUserId === wcaId
	).registration.eventIds
	const schedule = wcif.schedule
	return userEvents.sort((a, b) => findEarlierEventId(a, b, schedule))
}

const findEarlierEventId = (event1, event2, schedule) => {
	let aTime
	let bTime
	schedule.venues.forEach((venue) =>
		venue.rooms.forEach((room) =>
			room.activities.forEach((activity) => {
				if (activity.activityCode === `${event1}-r1`)
					aTime = new Date(activity.startTime)
				else if (activity.activityCode === `${event2}-r1`)
					bTime = new Date(activity.startTime)
			})
		)
	)
	return aTime - bTime
}
export const flattenActivities = (schedule) => {
	let flatActivites = []
	for (const venue of schedule.venues) {
		for (const room of venue.rooms) {
			for (const activity of room.activities) {
				flatActivites.push({ ...activity, room })
				for (const childActivity of activity.childActivities)
					flatActivites.push({ ...childActivity, room })
			}
		}
	}
	return flatActivites
}
export const assignedTo = (assignment) => {
	switch (assignment) {
		case 'competitor':
			return 'Compete'
		case 'staff-judge':
			return 'Judge'
		case 'staff-runner':
			return 'Run'
		case 'staff-scrambler':
			return 'Scramble'
		default:
			return 'Assigned for'
	}
}

/**
 * Returns a list of data resembling
 * {start_date: , end_date: title:  }
 *
 * @param {*} events
 * @param {*} assignments
 */
export const getScheduleData = (
	events = [],
	unselectedVenues = [],
	unselectedAssignments = [],
	assignments,
	activities
) => {
	let data = []

	for (const assignment of assignments) {
		const activity = activities.find(
			(activity) => activity.id === assignment.activityId
		)
		if (
			!events.includes(
				activity.activityCode.slice(
					0,
					activity.activityCode.indexOf('-')
				)
			) &&
			!unselectedVenues.includes(activity.room.id) &&
			!unselectedAssignments.includes(assignment.assignmentCode)
		)
			data.push({
				startDate: activity.startTime,
				endDate: activity.endTime,
				title: `${assignedTo(assignment.assignmentCode)} in ${
					activity.name
				}`,
				assignmentCode: assignment.assignmentCode,
				activity: activity,
			})
	}
	return data
}

/**
 *
 * @param {string} activity
 */
export const getEventFromActivity = (activity) =>
	`${activityKey[activity.slice(0, activity.indexOf('-'))]} Round ${
		activity[activity.indexOf('-') + 2]
	} `
/**
 *
 * @param {string} activity
 */
export const getGroupFromActivity = (activity) =>
	`Group ${activity.slice(activity.lastIndexOf('-') + 2)}`

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
	'4bld': '4x4 Blindfolded',
	skewb: 'Skewb',
	clock: 'Clock',
	'333ft': '3x3 with Feet',
	'333mbf': '3x3 Multiple Blindfolded',
	'333fm': 'Fewest Moves',
	sq1: 'Square 1',
	minx: 'Megaminx',
}

export const getActivityIdFromCode = (activityCode, activities) => {
	const activity = activities.find(
		(activity) => activity.activityCode === activityCode
	)
	return activity
}

export const getAssignmentsFromActivityId = (activityCode, wcif) => {
	let compete = []
	let staff = []
	const persons = wcif.persons
	for (const person of persons) {
		for (const asssignment of person.assignments) {
			if (asssignment.activityId === activityCode) {
				asssignment.assignmentCode === 'competitor'
					? compete.push(person)
					: staff.push(person)
			}
		}
	}
	return [compete, staff]
}

export const getPersonalBestFromActivity = (competitor, activityCode) => {
	const event = activityCode.slice(0, activityCode.indexOf('-'))
	const activityEvent = competitor.personalBests.find(
		(e) => e.eventId === event
	)
	return activityEvent ? getPreciseTime(activityEvent.best) : '--'
}

export const getDelays = (schedule) => {
	let delays = []
	for (const venue of schedule.venues) {
		for (const room of venue.rooms) {
			delays[room.id] = parseInt(
				getExtensionData('ScheduleConfig', room).delay
			)
		}
	}
	return delays
}

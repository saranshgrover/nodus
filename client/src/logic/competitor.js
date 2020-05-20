import { findEarlierEventId, findEarlierActivityId } from './schedule'
import { getPreciseTime } from './tools'

export const getMyEventsInOrder = (wcaUserId, wcif) => {
	const userEvents = wcif.persons.find(
		(person) => person.wcaUserId === wcaUserId
	).registration?.eventIds
	const schedule = wcif.schedule
	return userEvents
		? userEvents.sort((a, b) => findEarlierEventId(a, b, schedule))
		: []
}

/**
 *
 * Returns an array of the users assignments in order of the schedule.
 *
 * @param  userInfo
 * @param  wcif
 */
export const getMyAssignmentsInOrder = (wcaUserId, wcif) => {
	const user = wcif.persons.find((person) => person.wcaUserId === wcaUserId)
	if (!user) return null
	const userAssignments = user.assignments
	const schedule = wcif.schedule
	return userAssignments.sort((a, b) =>
		findEarlierActivityId(a.activityId, b.activityId, schedule)
	)
}

export const getPersonalBestFromActivity = (competitor, activityCode) => {
	const event = activityCode.slice(0, activityCode.indexOf('-'))
	const activityEvent = competitor.personalBests.find(
		(e) => e.eventId === event
	)
	return activityEvent ? getPreciseTime(activityEvent.best) : '--'
}

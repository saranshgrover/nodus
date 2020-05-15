import { findEarlierEventId, findEarlierActivityId } from './schedule'

export const getMyEventsInOrder = (wcaUserId, wcif) => {
	const userEvents = wcif.persons.find(
		(person) => person.wcaUserId === wcaUserId
	).registration.eventIds
	const schedule = wcif.schedule
	return userEvents.sort((a, b) => findEarlierEventId(a, b, schedule))
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

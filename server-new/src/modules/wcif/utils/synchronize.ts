import { DocumentType } from '@typegoose/typegoose'
import { Wcif } from '../../../entities/'
import { addDays } from '../../../logic/time'
import { addCompetitionToUser } from './addCompetitionToUsers'
import getOpenActivities from './getOpenActivities'
import parseRoles from './parseRoles'
import { findUser } from './sendNewGroupNotification'

/**
 * Synchronize Wcif in Nodus database and Wcif from WCA. Return updated wcif.
 * @param oldWcif
 * @param newWcif
 */
export const synchronize = async (
	oldWcif: Wcif | DocumentType<Wcif>,
	newWcif: Wcif
): Promise<Wcif> => {
	// Use new persons but retain any subscribers
	const persons = newWcif.persons.map((person) => {
		const oldPerson = oldWcif.persons.find(
			(oldPerson) => oldPerson.wcaUserId === person.wcaUserId
		)
		if (!oldPerson) {
			findUser(person.wcaUserId).then((user) => {
				if (user) {
					addCompetitionToUser(user, {
						competitionId: oldWcif.competitionId,
						competitionType: 'WCA',
						startDate: newWcif.schedule.startDate,
						endDate: addDays(
							newWcif.schedule.startDate,
							newWcif.schedule.numberOfDays
						),
						notifications: [],
						roles: [...parseRoles(person.roles), 'competitor'],
					})
				}
			})
			return { ...person, subscribers: [] }
		} else return { ...person, subscribers: oldPerson.subscribers }
	})
	// Use new schedule but retain any open activities
	const schedule = newWcif.schedule
	const openActivities = await getOpenActivities(oldWcif)
	schedule.venues = [
		...schedule.venues.map((venue) => ({
			...venue,
			rooms: venue.rooms.map((room) => ({
				...room,
				activities: room.activities
					.map((activity) => {
						const index = openActivities.findIndex(
							(open) => open.id === activity.id
						)
						if (index >= 0) {
							return {
								...activity,
								ongoing: true,
								childActivities: activity.childActivities.map((child) =>
									openActivities[index].childActivities.some(
										// @ts-ignore
										(activity) => activity.id === child.id
									)
										? { ...child, ongoing: true }
										: { ...child }
								),
							}
						}
						return activity
					})
					.sort((a, b) => {
						let aTime = new Date(a.startTime)
						let bTime = new Date(b.startTime)
						return +aTime - +bTime
					}),
			})),
		})),
	]
	return {
		...oldWcif,
		persons,
		schedule,
		events: newWcif.events,
		extensions: newWcif.extensions,
		synchronizedAt: new Date().getTime(),
	}
}

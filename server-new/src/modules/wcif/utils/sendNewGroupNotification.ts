import { sendNotification } from 'web-push'
import { Notification, Wcif } from '../../../entities'
import { addDays } from '../../../logic/time'
import { UserMongooseModel } from '../../user/model'
import { addCompetitionToUser } from './addCompetitionToUsers'

export function assignmentName(assignmentCode: string) {
	switch (assignmentCode) {
		case 'competitor':
			return 'Compete'
		case 'staff-judge':
			return 'Judge'
		case 'staff-runner':
			return 'Run'
		case 'staff-scrambler':
			return 'Scramble'
		default:
			return 'Other'
	}
}

export default async function sendNewGroupNotifications(
	activityId: number,
	competition: Wcif,
	notification: Notification
) {
	const persons = competition.persons.filter((person) =>
		person.assignments.some(
			(assingment) => assingment.activityId === activityId
		)
	)
	let userNotification = notification
	for (const person of persons) {
		const user = await findUser(person.wcaUserId)
		const assignment = assignmentName(
			person.assignments.find(
				(assignment) => assignment.activityId === activityId
			)!.assignmentCode
		)
		if (user) {
			userNotification.body = `${notification.body}. You are assigned to ${assignment}`
			const userComp = user.competitions.find(
				(comp) => comp.competitionId === competition.competitionId
			)
			if (userComp) {
				userComp.notifications.push({ ...userNotification })
				user.save()
			} else {
				addCompetitionToUser(user, {
					competitionId: competition.competitionId,
					competitionType: 'WCA',
					startDate: competition.schedule.startDate,
					endDate: addDays(
						competition.schedule.startDate,
						competition.schedule.numberOfDays
					),
					roles: [],
					notifications: [{ ...userNotification }],
				})
			}
			for (const subscription of user.subscriptions) {
				try {
					sendNotification(subscription, JSON.stringify(userNotification))
				} catch (err) {
					console.log(err)
				}
			}
		}
		for (const subscriber of person.subscribers) {
			const connection = subscriber.connections.find(
				(connection) => connection.connectionType === 'WCA'
			)
			if (connection) {
				const user = await findUser(connection.content.id)
				userNotification.body = `${notification.body}. ${person.name} is assigned to ${assignment}`
				if (user) {
					const userComp = user.competitions.find(
						(comp) => comp.competitionId === competition.competitionId
					)
					if (userComp) {
						userComp.notifications.push({ ...userNotification })
						user.save()
					} else {
						addCompetitionToUser(user, {
							competitionId: competition.competitionId,
							competitionType: 'WCA',
							startDate: competition.schedule.startDate,
							endDate: addDays(
								competition.schedule.startDate,
								competition.schedule.numberOfDays
							),
							roles: [],
							notifications: [{ ...userNotification }],
						})
					}
					for (const subscription of subscriber.subscriptions) {
						sendNotification(
							{ endpoint: subscription.endpoint, keys: subscription.keys },
							JSON.stringify({ ...userNotification })
						)
					}
				}
			}
		}
	}
}

async function findUser(wcaUserId: number) {
	return await UserMongooseModel.findOne({
		connections: {
			$elemMatch: {
				$and: [{ connectionType: 'WCA' }, { 'content.id': wcaUserId }],
			},
		},
	})
}

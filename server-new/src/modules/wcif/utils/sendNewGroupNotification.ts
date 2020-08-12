import { sendNotification } from 'web-push'
import { Wcif } from '../../../entities'
import { UserMongooseModel } from '../../user/model'

export default async function sendNewGroupNotifications(
	activityId: number,
	competition: Wcif,
	notification: string
) {
	const persons = competition.persons.filter((person) =>
		person.assignments.some(
			(assingment) => assingment.activityId === activityId
		)
	)

	for (const person of persons) {
		const user = await findUser(person.wcaUserId)
		if (user) {
			console.log(user.name)
			for (const subscription of user.subscriptions) {
				try {
					sendNotification(subscription, notification)
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
				if (user) {
					for (const subscription of subscriber.subscriptions) {
						sendNotification(
							{ endpoint: subscription.endpoint, keys: subscription.keys },
							notification
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

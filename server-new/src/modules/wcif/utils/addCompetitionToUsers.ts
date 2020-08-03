import { Wcif } from '../../../entities'
import { UserMongooseModel } from '../../user/model'

export default async function addCompetitionToUsers(wcif: Wcif) {
	const persons = wcif.persons
	for (const person of persons) {
		const user = await UserMongooseModel.findOne({
			connections: {
				$elemMatch: {
					$and: [{ connectionType: 'WCA' }, { 'content.id': person.wcaUserId }],
				},
			},
		})
		if (
			user &&
			user.competitions &&
			!user.competitions.some(
				(competition) => competition.competitionId === wcif.competitionId
			)
		) {
			let endDate = new Date(wcif.schedule.startDate)
			endDate.setDate(endDate.getDate() + wcif.schedule.numberOfDays - 1)
			const roles: RoleType[] = ['competitor']
			if (person.roles.includes('organizer')) roles.push('organizer')
			if (person.roles.includes('delegate')) roles.push('delegate')
			if (person.roles.includes('delegate')) roles.push('delegate')
			if (person.roles.includes('trainee_delegate'))
				roles.push('traineeDelegate')
			user.competitions.push({
				competitionType: 'WCA',
				competitionId: wcif.competitionId,
				startDate: wcif.schedule.startDate,
				endDate: endDate.toISOString().split('T')[0],
				roles: roles,
			})
			await user.save()
		}
	}
}

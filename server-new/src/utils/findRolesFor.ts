import { User } from '../entities/'

export default function findRolesFor(
	competitionId: string,
	user: Partial<User>
) {
	const userCompetition = user.competitions?.find(
		(competition) => competition.competitionId === competitionId
	)
	if (!userCompetition) return []
	const userRoles = userCompetition.roles
	return userRoles
}

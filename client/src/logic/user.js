export const isAdmin = (user, competitionId) => {
	let admin = false
	if (competitionId && user.isSignedIn()) {
		const userCompetition = user.info.competitions.find(
			(competition) => competition.competitionId === competitionId
		)
		admin =
			userCompetition &&
			userCompetition.roles.some((role) =>
				[
					'admin',
					'organizer',
					'trainee_delegate',
					'delegate',
					'junior_delegate',
				].includes(role)
			)
	}
	return admin
}

export const is = (user, competitionId, role, includes = false) => {
	const competition = user.competition.find(competitionId)
	return competition.roles.some((userRole) =>
		includes ? userRole.includes(role) : userRole === role
	)
}

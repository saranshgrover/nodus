import React, { createContext, useContext } from 'react'
import { UserContext } from './UserContext'

const CompetitionContext = createContext(null)
CompetitionContext.displayName = 'CompetitionContext'
export { CompetitionContext }

const CompetitionProvider = ({ competitionId, children }) => {
	const user = useContext(UserContext)
	const userCompetition =
		user.isSignedIn() &&
		user.info.competitions.find(
			(competition) => competition.competitionId === competitionId
		)

	let userRoles = []
	let userConnectionInfo = {}
	let competitionType = 'LOCAL'
	if (userCompetition) {
		userRoles = userCompetition.roles
		userConnectionInfo = user.info.connections.find(
			(connection) =>
				connection.connectionType === userCompetition.competitionType
		)
		competitionType = userCompetition.competitionType
	}
	return (
		<CompetitionContext.Provider
			value={{
				competitionId: competitionId,
				userRoles: userRoles,
				userConnectionInfo: userConnectionInfo,
				competitionType: competitionType,
			}}
		>
			{children}
		</CompetitionContext.Provider>
	)
}

export default CompetitionProvider

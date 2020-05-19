import React, { createContext, useContext, useState, useEffect } from 'react'
import { UserContext } from './UserContext'
import { useRouteMatch } from 'react-router-dom'
import LinearProgress from '@material-ui/core/LinearProgress'
import Error from '../components/common/Error'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const CompetitionContext = createContext(null)
CompetitionContext.displayName = 'CompetitionContext'
export { CompetitionContext }

const FIND_BY_COMPETITION_ID_QUERY = gql`
	query wcif($competitionId: String!) {
		getWcifByCompetitionId(competitionId: $competitionId) {
			_id
		}
	}
`

const CompetitionProvider = ({ competitionId, children }) => {
	const { loading, error, data } = useQuery(FIND_BY_COMPETITION_ID_QUERY, {
		variables: { competitionId: competitionId },
	})

	const user = useContext(UserContext)
	const userCompetition =
		user.isSignedIn() &&
		user.info.competitions.find(
			(competition) => competition.competitionId === competitionId
		)
	let userRoles = []
	let userConnectionInfo = {}
	let competitionType = 'LOCAL'
	let tabs = ['information', 'groups', 'results', 'notifications']
	if (userCompetition) {
		userRoles = userCompetition.roles
		userConnectionInfo = user.info.connections.find(
			(connection) =>
				connection.connectionType === userCompetition.competitionType
		)
		competitionType = userCompetition.competitionType
		tabs = ['overview', ...tabs]
	}
	if (loading) return <LinearProgress />
	if (error) return <Error message={error.toString()} />
	const wcif = data.getWcifByCompetitionId
	return (
		<CompetitionContext.Provider
			value={
				competitionId
					? {
							user: user !== null && user !== undefined,
							_id: wcif._id,
							competitionId: competitionId,
							userRoles: userRoles,
							userConnectionInfo: userConnectionInfo,
							competitionType: competitionType,
							tabs: tabs,
					  }
					: { error: 'No Competition described' }
			}
		>
			{children}
		</CompetitionContext.Provider>
	)
}

export default CompetitionProvider

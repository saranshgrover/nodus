import gql from 'graphql-tag'

export const RoutingFindByCompetitionId = gql`
	query RoutingFindByCompetitionId($competitionId: String!) {
		getWcifByCompetitionId(competitionId: $competitionId) {
			name
			shortName
			_id
		}
	}
`

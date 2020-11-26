import gql from 'graphql-tag'

export const SetupCompetitionInfo = gql`
	query SetupCompetitionInfo($competitionId: String!) {
		getWcifByCompetitionId(competitionId: $competitionId) {
			_id
			name
			shortName
			competitorLimit
		}
	}
`

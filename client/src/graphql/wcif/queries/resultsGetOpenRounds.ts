import gql from 'graphql-tag'

export const ResultsGetOpenRounds = gql`
	query ResultsGetOpenRounds($competitionId: String!) {
		getOpenRounds(competitionId: $competitionId) {
			_id
			id
		}
	}
`

import gql from 'graphql-tag'

export const ResultsGetOpenRounds = gql`
	query ResultsGetOpenRounds($competitionId: String!) {
		getOpenRounds(competitionId: $competitionId) {
			_id
			id
			results {
				_id
				personId
				ranking
				best
				average
				attempts {
					result
				}
			}
		}
	}
`

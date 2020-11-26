import gql from 'graphql-tag'

export const UpdateWcifCompetitors = gql`
	mutation updateWcifCompetitors(
		$competitionId: String!
		$updatedCompetitors: [NewPersonInput!]!
	) {
		updateWcifCompetitors(
			competitionId: $competitionId
			competitors: $updatedCompetitors
		) {
			_id
			competitionId
			name
		}
	}
`

import gql from 'graphql-tag'

export const UpdateWcifInfo = gql`
	mutation updateWcifInfo(
		$competitionId: String!
		$name: String!
		$shortName: String!
		$competitorLimit: Int!
	) {
		updateWcifInfo(
			competitionId: $competitionId
			newName: $name
			newShortName: $shortName
			newCompetitorLimit: $competitorLimit
		) {
			competitionId
			_id
		}
	}
`

import gql from 'graphql-tag'

export const UpdateWcifEvents = gql`
	mutation UpdateWcifEvents(
		$competitionId: String!
		$events: [UpdateEventInput!]!
	) {
		updateWcifEvents(competitionId: $competitionId, events: $events) {
			_id
			competitionId
			name
		}
	}
`

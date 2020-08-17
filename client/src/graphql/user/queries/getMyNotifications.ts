import gql from 'graphql-tag'

export const GetMyNotifications = gql`
	query GetMyNotifications($competitionId: String!) {
		getMyNotifications(competitionId: $competitionId) {
			_id
			body
			title
			icon
			url
			image
		}
	}
`

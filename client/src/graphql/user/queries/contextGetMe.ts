import gql from 'graphql-tag'

export const ContextGetMe = gql`
	query ContextGetMe {
		getMe {
			_id
			username
			email
			name
			primaryAuthenticationType
			connections {
				connectionType
				content {
					id
					wcaId
					teams {
						friendlyId
						leader
					}
					photos
					birthdate
					delegateStatus
				}
			}
			competitions {
				competitionType
				competitionId
				roles
			}
			subscriptions {
				endpoint
				browser
				device
			}
		}
	}
`

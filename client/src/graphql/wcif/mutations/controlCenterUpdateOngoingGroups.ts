import gql from 'graphql-tag'

export const ControlCenterUpdateOngoingGroups = gql`
	mutation ControlCenterUpdateOngoingGroups(
		$competitionId: String!
		$newGroups: [GroupInfo!]
		$closeGroups: [GroupInfo!]
	) {
		updateOngoingGroups(
			competitionId: $competitionId
			newGroups: $newGroups
			closeGroups: $closeGroups
		) {
			name
			activityCode
			startTime
			endTime
			id
			room {
				name
				color
			}
			childActivities {
				name
				activityCode
				startTime
				endTime
				id
				persons {
					name
					wcaUserId
					wcaId
					registrantId
					countryIso2
					roles
					assignments {
						assignmentCode
						activityId
					}
				}
				next {
					name
					startTime
					endTime
					id
					activityCode
				}
			}
		}
	}
`

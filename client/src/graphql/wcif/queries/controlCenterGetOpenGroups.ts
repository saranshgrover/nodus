import gql from 'graphql-tag'

export const ControlCenterGetOpenGroups = gql`
	query ControlCenterGetOpenGroups($competitionId: String!) {
		getOngoingGroups(competitionId: $competitionId) {
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

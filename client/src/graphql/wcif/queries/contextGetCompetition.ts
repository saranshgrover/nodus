import gql from 'graphql-tag'

export const ContextGetCompetition = gql`
	query ContextGetCompetition($competitionId: String!) {
		getWcifByCompetitionId(competitionId: $competitionId) {
			name
			shortName
			_id
			competitionId
			settings {
				colorTheme
			}
			persons {
				_id
				wcaUserId
				registrantId
			}
			schedule {
				_id
				startDate
				numberOfDays
				venues {
					_id
					timezone
					name
					rooms {
						_id
						id
						name
						color
						activities {
							_id
							id
							name
							activityCode
							startTime
							endTime
							childActivities {
								_id
								id
								name
								activityCode
								startTime
								endTime
							}
						}
					}
				}
			}
		}
	}
`

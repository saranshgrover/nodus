import gql from 'graphql-tag'

export const CompetitionOverview = gql`
	query CompetitionOverview($competitionId: String!) {
		getWcifByCompetitionId(competitionId: $competitionId) {
			name
			shortName
			_id
			persons {
				_id
				name
				wcaUserId
				wcaId
				roles
				registration {
					_id
					eventIds
				}
				assignments {
					_id
					activityId
					assignmentCode
					stationNumber
				}
			}
			schedule {
				_id
				startDate
				numberOfDays
				venues {
					_id
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

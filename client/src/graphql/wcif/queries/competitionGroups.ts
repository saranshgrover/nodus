import gql from 'graphql-tag'

export const CompetitionGroups = gql`
	query CompetitionGroups($competitionId: String!) {
		getWcifByCompetitionId(competitionId: $competitionId) {
			name
			shortName
			competitionId
			_id
			events {
				id
				_id
				rounds {
					id
				}
			}
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
				personalBests {
					_id
					eventId
					best
					worldRanking
					type
				}
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

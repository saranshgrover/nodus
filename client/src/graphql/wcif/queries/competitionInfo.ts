import gql from 'graphql-tag'

export const CompetitionInformation = gql`
	query CompetitionInformation($competitionId: String!, $top: Int!) {
		getWcifByCompetitionId(competitionId: $competitionId) {
			_id
			name
			locationName
			registrationOpen
			registrationClose
			settings {
				imageUrl
				message
				colorTheme
			}
			schedule {
				_id
				startDate
				numberOfDays
				venues {
					_id
					rooms {
						_id
						activities {
							_id
							name
							id
							startTime
							endTime
						}
					}
				}
			}
			events {
				_id
				id
			}
		}
		getTopCompetitors(top: $top, competitionId: $competitionId) {
			_id
			name
			wcaUserId
			personalBests {
				_id
				eventId
				best
				type
				worldRanking
			}
			avatar {
				thumbUrl
			}
		}
	}
`

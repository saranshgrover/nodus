import gql from 'graphql-tag'

export const SetupCompetitionEvents = gql`
	query SetupCompetitionEvents($competitionId: String!) {
		getWcifByCompetitionId(competitionId: $competitionId) {
			_id
			events {
				_id
				id
				rounds {
					_id
					id
					format
					advancementCondition {
						_id
						type
						level
					}
					timeLimit {
						_id
						centiseconds
						cumulativeRoundIds
					}
					cutoff {
						_id
						numberOfAttempts
						attemptResult
					}
					scrambleSetCount
				}
				competitorLimit
				qualification {
					_id
					when
					type
					attemptResult
					_id
				}
			}
		}
	}
`

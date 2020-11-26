import gql from 'graphql-tag'

export const LandingMyUpcomingCompetitions = gql`
	query LandingMyUpcomingCompetitions {
		getMyUpcomingCompetitions {
			_id
			name
			competitionId
			schedule {
				_id
				startDate
				numberOfDays
				venues {
					_id
					countryIso2
					name
				}
			}
		}
	}
`

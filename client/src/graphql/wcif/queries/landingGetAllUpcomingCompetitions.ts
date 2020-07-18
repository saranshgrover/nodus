import gql from 'graphql-tag'

export const GET_UPCOMING_COMPETITIONS = gql`
	query LandingAllUpcomingCompetitions {
		getAllWcifs {
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

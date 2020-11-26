import gql from 'graphql-tag'

export const newFindMyManagableCompetition = gql`
	query NewFindMyManagableCompetition {
		findMyManagableCompetitions {
			name
			start_date
			end_date
			competitionId
			country_iso2
		}
	}
`

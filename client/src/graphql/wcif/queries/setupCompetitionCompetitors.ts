import gql from 'graphql-tag'

export const SetupCompetitionCompetitors = gql`
	query SetupCompetitionCompetitors($competitionId: String!) {
		getWcifByCompetitionId(competitionId: $competitionId) {
			_id
			persons {
				_id
				name
				wcaUserId
				wcaId
				registrantId
				countryIso2
				gender
				birthdate
				email
			}
		}
	}
`

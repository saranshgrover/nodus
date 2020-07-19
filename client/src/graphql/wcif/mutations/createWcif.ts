import gql from 'graphql-tag'

export const CreateWcif = gql`
	mutation NewCreateWcif($competitionId: String!) {
		createWcif(competitionId: $competitionId) {
			competitionId
		}
	}
`

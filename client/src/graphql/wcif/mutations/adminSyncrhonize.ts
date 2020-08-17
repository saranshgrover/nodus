import gql from 'graphql-tag'

export const AdminSynchronize = gql`
	mutation AdminSynchronize($competitionId: String!) {
		synchronize(competitionId: $competitionId) {
			synchronizedAt
		}
	}
`

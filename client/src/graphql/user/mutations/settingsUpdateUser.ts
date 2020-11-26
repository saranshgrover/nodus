import gql from 'graphql-tag'

export const SettingsUpdateUser = gql`
	mutation SettingsUpdateUser($data: UpdateUserInput!) {
		updateUser(data: $data) {
			_id
		}
	}
`

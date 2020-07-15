import React, { createContext } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import LinearProgress from '@material-ui/core/LinearProgress'
import { SERVER_URI } from '../config'

const GET_USER = gql`
	{
		getMe {
			_id
			username
			email
			name
			primaryAuthenticationType
			connections {
				connectionType
				content
			}
			competitions {
				competitionType
				competitionId
				roles
			}
		}
	}
`

const UserContext = createContext(null)
UserContext.displayName = 'UserContext'
export { UserContext }

const UserProvider = ({ children }) => {
	const [user, setUser] = React.useState(undefined)
	const isSignedIn = () => user !== null && user !== undefined
	const signOut = () => (window.location.href = `${SERVER_URI}/auth/logout`)
	const { loading, error, data } = useQuery(GET_USER)
	if (error) console.error(error)
	React.useEffect(() => {
		if (!loading && !error) {
			const user = data.getMe
			if (user) {
				user.connections[0].content = JSON.parse(
					data.getMe.connections[0].content
				)
			}
			setUser(user)
		}
	}, [loading, error, data])
	if (loading || user === undefined) return <LinearProgress />
	return (
		<UserContext.Provider
			value={{
				info: user,
				isSignedIn: isSignedIn,
				signOut: signOut,
			}}>
			{children}
		</UserContext.Provider>
	)
}

export default UserProvider

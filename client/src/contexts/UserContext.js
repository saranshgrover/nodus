import React, { createContext } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import LinearProgress from '@material-ui/core/LinearProgress'

const GET_USER = gql`
	{
		getUser {
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
	const [user, setUser] = React.useState(null)
	const isSignedIn = () => user !== null && user !== undefined
	const signOut = () =>
		(window.location.href = 'http://localhost:3000/auth/logout')
	const { loading, error, data } = useQuery(GET_USER)
	if (error) console.error(error)
	React.useEffect(() => {
		!loading && !error && setUser(data.getUser)
	}, [loading, error, data])
	if (loading) return <LinearProgress />
	return (
		<UserContext.Provider
			value={{
				info: user,
				isSignedIn: isSignedIn,
				signOut: signOut,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

export default UserProvider

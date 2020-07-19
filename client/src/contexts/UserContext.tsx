import { useQuery } from '@apollo/react-hooks'
import LinearProgress from '@material-ui/core/LinearProgress'
import gql from 'graphql-tag'
import React, { createContext } from 'react'
import { SERVER_URI } from '../config'
import { User } from '../generated/graphql'

interface UserContext {
	info: User | null
	isSignedIn: () => boolean
	signOut: () => void
}

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
				content {
					id
					wcaId
					teams {
						friendlyId
						leader
					}
					photos
				}
			}
			competitions {
				competitionType
				competitionId
				roles
			}
		}
	}
`

const UserContext = createContext<UserContext>({
	info: null,
	isSignedIn: () => false,
	signOut: () => {},
})
UserContext.displayName = 'UserContext'
export { UserContext }

const UserProvider = ({ children }: React.PropsWithChildren<{}>) => {
	const [user, setUser] = React.useState<User | null>(null)
	const isSignedIn = () => user !== null
	const signOut = () => (window.location.href = `${SERVER_URI}/auth/logout`)
	const { loading, error, data } = useQuery(GET_USER)
	if (error) console.error(error)
	React.useEffect(() => {
		if (!loading && !error && data) {
			const user = data.getMe
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

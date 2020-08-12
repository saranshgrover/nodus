import LinearProgress from '@material-ui/core/LinearProgress'
import React, { createContext } from 'react'
import { SERVER_URI } from '../config'
import { ContextGetMeQuery, useContextGetMeQuery } from '../generated/graphql'

interface UserContext {
	info: ContextGetMeQuery['getMe'] | null
	isSignedIn: () => boolean
	signOut: () => void
}

const UserContext = createContext<UserContext>({
	info: null,
	isSignedIn: () => false,
	signOut: () => {},
})
UserContext.displayName = 'UserContext'
export { UserContext }

const UserProvider = ({ children }: React.PropsWithChildren<{}>) => {
	const [user, setUser] = React.useState<ContextGetMeQuery['getMe'] | null>()
	const isSignedIn = () => user !== null
	const signOut = () => (window.location.href = `${SERVER_URI}/auth/logout`)
	const { loading, error, data } = useContextGetMeQuery()
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

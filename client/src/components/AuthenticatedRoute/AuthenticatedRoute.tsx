import React, { useContext } from 'react'
import { Route, RouteComponentProps, RouteProps } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'

interface AuthenticatedRouteProps {
	component:
		| React.ComponentType<RouteComponentProps<any>>
		| React.ComponentType<any>
	authCallback: (user: UserContext) => boolean
	RedirectComponent: JSX.Element
}

export default function AuthenticatedRoute({
	component: C,
	authCallback,
	RedirectComponent,
	...rest
}: RouteProps & AuthenticatedRouteProps) {
	const user = useContext(UserContext)
	return (
		<Route
			{...rest}
			render={(props) =>
				authCallback(user) ? <C {...props} /> : RedirectComponent
			}
		/>
	)
}

import React, { useContext } from 'react'
import { Route } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
export default function AuthenticatedRoute({
	component: C,
	authCallback,
	RedirectComponent,
	...rest
}) {
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

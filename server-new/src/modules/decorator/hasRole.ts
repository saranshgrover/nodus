import { createMethodDecorator } from 'type-graphql'
import findRolesFor from '../../utils/findRolesFor'

export function hasRole(roles: RoleType[]) {
	return createMethodDecorator<Context>(({ info, context }, next) => {
		const competitionId = info.variableValues
			? info.variableValues.competitionId
			: null
		if (!competitionId) throw new Error('Competition ID not given.') // if no variable named competitionId is found
		if (!context.req.user) throw new Error('Not signed in.') // if user isn't logged in
		const userRoles = findRolesFor(competitionId, context.req.user)
		if (userRoles.some((role) => roles.includes(role))) return next()
		throw new Error(
			`User must have one of these roles: ${roles.toString()}`
		)
	})
}

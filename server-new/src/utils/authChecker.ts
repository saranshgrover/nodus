import { AuthChecker, Query } from 'type-graphql'
import { parse } from 'graphql'
import { User } from '../entities/'
import findRolesFor from './findRolesFor'

const customAuthChecker: AuthChecker<Context, AuthType> = (
	{ root, args, context, info },
	authType
) => {
	switch (authType[0].queryType) {
		case 'competition':
			const competitionId = info.variableValues
				? info.variableValues.competitionId
				: null
			if (!competitionId) return false // if no variable named competitionId is found
			if (!context.req.user) return false // if user isn't logged in
			const userRoles = findRolesFor(competitionId, context.req.user)
			return userRoles.some((role) => authType[0].roles.includes(role))
		case 'user':
			break
	}

	return true // Access given
}

export default customAuthChecker

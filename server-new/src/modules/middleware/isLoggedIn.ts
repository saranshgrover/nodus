import { AuthenticationError } from 'apollo-server-express'
import { MiddlewareFn } from 'type-graphql'

export const isLoggedIn: MiddlewareFn<Context> = async ({ context }, next) => {
	if (!context.req.user) {
		throw new AuthenticationError('Not logged in')
	}
	return next()
}

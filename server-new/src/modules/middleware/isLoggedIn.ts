import { MiddlewareFn } from 'type-graphql'
import Context from '../../@types/Context'

export const isLoggedIn: MiddlewareFn<Context> = async ({ context }, next) => {
	if (!context.req.user) {
		throw new Error('Not logged in')
	}
	return next()
}

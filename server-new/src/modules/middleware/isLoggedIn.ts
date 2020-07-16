import { MiddlewareFn } from 'type-graphql'

export const isLoggedIn: MiddlewareFn<Context> = async ({ context }, next) => {
	console.log(context)
	if (!context.req.user) {
		throw new Error('Not logged in')
	}
	return next()
}

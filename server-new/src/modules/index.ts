import TodoResolver from './todo/resolver'
import WcifResolver from './wcif/resolver'
import UserResolver from './user/resolver'
// Important: Add all your module's resolver in this
export const resolvers: [Function, ...Function[]] = [
	TodoResolver,
	WcifResolver,
	UserResolver,
	// AuthResolver
	// ...
]

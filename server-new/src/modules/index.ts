import UserResolver from './user/resolver'
import WcifResolver from './wcif/resolver'
// Important: Add all your module's resolver in this
export const resolvers: [Function, ...Function[]] = [
	WcifResolver,
	UserResolver,
	// AuthResolver
	// ...
]

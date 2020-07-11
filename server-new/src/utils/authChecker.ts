import { AuthChecker, Query } from 'type-graphql'
import { parse } from 'graphql'
import gql from 'graphql-tag'

const customAuthChecker: AuthChecker<Context> = (
	{ root, args, context, info },
	roles
) => {
	const query = context.req.body.query
	// console.log(parse(query))
	// const ql = gql`
	// 	${query}
	// `
	// console.log('1')
	// console.log(ql.definitions)
	// console.log('2')
	// console.log(ql)
	// console.log(context.req.user.competitions)
	context.tempInfo = 'abc'
	// here you can read user from context
	// and check his permission in db against `roles` argument
	// that comes from `@Authorized`, eg. ["ADMIN", "MODERATOR"]

	return true // or false if access denied
}

export default customAuthChecker

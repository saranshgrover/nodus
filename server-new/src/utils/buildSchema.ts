import Container from 'typedi'
import { ObjectId } from 'mongodb'
import { buildSchema as typeGraphqlBuildSchema } from 'type-graphql'

import { resolvers } from '../modules'

import { ObjectIdScalar } from './'
import authChecker from './authChecker'

// Here goes your schema building bit, doing it this way allows us to use it in the tests as well!
export const buildSchema = () =>
	typeGraphqlBuildSchema({
		resolvers,
		container: Container,
		scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
		authChecker: authChecker,
		authMode: 'null',
	})

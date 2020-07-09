import {
	Resolver,
	Arg,
	Query,
	Mutation,
	UseMiddleware,
	Ctx,
} from 'type-graphql'
import { Service } from 'typedi'
import { ObjectId } from 'mongodb'

import { User } from '../../entities'
import UserService from './service'
import { isLoggedIn } from '../middleware/isLoggedIn'
/*
  IMPORTANT: Your business logic must be in the service!
*/

@Service() // Dependencies injection
@Resolver((of) => User)
export default class UserResolver {
	constructor(private readonly userService: UserService) {}

	@UseMiddleware(isLoggedIn)
	@Query((returns) => User, { nullable: true })
	async getUser(@Arg('id') id: ObjectId) {
		const user = await this.userService.getById(id)

		return user
	}
}

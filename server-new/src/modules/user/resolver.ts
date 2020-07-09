import { Resolver, Arg, Query, Mutation } from 'type-graphql'
import { Service } from 'typedi'
import { ObjectId } from 'mongodb'

import { User } from '../../entities'
import UserService from './service'

/*
  IMPORTANT: Your business logic must be in the service!
*/

@Service() // Dependencies injection
@Resolver((of) => User)
export default class TodoResolver {
	constructor(private readonly userService: UserService) {}

	@Query((returns) => User)
	async getUser(@Arg('id') id: ObjectId) {
		const user = await this.userService.getById(id)

		return user
	}
}

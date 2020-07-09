import { Resolver, Arg, Query, Mutation, ID } from 'type-graphql'
import { Service } from 'typedi'
import { ObjectId } from 'mongodb'

import { Wcif } from '../../entities/wcif/wcif'
import WcifService from './service'
import { NewWcifInput } from './input'
import { Document } from 'mongoose'

/*
  IMPORTANT: Your business logic must be in the service!
*/

@Service() // Dependencies injection
@Resolver((of) => Wcif)
export default class WcifResolver {
	constructor(private readonly wcifService: WcifService) {}

	@Query((returns) => Wcif)
	async getWcif(@Arg('id') id: ObjectId) {
		const todo = await this.wcifService.getById(id)

		return todo
	}

	@Mutation((returns) => Wcif)
	async createWcif(
		@Arg('WcifInput') createWcifData: Wcif
	): Promise<Document> {
		const todo = await this.wcifService.addWcif(createWcifData)
		return todo
	}
}

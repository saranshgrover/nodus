import {
	Resolver,
	Arg,
	Query,
	Mutation,
	ID,
	UseMiddleware,
	Ctx,
} from 'type-graphql'
import { Service } from 'typedi'
import { ObjectId } from 'mongodb'
import { isLoggedIn } from '../middleware/isLoggedIn'
import { Wcif } from '../../entities/wcif/wcif'
import WcifService from './service'
import { NewWcifInput } from './input'
import { UserMongooseModel } from '../user/model'

/*
  IMPORTANT: Your business logic must be in the service!
*/

@Service() // Dependencies injection
@Resolver((of) => Wcif)
export default class WcifResolver {
	constructor(private readonly wcifService: WcifService) {}

	@Query((returns) => Wcif)
	async findById(@Arg('id') id: ObjectId) {
		const todo = await this.wcifService.getById(id)

		return todo
	}

	@UseMiddleware(isLoggedIn)
	@Query((returns) => [Wcif])
	async getMyUpcomingCompetitions(@Ctx() { req }: Context) {
		const upcomingCompetitions = this.wcifService.getUpcomingCompetitionsFor(
			req.session!.user.id
		)
		return upcomingCompetitions
	}

	@UseMiddleware(isLoggedIn)
	@Query((returns) => Wcif, { nullable: true })
	async getWcifByCompetitionId(@Arg('competitionId') competitionId: string) {
		const wcif = await this.wcifService.findByCompetitionId(competitionId)
		return wcif
	}

	@UseMiddleware(isLoggedIn)
	@Mutation((returns) => Wcif)
	async createWcif(
		@Arg('competitionId') competitionId: string,
		@Ctx() { req }: Context
	): Promise<Wcif> {
		const wcif = await this.wcifService.addWcif(competitionId, req.user.id)
		return wcif
	}
}

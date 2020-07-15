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
import { Wcif, Round, Person, Schedule, Event, Setting } from '../../entities/'
import WcifService from './service'
import { NewWcifInput, WcifCompetitorArgs, WcifEventsArgs } from './input'
import { hasRole } from '../decorator/hasRole'
import { UserMongooseModel } from '../user/model'
import { WcifMongooseModel } from './model'
import { PRODUCTION } from '../../config'
import mongoose from 'mongoose'

/*
  IMPORTANT: Your business logic must be in the service!
*/

@Service() // Dependencies injection
@Resolver((of) => Wcif)
export default class WcifResolver {
	constructor(private readonly wcifService: WcifService) {}

	@Query((returns) => Wcif)
	async getWcifById(@Arg('_id') id: ObjectId) {
		return await this.wcifService.getById(id)
	}

	@UseMiddleware(isLoggedIn)
	@Query((returns) => [Wcif])
	async getMyUpcomingCompetitions(@Ctx() { req }: Context) {
		const upcomingCompetitions = this.wcifService.getUpcomingCompetitionsFor(
			req.user._id
		)
		return upcomingCompetitions
	}

	@Query((returns) => Wcif, { nullable: true })
	async getWcifByCompetitionId(@Arg('competitionId') competitionId: string) {
		const wcif = await this.wcifService.findByCompetitionId(competitionId)
		return wcif
	}

	@Query((returns) => Round)
	async getOpenRounds(@Arg('competitionId') competitionId: string) {
		const wcif = await this.wcifService.findByCompetitionId(competitionId)
		let rounds: Round[] = []
		wcif.events.map(
			(event) =>
				(rounds = [
					...rounds,
					...event.rounds.filter((round) => round.results.length > 0),
				])
		)
	}

	@Query((returns) => [Wcif])
	async getAllWcifs() {
		const competitions = await this.wcifService.getAllWcifs()
		return competitions
	}

	@Query((returns) => [Person])
	async getTopCompetitors(
		@Arg('competitionId') competitionId: string,
		@Arg('top') top: number
	) {
		return await this.wcifService.getTopCompetitors(competitionId, top)
	}

	@UseMiddleware(isLoggedIn)
	@hasRole(['delegate', 'organizer', 'traineeDelegate'])
	@Mutation((returns) => Wcif)
	async createWcif(
		@Arg('competitionId') competitionId: string,
		@Ctx() { req }: Context
	): Promise<Wcif> {
		const wcif = await this.wcifService.addWcif(competitionId, req.user.id)
		return wcif
	}

	@Mutation((returns) => Wcif)
	@hasRole(['delegate', 'traineeDelegate'])
	async deleteWcif(@Arg('competitionId') competitionId: string) {
		return await this.wcifService.deleteWcif(competitionId)
	}

	@hasRole(['delegate', 'organizer', 'traineeDelegate'])
	@Mutation((returns) => Wcif)
	async updateWcifInfo(
		@Arg('competitionId') competitionId: string,
		@Arg('newName') name: string,
		@Arg('newShortName') shortName: string,
		@Arg('newCompetitorLimit') competitorLimit: number
	) {
		let competition = await this.wcifService.findByCompetitionId(
			competitionId
		)
		competition = {
			...competition,
			name: name ?? competition.name,
			shortName: shortName ?? competition.shortName,
			competitorLimit: competitorLimit ?? competition.competitorLimit,
		}
		const savedComp = await competition.save()
	}

	@hasRole(['delegate', 'organizer', 'traineeDelegate'])
	@Mutation((returns) => Wcif)
	async updateWcifSchedule(
		@Arg('competitionId') competitionId: string,
		@Arg('schedule') schedule: Schedule
	) {
		const competition = await this.wcifService.findByCompetitionId(
			competitionId
		)
		competition.schedule = schedule
		const savedComp = await competition.save()
		return savedComp
	}

	@hasRole(['delegate', 'organizer', 'traineeDelegate'])
	@Mutation((returns) => Wcif)
	async updateWcifCompetitors({
		competitionId,
		competitors,
	}: WcifCompetitorArgs) {
		const comp = await this.wcifService.findByCompetitionId(competitionId)
		for (const index in competitors) {
			for (const key of Object.keys(competitors[index])) {
				comp.persons[index][key as keyof Person] =
					competitors[index][key as keyof Person]
			}
			const savedComp = await comp.save()
			return savedComp
		}
	}

	@hasRole(['delegate', 'organizer', 'traineeDelegate'])
	@Mutation((returns) => Wcif)
	async updateWcifEvents({ competitionId, events }: WcifEventsArgs) {
		const comp = await this.wcifService.findByCompetitionId(competitionId)
		comp.events = events
		const savedComp = await comp.save()
		return savedComp
	}

	@hasRole(['delegate', 'organizer', 'traineeDelegate'])
	@Mutation((returns) => Wcif)
	async updateWcifSettings(
		@Arg('competitionId') competitionId: string,
		@Arg('settings') settings: Setting
	) {
		const comp = await this.wcifService.findByCompetitionId(competitionId)
		for (const key of Object.keys(settings)) {
			comp.settings[key] = settings[key as keyof Setting]
		}
		const savedComp = await comp.save()
		return savedComp
	}

	@Mutation(() => Boolean, {
		description:
			'Clears the database. Only works in development when server is running locally.',
	})
	async clearDatabase() {
		if (PRODUCTION) {
			throw new Error('You are not allowed to do this')
		} else {
			await mongoose.connection.db.dropDatabase()
		}
		return true
	}
}

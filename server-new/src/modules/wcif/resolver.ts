import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'
import {
	Arg,
	Args,
	Ctx,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
} from 'type-graphql'
import { Service } from 'typedi'
import { PRODUCTION } from '../../config'
import { Person, Round, Schedule, Setting, Wcif } from '../../entities/'
import { hasRole } from '../decorator/hasRole'
import { isLoggedIn } from '../middleware/isLoggedIn'
import {
	ActivityWithPerons,
	GetTopCompetitorsArgs,
	UpdateGroupsArgs,
	UpdateWcifInfoArgs,
	WcifCompetitorArgs,
	WcifEventsArgs,
} from './input'
import WcifService from './service'

/*
  IMPORTANT: Your business logic must be in the service!
*/

@Service() // Dependencies injection
@Resolver((of) => Wcif)
export default class WcifResolver {
	constructor(private readonly wcifService: WcifService) {}

	// QUERIES: PUBLIC

	@Query((returns) => Wcif)
	async getWcifById(@Arg('_id') id: ObjectId) {
		return await this.wcifService.getById(id)
	}

	@Query((returns) => Wcif, { nullable: true })
	async getWcifByCompetitionId(@Arg('competitionId') competitionId: string) {
		const wcif = await this.wcifService.findByCompetitionId(competitionId)
		return wcif
	}

	@Query((returns) => [Round])
	async getOpenRounds(@Arg('competitionId') competitionId: string) {
		const wcif = await this.wcifService.findByCompetitionId(competitionId)
		let rounds: Round[] = []
		for (const event of wcif.events) {
			rounds = [
				...rounds,
				...event.rounds.filter((round) => round.results.length > 0),
			]
		}
		return rounds
	}

	@Query((returns) => [Wcif])
	async getAllWcifs() {
		const competitions = await this.wcifService.getAllWcifs()
		return competitions
	}

	@Query((returns) => [Person])
	async getTopCompetitors(
		@Args() { competitionId, top }: GetTopCompetitorsArgs
	) {
		return await this.wcifService.getTopCompetitors(competitionId, top)
	}

	@Query((returns) => [ActivityWithPerons])
	async getOngoingGroups(@Arg('competitionId') competitionId: string) {
		return await this.wcifService.getOngoingGroups(competitionId)
	}

	// QUERIES: AUTHORIZED

	@UseMiddleware(isLoggedIn)
	@Query((returns) => [Wcif])
	async getMyUpcomingCompetitions(@Ctx() { req }: Context) {
		const upcomingCompetitions = this.wcifService.getUpcomingCompetitionsFor(
			req.user._id
		)
		return upcomingCompetitions
	}

	// MUTATIONS: AUTHORIZED

	@UseMiddleware(isLoggedIn)
	// @hasRole(['delegate', 'organizer', 'traineeDelegate'])
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
		@Args()
		{
			competitionId,
			newName: name,
			newCompetitorLimit: competitorLimit,
			newShortName: shortName,
		}: UpdateWcifInfoArgs
	) {
		let competition = await this.wcifService.findByCompetitionId(competitionId)
		competition.name = name ?? competition.name
		competition.shortName = shortName ?? competition.shortName
		competition.competitorLimit = competitorLimit ?? competition.competitorLimit
		const savedComp = await competition.save()
		return savedComp
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
	async updateWcifCompetitors(
		@Args() { competitionId, competitors }: WcifCompetitorArgs
	) {
		const comp = await this.wcifService.findByCompetitionId(competitionId)
		for (const index in competitors) {
			const newPerson = comp.persons.length >= parseInt(index)
			const competitor: Person = {
				...competitors[index],
				registration: {
					wcaRegistrationId: competitors[index].wcaUserId,
					eventIds: [],
					_id: new ObjectId(),
					comments: null,
					guests: 0,
					status: '',
				},
				assignments: [],
				avatar: newPerson
					? { _id: new ObjectId(), thumbUrl: '', url: '' }
					: comp.persons[index].avatar,
				roles: newPerson ? [] : comp.persons[index].roles,
				personalBests: newPerson ? [] : comp.persons[index].personalBests,
			}
			comp.persons[index] = competitor
		}
		const savedComp = await comp.save()
		return savedComp
	}

	@hasRole(['delegate', 'organizer', 'traineeDelegate'])
	@Mutation((returns) => Wcif)
	async updateWcifEvents(@Args() { competitionId, events }: WcifEventsArgs) {
		const comp = await this.wcifService.findByCompetitionId(competitionId)
		for (const index in events) {
			const event = events[index]
			comp.events[index].competitorLimit = event.competitorLimit
			for (const roundIndex in event.rounds) {
				const round = event.rounds[roundIndex]
				comp.events[index].rounds[roundIndex].advancementCondition =
					round.advancementCondition
				comp.events[index].rounds[roundIndex].cutoff = round.cutoff
				comp.events[index].rounds[roundIndex].format = round.format
				comp.events[index].rounds[roundIndex].timeLimit = round.timeLimit
				comp.events[index].rounds[roundIndex].scrambleSetCount =
					round.scrambleSetCount
			}
		}
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
			// @ts-ignore
			comp.settings[key as keyof Setting] = settings[key as keyof Setting]
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

	@hasRole(['delegate', 'organizer', 'traineeDelegate', 'staff'])
	@Mutation(() => [ActivityWithPerons])
	async updateOngoingGroups(
		@Args() { closeGroups, competitionId, newGroups }: UpdateGroupsArgs
	) {
		const updatedOngoingGroups = await this.wcifService.updateOngoingGroups(
			competitionId,
			newGroups,
			closeGroups
		)
		return updatedOngoingGroups
	}
}

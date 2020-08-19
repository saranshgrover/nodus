import { ObjectId } from 'mongodb'
import {
	Arg,
	Ctx,
	Mutation,
	Query,
	Resolver,
	UseMiddleware,
} from 'type-graphql'
import { Service } from 'typedi'
import { config } from '../../config'
import { Notification, User, WcifFetch } from '../../entities'
import { UserPushSubscription } from '../../entities/user/pushSubscription'
import descriptions from '../descriptions'
import { isLoggedIn } from '../middleware/isLoggedIn'
import { WcifMongooseModel } from '../wcif/model'
import { UpdateUserInput } from './input'
import { UserMongooseModel } from './model'
import UserService from './service'
import wcaApiFetch from './utils/wcaApiFetch'

/*
  IMPORTANT: Your business logic must be in the service!
*/

@Service() // Dependencies injection
@Resolver((of) => User)
export default class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Query((returns) => User, { nullable: true })
	async getUser(@Arg('id') id: ObjectId) {
		const user = await this.userService.getById(id)

		return user
	}

	@Query((returns) => User, {
		nullable: true,
		description: descriptions.user.getMe,
	})
	async getMe(@Ctx() { req }: Context) {
		if (!req.user) return null
		const user = await this.userService.getById(req!.user.id)
		return user
	}

	@UseMiddleware(isLoggedIn)
	@Query((returns) => [Notification])
	async getMyNotifications(
		@Ctx() { req }: Context,
		@Arg('competitionId') competitionId: string
	) {
		const user = await this.userService.getById(req.user.id)
		const competition = user.competitions.find(
			(competition) => competition.competitionId === competitionId
		)
		if (!competition) return []
		else
			return competition.notifications.sort((a, b) => b.timestamp - a.timestamp)
	}
	@UseMiddleware(isLoggedIn)
	@Query((returns) => [WcifFetch])
	async findMyManagableCompetitions(@Ctx() { req }: Context) {
		const baseApiUrl = `${config.wca.originURL}/api/v0`
		const resp = await wcaApiFetch<[WcifFetch]>(
			{
				url: `${baseApiUrl}/competitions?managed_by_me=true&start=${new Date().toISOString()}`,
				headers: {
					'Content-Type': 'application/json',
				},
			},
			{ userId: req.user.id }
		)
		let competitions = resp.data
		let filterComps = []
		if (competitions.length > 0) {
			for (const competition of competitions) {
				const exists = await WcifMongooseModel.exists({
					id: competition.id,
				})
				if (!exists) filterComps.push(competition)
			}
		}
		return filterComps
	}

	@UseMiddleware(isLoggedIn)
	@Mutation((returns) => User, { nullable: true })
	async updateUser(
		@Arg('data') data: UpdateUserInput,
		@Ctx() { req }: Context
	) {
		const id = data._id
		if (id !== req.session!.user.id) {
			return null
		}
		const user = await this.userService.findById(id)
		if (!user) return null
		if (user.username !== data.newUsername) {
			const usernameAlreadyTaken = await UserMongooseModel.exists({
				username: data.newUsername,
			})
			if (usernameAlreadyTaken) throw new Error('Username is already taken')
		}
		if (data.newName) user.name = data.newName
		if (data.newEmail) user.email = data.newEmail
		if (data.newUsername) user.username = data.newUsername
		await user.save()
		return user
	}

	@UseMiddleware(isLoggedIn)
	@Mutation((returns) => Boolean)
	async subscribeMe(
		@Ctx() { req }: Context,
		@Arg('subscription') subscription: UserPushSubscription
	) {
		const done = await this.userService.subscribeUser(req.user.id, subscription)
		return done
	}
}

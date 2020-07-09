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

import { User, Wcif, WcifFetch } from '../../entities'
import UserService from './service'
import { isLoggedIn } from '../middleware/isLoggedIn'
import Context from '../../@types/Context'
import { WcifMongooseModel } from '../wcif/model'
import { use } from 'passport'
import { config } from '../../config'
import axios, { AxiosResponse } from 'axios'
import { UpdateUserInput } from './input'
import { UserMongooseModel } from './model'
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

	@UseMiddleware(isLoggedIn)
	@Query((returns) => User, { nullable: true })
	async getMe(@Ctx() { req }: Context) {
		const user = await this.userService.getById(req.session!.user.id)
		if (!user) {
			return null
		}
		return user
	}

	@UseMiddleware(isLoggedIn)
	@Query((returns) => [Wcif], { nullable: true })
	async getMyUpcomingCompetitions(@Ctx() { req }: Context) {
		const user = await this.userService.getById(req.session!.user.id)
		if (!user) return null
		const competitions = user.competitions
		const Wcifs: Wcif[] = []
		if (competitions.length > 0) {
			for (const competition of competitions) {
				const wcif = await WcifMongooseModel.findOne({
					competitionId: competition.competitionId,
				})
				if (wcif) {
					Wcifs.push(wcif)
				}
			}
		}
		return Wcifs
	}

	@UseMiddleware(isLoggedIn)
	@Query((returns) => [WcifFetch])
	async findMyManagableCompetitions(@Ctx() { req }: Context) {
		const user = await this.userService.getById(req.session!.user.id)
		const wcaAccessToken = user!.connections.find(
			(connection) => connection.connectionType === 'WCA'
		)?.accessToken
		if (!wcaAccessToken) {
			throw new Error('No WCA Connection Found')
		}
		const baseApiUrl = `${config.wca.originURL}/api/v0`
		const resp: AxiosResponse<[WcifFetch]> = await axios({
			url: `${baseApiUrl}/competitions?managed_by_me=true&start=${new Date().toISOString()}`,
			headers: {
				Authorization: `Bearer ${wcaAccessToken}`,
				'Content-Type': 'application/json',
			},
		})
		let competitions = resp.data
		let filterComps = []
		if (competitions.length > 0) {
			for (const competition of competitions) {
				const exists = await WcifMongooseModel.exists({ id: competition.id })
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
}

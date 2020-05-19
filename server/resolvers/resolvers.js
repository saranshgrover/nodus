const fetch = require('node-fetch')
var { composeWithMongoose } = require('graphql-compose-mongoose/node8')
var { schemaComposer, toInputObjectType } = require('graphql-compose')
var {
	WcifModel,
	EventModel,
	PersonModel,
	ScheduleModel,
} = require('../models/wcif/Wcif')
var { UserModel } = require('../models/user/User')
var axios = require('axios')
var mongoose = require('mongoose')
const { WCA_ORIGIN } = require('../wca-env')
mongoose.set('useFindAndModify', false)

const PersonTC = composeWithMongoose(PersonModel)
const PersonITC = toInputObjectType(PersonTC)
const EventTC = composeWithMongoose(EventModel)
const EventITC = toInputObjectType(EventTC)
const ScheduleTC = composeWithMongoose(ScheduleModel)
const ScheduleITC = toInputObjectType(ScheduleTC)

const WcifTC = composeWithMongoose(WcifModel)
const UserTC = composeWithMongoose(UserModel)

UserTC.addResolver({
	kind: 'query',
	name: 'getMyUpcomingCompetitions',
	type: [WcifTC],
	resolve: async ({ context }) => {
		if (!context.user) throw new Error('Not signed in')
		const user = await UserModel.findById(context.user.id)
		const competitions = user.competitions
		const Wcifs = []
		if (competitions.length > 0) {
			const loop = new Promise((resolve) => {
				competitions.forEach(async (competition, index) => {
					const wcif = await WcifModel.findOne({
						id: competition.competitionId,
					})
					console.log(wcif.id)
					Wcifs.push(wcif)
					if (index === competitions.length - 1) resolve()
				})
			})
			await Promise.all([loop])
		}
		return Wcifs
	},
})

UserTC.addResolver({
	kind: 'query',
	name: 'findMyManagableCompetitions',
	type: [
		`type WCACompetition {name:String, start_date: String, end_date: String, id: String, country_iso2: String }`,
	],
	resolve: async ({ context }) => {
		if (!context.user) throw new Error('Not signed in')
		const user = await UserModel.findById(context.user.id)
		const wcaAccessToken = user.connections.find(
			(connection) => connection.connectionType === 'WCA'
		).accessToken
		const baseApiUrl = `${WCA_ORIGIN}api/v0`
		const resp = await axios({
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
				const exists = await WcifModel.exists({ id: competition.id })
				if (!exists) filterComps.push(competition)
			}
		}
		return filterComps
	},
})

UserTC.addResolver({
	kind: 'query',
	name: 'getUser',
	type: UserTC,
	resolve: async ({ context }) => {
		if (!context.user) return null
		const user = await UserModel.findById(context.user.id)
		if (!user) throw new Error('Unable to find current user')
		return user
	},
})

WcifTC.addResolver({
	kind: 'query',
	name: 'getWcifByCompetitionId',
	args: {
		competitionId: 'String!',
	},
	type: WcifTC,
	resolve: async ({ args, info }) => {
		const data = await WcifModel.findOne({ id: args.competitionId }).exec()
		if (!data)
			throw new Error(`Error finding competition with ID ${args.competitionId}`)
		return data
	},
})

WcifTC.addResolver({
	kind: 'query',
	name: 'findById',
	args: {
		_id: 'String!',
	},
	type: WcifTC,
	resolve: async ({ args, info }) => {
		const data = await WcifModel.findById(args._id).exec()
		if (!data) throw new Error(`Error finding competition with _ID ${args._id}`)
		return data
	},
})

WcifTC.addResolver({
	kind: 'query',
	name: 'findAll',
	args: {},
	type: [WcifTC],
	resolve: async ({ context }) => {
		const data = await WcifModel.find().exec()
		if (!data) throw new Error('Error finding competitions')
		return data
	},
})

WcifTC.addResolver({
	kind: 'query',
	name: 'getTopCompetitors',
	args: {
		top: 'Int!',
		_id: 'String!',
	},
	type: [PersonTC],
	resolve: async ({ args }) => {
		// Find competition first
		const data = await WcifModel.findById(args._id).exec()
		if (!data) throw new Error(`Error finding competition with _ID ${args._id}`)
		// Have comp at this point
		let persons = data.persons // Persons array
		persons = persons.filter((person) => {
			let isTop = false
			person.personalBests.forEach((best) => {
				if (best.worldRanking <= args.top) isTop = true
			})
			return isTop
		})
		return persons
	},
})

schemaComposer.Query.addFields({
	getTopCompetitors: WcifTC.getResolver('getTopCompetitors'),
	getWcifById: WcifTC.getResolver('findById'),
	getWcifByCompetitionId: WcifTC.getResolver('getWcifByCompetitionId'),
	getAllWcifs: WcifTC.getResolver('findAll'),
	findMyManagableCompetitions: UserTC.getResolver(
		'findMyManagableCompetitions'
	),
	getUser: UserTC.getResolver('getUser'),
	getMyUpcomingCompetitions: UserTC.getResolver('getMyUpcomingCompetitions'),
})

// Mutations

WcifTC.addResolver({
	kind: 'mutation',
	name: 'createWcif',
	type: WcifTC,
	args: {
		competitionId: 'String',
	},
	resolve: async ({ context, args }) => {
		if (!context.user) throw new Error('Not logged in')
		const competition = await WcifModel.findOne({ id: args.competitionId })
		if (competition) {
			throw new Error(
				`Error: Document with '${args.competitionId}' already exists.`
			)
		}
		const user = await UserModel.findById(context.user.id)
		const wcaAccessToken = user.connections.find(
			(connection) => connection.connectionType === 'WCA'
		).accessToken
		const res = await axios({
			url: `${WCA_ORIGIN}api/v0/competitions/${args.competitionId}/wcif/`,
			method: 'GET',
			headers: {
				Authorization: `Bearer ${wcaAccessToken}`,
				'Content-Type': 'application/json',
			},
		})
		const data = await res.data
		const wcif = new WcifModel(data)
		const persons = wcif.persons
		// TODO: Make this cleaner
		persons.forEach(async (person) => {
			const user = await UserModel.findOne({
				connections: {
					$elemMatch: {
						$and: [
							{ connectionType: 'WCA' },
							{ 'content.id': person.wcaUserId },
						],
					},
				},
			})
			if (
				user &&
				user.competitions &&
				!user.competitions.some((competition) => competition.id === wcif.id)
			) {
				let endDate = new Date(wcif.schedule.startDate)
				endDate.setDate(endDate.getDate() + wcif.schedule.numberOfDays - 1)
				const roles = person.roles.map((role) =>
					['organizer', 'delegate'].includes(role)
						? role
						: row === 'trainee_delegate'
						? 'traineeDelegate'
						: []
				)
				user.competitions.push({
					competitionType: 'WCA',
					competitionId: wcif.id,
					startDate: wcif.schedule.startDate,
					endDate: endDate.toISOString().split('T')[0],
					roles: roles,
				})
				await user.save()
			}
		})
		const savedWcif = await wcif.save()
		if (!savedWcif) throw new Error('Error saving document')
		return savedWcif
	},
})

WcifTC.addResolver({
	kind: 'mutation',
	name: 'deleteWcif',
	type: WcifTC,
	args: {
		competitionId: 'String',
	},
	resolve: async ({ args, info }) => {
		const competition = await WcifModel.find({
			competitionId: args.competitionId,
		})
		if (!competition)
			throw new Error(`No Competition named ${args.competitionId} exists`)
		const persons = competition.persons
		persons.forEach(async (person) => {
			const user = await UserModel.findOne({
				connections: {
					$elemMatch: {
						$and: [
							{ connectionType: 'WCA' },
							{ 'content.id': person.wcaUserId },
						],
					},
				},
			})
			if (
				user &&
				user.competitions &&
				user.competitions.some((competition) => competition.id === wcif.id)
			) {
				user.competitions = user.competitions.filter(
					(competition) => competition.competitionId !== args.competitionId
				)
				await user.save()
			}
		})
		const data = await WcifModel.findOneAndRemove(
			{
				id: args.competitionId,
			},
			{ useFindAndModify: false }
		).exec()
		if (!data)
			throw new Error(`Error finding competition with ID ${args.competitionId}`)
		return data
	},
})

WcifTC.addResolver({
	kind: 'mutation',
	name: 'updateWcifInfo',
	type: WcifTC,
	args: {
		_id: 'String!',
		// newCompetitionId: 'String',
		newName: 'String',
		newShortName: 'String',
		newCompetitorLimit: 'Int',
	},
	resolve: async ({ args }) => {
		console.log(args._id)
		const comp = await WcifModel.findById(args._id).exec()
		if (!comp) {
			throw new Error(
				`Error: Couldn't find venue with name "${args.venueName}" for competition with _ID "${args._id}"`
			)
		}
		if (args.newName) {
			comp.name = args.newName
		}
		if (args.newShortName) {
			comp.shortName = args.newShortName
		}
		if (args.newCompetitorLimit) {
			comp.competitorLimit = args.newCompetitorLimit
		}
		const savedComp = await comp.save()
		return savedComp
	},
})

WcifTC.addResolver({
	kind: 'mutation',
	name: 'updateWcifCompetitors',
	type: WcifTC,
	args: {
		_id: 'String!',
		updatedCompetitors: [PersonITC],
	},
	resolve: async ({ args }) => {
		const comp = await WcifModel.findById(args._id).exec()
		if (!comp) {
			throw new Error(`Couldn't find competition with ID "${args._id}"`)
		}
		// Found comp
		for (const index in args.updatedCompetitors) {
			for (const key of Object.keys(args.updatedCompetitors[index])) {
				comp.persons[index][key] = args.updatedCompetitors[index][key]
			}
		}
		const savedComp = await comp.save()
		return savedComp
	},
})

WcifTC.addResolver({
	kind: 'mutation',
	name: 'updateWcifEvents',
	type: WcifTC,
	args: {
		_id: 'String!',
		events: [EventITC],
	},
	resolve: async ({ args }) => {
		const comp = await WcifModel.findById(args._id).exec()
		if (!comp) {
			throw new Error(`Couldn't find competition with ID "${args._id}"`)
		}
		// Found comp
		comp.events = args.events
		const savedComp = await comp.save()
		return savedComp
	},
})

WcifTC.addResolver({
	kind: 'mutation',
	name: 'updateWcifSchedule',
	type: WcifTC,
	args: {
		_id: 'String!',
		schedule: ScheduleITC,
	},
	resolve: async ({ args }) => {
		const comp = await WcifModel.findById(args._id).exec()
		if (!comp) {
			throw new Error(`Couldn't find competition with ID "${args._id}"`)
		}
		// Found comp
		console.log(args.schedule)
		comp.schedule = args.schedule
		const savedComp = await comp.save()
		return savedComp
	},
})

WcifTC.addResolver({
	kind: 'mutation',
	name: 'clearDatabase',
	type: ['type Delete {n: Int!, ok: Int!, deletedCount:Int!}'],
	resolve: async ({}) => {
		const comps = await WcifModel.deleteMany({}).exec()
		const users = await UserModel.deleteMany({}).exec()
		return [comps, users]
	},
})

schemaComposer.Mutation.addFields({
	clearDatabase: WcifTC.getResolver('clearDatabase'),
	createWcif: WcifTC.getResolver('createWcif'),
	deleteWcif: WcifTC.getResolver('deleteWcif'),
	updateWcifInfo: WcifTC.getResolver('updateWcifInfo'),
	updateWcifCompetitors: WcifTC.getResolver('updateWcifCompetitors'),
	updateWcifEvents: WcifTC.getResolver('updateWcifEvents'),
	updateWcifSchedule: WcifTC.getResolver('updateWcifSchedule'),
})

const graphqlSchema = schemaComposer.buildSchema()
module.exports = graphqlSchema
var { composeWithMongoose } = require('graphql-compose-mongoose/node8')
var { schemaComposer } = require('graphql-compose')
var { WcifModel } = require('./models/Wcif')
var axios = require('axios')

// Query

const WcifTC = composeWithMongoose(WcifModel)
WcifTC.addResolver({
	kind: 'query',
	name: 'findByCompetitionId',
	args: {
		id: 'String',
	},
	type: WcifTC,
	resolve: async ({ args, info }) => {
		const data = await WcifModel.findOne({ id: args.id }).exec()
		if (!data)
			throw new Error(`Error finding competition with ID ${args.id}`)
		return data
	},
})
WcifTC.addResolver({
	kind: 'query',
	name: 'findAll',
	args: {},
	type: [WcifTC],
	resolve: async ({ args, context }) => {
		const data = await WcifModel.find().exec()
		if (!data) throw new Error('Error finding competitions')
		return data
	},
})

schemaComposer.Query.addFields({
	WcifCompetition: WcifTC.getResolver('findByCompetitionId'),
	WcifCompetitions: WcifTC.getResolver('findAll'),
})

// Mutations

WcifTC.addResolver({
	kind: 'mutation',
	name: 'createWcif',
	type: WcifTC,
	args: {
		competitionId: 'String',
	},
	resolve: async ({ source, args }) => {
		const res = await axios.get(
			`https://www.worldcubeassociation.org/api/v0/competitions/${args.competitionId}/wcif/public`
		)
		const data = await res.data
		const wcif = new WcifModel(data)
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
		const data = await WcifModel.findOneAndRemove(
			{
				id: args.competitionId,
			},
			{ useFindAndModify: false }
		).exec()
		if (!data)
			throw new Error(
				`Error finding competition with ID ${args.competitionId}`
			)
		return data
	},
})

schemaComposer.Mutation.addFields({
	createWcif: WcifTC.getResolver('createWcif'),
	deleteWcif: WcifTC.getResolver('deleteWcif'),
})

const graphqlSchema = schemaComposer.buildSchema()
module.exports = graphqlSchema

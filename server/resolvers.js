var { composeWithMongoose } = require('graphql-compose-mongoose/node8')
var { schemaComposer, toInputObjectType } = require('graphql-compose')
var { WcifModel, EventModel, PersonModel, ScheduleModel } = require('./models/wcif/Wcif')
var axios = require('axios')
var mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const PersonTC = composeWithMongoose(PersonModel)
const PersonITC = toInputObjectType(PersonTC)
const EventTC = composeWithMongoose(EventModel)
const EventITC = toInputObjectType(EventTC)
const ScheduleTC = composeWithMongoose(ScheduleModel)
const ScheduleITC = toInputObjectType(ScheduleTC)

const WcifTC = composeWithMongoose(WcifModel)
WcifTC.addResolver({
    kind: 'query',
    name: 'findByCompetitionId',
    args: {
        competitionId: 'String!',
    },
    type: WcifTC,
    resolve: async ({ args, info }) => {
        const data = await WcifModel.findOne({ id: args.competitionId }).exec()
        if (!data) throw new Error(`Error finding competition with ID ${args.competitionId}`)
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
    resolve: async ({ args, context }) => {
        const data = await WcifModel.find().exec()
        if (!data) throw new Error('Error finding competitions')
        return data
    },
})

schemaComposer.Query.addFields({
    getWcifById: WcifTC.getResolver('findById'),
    getWcifByCompetitionId: WcifTC.getResolver('findByCompetitionId'),
    getAllWcifs: WcifTC.getResolver('findAll'),
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
        // const competition = await WcifModel.findOne({ id: args.competitionId })
        // if (competition) {
        //     throw new Error(`Error: Document with '${args.competitionId}' already exists.`)
        // }
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
        if (!data) throw new Error(`Error finding competition with ID ${args.competitionId}`)
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
        comp.persons = args.updatedCompetitors
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
        schedule: [ScheduleITC],
    },
    resolve: async ({ args }) => {
        const comp = await WcifModel.findById(args._id).exec()
        if (!comp) {
            throw new Error(`Couldn't find competition with ID "${args._id}"`)
        }
        // Found comp
        comp.schedule = { ...comp.schedule, ...args.schedule }
        const savedComp = await comp.save()
        return savedComp
    },
})

schemaComposer.Mutation.addFields({
    createWcif: WcifTC.getResolver('createWcif'),
    deleteWcif: WcifTC.getResolver('deleteWcif'),
    updateWcifInfo: WcifTC.getResolver('updateWcifInfo'),
    updateWcifCompetitors: WcifTC.getResolver('updateWcifCompetitors'),
    updateWcifEvents: WcifTC.getResolver('updateWcifEvents'),
    updateWcifSchedule: WcifTC.getResolver('updateWcifSchedule'),
})

const graphqlSchema = schemaComposer.buildSchema()
module.exports = graphqlSchema

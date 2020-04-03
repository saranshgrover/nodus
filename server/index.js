const { ApolloServer, gql } = require('apollo-server-express')
const express = require('express')
const mongoose = require('mongoose')
const resolvers = require('./resolvers')
const { MONGODB_URI } = require('./env.js')
const { importSchema } = require('graphql-import')
const graphqlHTTP = require('express-graphql')

const initialize = async () => {
	const app = express()
	const typeDefs = importSchema('./schema.graphql')
	const server = new ApolloServer({
		typeDefs,
		resolvers
	})
	server.applyMiddleware({ app })
	await mongoose.connect('mongodb://localhost/mycomp', {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	app.listen({ port: 4000 }, () => {
		console.log(
			`Server ready at http://localhost:4000${server.graphqlPath}`
		)
	})
}

initialize()

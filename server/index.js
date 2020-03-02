const { ApolloServer, gql } = require('apollo-server-express')
const express = require('express')
const mongoose = require('mongoose')
const { resolvers } = require('./resolvers')
const { MONGODB_URI } = require('./env.js')

const initialize = async () => {
	const typeDefs = gql`
		type Query {
			hello: String!
		}
		type Cat {
			id: ID!
		}
		type Mutation {
			createCate(name: String!): Cat!
		}
	`
	const app = express()
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

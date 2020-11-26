import { ApolloServer, gql } from 'apollo-server-express'
import { createTestClient } from 'apollo-server-testing'
import { ObjectId } from 'mongodb'
import { User } from '../../entities'
import { UserMongooseModel } from '../../modules/user/model'
import { buildSchema } from '../../utils'
import { createUser } from '../data/user-builder'
import {
	clearDatabase,
	closeDatabase,
	connect,
	populateDatabase,
} from '../utils'

beforeAll(async () => connect())

// beforeEach(async () => {
// 	await populateDatabase(WcifMongooseModel, [wcif1])
// })

afterEach(async () => {
	await clearDatabase()
})

afterAll(async (done) => {
	await closeDatabase()
	done()
})

describe('User', () => {
	it('should get user in db', async () => {
		const user = createUser()
		const { password, _id, ...userToMatch } = user
		await populateDatabase(UserMongooseModel, [user])
		const graphqlSchema = await buildSchema()
		const server = new ApolloServer({ schema: graphqlSchema }) as any
		// use the test server to create a query function
		const { query } = createTestClient(server)
		const res = await query({ query: GET_USER, variables: { id: user._id } })
		expect(res.data!.getUser!).toEqual<Omit<User, 'password' | '_id'>>(
			userToMatch
		)
	})

	it('should be null since no user with _id exists', async () => {
		const graphqlSchema = await buildSchema()
		const server = new ApolloServer({ schema: graphqlSchema }) as any
		// use the test server to create a query function
		const { query } = createTestClient(server)
		const res = await query({
			query: GET_USER,
			variables: { id: new ObjectId() },
		})
		expect(res.data?.getUser).toBeNull()
	})

	it('should get the logged in user', async () => {
		const user = createUser()
		const { password, _id, ...userToMatch } = user
		const graphqlSchema = await buildSchema()
		const server = new ApolloServer({
			schema: graphqlSchema,
			context: () => ({ req: { user: { id: user._id.toHexString() } } }),
		}) as any
		await populateDatabase(UserMongooseModel, [user])
		const { query } = createTestClient(server)

		const res = await query({ query: GET_ME })
		expect(res.data!.getMe).toEqual<Omit<User, 'password' | '_id'>>(userToMatch)
	})
	// Still need to write these:
	// it('should update user succesfully')

	// it('should throw username already taken error')
})

const GET_USER = gql`
	query getUser($id: ObjectId!) {
		getUser(id: $id) {
			username
			email
			name
			primaryAuthenticationType
			competitions {
				competitionId
				competitionType
				startDate
				endDate
				roles
				notifications {
					body
				}
			}
			subscriptions {
				endpoint
				device
				browser
			}
			connections {
				connectionType
				accessToken
				content {
					id
					delegateStatus
					birthdate
					teams {
						friendlyId
						leader
					}
					photos
					wcaId
				}
			}
		}
	}
`

const GET_ME = gql`
	query getMe {
		getMe {
			username
			email
			name
			primaryAuthenticationType
			competitions {
				competitionId
				competitionType
				startDate
				endDate
				roles
				notifications {
					body
				}
			}
			subscriptions {
				endpoint
				device
				browser
			}
			connections {
				connectionType
				accessToken
				content {
					id
					delegateStatus
					birthdate
					teams {
						friendlyId
						leader
					}
					photos
					wcaId
				}
			}
		}
	}
`

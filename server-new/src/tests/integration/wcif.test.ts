import { ApolloServer, gql } from 'apollo-server-express'
import { createTestClient } from 'apollo-server-testing'
import { WcifMongooseModel } from '../../modules/wcif/model'
import createModelFromWcif from '../../modules/wcif/utils/createModelFromWcif'
import { buildSchema } from '../../utils'
import wcif1 from '../data/wcif1'
import { closeDatabase, connect, populateDatabase } from '../utils'

beforeAll(async () => connect())

beforeEach(async () => {
	await populateDatabase(WcifMongooseModel, [wcif1])
})

// afterEach(async () => {
// 	await clearDatabase()
// })

afterAll(async (done) => {
	await closeDatabase()
	done()
})

/**
 * Prompt test suite.
 */
describe('Wcif', () => {
	it(`should throw not logged in error`, async () => {
		// We build the schema
		const graphQLSchema = await buildSchema()

		// We create the Apollo Server
		const server = new ApolloServer({
			schema: graphQLSchema,
			context: () => ({ req: {} }),
		}) as any

		// use the test server to create a query function
		const { mutate } = createTestClient(server)

		// We define the query and the variables as you would do from your front-end
		const variables = {
			competitionId: 'SBUFall2019',
		}

		const CREATE_WCIF = gql`
			mutation createTodo($competitionId: String!) {
				createWcif(competitionId: $competitionId) {
					competitionId
					_id
				}
			}
		`

		// run query against the server and snapshot the output
		const res = await mutate({
			mutation: CREATE_WCIF,
			variables,
		})

		expect(res).toMatchSnapshot()
	})

	it(`should  create a wcif`, async () => {
		//@ts-ignore
		const wcif = await createModelFromWcif(wcif1, 'SBUFall2019')
		expect(wcif).toMatchSnapshot()
	})
})
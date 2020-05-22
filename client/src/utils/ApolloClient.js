import omitDeep from 'omit-deep'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { SERVER_URI } from '../config'

const typenameLink = new ApolloLink((operation, forward) => {
	if (operation.variables) {
		let { fileInput, ...others } = operation.variables
		others = omitDeep(JSON.parse(JSON.stringify(others)), ['__typename'])
		const { input } = others
		operation.variables = {
			input,
			fileInput,
			...others,
		}
	}
	return forward(operation)
})

export const client = new ApolloClient({
	link: ApolloLink.from([
		typenameLink,
		new HttpLink({
			uri: `${SERVER_URI}/graphql`,
			credentials: 'include',
		}),
	]),
	cache: new InMemoryCache(),
})

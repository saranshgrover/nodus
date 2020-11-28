import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import { ApolloLink, concat } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import omitDeep from 'omit-deep'
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

const httpLink = new HttpLink({
	uri: `${SERVER_URI}/graphql`,
	credentials: 'include',
})

export const client = new ApolloClient({
	link: concat(typenameLink, httpLink),
	cache: new InMemoryCache(),
})

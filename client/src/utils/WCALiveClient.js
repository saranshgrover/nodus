import { HttpLink } from 'apollo-link-http'
import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'

const WCALiveClient = new ApolloClient({
	link: ApolloLink.from([
		new HttpLink({
			uri: 'https://live.worldcubeassociation.org/api',
		}),
	]),
	cache: new InMemoryCache(),
})

export default WCALiveClient

import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/Landing/App'
import * as serviceWorker from './serviceWorker'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import ErrorFallback from './components/ErrorFallback/ErrorFallback'
import { ErrorBoundary } from 'react-error-boundary'
import UserProvider from './contexts/UserContext'

const client = new ApolloClient({
	link: ApolloLink.from([
		new HttpLink({
			uri: 'http://localhost:3000/graphql',
			credentials: 'include',
		}),
	]),
	cache: new InMemoryCache({
		addTypename: false,
	}),
})
ReactDOM.render(
	<ApolloProvider client={client}>
		<UserProvider>
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<App />
			</ErrorBoundary>
		</UserProvider>
	</ApolloProvider>,
	document.getElementById('root')
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()

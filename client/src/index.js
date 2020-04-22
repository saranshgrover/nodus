import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/Landing/App'
import * as serviceWorker from './serviceWorker'
import { getMe } from './logic/wca-api'
import { isSignedIn } from './logic/auth'
import { initializeAuth } from './logic/auth'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({ uri: 'http://localhost:3000/graphql' })

initializeAuth()
if (isSignedIn()) {
	getMe().then((user) => {
		ReactDOM.render(
			<ApolloProvider client={client}>
				<App userInfo={user} />
			</ApolloProvider>,
			document.getElementById('root')
		)
	})
} else {
	ReactDOM.render(
		<ApolloProvider client={client}>
			<App userInfo={{}} />{' '}
		</ApolloProvider>,
		document.getElementById('root')
	)
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()

import React from 'react'
import ErrorFallback from '../ErrorFallback/ErrorFallback'
import { ErrorBoundary } from 'react-error-boundary'
import UserProvider from '../../contexts/UserContext'
import { ApolloProvider } from 'react-apollo'
import { client } from '../../utils/ApolloClient'
import ThemeProvider from '../../contexts/ThemeProvider'
import Navigation from '../Navigation/Navigation'
import CssBaseline from '@material-ui/core/CssBaseline'

export default function App() {
	return (
		<ApolloProvider client={client}>
			<ThemeProvider>
				<CssBaseline />
				<UserProvider>
					<ErrorBoundary FallbackComponent={ErrorFallback}>
						<Navigation />
					</ErrorBoundary>
				</UserProvider>
			</ThemeProvider>
		</ApolloProvider>
	)
}

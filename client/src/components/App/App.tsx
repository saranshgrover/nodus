import CssBaseline from '@material-ui/core/CssBaseline'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ErrorBoundary } from 'react-error-boundary'
import SnackbarProvider from '../../contexts/SnackbarContext'
import ThemeProvider from '../../contexts/ThemeProvider'
import UserProvider from '../../contexts/UserContext'
import { client } from '../../utils/ApolloClient'
import ErrorFallback from '../ErrorFallback/ErrorFallback'
import Navigation from '../Navigation/Navigation'

export default function App() {
	return (
		<ThemeProvider>
			<SnackbarProvider>
				<ApolloProvider client={client}>
					<CssBaseline />
					<UserProvider>
						<ErrorBoundary FallbackComponent={ErrorFallback}>
							<Navigation />
						</ErrorBoundary>
					</UserProvider>
				</ApolloProvider>
			</SnackbarProvider>
		</ThemeProvider>
	)
}

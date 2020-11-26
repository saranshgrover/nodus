import Snackbar from 'components/common/MySnackbar'
import React, { createContext, useCallback, useEffect, useState } from 'react'

export interface SnackbarContextValue {
	addSnackbar: (alert: SnackbarAlert) => void
}

type SnackbarAlert = {
	message: string
	variant: string
}

export const SnackbarContext = createContext<SnackbarContextValue>(
	{} as SnackbarContextValue
)

// https://github.com/apollographql/apollo-feature-requests/issues/46 Was fixed in 3.0 but we're not migrating to it yet.
function getMessage(message: string, variant: string) {
	if (variant === 'error' && message.indexOf('GraphQL error: ') >= 0) {
		const { 1: errorMessage } = message.split('GraphQL error: ')
		return errorMessage
	}
	return message
}

export default function SnackbarProvider({
	children,
}: React.PropsWithChildren<{}>) {
	const [alerts, setAlerts] = useState<SnackbarAlert[]>([])
	const activeAlertIds = alerts.join(',')
	useEffect(() => {
		if (activeAlertIds.length > 0) {
			const timer = setTimeout(
				() => setAlerts((alerts) => alerts.slice(0, alerts.length - 1)),
				5000
			)
			return () => clearTimeout(timer)
		}
		return
	}, [activeAlertIds])

	const addSnackbar = useCallback(
		({ variant, message }: SnackbarAlert) =>
			setAlerts((alerts) => [
				{ variant: variant, message: getMessage(message, variant) },
				...alerts,
			]),
		[]
	)

	const value = { addSnackbar }

	return (
		<SnackbarContext.Provider value={value}>
			{children}
			{alerts.map((alert, i) => (
				<Snackbar key={i} variant={alert.variant} message={alert.message} />
			))}
		</SnackbarContext.Provider>
	)
}

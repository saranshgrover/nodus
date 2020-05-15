import React from 'react'

export default function ErrorFallback({
	error,
	componentStack,
	resetErrorBoundary,
}) {
	return (
		<div role='alert'>
			<p>Something went wrong:</p>
			<pre>{error.message}</pre>
			<pre>{componentStack}</pre>
			<button onClick={resetErrorBoundary}>Try again</button>
		</div>
	)
}

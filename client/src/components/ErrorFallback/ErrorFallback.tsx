import React from 'react'
import {FallbackProps} from 'react-error-boundary'



export default function ErrorFallback({
	error,
	componentStack,
	resetErrorBoundary
}:FallbackProps) {
	return (
		<div role='alert'>
			<p>Something went wrong:</p>
			<pre>{error?.message}</pre>
			<pre>{componentStack}</pre>
			<button onClick={resetErrorBoundary}>Try again</button>
		</div>
	)
}

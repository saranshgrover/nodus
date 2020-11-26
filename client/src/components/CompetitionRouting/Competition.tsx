import CompetitionProvider from '../../contexts/CompetitionContext'
import React from 'react'
import CompetitionRouting from './CompetitionRouting'
import { RouteComponentProps } from 'react-router-dom'

interface MatchParams {
	compId: string
	tab?: string
}

export default function Competition({
	match,
	...props
}: RouteComponentProps<MatchParams>) {
	return (
		<CompetitionProvider competitionId={match.params.compId}>
			<CompetitionRouting match={match} {...props} />
		</CompetitionProvider>
	)
}

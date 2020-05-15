import CompetitionProvider from '../../contexts/CompetitionContext'
import React from 'react'
import CompetitionRouting from './CompetitionRouting'

export default function Competition({ match, ...props }) {
	return (
		<CompetitionProvider competitionId={match.params.compId}>
			<CompetitionRouting match={match} {...props} />
		</CompetitionProvider>
	)
}

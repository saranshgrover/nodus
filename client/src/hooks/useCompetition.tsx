import { useContext } from 'react'
import { CompetitionContext } from 'contexts/CompetitionContext'

export default function useCompetition() {
	return useContext(CompetitionContext)
}

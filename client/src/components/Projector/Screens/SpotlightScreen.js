import React from 'react'
import CompetitorCard from '../../CompetitorCard/CompetitorCard'
export default function SpotlightScreen({ topCompetitors }) {
	return <CompetitorCard competitor={topCompetitors} />
}

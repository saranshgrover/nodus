import React, { useState, useEffect, useContext } from 'react'
import CompetitorResultList from '../CompetitorResultList/CompetitorResultList'
import WCALiveClient from '../../utils/WCALiveClient'
import Error from '../common/Error'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { CompetitionContext } from '../../contexts/CompetitionContext'

const WCA_ROUND_QUERY = gql`
	query round($competitionId: ID!, $roundId: String!) {
		round(competitionId: $competitionId, roundId: $roundId) {
			_id
			competitionId
			results {
				_id
				person {
					_id
					name
					wcaId
					country {
						iso2
						name
					}
				}
				ranking
				attempts
				best
				average
				advancable
			}
		}
	}
`

export default function EventResults({ roundId }) {
	const { competitionId } = useContext(CompetitionContext)
	const { loading, data, error } = useQuery(WCA_ROUND_QUERY, {
		client: WCALiveClient,
		variables: { competitionId, roundId },
	})
	if (loading) return <></>
	if (error) return <Error message={error.message} />
	return (
		<CompetitorResultList
			competitors={data.round.results}
			roundId={roundId}
		/>
	)
}

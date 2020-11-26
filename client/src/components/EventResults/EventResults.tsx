import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import useCompetition from 'hooks/useCompetition'
import React from 'react'
import WCALiveClient from '../../utils/WCALiveClient'
import Error from '../common/Error'
import CompetitorResultList from '../CompetitorResultList/CompetitorResultList'

const WCA_ROUND_QUERY = gql`
	query round($competitionId: ID!, $roundId: String!) {
		round(competitionId: $competitionId, roundId: $roundId) {
			_id
			id
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

interface Props {
	roundId: string
}

export default function EventResults({ roundId }: Props) {
	const { competitionId } = useCompetition()
	const { loading, data, error } = useQuery(WCA_ROUND_QUERY, {
		client: WCALiveClient,
		variables: { competitionId, roundId },
	})
	if (loading) return <></>
	if (error) return <Error message={error.message} />
	return (
		<CompetitorResultList competitors={data.round.results} roundId={roundId} />
	)
}

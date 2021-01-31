import { useQuery } from '@apollo/react-hooks'
import LinearProgress from '@material-ui/core/LinearProgress'
import gql from 'graphql-tag'
import React from 'react'
import WCALiveClient from '../../utils/WCALiveClient'
import Error from '../common/Error'
import CompetitorResultList from '../CompetitorResultList/CompetitorResultList'

const WCA_ROUND_QUERY = gql`
	query round($roundId: ID!) {
		round(id: $roundId) {
			results {
				person {
					name
					wcaId
					country {
						iso2
						name
					}
				}
				ranking
				attempts {
					result
				}
				best
				average
				advancing
			}
		}
	}
`

interface Props {
	roundId: string
}

export default function EventResults({ roundId }: Props) {
	const { loading, data, error } = useQuery(WCA_ROUND_QUERY, {
		client: WCALiveClient,
		variables: { roundId: parseInt(roundId) },
	})
	if (loading) return <LinearProgress />
	if (error) return <Error message={error.message} />
	return (
		<CompetitorResultList competitors={data.round.results} roundId={roundId} />
	)
}

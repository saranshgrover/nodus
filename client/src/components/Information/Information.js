import React, { Component, useContext, useState, useEffect } from 'react'
import { CompetitionContext } from '../../contexts/CompetitionContext'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Grid'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import LinearProgress from '@material-ui/core/LinearProgress'
import Error from '../common/Error'

const FIND_TOP_COMPETITORS = gql`
	query getTopCompetitors($top: Int!, $_id: String!) {
		getTopCompetitors(top: $top, _id: $_id) {
			name
			personalBests {
				eventId
				best
				type
				worldRanking
			}
		}
	}
`

export default function Information() {
	const competition = useContext(CompetitionContext)
	const [topCompetitors, setTopCompetitors] = useState(null)
	const { loading, error, data } = useQuery(FIND_TOP_COMPETITORS, {
		variables: { _id: competition._id, top: 50 }, // Gets competitors where world ranking is 50 or lower
	})
	useEffect(() => {
		!loading && !error && setTopCompetitors(data.getTopCompetitors)
	}, [loading, error, data])
	if (loading || !topCompetitors) return <LinearProgress />
	if (error) return <Error message={error.toString()} />
	console.log(competition)
	console.log(topCompetitors)
	return (
		<Paper>
			<Grid
				container
				direction='column'
				justify='center'
				alignItems='center'
				spacing={2}
			>
				<Grid item>{/* Top Results */}</Grid>
			</Grid>
		</Paper>
	)
}

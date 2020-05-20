import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import Error from '../common/Error'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import { activityKey } from '../../logic/activity'

const FIND_TOP_COMPETITORS = gql`
	query getTopCompetitors($top: Int!, $_id: String!) {
		getTopCompetitors(top: $top, _id: $_id) {
			_id
			name
			wcaUserId
			personalBests {
				_id
				eventId
				best
				type
				worldRanking
			}
		}
	}
`

const useStyles = makeStyles((theme) => ({
	list: {
		backgroundColor: theme.palette.background.paper,
	},
}))

const getBestRanking = (competitor) => {
	// Given a competitor, find best ranking to show
	let highestRanking = competitor.personalBests[0].worldRanking
	let rankIndex = 0
	competitor.personalBests.forEach((best, index) => {
		if (highestRanking > best.worldRanking) {
			// Found better ranking
			highestRanking = best.worldRanking
			rankIndex = index
		}
	})
	return competitor.personalBests[rankIndex]
}

export default function TopCompetitors({ _id }) {
	const [topCompetitors, setTopCompetitors] = useState(null)
	const { loading, error, data } = useQuery(FIND_TOP_COMPETITORS, {
		variables: { _id, top: 50 }, // Gets competitors where world ranking is 50 or lower
	})
	const classes = useStyles()
	useEffect(() => {
		!loading && !error && setTopCompetitors(data.getTopCompetitors)
	}, [loading, error, data])
	if (loading || !topCompetitors) return <LinearProgress />
	if (error) return <Error message={error.toString()} />
	console.log(topCompetitors)
	return (
		<>
			<Typography variant='h4'>Top Competitors</Typography>
			<Typography>Showing rankings for top 50 in the world</Typography>
			{topCompetitors.length > 0 ? (
				<List className={classes.list}>
					{topCompetitors.map((competitor, index) => (
						<React.Fragment key={competitor.wcaUserId}>
							<ListItem>
								<Typography variant='h5'>{competitor.name}</Typography>
							</ListItem>
							<ListItem>
								<Typography>
									Rank {getBestRanking(competitor).worldRanking} in{' '}
									{activityKey[getBestRanking(competitor).eventId]}
								</Typography>
							</ListItem>
							{index < topCompetitors.length - 1 && <Divider />}
						</React.Fragment>
					))}
				</List>
			) : (
				<Typography>There are no top competitors</Typography>
			)}
		</>
	)
}

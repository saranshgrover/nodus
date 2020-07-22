import { useQuery } from '@apollo/react-hooks'
import teal from '@material-ui/core/colors/teal'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import gql from 'graphql-tag'
import React, { useContext } from 'react'
import { CompetitionContext } from '../../contexts/CompetitionContext'
import { activityKey, parseActivityCode } from '../../logic/activity'
import { formatAttemptResult } from '../../logic/attempts'
import WCALiveClient from '../../utils/WCALiveClient'
import CubingIcon from '../common/CubingIcon'
import Error from '../common/Error'

const WCA_ROUND_QUERY = gql`
	query competitor($competitionId: ID!, $competitorId: Int!) {
		competitor(competitionId: $competitionId, competitorId: $competitorId) {
			_id
			id
			name
			wcaId
			results {
				_id
				ranking
				average
				attempts
				best
				advancable
				round {
					_id
					id
				}
			}
		}
	}
`

/**
 * Note: This function currently directly feeds in from WCA Live. This is because a round-based subscription pattern hasn't been implemented yet. Once it will be, we will most likely be pulling that information from our own server
 */
export default function UserResult() {
	const { competitionId, registrantId } = useContext(CompetitionContext)
	const { loading, data, error } = useQuery(WCA_ROUND_QUERY, {
		client: WCALiveClient,
		variables: { competitionId, competitorId: registrantId },
	})
	if (loading) return <></>
	if (error) return <Error message={error.message} />
	const person = data.competitor
	return (
		<Grid
			container
			direction='column'
			justify='center'
			alignItems='center'
			alignContent='center'
			wrap='nowrap'>
			<Grid item>
				<Typography variant='h3' color='initial'>
					{person.name}
				</Typography>
			</Grid>
			<Grid item>
				<Typography variant='subtitle1'>{person.wcaId}</Typography>
			</Grid>
			<Grid item>
				<TableContainer component={Paper}>
					<Table aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell size='small' align='left'></TableCell>
								<TableCell align='left'></TableCell>
								<TableCell>Event</TableCell>
								<TableCell align='left'>Average</TableCell>
								<TableCell align='left'>Single</TableCell>
								<TableCell align='center'>Attempts</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{person.results.map((result: any) => {
								const { eventId, roundNumber } = parseActivityCode(
									result.round.id
								)
								{
									return (
										<TableRow key={result.round.id}>
											<TableCell
												size='small'
												style={{
													backgroundColor: result.advancable && teal[400],
												}}>
												{result.ranking}
											</TableCell>
											<TableCell align='left'>
												<CubingIcon eventId={eventId} />
											</TableCell>
											<TableCell>
												{`${activityKey[eventId]} Round ${roundNumber}`}
											</TableCell>
											<TableCell align='left'>
												{formatAttemptResult(
													result.average || '',
													eventId,
													true
												)}
											</TableCell>
											<TableCell align='left'>
												{formatAttemptResult(result.best || '', eventId, false)}
											</TableCell>
											<TableCell align='right'>{`${result.attempts.map(
												(r: number) =>
													`${formatAttemptResult(r, eventId, false)} `
											)}`}</TableCell>
										</TableRow>
									)
								}
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>
		</Grid>
	)
}

import { Link } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import React, { useContext } from 'react'
import { CompetitionContext } from '../../contexts/CompetitionContext'
import { parseActivityCode } from '../../logic/activity'
import { formatAttemptResult } from '../../logic/attempts'

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(2),
		overflow: 'auto',
	},
	list: {
		height: '400',
		textAlign: 'center',
	},
	table: {
		width: '70vw',
	},
}))

export const times = (n, fn) =>
	Array.from({ length: n }, (_, index) => fn(index))

export default function CompetitorList({ competitors, roundId }) {
	const classes = useStyles()
	const attempts = competitors.length > 0 && competitors[0].attempts.length
	const { competitionId } = useContext(CompetitionContext)
	const { eventId } = parseActivityCode(roundId)
	return (
		<TableContainer component={Paper}>
			<Table size='small' className={classes.table} aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell align='left'>#</TableCell>
						<TableCell>Name</TableCell>
						{attempts > 2 && <TableCell align='left'>Average</TableCell>}
						<TableCell align='left'>Best</TableCell>
						{times(attempts, (index) => (
							<TableCell k ey={index} align='right'>
								{index + 1}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{competitors.map((row, i) => (
						<TableRow key={row._id}>
							<TableCell
								style={{
									color: row.ranking < 3 && 'black',
									backgroundColor:
										i === 0
											? '#c9b037'
											: i === 1
												? '#b4b4b4'
												: i === 2
													? '#ad8a56'
													: '',
								}}
							>
								{row.ranking}
							</TableCell>
							<TableCell component='th' scope='row'>
								<Link
									color='inherit'
									href={`/${competitionId}/person/${row.id}`}
								>
									{row.person.name}
								</Link>
							</TableCell>
							{attempts > 2 && (
								<TableCell align='left'>
									{`${formatAttemptResult(row.average || '', eventId, true)}`}
								</TableCell>
							)}
							<TableCell align='left'>
								{formatAttemptResult(row.best || '', eventId, false)}
							</TableCell>
							{times(attempts, (index) => (
								<TableCell key={index} align='right'>
									{formatAttemptResult(row.attempts[index]?.result, eventId, false)}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

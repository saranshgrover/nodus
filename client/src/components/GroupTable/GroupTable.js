import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { getAssignmentsFromActivityId } from '../../logic/activity'
import { getPersonalBestFromActivity } from '../../logic/competitor'
import { assignedTo } from '../../logic/schedule'
import Typography from '@material-ui/core/Typography'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import { makeStyles } from '@material-ui/core'

import Error from '../common/Error'
import { CompetitionContext } from '../../contexts/CompetitionContext'

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		margin: theme.spacing(3),
	},
	link: {
		textDecoration: 'none',
		color: theme.palette.primary.light,
	},
	top: {
		margin: 'auto',
		backgroundColor: theme.palette.primary.main,
	},
	header: {
		backgroundColor: theme.palette.secondary.main,
	},
	text: {
		margin: theme.spacing(3),
	},
	table: {
		margin: 'auto',
		maxWidth: 800,
	},
	tableCell: {
		paddingRight: 4,
		paddingLeft: 5,
	},
}))

export default function GroupsActivity({ activity, wcif }) {
	const { activityCode, id } = activity
	const { competitionId } = useContext(CompetitionContext)
	const classes = useStyles()
	const groupInfo = getAssignmentsFromActivityId(id, wcif)
	return (
		<>
			{groupInfo[0].length > 0 && (
				<Table size='small' className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell className={classes.top} align='center' colSpan={5}>
								<Typography> Competitors </Typography>
							</TableCell>
						</TableRow>
						<TableRow className={classes.header}>
							<TableCell className={classes.tableCell}>
								<Typography>Competitor</Typography>
							</TableCell>
							<TableCell className={classes.tableCell}>
								<Typography>WCA ID</Typography>
							</TableCell>
							<TableCell className={classes.tableCell}>
								<Typography>Seed Time</Typography>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{groupInfo[0].map((competitor) => (
							<TableRow key={competitor.wcaUserId}>
								<TableCell className={classes.tableCell}>
									<Link
										className={classes.link}
										to={`/competitions/${competitionId}/competitors/${
											competitor.wcaId ? competitor.wcaId : competitor.wcaUserId
										}`}
									>
										<Typography> {competitor.name}</Typography>
									</Link>
								</TableCell>
								<TableCell className={classes.tableCell}>
									<Typography>
										{competitor.wcaId ? competitor.wcaId : '-'}
									</Typography>
								</TableCell>
								<TableCell className={classes.tableCell}>
									<Typography>
										{getPersonalBestFromActivity(competitor, activityCode)}
									</Typography>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
					<TableHead>
						<TableRow>
							<TableCell className={classes.top} align='center' colSpan={5}>
								<Typography> Staff </Typography>
							</TableCell>
						</TableRow>
						<TableRow className={classes.header}>
							<TableCell className={classes.tableCell}>
								<Typography> Competitor </Typography>
							</TableCell>
							<TableCell className={classes.tableCell}>
								<Typography> WCA ID </Typography>
							</TableCell>
							<TableCell className={classes.tableCell}>
								<Typography> Duty </Typography>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{groupInfo[1].map((competitor) => (
							<TableRow key={competitor.wcaUserId}>
								<TableCell className={classes.tableCell}>
									<Link
										className={classes.link}
										to={`/competitions/${wcif.id}/groups/competitors/${
											competitor.wcaId ? competitor.wcaId : competitor.wcaUserId
										}`}
									>
										<Typography>{competitor.name}</Typography>
									</Link>
								</TableCell>
								<TableCell className={classes.tableCell}>
									<Typography>{competitor.wcaId}</Typography>
								</TableCell>
								<TableCell className={classes.tableCell}>
									<Typography>
										{assignedTo(
											competitor.assignments.find(
												(assignment) => assignment.activityId === id
											).assignmentCode
										)}
									</Typography>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
			{groupInfo[0].length === 0 && (
				<Error message='Group is Invalid or has not begun' />
			)}
		</>
	)
}

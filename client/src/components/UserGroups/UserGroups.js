import React, { useContext } from 'react'
import moment from 'moment'
import 'moment-timezone'
import { getMyAssignmentsInOrder } from '../../logic/competitor'
import { getScheduleData, assignedTo } from '../../logic/schedule'
import { parseActivityCode, activityKey } from '../../logic/activity'

import Table from '@material-ui/core/Table'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Grid from '@material-ui/core/Grid'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import Error from '../common/Error'
import { CompetitionContext } from '../../contexts/CompetitionContext'
import LinearProgress from '../LinearProgress/LinearProgress'

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		marginTop: theme.spacing(3),
	},
	paper: {
		width: '100%',
		maxHeight: '100%',
		overflow: 'auto',
		padding: theme.spacing(2),
		marginBottom: theme.spacing(3),
	},
	text: {
		margin: theme.spacing(3),
	},
	tableCell: {
		paddingRight: 4,
		paddingLeft: 5,
	},
	link: {
		color: theme.palette.primary.light,
		textDecoration: 'none',
	},
}))

export default function UserGroups({ wcif }) {
	const { userConnectionInfo, activities } = useContext(CompetitionContext)
	const classes = useStyles()
	const myAssignments = getMyAssignmentsInOrder(
		userConnectionInfo.content.id,
		wcif
	)
	const mySchedule =
		myAssignments && getScheduleData([], [], [], myAssignments, activities)

	return (
		<>
			{myAssignments === null ? (
				<Error message={'Invalid ID'} />
			) : (
				<Grid item className={classes.root} xs={12}>
					<Paper className={classes.paper}>
						<Table className={classes.table}>
							<TableHead>
								<TableRow>
									<TableCell className={classes.tableCell} size='small'>
										<Typography>{`Time`} </Typography>
									</TableCell>
									<TableCell className={classes.tableCell}>
										<Typography>{`Event`} </Typography>
									</TableCell>
									<TableCell className={classes.tableCell} size='small'>
										<Typography>{`Group`} </Typography>
									</TableCell>
									<TableCell className={classes.tableCell} size='small'>
										<Typography>{`Activity`} </Typography>
									</TableCell>
									<TableCell className={classes.tableCell}>
										<Typography>{`Room`} </Typography>
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{mySchedule &&
									mySchedule.map((assignment) => (
										<TableRow key={assignment.title}>
											<TableCell className={classes.tableCell}>
												<Typography>
													{moment(assignment.startDate)
														.tz(wcif.schedule.venues[0].timezone)
														.format('hh:mm a')}
												</Typography>
											</TableCell>
											<TableCell className={classes.tableCell}>
												<Typography>
													{
														activityKey[
															parseActivityCode(
																assignment.activity.activityCode
															).eventId
														]
													}
												</Typography>
											</TableCell>
											<TableCell className={classes.tableCell}>
												<Typography>
													{`Group ${
														parseActivityCode(assignment.activity.activityCode)
															.groupNumber
													}`}
												</Typography>
											</TableCell>
											<TableCell className={classes.tableCell}>
												<Typography>
													{assignedTo(assignment.assignmentCode)}
												</Typography>
											</TableCell>
											<TableCell className={classes.tableCell}>
												<Grid container alignItems='center'>
													<Grid item>
														<Typography>
															{assignment.activity.room.name}
														</Typography>
													</Grid>
													<Grid item>
														<FiberManualRecordIcon
															style={{
																fontSize: '50px',
																color: assignment.activity.room.color,
															}}
														/>
													</Grid>
												</Grid>
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</Paper>
				</Grid>
			)}
		</>
	)
}

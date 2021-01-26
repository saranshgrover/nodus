import { Theme } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import { makeStyles } from '@material-ui/styles'
import { CompetitionGroupsQuery } from 'generated/graphql'
import useCompetition from 'hooks/useCompetition'
import moment from 'moment-timezone'
import React from 'react'
import { activityKey, parseActivityCode } from '../../logic/activity'
import { getMyAssignmentsInOrder } from '../../logic/competitor'
import { assignedTo, getScheduleData } from '../../logic/schedule'
import Error from '../common/Error'

const useStyles = makeStyles((theme: Theme) => ({
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

interface Props {
	wcif: NonNullable<CompetitionGroupsQuery['getWcifByCompetitionId']>
}

export default function UserGroups({ wcif }: Props) {
	const { userConnectionInfo, activities } = useCompetition()
	const classes = useStyles()
	const myAssignments = getMyAssignmentsInOrder(
		userConnectionInfo!.content.id,
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
						<Table>
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
									mySchedule.map((assignment: any) => {
										const {
											eventId,
											groupNumber,
											attemptNumber,
										} = parseActivityCode(assignment.activity.activityCode)
										return (
											<TableRow key={assignment.title}>
												<TableCell className={classes.tableCell}>
													<Typography>
														{moment(assignment.startDate)
															.tz(wcif.schedule.venues[0].timezone)
															.format('hh:mm a')}
													</Typography>
												</TableCell>
												<TableCell className={classes.tableCell}>
													<Typography>{activityKey[eventId]}</Typography>
												</TableCell>
												<TableCell className={classes.tableCell}>
													<Typography>
														{groupNumber && `Group ${groupNumber}`}
														{attemptNumber && `Attempt ${attemptNumber}`}
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
										)
									})}
							</TableBody>
						</Table>
					</Paper>
				</Grid>
			)}
		</>
	)
}

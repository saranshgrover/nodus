import { ViewState } from '@devexpress/dx-react-scheduler'
import {
	Appointments,
	DayView,
	Scheduler,
} from '@devexpress/dx-react-scheduler-material-ui'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import React, { useContext, useEffect, useState } from 'react'
import { CompetitionContext } from '../../contexts/CompetitionContext'
import { UserContext } from '../../contexts/UserContext'
import {
	Activity,
	ChildActivity,
	CompetitionOverviewQuery,
	useCompetitionOverviewQuery,
} from '../../generated/graphql'
import {
	getMyAssignmentsInOrder,
	getMyEventsInOrder,
} from '../../logic/competitor'
import { getScheduleData } from '../../logic/schedule'
import Error from '../common/Error'
import EventList from '../common/EventList'
import LinearProgress from '../LinearProgress/LinearProgress'
import OverviewFilterChips from './OverviewFilterChips'

interface ScheduleData {
	startDate: string
	endDate: string
	title: string
	assignmentCode: string
	activity: Activity | ChildActivity
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		margin: theme.spacing(2),
		padding: theme.spacing(3),
		textAlign: 'center',
	},
	card: {
		textAlign: 'center',
		margin: theme.spacing(2),
		maxHeight: '200px',
	},
}))
const Appointment = (props: any) => {
	return (
		<Appointments.Appointment
			{...props}
			style={{ backgroundColor: props.data.activity.room.color }}
		/>
	)
}

export default function Overview() {
	const user = useContext(UserContext)
	const { competitionId, activities, userConnectionInfo } = useContext(
		CompetitionContext
	)
	const classes = useStyles()
	const [wcif, setWcif] = useState<
		CompetitionOverviewQuery['getWcifByCompetitionId']
	>(null)
	const { loading, error, data } = useCompetitionOverviewQuery({
		variables: { competitionId },
	})
	const [myEvents, setMyEvents] = useState<any>()
	const [myAssignments, setMyAssignments] = useState<any>(null)
	useEffect(() => {
		if (wcif !== null) {
			setMyEvents(getMyEventsInOrder(userConnectionInfo!.content.id, wcif))
			setMyAssignments(
				getMyAssignmentsInOrder(userConnectionInfo!.content.id, wcif)
			)
		}
	}, [userConnectionInfo, wcif])
	const [selectedEvents, setSelectedEvents] = useState<string[]>([])
	const [unselectedRooms, setUnselectedRooms] = useState<string[]>([])
	const [unselectedAssignments, setUnselectedAssignments] = useState<any[]>([])
	useEffect(() => {
		!loading && !error && data && setWcif(data.getWcifByCompetitionId)
	}, [loading, error, data])
	const [scheduleData, setScheduleData] = useState<ScheduleData[]>([])
	useEffect(() => {
		if (wcif && myAssignments) {
			const scheduleData: ScheduleData[] = getScheduleData(
				selectedEvents,
				unselectedRooms,
				unselectedAssignments,
				myAssignments,
				activities
			)
			setScheduleData(scheduleData)
		}
	}, [
		user,
		selectedEvents,
		unselectedRooms,
		unselectedAssignments,
		myAssignments,
		wcif,
		activities,
	])
	const addSelectedEvent = (eventId: string) => {
		selectedEvents.includes(eventId)
			? setSelectedEvents(
					selectedEvents.filter((event) => !(event === eventId))
			  )
			: setSelectedEvents([...selectedEvents, eventId])
	}
	if (loading || !wcif || !activities || !myAssignments || !myEvents)
		return <LinearProgress />
	if (error) return <Error message={error.toString()} />
	return (
		<div className={classes.root}>
			{loading ? (
				<LinearProgress />
			) : (
				<Paper className={classes.paper}>
					<Grid container justify='center' alignItems='center' direction='row'>
						<Grid item>
							<EventList
								selected={selectedEvents}
								onClick={addSelectedEvent}
								justify='center'
								events={myEvents}
							/>
						</Grid>
						<Grid item>
							<OverviewFilterChips
								venues={wcif.schedule.venues}
								unselectedRooms={unselectedRooms}
								setUnselectedRooms={setUnselectedRooms}
								unselectedAssignments={unselectedAssignments}
								setUnselectedAssignments={setUnselectedAssignments}
							/>
						</Grid>
						<Grid item>
							<Scheduler data={scheduleData}>
								<ViewState currentDate={wcif.schedule.startDate} />
								<DayView
									startDayHour={8}
									endDayHour={19}
									cellDuration={30}
									intervalCount={wcif.schedule.numberOfDays}
								/>
								<Appointments appointmentComponent={Appointment} />
							</Scheduler>
						</Grid>
					</Grid>
				</Paper>
			)}
		</div>
	)
}

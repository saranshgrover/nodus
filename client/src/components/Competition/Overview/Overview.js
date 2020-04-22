import React, { useState, useEffect } from 'react'
import EventList from '../../common/EventList'
import {
	makeStyles,
	Paper,
	LinearProgress,
	Grid,
	TextField,
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { ViewState } from '@devexpress/dx-react-scheduler'
import {
	Scheduler,
	DayView,
	Appointments,
} from '@devexpress/dx-react-scheduler-material-ui'
import {
	getScheduleData,
	flattenActivities,
	getMyEventsInOrder,
	getMyAssignmentsInOrder,
} from './OverviewLogic'
import OverviewFilterChips from './OverviewFilterChips'
import { isHappening } from '../../../logic/tools'
import CompetitionStatus from '../Status/CompetitionStatus'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(2, 3),
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
const Appointment = (props) => {
	return (
		<Appointments.Appointment
			{...props}
			style={{ backgroundColor: props.data.activity.room.color }}
		/>
	)
}

export default function Overview({ wcif, user, userInfo }) {
	const classes = useStyles()
	const [selectedUser, setSelectedUser] = useState(
		user === 'spectator'
			? wcif.persons[0]
			: wcif.persons.find((person) => person.wcaUserId === userInfo.me.id)
	)
	const [MyEvents, setMyEvents] = useState([])
	const [MyAssignments, setMyAssignemnts] = useState([])
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		setLoading(true)
		setMyEvents(getMyEventsInOrder(selectedUser.wcaUserId, wcif))
		setMyAssignemnts(getMyAssignmentsInOrder(selectedUser.wcaUserId, wcif))
	}, [selectedUser, wcif])
	const [selectedEvents, setSelectedEvents] = useState([])
	const [unselectedRooms, setUnselectedRooms] = useState([])
	const [unselectedAssignments, setUnselectedAssignments] = useState([])
	const [activties, setActivities] = useState(null)
	useEffect(() => {
		setActivities(flattenActivities(wcif.schedule))
	}, [wcif])
	const [data, setData] = useState([])
	useEffect(() => {
		setData(
			getScheduleData(
				selectedEvents,
				unselectedRooms,
				unselectedAssignments,
				MyAssignments,
				activties
			)
		)
		setLoading(false)
	}, [
		user,
		selectedEvents,
		unselectedRooms,
		unselectedAssignments,
		MyAssignments,
		wcif,
		activties,
	])
	const addSelectedEvent = (eventId) => {
		selectedEvents.includes(eventId)
			? setSelectedEvents(
					selectedEvents.filter((event) => !(event === eventId))
			  )
			: setSelectedEvents([...selectedEvents, eventId])
	}
	return (
		<div className={classes.root}>
			{isHappening(wcif.schedule) && <CompetitionStatus wcif={wcif} />}
			{loading ? (
				<LinearProgress />
			) : (
				<Paper className={classes.paper}>
					<Grid
						container
						justify='center'
						alignItems='center'
						direction='row'
					>
						<Grid item>
							<Autocomplete
								onChange={(event, value) =>
									setSelectedUser(value)
								}
								options={wcif.persons}
								getOptionLabel={(person) =>
									`${person.name} ${
										person.wcaId ? `- ${person.wcaId}` : ''
									}`
								}
								style={{ width: 300 }}
								value={selectedUser}
								renderInput={(params) => (
									<TextField
										style={{ textAlign: 'center' }}
										{...params}
										label='Select Competitor'
										variant='outlined'
										fullWidth
									/>
								)}
							/>
							<EventList
								selected={selectedEvents}
								onClick={addSelectedEvent}
								justify='center'
								events={MyEvents}
								user={user}
							/>
						</Grid>
						<Grid item>
							<OverviewFilterChips
								venues={wcif.schedule.venues}
								unselectedRooms={unselectedRooms}
								setUnselectedRooms={setUnselectedRooms}
								unselectedAssignments={unselectedAssignments}
								setUnselectedAssignments={
									setUnselectedAssignments
								}
							/>
						</Grid>
						<Grid item>
							<Scheduler data={data}>
								<ViewState
									currentDate={wcif.schedule.startDate}
								/>
								<DayView
									startDayHour={8}
									endDayHour={19}
									cellDuration={30}
								/>
								<Appointments
									appointmentComponent={Appointment}
								/>
							</Scheduler>
						</Grid>
					</Grid>
				</Paper>
			)}
		</div>
	)
}

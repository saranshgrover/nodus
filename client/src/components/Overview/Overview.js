import React, { useState, useEffect, useContext } from 'react'
import EventList from '../common/EventList'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import LinearProgress from '@material-ui/core/LinearProgress'
import Grid from '@material-ui/core/Grid'
// // import TextField from '@material-ui/core/TextField'
// import Autocomplete from '@material-ui/lab/Autocomplete'
import { ViewState } from '@devexpress/dx-react-scheduler'
import {
	Scheduler,
	DayView,
	Appointments,
} from '@devexpress/dx-react-scheduler-material-ui'
import OverviewFilterChips from './OverviewFilterChips'
import { getScheduleData, flattenActivities } from '../../logic/schedule'
import {
	getMyEventsInOrder,
	getMyAssignmentsInOrder,
} from '../../logic/competitor'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { UserContext } from '../../contexts/UserContext'
import { CompetitionContext } from '../../contexts/CompetitionContext'
import Error from '../common/Error'

const FIND_BY_COMPETITION_ID_QUERY = gql`
	query getWcifByCompetitionId($competitionId: String!) {
		getWcifByCompetitionId(competitionId: $competitionId) {
			name
			shortName
			_id
			persons {
				name
				wcaUserId
				wcaId
				roles
				registration {
					eventIds
				}
				assignments {
					activityId
					assignmentCode
					stationNumber
				}
			}
			schedule {
				startDate
				numberOfDays
				venues {
					name
					rooms {
						id
						name
						color
						activities {
							id
							name
							activityCode
							startTime
							endTime
							childActivities {
								id
								name
								activityCode
								startTime
								endTime
							}
						}
					}
				}
			}
		}
	}
`

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

export default function Overview() {
	const user = useContext(UserContext)
	const competition = useContext(CompetitionContext)
	const classes = useStyles()
	const [wcif, setWcif] = useState(null)
	const { loading, error, data } = useQuery(FIND_BY_COMPETITION_ID_QUERY, {
		variables: { competitionId: competition.competitionId },
	})
	const [myEvents, setMyEvents] = useState(null)
	const [myAssignments, setMyAssignments] = useState(null)
	useEffect(() => {
		if (wcif !== null) {
			setMyEvents(
				getMyEventsInOrder(competition.userConnectionInfo.content.id, wcif)
			)
			setMyAssignments(
				getMyAssignmentsInOrder(competition.userConnectionInfo.content.id, wcif)
			)
		}
	}, [competition.userConnectionInfo, wcif])
	const [selectedEvents, setSelectedEvents] = useState([])
	const [unselectedRooms, setUnselectedRooms] = useState([])
	const [unselectedAssignments, setUnselectedAssignments] = useState([])
	const [activities, setActivities] = useState(null)
	useEffect(() => {
		!loading && !error && setWcif(data.getWcifByCompetitionId)
	}, [loading, error, data])
	useEffect(() => {
		wcif !== null && setActivities(flattenActivities(wcif.schedule))
	}, [wcif])
	const [scheduleData, setScheduleData] = useState([])
	useEffect(() => {
		wcif &&
			myAssignments &&
			setScheduleData(
				getScheduleData(
					selectedEvents,
					unselectedRooms,
					unselectedAssignments,
					myAssignments,
					activities
				)
			)
	}, [
		user,
		selectedEvents,
		unselectedRooms,
		unselectedAssignments,
		myAssignments,
		wcif,
		activities,
	])
	const addSelectedEvent = (eventId) => {
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
								user={user}
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
								<DayView startDayHour={8} endDayHour={19} cellDuration={30} />
								<Appointments appointmentComponent={Appointment} />
							</Scheduler>
						</Grid>
					</Grid>
				</Paper>
			)}
		</div>
	)
}

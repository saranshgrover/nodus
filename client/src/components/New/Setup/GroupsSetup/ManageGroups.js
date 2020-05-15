import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import EventManager from './EventManager'
import { activityKey } from '../../../Competition/Overview/OverviewLogic'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: '30vw',
	},
	roundFormControl: {
		margin: theme.spacing(1),
		minWidth: '15vw',
	},
}))
export default function ManageGroups({ wcif, setWcif, user }) {
	const [localWcif, setLocalWcif] = React.useState(wcif)
	const events = wcif.events
	const [selectedEvent, setselectedEvent] = React.useState(events[0])
	const [selectedRound, setSelectedRound] = React.useState(1)
	const [completed, setCompleted] = React.useState(false)
	const handleChange = (e) => {
		setselectedEvent(events.find((event) => event.id === e.target.value))
		setSelectedRound(1)
	}
	const classes = useStyles()

	return (
		<Grid
			spacing={2}
			container
			direcion='column'
			justify='center'
			alignItems='center'
		>
			<Grid item>
				<Grid
					spacing={3}
					container
					direction='row'
					justify='center'
					alignItems='center'
				>
					<Grid item>
						<FormControl variant='outlined' className={classes.formControl}>
							<InputLabel>Event</InputLabel>
							<Select
								labelWidth={40}
								value={selectedEvent.id}
								onChange={handleChange}
							>
								{events.map((event) => (
									<MenuItem key={event.id} value={event.id}>
										{activityKey[event.id]}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item>
						<FormControl
							variant='outlined'
							className={classes.roundFormControl}
						>
							<InputLabel>Round</InputLabel>
							<Select
								labelWidth={40}
								value={selectedRound}
								onChange={(e) => setSelectedRound(e.target.value)}
							>
								{selectedEvent.rounds.map((round, index) => (
									<MenuItem key={index} value={index + 1}>
										{index + 1}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item>
						<Button
							disabled={!completed}
							color='primary'
							variant='outlined'
							size='large'
						>
							Save
						</Button>
					</Grid>
				</Grid>
			</Grid>
			<Grid item>
				<EventManager
					wcif={localWcif}
					setWcif={setLocalWcif}
					event={selectedEvent}
					round={selectedRound}
					setCompleted={setCompleted}
				/>
			</Grid>
		</Grid>
	)
}

import React, { useState, useEffect } from 'react'
import { getExtensionData } from '../../../logic/wcif'
import { getCurrentEvents } from '../ProjectorLogic'
import { flattenActivities } from '../../Competition/Overview/OverviewLogic'
import {
	Typography,
	Divider,
	Grid,
	makeStyles,
	List,
	ListItem,
	ListItemText,
	ListSubheader,
	Paper,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	title: {
		fontSize: '6vh',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
	},
	list: {
		backgroundColor: theme.palette.background.paper,
	},
}))

export default function AgendaScreen({ wcif }) {
	const [delays, setDelays] = useState([])
	useEffect(() => {
		const venues = wcif.schedule.venues
		let delays = []
		for (const venue of venues) {
			for (const room of venue.rooms) {
				delays.push(
					parseInt(getExtensionData('ScheduleConfig', room).delay)
				)
			}
		}
		setDelays(delays)
	}, [wcif])
	const [currentEvents, setCurrentEvents] = useState([])
	useEffect(() => {
		setCurrentEvents(
			getCurrentEvents(flattenActivities(wcif.schedule), delays)
		)
	}, [delays, wcif.schedule])
	const classes = useStyles()
	return (
		<>
			<Paper className={classes.paper} square elevation={24}>
				<List
					className={classes.list}
					subheader={
						<ListSubheader>
							<Typography
								align='center'
								className={classes.title}
							>
								Happening Now!
							</Typography>
						</ListSubheader>
					}
				>
					{currentEvents &&
						currentEvents.map((event) => (
							<>
								<ListItem
									style={{
										backgroundColor: event.room.color,
									}}
									alignItems='center'
								>
									<ListItemText
										primary={event.name}
										secondary='Jan 9, 2014'
									/>
								</ListItem>
								<Divider />
							</>
						))}
				</List>
			</Paper>
		</>
	)
}

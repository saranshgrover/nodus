import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CubingIcon from 'components/common/CubingIcon'
import { parseActivityCode } from 'logic/activity'
import moment from 'moment-timezone'
import React, { useEffect } from 'react'
import { Activity, ChildActivity } from '../../generated/graphql'
import useCompetition from '../../hooks/useCompetition'

const useStyles = makeStyles((theme) => ({
	list: {
		backgroundColor: theme.palette.background.paper,
	},
}))

const isHappeningNow = (event: Activity | ChildActivity, minutes: number) => {
	const now = moment()
	const startTime = moment(event.startTime)
	const endTime = moment(event.endTime)

	if (now.isBetween(startTime, endTime)) {
		return { bool: true, message: `Ends ${now.to(endTime)}` }
	} else if (
		Math.abs(now.diff(startTime, 'minute')) < minutes &&
		now.isBefore(endTime)
	) {
		return { bool: true, message: `Starting ${now.to(startTime)}` }
	} else return { bool: false, message: '' }
}

export default function UpcomingEvents() {
	const classes = useStyles()
	const competition = useCompetition()
	useEffect(() => {
		competition.startPolling(30000)
		return () => competition.stopPolling()
	}, [])
	let transformedActs: (
		| (Activity & { message: String })
		| (ChildActivity & { message: String })
	)[] = []
	competition.activities!.forEach((round) => {
		if (!round.ongoing) {
			let data = isHappeningNow(round, 60)
			if (data.bool) {
				let newRound: (Activity | ChildActivity) & { message: String } = {
					...round,
					message: data.message,
				}
				transformedActs.push(newRound)
			}
		}
	})
	const ongoingActivities = competition.activities!.filter(
		// @ts-ignore
		(activity) => activity.ongoing
	)
	const upcomingActivities = transformedActs
	return (
		<>
			{transformedActs.length > 0 || ongoingActivities.length > 0 ? (
				<>
					<List className={classes.list}>
						{ongoingActivities.length > 0 && (
							<>
								<Typography variant='h5'>Ongoing Events</Typography>
								{ongoingActivities.map((round, index) => (
									<React.Fragment key={round.id}>
										<ListItem>
											<ListItemAvatar>
												<CubingIcon
													eventId={
														parseActivityCode(round.activityCode).eventId
													}
												/>
											</ListItemAvatar>
											<Typography variant='h5'>{round.name}</Typography>
										</ListItem>
										{index < transformedActs.length - 1 && <Divider />}
									</React.Fragment>
								))}
							</>
						)}
						{upcomingActivities.length > 0 && (
							<>
								<Typography variant='h5'>Upcoming Events</Typography>
								{upcomingActivities.map((round, index) => (
									<React.Fragment key={round.id}>
										<ListItem>
											<ListItemAvatar>
												<CubingIcon
													eventId={
														parseActivityCode(round.activityCode).eventId
													}
												/>
											</ListItemAvatar>
											<Typography variant='h5'>{round.name}</Typography>
										</ListItem>
										<ListItem>
											<Typography>{round.message}</Typography>
										</ListItem>
										{index < upcomingActivities.length - 1 && <Divider />}
									</React.Fragment>
								))}
							</>
						)}
					</List>
				</>
			) : (
				<></>
			)}
		</>
	)
}

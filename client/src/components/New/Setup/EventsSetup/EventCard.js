import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import CubingIcon from '../../../common/CubingIcon'
import EditRoundInformation from './EditRoundInformation'
import { activityKey } from '../../../Competition/Overview/OverviewLogic'
import { TextField, Tooltip, IconButton } from '@material-ui/core'
import {
	buildDefaultRound,
	getEventFromActivity,
	parseCutoff,
	parseAdvancementCondition,
} from '../../../logic/event'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import EditIcon from '@material-ui/icons/Edit'

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100%',
		position: 'relative',
	},
	input: {
		minWidth: '80%',
	},
}))

export default function ScheduleCard({ event, editable }) {
	const [localEvent, setLocalEvent] = useState(event)
	const [isEditing, setIsEditing] = useState(false)
	const addRounds = (e) => {
		setLocalEvent({
			...localEvent,
			rounds: [...localEvent.rounds, buildDefaultRound(localEvent)],
		})
	}
	const classes = useStyles()
	const handleRoundEdit = (newRound) => {
		setLocalEvent({
			...localEvent,
			rounds: localEvent.rounds.map((round) =>
				round.id === newRound.id ? newRound : round
			),
		})
		setIsEditing(false)
	}
	return (
		<Card className={classes.root}>
			<CardHeader
				avatar={<CubingIcon eventId={localEvent.id} />}
				title={activityKey[localEvent.id]}
				action={
					editable && (
						<Tooltip title='Add Round'>
							<IconButton>
								<AddCircleIcon />
							</IconButton>
						</Tooltip>
					)
				}
			/>
			<CardContent>
				<Grid container spacing={2}>
					{localEvent.rounds.map((round, index) => (
						<Grid key={round.id} item xs={12}>
							{isEditing === round.id && (
								<EditRoundInformation
									round={round}
									onComplete={handleRoundEdit}
								/>
							)}
							<Grid container direction='column'>
								<Grid item container alignItems='center' alignContent='center'>
									<Grid item>
										<Typography variant='body2'>
											{`Round ${index + 1}`}
										</Typography>
									</Grid>
									{editable && (
										<Grid item>
											<Tooltip title='Edit Round'>
												<IconButton
													size='small'
													onClick={() => setIsEditing(round.id)}
												>
													<EditIcon />
												</IconButton>
											</Tooltip>
										</Grid>
									)}
									{editable && index === localEvent.rounds.length - 1 && (
										<Grid item>
											<Tooltip title='Remove Round'>
												<IconButton size='small'>
													<HighlightOffIcon />
												</IconButton>
											</Tooltip>
										</Grid>
									)}
								</Grid>
								<Grid item>
									<TextField
										className={classes.input}
										readOnly
										label='Cutoff'
										value={parseCutoff(round.cutoff)}
									/>
								</Grid>
								{index !== localEvent.rounds.length - 1 && (
									<Grid item>
										<TextField
											className={classes.input}
											readOnly
											label='Advancement'
											value={parseAdvancementCondition(
												round.advancementCondition
											)}
										/>
									</Grid>
								)}
							</Grid>
						</Grid>
					))}
				</Grid>
			</CardContent>
		</Card>
	)
}

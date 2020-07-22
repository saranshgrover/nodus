import { Grid, IconButton, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { activityKey } from '../Competition/Overview/OverviewLogic'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	icon: {
		fontSize: 20,
		padding: theme.spacing(1),
		'&:hover': {
			opacity: 0.7,
			color: theme.palette.competitionPrimary.main,
		},
	},
	iconSelect: {
		fontSize: 20,
		padding: theme.spacing(1),
		color: theme.palette.competitionPrimary.main,
		'&:hover': {
			opacity: 0.7,
		},
	},
}))

export default function EventList({
	selected = [],
	onClick,
	justify,
	events,
	alignment = 'row',
	size = 2,
	showName = false,
}) {
	const classes = useStyles()
	return (
		<div className={classes.root}>
			<Grid spacing={4} container direction={alignment} justify={justify}>
				{events.map((event) => (
					<Grid item key={event}>
						<IconButton variant='inherit' onClick={() => onClick(event)}>
							<span
								className={
									(!selected.includes(event)
										? classes.iconSelect
										: classes.icon) + ` cubing-icon event-${event}`
								}
							/>
						</IconButton>
						{showName && (
							<Grid item>
								<Typography align='center'>{activityKey[event]}</Typography>
							</Grid>
						)}
					</Grid>
				))}
			</Grid>
		</div>
	)
}

import { Grid, Typography } from '@material-ui/core'
import ButtonBase from '@material-ui/core/ButtonBase'
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
	button = false,
	spacing = 4
}) {
	const classes = useStyles()
	return (
		<div className={classes.root}>
			<Grid spacing={spacing} container direction={alignment} justify={justify}>
				{events.map((event) => (
					<Grid item key={event}>
						<Grid container direction='column' justify='center' alignItems='center'>
							<Grid item>
								<ButtonBase disableRipple={button} variant='inherit' onClick={() => onClick(event)}>
									<span
										className={
											(!selected.includes(event)
												? classes.iconSelect
												: classes.icon) + ` cubing-icon event-${event}`
										}
									/>
								</ButtonBase>
							</Grid>
							{showName && (
								<Grid item>
									<Typography align='center'>{activityKey[event]}</Typography>
								</Grid>
							)}
						</Grid>
					</Grid>
				))}
			</Grid>
		</div>
	)
}

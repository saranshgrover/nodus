import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import RoundManager from './RoundManager'

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%'
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		flexBasis: '33.33%',
		flexShrink: 0
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary
	}
}))

export default function EventManager({
	wcif,
	setWcif,
	event,
	round,
	setCompleted
}) {
	const roundInfo = event.rounds[round - 1]
	console.log(roundInfo)
	return (
		<Grid
			spacing={3}
			container
			direction='column'
			alignItems='center'
			justify='center'
		>
			<Grid item key={round.id}>
				<Paper>
					<RoundManager
						wcif={wcif}
						setWcif={setWcif}
						event={event}
						round={{
							...roundInfo,
							number: round
						}}
						setCompleted={setCompleted}
					/>
				</Paper>
			</Grid>
		</Grid>
	)
}

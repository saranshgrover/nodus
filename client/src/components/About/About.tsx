import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid'
import React from 'react'

const useStyles = makeStyles((theme) => ({
	box: {
		borderRadius: '25px',
		margin: 'auto',
		height: '80%',
		width: '100%',
		padding: theme.spacing(2),
	},
	icon: {
		fontSize: '4vmax',
	},
	grid: {
		padding: theme.spacing(3),
	},
	body: {
		margin: theme.spacing(3),
	},
}))
export default function About() {
	const classes = useStyles()
	return (
		<>
			<Box className={classes.box} bgcolor='background.paper'>
				<Grid
					container
					className={classes.grid}
					direction='column'
					alignItems='center'
					spacing={1}>
					<Grid item>
						<FlipCameraAndroidIcon className={classes.icon} />
					</Grid>
					<Grid item>
						<Typography color='textPrimary' variant='h2'>{`Nodus`}</Typography>
					</Grid>
					<Grid item>
						<Typography color='textSecondary' variant='subtitle2'>
							{`Live WCA Competition Feedback Software`}
						</Typography>
					</Grid>
				</Grid>
				<Divider />
				<Typography
					align='center'
					className={classes.body}
					color='textPrimary'
					variant='h6'>
					{`Nodus is an open source 3rd party WCA Application currently in beta designed to aid WCA Competition Organizers, Delegates, Competitors & Spectators during the event, real-time. It will support features like `}
				</Typography>
				<Typography
					className={classes.body}
					align='left'
					variant='h6'>{` ✔️ Group Assignments and Easy Visibility`}</Typography>
				<Typography
					className={classes.body}
					align='left'
					variant='h6'>{` ✔️ Live Automated Projector`}</Typography>
				<Typography
					className={classes.body}
					align='left'
					variant='h6'>{` ✔️ Push notifications via SMS & Telegram `}</Typography>
				<Typography
					className={classes.body}
					align='left'
					variant='h6'>{` ✔️ Incident Reporting and Management`}</Typography>
				<Typography
					className={classes.body}
					align='left'
					variant='h6'>{` ✔️ E-Certificates `}</Typography>
				<Typography
					className={classes.body}
					align='left'
					variant='h6'>{` and much more!`}</Typography>
				<Typography className={classes.body} variant='h6'>
					{`If you're an organizer/delegate and would like to use Nodus, or you have any feedback/bugs with the beta,`}{' '}
					<Link href='mailto:saransh.grover@stonybrook.edu'>
						{`shoot me an email`}
					</Link>
				</Typography>
			</Box>
		</>
	)
}

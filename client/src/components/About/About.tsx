import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import useUser from '../../hooks/useUser'
import SignIn from '../Authentication/SignIn'

const useStyles = makeStyles((theme) => ({
	paper: {
		background: 'transparent',
		boxShadow: 'none',
		border: '1px solid',
		margin: 'auto',
		marginRight: theme.spacing(2),
	},
	root: {
		backgroundImage: `url(${process.env.PUBLIC_URL}/about-bg.png)`,
		backgroundColor: theme.palette.background.default,
		backgroundBlendMode: 'color',
		backgroundRepeat: 'no-repeat',
		[theme.breakpoints.down('md')]: {
			flexWrap: 'wrap',
		},
	},
	box: {
		borderRadius: '25px',
		margin: 'auto',
		height: '80%',
		background: 'transparent',
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
	const { isSignedIn } = useUser()
	return (
		<>
			<Grid className={classes.root} container direction='row' wrap='nowrap'>
				<Box className={classes.box}>
					<Grid
						container
						className={classes.grid}
						direction='column'
						alignItems='center'
						spacing={1}>
						<Grid item>
							<img
								style={{ width: '128px', height: '128px' }}
								src={`${process.env.PUBLIC_URL}/nodus-orange.png`}
							/>
						</Grid>
						<Grid item>
							<Typography
								color='textPrimary'
								variant='h2'>{`Nodus`}</Typography>
						</Grid>
						<Grid item>
							<Typography color='textSecondary' variant='subtitle2'>
								{`Live Competition Software`}
							</Typography>
						</Grid>
					</Grid>
					<Divider />
					<Typography
						align='center'
						className={classes.body}
						color='textPrimary'
						variant='h6'>
						{`Nodus gives competitors live feedback and notifications during competitions. In addition, it lets organizers stay on top of schedule, keep in touch with staff and run a successful event. `}
					</Typography>
					<Typography
						className={classes.body}
						align='center'
						variant='h6'>{` ✔️ Group Assignments and Easy Visibility`}</Typography>
					<Typography
						className={classes.body}
						align='center'
						variant='h6'>{` ✔️ Live Automated Projector`}</Typography>
					<Typography
						className={classes.body}
						align='center'
						variant='h6'>{` ✔️ Push notifications`}</Typography>
					<Typography
						className={classes.body}
						align='center'
						variant='h6'>{` ✔️ Incident Reporting and Management`}</Typography>

					<Typography className={classes.body} variant='h6'>
						{`If you're a WCA organizer/delegate and would like to use Nodus, or you have any feedback/bugs with the beta,`}{' '}
						<Link href='mailto:contact@saranshgrover.com'>
							{`shoot me an email`}
						</Link>
					</Typography>
				</Box>
				{!isSignedIn() && <SignIn showLogo={false} parentClasses={classes} />}
			</Grid>
		</>
	)
}

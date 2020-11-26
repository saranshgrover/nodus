import { Theme } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import classNames from 'classnames'
import WCAButton from 'components/common/WCAButton'
import { useAdminSynchronizeMutation } from 'generated/graphql'
import useCompetition from 'hooks/useCompetition'
import moment from 'moment'
import React, { ReactElement, useState } from 'react'

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		marginTop: '10vmin',
	},
	wrapper: {
		margin: theme.spacing(1),
		position: 'relative',
	},
	buttonSuccess: {
		backgroundColor: theme.palette.secondary[600],
		'&:hover': {
			backgroundColor: theme.palette.secondary[700],
		},
	},
	buttonProgress: {
		color: theme.palette.secondary[500],
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},
}))

export default function AdminSyncrhonize(): ReactElement {
	const { synchronizedAt, competitionId } = useCompetition()
	const [syncTime, setSyncTime] = useState(synchronizedAt)
	const [sync, { loading }] = useAdminSynchronizeMutation()
	const [success, setSuccess] = useState(false)
	const classes = useStyles()

	async function onClick() {
		const res = await sync({ variables: { competitionId } })
		setSuccess(true)
		setSyncTime(res.data?.synchronize?.synchronizedAt ?? 0)
	}

	return (
		<Paper className={classes.root}>
			<Grid container direction='column' justify='center' alignItems='center'>
				<Grid item>
					<Typography variant='h5'>{`Last Synchronized: ${moment(
						syncTime
					).format('LLL')}`}</Typography>
				</Grid>
				<Grid item>
					<div className={classes.wrapper}>
						<WCAButton
							variant='contained'
							color='primary'
							className={classNames({
								[classes.buttonSuccess]: success,
							})}
							disabled={loading}
							onClick={onClick}
							text={`Synchronize with WCA`}
						/>
						{loading && (
							<CircularProgress size={24} className={classes.buttonProgress} />
						)}
					</div>
				</Grid>
				<Grid item style={{ marginTop: '10vmin' }}>
					<Typography variant='h6'>What is Synchronization?</Typography>
				</Grid>
				<Grid item>
					<Typography variant='body1'>
						{`In order for Nodus to communicate with WCA - you need to synchronize the two. Any changes made on the WCA Site or WCA Compliant applications like WCA Live or Groupifier will not be reflected on Nodus unless you synchronize. This also applies to any event/scheduling changes. Make sure you synchronize before you begin the competition.`}
					</Typography>
				</Grid>
			</Grid>
		</Paper>
	)
}

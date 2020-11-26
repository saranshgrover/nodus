import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Delete from '@material-ui/icons/Delete'
import ConfirmationDialog from 'components/common/ConfirmationDialog'
import AskForPermission from 'components/PushNotification/AskForPermission'
import { SERVER_URI } from 'config'
import usePushNotifications from 'hooks/usePushNotifications'
import useUser from 'hooks/useUser'
import { arrayToObject } from 'logic/tools'
import React, { useState } from 'react'
import { useSettingsUpdateUserMutation } from '../../generated/graphql'
import WCAButton from '../common/WCAButton'

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(10),
		padding: theme.spacing(2),
		margin: 'auto',
		width: '50vw',
		minHeight: '20vh',
	},
	input: {
		width: '30vw',
		margin: theme.spacing(2),
	},
	title: {
		margin: theme.spacing(4),
	},
	button: {
		margin: theme.spacing(2),
	},
}))
export default function UserSettings() {
	const classes = useStyles()
	const { info, refetch } = useUser()
	const { pushNotificationSupported } = usePushNotifications()
	const handleUserChange = ({
		target: { name, value },
	}: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
		setUser({ ...user, [name]: { ...user[name], value } })
	const [confirm, setConfirm] = useState(false)
	const [pushNotifications, setPushNotifications] = useState(false)
	const [user, setUser] = useState({
		name: {
			value: info!.name,
			error: '',
			label: 'Full Name',
			helperText: '',
		},
		username: {
			value: info!.username,
			error: '',
			label: 'Your Username',
			helperText:
				'Must be at least 6 characters long. Must have at least 1 letter and 1 number.',
		},
		email: {
			value: info!.email,
			error: '',
			label: 'Your Email Address',
			helperText: '',
		},
	})
	const connections = React.useRef(
		arrayToObject(info!.connections, 'connectionType')
	)
	console.log(connections)
	const [updateUser, { loading, error }] = useSettingsUpdateUserMutation()
	const handleSubmit = () => {
		updateUser({
			variables: {
				data: {
					_id: info!._id,
					newName: user.name.value,
					newEmail: user.email.value,
					newUsername: user.username.value,
				},
			},
		})
		refetch()
	}

	const confirmCallback = (done: boolean) => {
		if (done) {
			console.log('done')
		}
		setConfirm(false)
	}

	return (
		<>
			<AskForPermission
				open={pushNotifications}
				setOpen={setPushNotifications}
				onComplete={() => refetch()}
			/>
			{confirm && (
				<ConfirmationDialog
					callback={confirmCallback}
					dialogContentText={`Are you sure you want to stop notifications from this device?`}
				/>
			)}
			<Paper square className={classes.paper}>
				<Grid
					container
					direction='column'
					alignItems='center'
					alignContent='center'
					justify='center'
					spacing={2}>
					<FormControl error={Boolean(error)}>
						<Grid item>
							<Typography
								className={classes.title}
								color='primary'
								align='center'
								variant='h5'>
								User Settings
							</Typography>
						</Grid>
						{Object.keys(user).map((key) => (
							<Grid item key={key}>
								<TextField
									error={user[key].error !== ''}
									fullWidth
									className={classes.input}
									id='outlined-basic'
									label={user[key].label}
									name={key}
									value={user[key].value}
									helperText={
										user[key].error !== ''
											? user[key].error
											: user[key].helperText
									}
									type={key === 'email' ? key : 'text'}
									onChange={handleUserChange}
								/>
							</Grid>
						))}
						{!loading && (
							<>
								<Grid item>
									<Button
										className={classes.button}
										disabled={loading}
										variant='outlined'
										color='primary'
										onClick={handleSubmit}>
										Save
									</Button>
								</Grid>
							</>
						)}
						{loading && (
							<Grid item>
								<CircularProgress size={24} />
							</Grid>
						)}
						<FormHelperText>{error ? error.message : ''}</FormHelperText>
					</FormControl>
				</Grid>
			</Paper>
			<Paper square className={classes.paper}>
				<Grid
					container
					direction='column'
					justify='center'
					alignContent='center'
					alignItems='center'>
					<Grid item>
						<Typography
							align='center'
							className={classes.title}
							color='primary'
							variant='h5'>
							Connections
						</Typography>
					</Grid>
					<Grid item>
						<WCAButton
							variant='contained'
							color={connections.current['WCA'] ? 'secondary' : 'primary'}
							text={
								connections.current['WCA']
									? `${
											connections.current['WCA'].content.wcaId ??
											connections.current['WCA'].content.id
									  }`
									: 'Connect With WCA'
							}
							onClick={() => {
								if (!connections.current['WCA']) {
									window.location.href = `${SERVER_URI}/auth/connect/wca`
								}
							}}
						/>
					</Grid>
				</Grid>
			</Paper>
			<Paper square className={classes.paper}>
				<Grid
					container
					direction='column'
					justify='center'
					alignContent='center'>
					<Grid item>
						<Typography
							align='center'
							className={classes.title}
							color='primary'
							variant='h5'>
							Notifications
						</Typography>
					</Grid>
					<List>
						{pushNotificationSupported && (
							<Button
								variant='outlined'
								onClick={() => setPushNotifications(true)}>
								{'Enable push notifications for this device'}
							</Button>
						)}
						{info!.subscriptions.map((subscription, index) => (
							<Grid item key={`sub-${index}`}>
								<ListItem>
									<ListItemText
										primary={subscription.device}
										secondary={subscription.browser}
									/>
									<ListItemSecondaryAction>
										<IconButton onClick={() => setConfirm(true)}>
											<Delete />
										</IconButton>
									</ListItemSecondaryAction>
								</ListItem>
							</Grid>
						))}
					</List>
				</Grid>
			</Paper>
		</>
	)
}

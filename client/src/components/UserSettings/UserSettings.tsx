import { Button, FormControl, FormHelperText, Grid } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import React, { useContext, useState } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { useSettingsUpdateUserMutation } from '../../generated/graphql'
import WCAButton from '../common/WCAButton'

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(10),
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
	const { info } = useContext(UserContext)
	const handleUserChange = ({ target: { name, value } }: any) =>
		setUser({ ...user, [name]: { ...user[name], value } })
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
	}
	return (
		<>
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
					alignContent='center'>
					<Grid item>
						<Typography className={classes.title} color='primary' variant='h5'>
							Connections
						</Typography>
					</Grid>
					{info!.connections.map((connection) => (
						<Grid item key={connection.connectionType}>
							<WCAButton
								variant='contained'
								color='primary'
								onClick={() => {}}
								text={connection.content.id}
							/>
						</Grid>
					))}
				</Grid>
			</Paper>
		</>
	)
}

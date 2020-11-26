import { Button, Grid } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import React, { useState } from 'react'
import { SERVER_URI } from '../../config'
import WCAButton from '../common/WCAButton'

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(10),
		margin: '4em',
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
export default function Register() {
	const classes = useStyles()
	const [user, setUser] = useState({
		name: { value: '', helperText: '', label: 'Name', error: '' },
		email: { value: '', helperText: '', label: 'Email Address', error: '' },
		password: {
			value: '',
			helperText:
				'Minimum 8 characters long. At least one number and one symbol',
			label: 'Password',
			error: '',
		},
		username: {
			value: '',
			helperText: 'Username can not contain any symbols',
			label: 'Username',
			error: '',
		},
	})
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(null)

	const handleSubmit = async (event) => {
		event.preventDefault()
		try {
			const resp = await fetch(`${SERVER_URI}/auth/local`, {
				method: 'POST',
				credentials: 'include',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: user.email.value,
					password: user.password.value,
					name: user.name.value,
					username: user.username.value,
				}),
			})
			// Get data
			const data = await resp.json()
			window.location.href = data.redirect // Move client to server redirect
		} catch (err) {
			setError('Error registering')
		}
	}
	const handleUserChange = ({ target: { name, value, ...other } }) =>
		setUser({ ...user, [name]: { ...user[name], value } })
	return (
		<Paper square className={classes.paper}>
			<form>
				<Grid
					container
					direction='column'
					alignItems='center'
					justify='center'
					spacing={2}>
					<Grid item>
						<Typography className={classes.title} color='primary' variant='h5'>
							Nodus Register
						</Typography>
					</Grid>
					<Grid item>
						<WCAButton
							text={'Register With WCA'}
							onClick={() => {
								window.location.href = `${SERVER_URI}/auth/wca`
							}}
							variant='contained'
							color='primary'
						/>
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
								type={key === 'password' && key}
								onChange={handleUserChange}
							/>
						</Grid>
					))}
					{error && (
						<Grid item>
							<Typography variant='body1' color='error'>
								{error}
							</Typography>
						</Grid>
					)}
					{!loading && (
						<>
							<Grid item>
								<Button
									className={classes.button}
									disabled={loading}
									varaint='outlined'
									color='primary'
									onClick={handleSubmit}>
									Register
								</Button>
							</Grid>
						</>
					)}
					{loading && (
						<Grid item>
							<CircularProgress size={24} />
						</Grid>
					)}
				</Grid>
			</form>
		</Paper>
	)
}

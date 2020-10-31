import { Button, Grid } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
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
export default function Login({ showLogo = true, parentClasses = {} }) {
	const classes = useStyles()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(null)
	const history = useHistory()

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
				body: JSON.stringify({ email, password }),
			})
			// Get data
			const data = await resp.json()
			window.location.href = data.redirect // Move client to server redirect
		} catch (err) {
			setError('Error logging in. Please try again.')
		}
	}
	return (
		<>
			<Paper square className={parentClasses.paper ?? classes.paper}>
				<form>
					<Grid
						container
						direction='column'
						alignItems='center'
						justify='center'>
						<Grid
							item
							container
							direction='column'
							justify='center'
							alignItems='center'>
							{showLogo &&
								<Grid item>
									<img
										style={{ width: '64px', height: '64px' }}
										src={`${process.env.PUBLIC_URL}/nodus-orange.png`}
									/>
								</Grid>}
							<Grid item>
								<Typography
									className={classes.title}
									color='primary'
									variant='h5'>
									Login
								</Typography>
							</Grid>
						</Grid>
						<Grid item>
							<TextField
								fullWidth
								className={classes.input}
								id='outlined-basic'
								label='Email'
								value={email}
								name='email'
								onChange={(e) => setEmail(e.target.value)}
							/>
						</Grid>
						<Grid item>
							<TextField
								className={classes.input}
								id='outlined-password-input'
								type='password'
								label='Password'
								value={password}
								name='password'
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Grid>
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
										Login
									</Button>
								</Grid>
								<Grid item>
									<WCAButton
										text={'Login With WCA'}
										onClick={() => {
											window.location.href = `${SERVER_URI}/auth/wca`
										}}
										variant='contained'
										color='primary'
									/>
								</Grid>
								<Grid item>
									<Button
										className={classes.button}
										disabled={loading}
										varaint='text'
										color='primary'
										onClick={() => history.push('/register')}>
										Don't have an account yet? Register
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
		</>
	)
}

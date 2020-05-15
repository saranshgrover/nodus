import React, { useState, useContext } from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Button } from '@material-ui/core'
import WCAButton from '../common/WCAButton'

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(10),
		margin: 'auto',
		width: '50vw',
		height: '70vh',
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
export default function Login({ history }) {
	const classes = useStyles()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(null)

	const handleSubmit = (event) => {
		event.preventDefault()
	}
	return (
		<>
			<Paper square className={classes.paper}>
				<form>
					<Grid
						container
						direction='column'
						alignItems='center'
						justify='center'
					>
						<Grid item>
							<Typography
								className={classes.title}
								color='primary'
								variant='h5'
							>
								Nodus Login
							</Typography>
						</Grid>
						<Grid item>
							<TextField
								fullWidth
								className={classes.input}
								id='outlined-basic'
								label='Email'
								value={email}
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
										onClick={handleSubmit}
									>
										Login
									</Button>
								</Grid>
								<Grid item>
									<WCAButton
										text={'Login With WCA'}
										onClick={() => {
											window.location.href = 'http://localhost:3000/auth/wca'
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
										onClick={() => history.push('/register')}
									>
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

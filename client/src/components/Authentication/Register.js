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
	const [loading, setLoading] = useState(null)

	const handleSubmit = (event) => {
		// TODO Implement Local Registering
		event.preventDefault()
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
					spacing={2}
				>
					<Grid item>
						<Typography className={classes.title} color='primary' variant='h5'>
							Nodus Register
						</Typography>
					</Grid>
					<Grid item>
						<WCAButton
							text={'Register With WCA'}
							onClick={() => {
								window.location.href = 'http://localhost:3000/auth/wca'
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

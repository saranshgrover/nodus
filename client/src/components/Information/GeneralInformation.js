import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Grid'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import Error from '../common/Error'
import { compDatesToString } from '../../logic/tools'
import { activityKey } from '../../logic/activity'
import moment from 'moment-timezone'

const GET_COMPETITION_INFORMATION = gql`
	query getWcifById($_id: String!) {
		getWcifById(_id: $_id) {
			_id
			name
			locationName
			registrationOpen
			registrationClose
			schedule {
				_id
				startDate
				numberOfDays
			}
			events {
				_id
				id
			}
		}
	}
`

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(2, 3),
	},
	paper: {
		margin: theme.spacing(2),
		padding: theme.spacing(3),
		backgroundColor: theme.palette.background.paper,
	},
	centered: {
		textAlign: 'center',
	},
}))

const getRegistrationStatus = (
	userConnectionInfo,
	registrationOpen,
	registrationClose
) => {
	console.log(userConnectionInfo)
	if (userConnectionInfo) {
		// Reegistered for the event
		return (
			<Typography>You are registered to compete in this competition</Typography>
		)
	} else {
		// Else get timing of registration
		return getRegistrationTiming(registrationOpen, registrationClose)
	}
}

const getRegistrationTiming = (registrationOpen, registrationClose) => {
	let open = moment(registrationOpen)
	let close = moment(registrationClose)
	let now = moment()
	if (now.isBefore(open)) {
		return (
			<Typography>
				Registration hasn't started yet. Check back in
				{now.to(open, true)}.
			</Typography>
		)
	} else if (now.isBefore(close)) {
		return (
			<Typography>
				Good news! Registration is open for another {now.to(close, true)}.
			</Typography>
		)
	} else {
		return <Typography>Registration is closed for this competition.</Typography>
	}
}

export default function GeneralInformation({ _id, userConnectionInfo }) {
	const { loading, error, data } = useQuery(GET_COMPETITION_INFORMATION, {
		variables: { _id }, // Gets competitors where world ranking is 50 or lower
	})
	const classes = useStyles()
	if (loading) return <LinearProgress />
	if (error) return <Error message={error.toString()} />
	const compData = data.getWcifById
	const events = compData.events
	return (
		<Paper className={classes.paper}>
			<Typography className={classes.centered} variant='h4'>
				Welcome to {compData.name}
			</Typography>
			<Typography className={classes.centered}>
				{compDatesToString(
					compData.schedule.startDate,
					compData.schedule.numberOfDays
				)}
				, {compData.locationName}
			</Typography>
			<Container>
				<Typography variant='h6'>Registration Status:</Typography>
				{}
				{getRegistrationStatus(
					userConnectionInfo,
					compData.registrationOpen,
					compData.registrationClose
				)}
				<Typography variant='h6'>Events:</Typography>
				<Typography>
					{events.map((event, index) => {
						if (index < events.length - 1) return `${activityKey[event.id]}, `
						else return activityKey[event.id]
					})}
				</Typography>
			</Container>
		</Paper>
	)
}

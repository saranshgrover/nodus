import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { ICompetitionContext } from 'contexts/CompetitionContext'
import moment from 'moment-timezone'
import React from 'react'
import { CompetitionInformationQuery } from '../../generated/graphql'
import { compDatesToString } from '../../logic/tools'
import EventList from '../common/EventList'

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
	userConnectionInfo: ICompetitionContext['userConnectionInfo'],
	competitionId: string,
	registrationOpen: string,
	registrationClose: string
) => {
	if (userConnectionInfo) {
		// Reegistered for the event
		return (
			<Typography>You are registered to compete in this competition</Typography>
		)
	} else {
		// Else get timing of registration
		return getRegistrationTiming(
			registrationOpen,
			registrationClose,
			competitionId
		)
	}
}

const registrationLinkBuilder = (competitionId: string) => {
	return `https://www.worldcubeassociation.org/competitions/${competitionId}/register`
}

const getRegistrationTiming = (
	registrationOpen: string,
	registrationClose: string,
	competitionId: string
) => {
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
			<>
				<Typography>
					Good news! Registration is open for another {now.to(close, true)}.
				</Typography>
				<Button
					variant='outlined'
					color='primary'
					href={registrationLinkBuilder(competitionId)}>
					Register Here
				</Button>
			</>
		)
	} else {
		return <Typography>Registration is closed for this competition.</Typography>
	}
}

interface Props {
	wcif: CompetitionInformationQuery['getWcifByCompetitionId']
	userConnectionInfo: ICompetitionContext['userConnectionInfo']
	competitionId?: string
	showRegistration?: boolean
	showMessage?: boolean
}

export default function GeneralInformation({
	wcif,
	userConnectionInfo,
	competitionId = 'https://www.worldcubeassociation.org/competitions/SBUFall2019/register',
	showRegistration = false,
	showMessage = false,
}: Props) {
	const classes = useStyles()
	if (!wcif) return <></>
	const events = wcif.events
	const eventIds = events.map((event) => event.id)
	return (
		<Paper className={classes.paper}>
			<Typography className={classes.centered} variant='h4'>
				Welcome to {wcif.name}
			</Typography>
			<Typography className={classes.centered}>
				{compDatesToString(wcif.schedule.startDate, wcif.schedule.numberOfDays)}
				, {wcif.locationName}
			</Typography>
			<EventList
				showName={true}
				size={1}
				onClick={() => {}}
				justify='center'
				events={eventIds}
			/>
			{showRegistration && (
				<Container>
					<Typography variant='h6'>Registration Status:</Typography>
					{getRegistrationStatus(
						userConnectionInfo,
						competitionId,
						wcif.registrationOpen,
						wcif.registrationClose
					)}
				</Container>
			)}
			{showMessage && wcif.settings.message.length > 0 && (
				<Container>
					<Typography variant='h6'>Message from Organizer:</Typography>
					<Typography>{wcif.settings.message}</Typography>
				</Container>
			)}
		</Paper>
	)
}

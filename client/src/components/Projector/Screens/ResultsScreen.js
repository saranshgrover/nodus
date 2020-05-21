import React, { Fragment } from 'react'
import EventResults from '../../EventResults/EventResults'
import Typography from '@material-ui/core/Typography'
import { parseActivityCode, activityKey } from '../../../logic/activity'
export default function ResultsScreen({ currOpenRound }) {
	const { eventId, roundNumber } = parseActivityCode(currOpenRound.id)
	return (
		<Fragment>
			<Typography variant='h2' align='center' style={{ marginBottom: '2vh' }}>
				{`${activityKey[eventId]} Round ${roundNumber}`}{' '}
			</Typography>
			<EventResults roundId={currOpenRound.id} />
		</Fragment>
	)
}

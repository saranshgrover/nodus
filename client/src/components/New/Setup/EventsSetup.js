import React, { useState, useEffect } from 'react'
import StepActions from './StepActions'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { activityKey } from '../../Competition/Overview/OverviewLogic'
import LinearProgress from '@material-ui/core/LinearProgress'

const COMPETITION_EVENTS_QUERY = gql`
	query getWcifById($id: String!) {
		getWcifById(_id: $id) {
			events {
				id
				rounds {
					id
				}
				competitorLimit
				qualification {
					when
					type
					attemptResult
					_id
				}
			}
		}
	}
`

const UPDATE_COMPETITION_EVENTS_MUTATION = gql`
	mutation updateWcifEvents($id: String!, $updatedCompetitors: [EventsInput]!) {
		updateWcifEvents(_id: $id, updatedEvents: $updatedEvents) {
			id
			name
		}
	}
`

export default function EventsSetup({ id, onComplete, handleBack }) {
	const [localData, setLocalData] = useState(null)
	const query = useQuery(COMPETITION_EVENTS_QUERY, {
		variables: { id: id },
	})
	useEffect(() => {
		!query.loading &&
			!query.error &&
			setLocalData(query.data.getWcifById.events)
	}, [query.loading, query.error, query.data])

	const [updateWcifInfo, mutationOptions] = useMutation(
		UPDATE_COMPETITION_EVENTS_MUTATION
	)

	if (query.loading || !localData) return <LinearProgress />
	if (query.error) console.error(query.error)

	const handleComplete = () => {
		updateWcifInfo({ variables: { ...localData, id } }).then(() => onComplete())
	}

	const handleReset = () => {}
	return (
		<Grid container direction='column' justify='space-around'>
			<Grid
				container
				spacing={1}
				direction='column'
				justify='center'
				xs={12}
				alignItems='center'
				alignContent='center'
				wrap='nowrap'
			>
				{localData.map((event) => (
					<Grid item key={event.id}>
						<Grid container direction='row' spacing={3}>
							<Grid item>
								<span
									style={{ fontSize: '3vh' }}
									className={`cubing-icon event-${event.id}`}
								/>
							</Grid>
							<Grid item>
								<Typography variant='h6' color='initial'>
									{activityKey[event.id]}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				))}
			</Grid>
			<Grid item>
				<StepActions
					handleBack={handleBack}
					loading={mutationOptions.loading}
					handleComplete={handleComplete}
					handleReset={handleReset}
				/>
			</Grid>
		</Grid>
	)
}

import React, { useState, useEffect } from 'react'
import StepActions from '../StepActions'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import EventCard from './EventCard'

const COMPETITION_EVENTS_QUERY = gql`
	query getWcifById($id: String!) {
		getWcifById(_id: $id) {
			_id
			events {
				_id
				id
				rounds {
					_id
					id
					format
					advancementCondition {
						_id
						type
						level
					}
					timeLimit {
						_id
						centiseconds
						cumulativeRoundIds
					}
					cutoff {
						_id
						numberOfAttempts
						attemptResult
					}
					scrambleSetCount
				}
				competitorLimit
				qualification {
					_id
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
	mutation updateWcifEvents($id: String!, $events: [EventInput]!) {
		updateWcifEvents(_id: $id, events: $events) {
			_id
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
		updateWcifInfo({ variables: { id, events: localData } }).then(() =>
			onComplete()
		)
	}

	const handleReset = () => {}
	return (
		<Grid
			style={{ marginTop: '2vh' }}
			spacing={2}
			container
			direction='column'
			justify='space-around'
		>
			<Grid item>
				<Grid container spacing={2}>
					{localData
						.sort((a, b) => b.rounds.length - a.rounds.length)
						.map((event, index) => (
							<Grid key={index} item xs={12} sm={6} lg={4}>
								<EventCard event={event} editable={true} />
							</Grid>
						))}
				</Grid>
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

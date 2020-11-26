import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import React, { useEffect, useState } from 'react'
import {
	useSetupCompetitionEventsQuery,
	useUpdateWcifEventsMutation,
} from '../../../../generated/graphql'
import StepActions from '../StepActions'
import EventCard from './EventCard'

export default function EventsSetup({
	id: competitionId,
	onComplete,
	handleBack,
}: ISetupProps) {
	// this is annoying, i know.
	const [localData, setLocalData] = useState<
		Array<{
			__typename?: 'Event'
			_id: any
			id: string
			competitorLimit: number
			rounds: Array<{
				__typename?: 'Round'
				_id: any
				id: string
				format: string
				scrambleSetCount: number
				advancementCondition: {
					__typename?: 'AdvancementCondition'
					_id: any
					type: string
					level: Array<number>
				}
				timeLimit: Array<{
					__typename?: 'TimeLimit'
					_id: any
					centiseconds: number
					cumulativeRoundIds: Array<string>
				}>
				cutoff: {
					__typename?: 'Cutoff'
					_id: any
					numberOfAttempts: number
					attemptResult: Array<number>
				}
			}>
			qualification: {
				__typename?: 'Qualification'
				_id: any
				when: string
				type: string
				attemptResult: Array<number>
			}
		}>
	>()
	const query = useSetupCompetitionEventsQuery({ variables: { competitionId } })
	useEffect(() => {
		!query.loading &&
			!query.error &&
			query.data &&
			setLocalData(query.data.getWcifByCompetitionId!.events)
	}, [query.loading, query.error, query.data])

	const [updateWcifInfo, mutationOptions] = useUpdateWcifEventsMutation()

	if (query.loading || !localData) return <LinearProgress />
	if (query.error) console.error(query.error)

	const handleComplete = () => {
		updateWcifInfo({
			variables: { competitionId, events: localData },
		}).then(() => onComplete())
	}

	const handleReset = () => {}
	return (
		<Grid
			style={{ marginTop: '2vh' }}
			spacing={2}
			container
			direction='column'
			justify='space-around'>
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

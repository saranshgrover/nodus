import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import LinearProgress from '@material-ui/core/LinearProgress'
import Grid from '@material-ui/core/Grid'
import StepActions from './StepActions'
import CompetitionCalendar from './ManageSchedule/CompetitionCalendar'
import ScheduleTopForm from './ManageSchedule/ScheduleTopForm'
import moment from 'moment-timezone'
import { Typography } from '@material-ui/core'

const COMPETITION_SCHEDULE_QUERY = gql`
	query getWcifById($id: String!) {
		getWcifById(_id: $id) {
			_id
			schedule {
				_id
				startDate
				numberOfDays
				venues {
					_id
					id
					name
					timezone
					rooms {
						_id
						id
						name
						color
						activities {
							_id
							id
							name
							activityCode
							startTime
							endTime
							scrambleSetId
							childActivities {
								_id
								id
								name
								activityCode
								startTime
								endTime
								scrambleSetId
							}
						}
					}
				}
			}
		}
	}
`
const UPDATE_COMPETITION_SCHEDULE_MUTATION = gql`
	mutation updateWcifSchedule($id: String!, $schedule: ScheduleInput!) {
		updateWcifSchedule(_id: $id, schedule: $schedule) {
			id
		}
	}
`

export default function ScheduleSetup({
	id,
	handleReset,
	onComplete,
	handleBack,
}) {
	const [localData, setLocalData] = useState(null)
	const query = useQuery(COMPETITION_SCHEDULE_QUERY, {
		variables: { id: id },
	})
	useEffect(() => {
		!query.loading && !query.error && setLocalData(query.data.getWcifById)
		!query.loading && !query.error && console.table(query.data.getWcifById)
	}, [query.loading, query.error, query.data])

	const [updateWcifSchedule, mutationOptions] = useMutation(
		UPDATE_COMPETITION_SCHEDULE_MUTATION
	)

	const handleComplete = () => {
		updateWcifSchedule({
			variables: { id, schedule: localData.schedule },
		}).then(() => onComplete())
	}

	if (query.loading || !localData) return <LinearProgress />
	if (query.error) console.error(query.error)

	const handleDateChange = (e) => {
		setLocalData({
			...localData,
			schedule: {
				...localData.schedule,
				startDate: moment(e).format('YYYY-MM-DD'),
			},
		})
	}

	const handleNumberOfDays = (numberOfDays) => {
		if (isNaN(numberOfDays) || numberOfDays < 1) {
			return
		}
		setLocalData({
			...localData,
			schedule: { ...localData.schedule, numberOfDays },
		})
	}

	return (
		<Grid container direction='column' justify='space-between'>
			<Grid item>
				<Grid
					container
					direction='column'
					spacing={2}
					justify='center'
					xs={12}
					alignItems='center'
					alignContent='center'
					wrap='nowrap'
				>
					<ScheduleTopForm
						date={localData.schedule.startDate}
						handleDateChange={handleDateChange}
						numberOfDays={localData.schedule.numberOfDays}
						handleNumberOfDays={handleNumberOfDays}
					/>
				</Grid>
			</Grid>
			<Typography style={{ margin: '10px' }}>
				Note: The timezones are shown in the timezone of the competition:{' '}
				{localData.schedule.venues[0].timezone}
			</Typography>
			<Grid item>
				<CompetitionCalendar
					schedule={localData.schedule}
					updateData={setLocalData}
				/>
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

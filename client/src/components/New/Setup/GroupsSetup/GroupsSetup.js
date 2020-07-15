import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import LinearProgress from '@material-ui/core/LinearProgress'
import Grid from '@material-ui/core/Grid'
import ManageGroups from './ManageGroups'
import StepActions from '../StepActions'
const GET_WCIF_GROUPS_QUERY = gql`
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
					scrambleSetCount
					# results
				}
			}
			persons {
				name
				wcaId
				wcaUserId
				registrantId
				countryIso2
				gender
				_id
				registration {
					_id
					status
					eventIds
				}
				assignments {
					activityId
					assignmentCode
					stationNumber
					_id
				}
				personalBests {
					_id
					eventId
					best
					type
				}
			}
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

const UPDATE_COMPETITION_GROUPS_MUTATION = gql`
	mutation updateWcifCompetitors(
		$id: String!
		$updatedCompetitors: [PersonInput]!
	) {
		updateWcifCompetitors(
			_id: $id
			updatedCompetitors: $updatedCompetitors
		) {
			_id
			competitionId
			name
		}
	}
`

export default function GroupsSetup({
	id,
	onComplete,
	handleBack,
	handleReset,
}) {
	const [localData, setLocalData] = useState(null)
	const query = useQuery(GET_WCIF_GROUPS_QUERY, {
		variables: { id: id },
	})
	useEffect(() => {
		!query.loading && !query.error && setLocalData(query.data.getWcifById)
	}, [query.loading, query.error, query.data])

	const [updateWcifGroups, mutationOptions] = useMutation(
		UPDATE_COMPETITION_GROUPS_MUTATION
	)
	const handleComplete = () => {
		// updateWcifGroups(localData)
		onComplete()
	}
	if (query.loading || !localData) return <LinearProgress />
	if (query.error) console.error(query.error)
	return (
		<Grid container direction='column'>
			<Grid item>
				<ManageGroups wcif={localData} setWcif={setLocalData} />
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

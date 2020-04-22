import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import StepActions from './StepActions'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import LinearProgress from '@material-ui/core/LinearProgress'

const COMPETITION_INFO_QUERY = gql`
	query findByCompetitionId($id: String!) {
		WcifCompetition(id: $id) {
			id
			name
			shortName
			competitorLimit
		}
	}
`

const UPDATE_COMPETITION_INFO_MUTATION = gql`
	mutation updateWcifInfo(
		$id: String!
		$name: String!
		$shortName: String!
		$competitorLimit: Number!
	) {
		updateWcifInfo(
			id: $id
			name: $name
			shortName: $shortName
			competitorLimit: $competitorLimit
		) {
			_id
		}
	}
`

export default function InfoSetup({ id, onComplete, handleBack }) {
	const [localData, setLocalData] = useState(null)
	const query = useQuery(COMPETITION_INFO_QUERY, {
		variables: { id: 'TriStateChampionship2020' },
	})
	useEffect(() => {
		!query.loading && !query.error && setLocalData(query.data.WcifCompetition)
	}, [query.loading, query.error, query.data])

	const [updateWcifInfo, mutationOptions] = useMutation(
		UPDATE_COMPETITION_INFO_MUTATION
	)

	if (query.loading || !localData) return <LinearProgress />
	if (query.error) console.error(query.error)

	const handleComplete = () => {
		updateWcifInfo({ variables: { id, ...localData } }).then(() => onComplete())
	}

	const handleReset = () => {}

	return (
		<>
			<Grid
				container
				direction='column'
				spacing={2}
				justify='center'
				alignItems='center'
				alignContent='center'
				wrap='nowrap'
			>
				<Grid item>
					<TextField
						fullWidth
						value={localData.name}
						label='Name'
						name='name'
						onChange={(e) =>
							setLocalData({ ...localData, name: e.target.value })
						}
					/>
				</Grid>
				<Grid item>
					<TextField
						fullWidth
						value={localData.name}
						label='Short Name'
						name='shortName'
						onChange={(e) =>
							setLocalData({ ...localData, name: e.target.value })
						}
					/>
				</Grid>
				<Grid item>
					<TextField
						value={localData.competitorLimit}
						type='number'
						label='Competitor Limit'
						name='competitorLimit'
						onChange={(e) => setLocalData({ ...localData, id: e.target.id })}
					/>
				</Grid>
			</Grid>
			<StepActions
				loading={mutationOptions.loading}
				handleComplete={handleComplete}
				handleReset={handleReset}
			/>
		</>
	)
}

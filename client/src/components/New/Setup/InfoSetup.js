import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import StepActions from './StepActions'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import LinearProgress from '@material-ui/core/LinearProgress'

const COMPETITION_INFO_QUERY = gql`
	query findByCompetitionId($id: String!) {
		getWcifById(_id: $id) {
			_id
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
		$competitorLimit: Int!
	) {
		updateWcifInfo(
			_id: $id
			newName: $name
			newShortName: $shortName
			newCompetitorLimit: $competitorLimit
		) {
			competitionId
			_id
		}
	}
`

export default function InfoSetup({ id, onComplete, handleBack }) {
	const [localData, setLocalData] = useState(null)
	const query = useQuery(COMPETITION_INFO_QUERY, {
		variables: { id: id },
	})
	useEffect(() => {
		!query.loading && !query.error && setLocalData(query.data.getWcifById)
	}, [query.loading, query.error, query.data])

	const [updateWcifInfo, mutationOptions] = useMutation(
		UPDATE_COMPETITION_INFO_MUTATION
	)

	if (query.loading || !localData) return <LinearProgress />
	if (query.error) console.error(query.error)

	const handleComplete = () => {
		updateWcifInfo({ variables: { ...localData, id } }).then(() =>
			onComplete()
		)
	}

	const handleReset = () => {}

	const handleChange = ({ target: { name, value } }) => {
		const v = isNaN(value) ? value : parseInt(value)
		setLocalData({ ...localData, [name]: v })
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
					wrap='nowrap'>
					<Grid item>
						<TextField
							fullWidth
							value={localData.name}
							label='Name'
							name='name'
							onChange={handleChange}
						/>
					</Grid>
					<Grid item>
						<TextField
							fullWidth
							value={localData.shortName}
							label='Short Name'
							name='shortName'
							onChange={handleChange}
						/>
					</Grid>
					<Grid item>
						<TextField
							value={localData.competitorLimit}
							type='number'
							label='Competitor Limit'
							name='competitorLimit'
							onChange={handleChange}
						/>
					</Grid>
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

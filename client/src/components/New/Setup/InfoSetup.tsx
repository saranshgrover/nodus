import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import TextField from '@material-ui/core/TextField'
import React, { useEffect, useState } from 'react'
import {
	SetupCompetitionInfoQuery,
	useSetupCompetitionInfoQuery,
	useUpdateWcifInfoMutation,
} from '../../../generated/graphql'
import StepActions from './StepActions'

export default function InfoSetup({
	id: competitionId,
	onComplete,
	handleBack,
}: ISetupProps) {
	const [localData, setLocalData] = useState<
		SetupCompetitionInfoQuery['getWcifByCompetitionId']
	>()
	const query = useSetupCompetitionInfoQuery({
		variables: { competitionId },
	})
	useEffect(() => {
		!query.loading &&
			!query.error &&
			query.data &&
			setLocalData(query.data.getWcifByCompetitionId)
	}, [query.loading, query.error, query.data])

	const [updateWcifInfo, mutationOptions] = useUpdateWcifInfoMutation()

	if (query.loading || !localData) return <LinearProgress />
	if (query.error) console.error(query.error)

	const handleComplete = () => {
		updateWcifInfo({ variables: { ...localData, competitionId } }).then(() =>
			onComplete()
		)
	}

	const handleReset = () => {}

	const handleChange = ({ target: { name, value } }: any) => {
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

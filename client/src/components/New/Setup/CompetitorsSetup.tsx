import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import MaterialTable from 'material-table'
import mongoose from 'mongoose'
import React, { useEffect, useState } from 'react'
import {
	NewPersonInput,
	useSetupCompetitionCompetitorsQuery,
	useUpdateWcifCompetitorsMutation,
} from '../../../generated/graphql'
import StepActions from './StepActions'
import tableIcons from './tableIcons'

export default function CompetitorsSetup({
	id: competitionId,
	onComplete,
	handleBack,
	handleReset,
}: ISetupProps) {
	const columns = [
		{ title: 'Name', field: 'name' },
		{ title: 'WCA ID', field: 'wcaId' },
		{ title: 'Country', field: 'countryIso2' },
		{ title: 'Email', field: 'email' },
		{ title: 'Birthdate', field: 'birthdate' },
	]
	const [localData, setLocalData] = useState<
		Array<{
			__typename?: 'Person'
			_id: any
			name: string
			wcaUserId: number
			wcaId?: Maybe<string>
			registrantId?: Maybe<number>
			countryIso2: string
			gender: string
			birthdate?: Maybe<string>
			email?: Maybe<string>
			tableData?: string
		}>
	>()
	const query = useSetupCompetitionCompetitorsQuery({
		variables: { competitionId },
	})
	useEffect(() => {
		!query.loading &&
			!query.error &&
			query.data &&
			setLocalData(query.data.getWcifByCompetitionId?.persons)
	}, [query.loading, query.error, query.data])

	const [
		updateWcifCompetitors,
		mutationOptions,
	] = useUpdateWcifCompetitorsMutation()

	const handleAdd = (addData: ArrayElement<typeof localData>) => {
		const newRegistrantId = Math.max.apply(
			Math,
			localData!.map((o) => o.registrantId ?? 0)
		)
		const newCompetitor = {
			...addData,
			registrantId: newRegistrantId,
			wcaUserId: -1,
			_id: mongoose.Types.ObjectId().toString(),
		}
		return new Promise((resolve) => {
			setTimeout(() => {
				setLocalData([...localData!, newCompetitor])
				resolve()
			}, 200)
		})
	}
	// TODO this lib doesnt have good types. we need to switch anway so idc much
	const handleUpdate = (newData: any): Promise<any> => {
		return new Promise((resolve) => {
			setTimeout(() => {
				setLocalData(
					localData!.map((competitor) =>
						competitor._id === newData._id ? newData : competitor
					)
				)
				resolve()
			}, 200)
		})
	}

	const handleComplete = () => {
		let competitors: NewPersonInput[] = []
		localData!.map(({ __typename, tableData, ...competitor }) =>
			competitors.push({
				...competitor,
				email: competitor.email as string,
				birthdate: competitor.birthdate as string,
			})
		)
		updateWcifCompetitors({
			variables: { competitionId, updatedCompetitors: competitors },
		}).then(() => onComplete())
	}

	if (query.loading || !localData) return <LinearProgress />
	if (query.error) console.error(query.error)
	return (
		<Grid
			xs={12}
			container
			direction='column'
			spacing={1}
			justify='space-around'>
			<Grid item>
				<MaterialTable
					icons={tableIcons}
					columns={columns}
					data={localData}
					title='Edit Competitors'
					editable={{
						onRowAdd: handleAdd,
						onRowUpdate: handleUpdate,
					}}
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

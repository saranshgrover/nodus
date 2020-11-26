import LinearProgress from '@material-ui/core/LinearProgress'
import React, { useEffect, useState } from 'react'
import {
	NewFindMyManagableCompetitionQuery,
	useNewCreateWcifMutation,
	useNewFindMyManagableCompetitionQuery,
} from '../../../generated/graphql'
import MySnackbar from '../../common/MySnackbar'
import WCACompetitionList from './WCACompetitionList'

interface Props {
	// undefined since there could be an error - parent is meant to handle the error in this case. WCA selector does not handle errors.
	setData: (competitionId: string | undefined) => void
}

export default function WCASelector({ setData }: Props) {
	const [managableCompetitions, setManagableCompetitions] = useState<
		NewFindMyManagableCompetitionQuery['findMyManagableCompetitions']
	>()
	const [createWcif, { error: error2 }] = useNewCreateWcifMutation({
		errorPolicy: 'ignore',
	})

	const {
		error,
		loading,
		data: data2,
	} = useNewFindMyManagableCompetitionQuery()
	const handleSelect = async (competitionId: string) => {
		console.log(competitionId)
		createWcif({
			variables: { competitionId: competitionId },
		}).then((resp) => setData(resp?.data?.createWcif.competitionId))
	}
	useEffect(() => {
		!loading &&
			!error &&
			data2 &&
			setManagableCompetitions(data2.findMyManagableCompetitions)
	}, [loading, error, data2])
	if (error) console.error(error)
	if (loading || managableCompetitions === undefined) return <LinearProgress />
	return (
		<>
			{error2 && <MySnackbar variant='error' message={error2.message} />}
			<WCACompetitionList
				onClick={handleSelect}
				comps={managableCompetitions}
				subheader={'Your Managable Competitions'}
				date={true}
			/>
		</>
	)
}

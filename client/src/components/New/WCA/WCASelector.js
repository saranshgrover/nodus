import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { getMyManagableComps, getMe } from '../../../logic/wca-api'
import { useMutation, useQuery } from '@apollo/react-hooks'
import LinearProgress from '@material-ui/core/LinearProgress'
import WCACompetitionList from './WCACompetitionList'
import MySnackbar from '../../common/MySnackbar'

export default function WCASelector({ setData }) {
	const CREATE_WCIF = gql`
		mutation createWcif($competitionId: String) {
			createWcif(competitionId: $competitionId) {
				_id
			}
		}
	`
	const FIND_MY_MANAGABLE_COMPETITIONS = gql`
		{
			findMyManagableCompetitions {
				name
				start_date
				end_date
				id
				country_iso2
			}
		}
	`
	const [managableCompetitions, setManagableCompetitions] = useState(undefined)
	const [createWcif, { error: error2, data }] = useMutation(CREATE_WCIF, {
		errorPolicy: 'ignore',
	})
	const { error, loading, data: data2 } = useQuery(
		FIND_MY_MANAGABLE_COMPETITIONS
	)
	const handleSelect = async (competitionId) => {
		createWcif({
			variables: { competitionId: competitionId },
		}).then((resp) => setData(resp.data.createWcif._id))
	}
	useEffect(() => {
		!loading &&
			!error &&
			setManagableCompetitions(data2.findMyManagableCompetitions)
	}, [loading, error, data2])
	if (error) console.error(error)
	if (loading || managableCompetitions === undefined) return <LinearProgress />
	console.log(managableCompetitions)
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

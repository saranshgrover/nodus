import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { getMyManagableComps, getMe } from '../../../logic/wca-api'
import { useMutation } from '@apollo/react-hooks'
import LinearProgress from '@material-ui/core/LinearProgress'
import WCACompetitionList from './WCACompetitionList'

export default function WCASelector({ setData }) {
	const CREATE_WCIF = gql`
		mutation createWcif($competitionId: String) {
			createWcif(competitionId: $competitionId) {
				_id
			}
		}
	`
	const [managableCompetitions, setManagableCompetitions] = useState(null)
	const [createWcif, { data }] = useMutation(CREATE_WCIF)
	useEffect(() => {
		getMyManagableComps().then((comps) => setManagableCompetitions(comps))
	}, [])
	const handleSelect = async (competitionId) => {
		createWcif({
			variables: { competitionId: competitionId },
		}).then((resp) => setData(resp.data.createWcif._id))
	}
	return (
		<>
			{!managableCompetitions ? (
				<LinearProgress />
			) : (
				<WCACompetitionList
					onClick={handleSelect}
					comps={managableCompetitions}
					subheader={'Your Managable Competitions'}
					date={true}
				/>
			)}
		</>
	)
}

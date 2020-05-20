import React, { useContext, useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Error from '../common/Error'
import { CompetitionContext } from '../../contexts/CompetitionContext'
import LinearProgress from '../LinearProgress/LinearProgress'
import { getGroupsOf } from '../../logic/activity'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import GroupTable from '../GroupTable/GroupTable'

export default function EventGroups({ eventId, wcif }) {
	const { competitionId, activities } = useContext(CompetitionContext)
	const [selectedActivty, setSelectedActivty] = useState(null)
	const [rounds, setRounds] = useState(null)
	useEffect(() => {
		const rounds = []
		const event = wcif.events.find((event) => event.id === eventId)
		event.rounds.map((round, index) => {
			const groups = getGroupsOf(round.id, activities)
			rounds.push({ ...round, groups: groups })
		})
		setRounds(rounds)
		rounds.length > 0 && rounds[0].groups.length > 0
			? setSelectedActivty(rounds[0].groups[0].activity)
			: setSelectedActivty(undefined)
	}, [])

	if (rounds === null || selectedActivty === null) return <LinearProgress />
	if (selectedActivty === undefined)
		return <Error message={'No Groups Found'} />
	return (
		<Grid container direction='column'>
			<Grid item container spacing={2} justify='center'>
				<Grid item>
					<FormControl>
						<InputLabel id='round'>Round</InputLabel>
						<Select
							labelId='round'
							value={selectedActivty.slice(0, selectedActivty.indexOf('g') - 1)}
							onChange={({ target: { value } }) =>
								setSelectedActivty(`${value}-g1`)
							}
						>
							{rounds.map((round, index) => (
								<MenuItem key={round.id} value={round.id}>{`Round ${
									index + 1
								}`}</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid item>
					<FormControl>
						<InputLabel id='Group'>Group</InputLabel>
						<Select
							labelId='group'
							value={selectedActivty}
							onChange={({ target: { value } }) => setSelectedActivty(value)}
						>
							{rounds
								.find((round) => selectedActivty.indexOf(round.id) >= 0)
								.groups.map((group, index) => (
									<MenuItem
										key={group.activity}
										value={group.activity}
									>{`Group ${group.activity.slice(
										group.activity.indexOf('g') + 1
									)}`}</MenuItem>
								))}
						</Select>
					</FormControl>
				</Grid>
			</Grid>
			<Grid item>
				<GroupTable
					activity={activities.find(
						(activity) => activity.activityCode === selectedActivty
					)}
					wcif={wcif}
				/>
			</Grid>
		</Grid>
	)
}

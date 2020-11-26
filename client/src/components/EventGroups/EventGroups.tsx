import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { CompetitionGroupsQuery, Round } from 'generated/graphql'
import React, { useContext, useEffect, useState } from 'react'
import { CompetitionContext } from '../../contexts/CompetitionContext'
import { getGroupsOf } from '../../logic/activity'
import Error from '../common/Error'
import GroupTable from '../GroupTable/GroupTable'
import LinearProgress from '../LinearProgress/LinearProgress'

interface Props {
	eventId: string
	wcif: NonNullable<CompetitionGroupsQuery['getWcifByCompetitionId']>
}

export default function EventGroups({ eventId, wcif }: Props) {
	const { activities } = useContext(CompetitionContext)
	const [selectedActivty, setSelectedActivty] = useState<
		null | undefined | string
	>(null)

	const [rounds, setRounds] = useState<(Partial<Round> & { groups: any[] })[]>()
	useEffect(() => {
		const newRounds: NonNullable<typeof rounds> = []
		const event = wcif.events.find((event) => event.id === eventId)
		if (event) {
			event.rounds.map((round) => {
				const groups = getGroupsOf(round.id, activities)
				newRounds.push({ ...round, groups: groups })
			})
			setRounds(newRounds)
			newRounds.length > 0 && newRounds[0].groups.length > 0
				? setSelectedActivty(newRounds[0].groups[0].activity)
				: setSelectedActivty(undefined)
		}
	}, [wcif, eventId])

	if (!rounds || selectedActivty === null) return <LinearProgress />
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
							}>
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
							onChange={({ target: { value } }) =>
								setSelectedActivty(value as string)
							}>
							{rounds!
								.find((round) => selectedActivty.indexOf(round.id!) >= 0)!
								.groups.map((group) => (
									<MenuItem
										key={group.activity}
										value={group.activity}>{`Group ${group.activity.slice(
										group.activity.indexOf('g') + 1
									)}`}</MenuItem>
								))}
						</Select>
					</FormControl>
				</Grid>
			</Grid>
			<Grid item>
				<GroupTable
					activity={
						activities!.find(
							(activity) => activity!.activityCode === selectedActivty
						)!
					}
					wcif={wcif}
				/>
			</Grid>
		</Grid>
	)
}

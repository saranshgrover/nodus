import { useQuery } from '@apollo/react-hooks'
import { useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import GroupIcon from '@material-ui/icons/Group'
import { IconTabsData } from 'components/IconTabs/types'
import gql from 'graphql-tag'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { CompetitionContext } from '../../contexts/CompetitionContext'
import {
	ResultsGetOpenRoundsQuery,
	useResultsGetOpenRoundsQuery,
} from '../../generated/graphql'
import { activityKey, parseActivityCode } from '../../logic/activity'
import WCALiveClient from '../../utils/WCALiveClient'
import CubingIcon from '../common/CubingIcon'
import Error from '../common/Error'
import EventResults from '../EventResults/EventResults'
import IconTabs from '../IconTabs/IconTabs'
import LinearProgress from '../LinearProgress/LinearProgress'
import TabPanel from '../TabPanel/TabPanel'
import UserResults from '../UserResults/UserResults'

const WCA_LIVE_COMPETITION_QUERY = gql`
	query competitions($filter: String!) {
		competitions(filter: $filter) {
			id
			competitionEvents {
				event {
					id
				}
				rounds {
					id
					number
				}
			}
		}
	}
`

export default function Results() {
	const { competitionId, userRegistered, name } = useContext(CompetitionContext)
	const { loading: wcaLiveLoading, data: wcaLiveData } = useQuery(
		WCA_LIVE_COMPETITION_QUERY,
		{
			client: WCALiveClient,
			variables: { filter: name },
		}
	)

	const theme = useTheme()
	const largeScreen = useMediaQuery(theme.breakpoints.up('lg'))
	const mediumScreen = useMediaQuery(theme.breakpoints.up('md'))
	const { loading, error, data } = useResultsGetOpenRoundsQuery({
		variables: { competitionId },
	})
	const [rounds, setRounds] = useState<
		ResultsGetOpenRoundsQuery['getOpenRounds']
	>()
	useEffect(() => {
		!loading && !error && data && setRounds(data?.getOpenRounds)
	}, [data, loading, error])
	const [tabs, setTabs] = useState<IconTabsData[]>(
		userRegistered
			? [
					{
						label: 'My Results',
						value: 0,
						Icon: <GroupIcon />,
						Component: UserResults,
						id: 'me',
					},
			  ]
			: []
	)
	const [value, setValue] = useState<number | null>(null)
	useEffect(() => {
		tabs.length > 0 && setValue(0)
	}, [tabs])
	useEffect(() => {
		if (rounds && wcaLiveData) {
			const roundIds =
				wcaLiveData.competitions.length > 0
					? wcaLiveData.competitions[0].competitionEvents
					: null
			console.log(roundIds)
			if (roundIds) {
				let roundTabs: typeof tabs = []
				rounds.map((round) => {
					const { eventId, roundNumber } = parseActivityCode(round.id)
					const wcaLiveEvent = roundIds.find((r: any) => r.event.id === eventId)
					const wcaLiveRound = wcaLiveEvent.rounds.find(
						(r: any) => r.number === roundNumber
					)
					roundTabs.push({
						label: `${activityKey[eventId]} Round ${roundNumber}`,
						value: tabs.length + roundTabs.length + 1,
						Icon: (
							<CubingIcon
								eventId={eventId}
								small={!mediumScreen && !largeScreen}
								style={{ color: `${theme.palette.competitionPrimary.main}` }}
							/>
						),
						Component: EventResults,
						id: wcaLiveRound.id,
					})
				})
				setTabs([...tabs, ...roundTabs])
			}
		}
	}, [rounds, wcaLiveData])
	if (rounds?.length === 0)
		return (
			<Typography variant='h4' color='initial' style={{ overflow: 'hidden' }}>
				No Open Rounds
			</Typography>
		)
	if (loading || value === null || rounds === null || wcaLiveLoading)
		return <LinearProgress />
	if (error) return <Error message={error.toString()} />

	function handleChange(_: any, newValue: any) {
		setValue(newValue)
	}
	return (
		<Fragment>
			<IconTabs
				centered={largeScreen}
				variant={'scrollable'}
				value={value}
				tabs={tabs}
				tabProps={{}}
				// @ts-ignore
				onChange={handleChange}
			/>
			{tabs.map((tab, index) => (
				<TabPanel value={value} index={index} key={`tab-${index}`}>
					{<tab.Component roundId={tab.id} />}
				</TabPanel>
			))}
		</Fragment>
	)
}

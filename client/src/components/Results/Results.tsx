import { useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import GroupIcon from '@material-ui/icons/Group'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { CompetitionContext } from '../../contexts/CompetitionContext'
import {
	ResultsGetOpenRoundsQuery,
	useResultsGetOpenRoundsQuery,
} from '../../generated/graphql'
import { activityKey, parseActivityCode } from '../../logic/activity'
import CubingIcon from '../common/CubingIcon'
import Error from '../common/Error'
import EventResults from '../EventResults/EventResults'
import IconTabs from '../IconTabs/IconTabs'
import LinearProgress from '../LinearProgress/LinearProgress'
import TabPanel from '../TabPanel/TabPanel'
import UserResults from '../UserResults/UserResults'

export default function Results() {
	const { competitionId, userRegistered } = useContext(CompetitionContext)
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
	const [tabs, setTabs] = useState<
		{
			label: string
			value: number
			Icon: JSX.Element
			Component: any
			id: string
		}[]
	>(
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
		if (rounds) {
			let roundTabs: typeof tabs = []
			rounds.map((round) => {
				const { eventId, roundNumber } = parseActivityCode(round.id)
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
					id: round.id,
				})
			})
			setTabs([...tabs, ...roundTabs])
		}
	}, [rounds])
	if (rounds?.length === 0)
		return (
			<Typography variant='h4' color='initial' style={{ overflow: 'hidden' }}>
				No Open Rounds
			</Typography>
		)
	if (loading || value === null || rounds === null) return <LinearProgress />
	if (error) return <Error message={error.toString()} />

	const handleChange = (_: any, newValue: number) => {
		setValue(newValue)
	}
	return (
		<Fragment>
			<IconTabs
				onChange={handleChange}
				centered={largeScreen}
				variant={'scrollable'}
				value={value}
				tabs={tabs}
				tabProps={{}}
			/>
			{tabs.map((tab, index) => (
				<TabPanel value={value} index={index} key={`tab-${index}`}>
					{<tab.Component roundId={tab.id} />}
				</TabPanel>
			))}
		</Fragment>
	)
}

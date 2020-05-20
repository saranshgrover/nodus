import React, { useContext, useState, useEffect, Fragment } from 'react'
import IconTabs from '../IconTabs/IconTabs'
import gql from 'graphql-tag'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import { useQuery } from '@apollo/react-hooks'
import { CompetitionContext } from '../../contexts/CompetitionContext'
import Error from '../common/Error'
import LinearProgress from '../LinearProgress/LinearProgress'
import GroupIcon from '@material-ui/icons/Group'
import { activityKey, parseActivityCode } from '../../logic/activity'
import CubingIcon from '../common/CubingIcon'
import TabPanel from '../TabPanel/TabPanel'
import UserResults from '../UserResults/UserResults'
import EventResults from '../EventResults/EventResults'
import Typography from '@material-ui/core/Typography'

const COMPETITION_OPEN_ROUNDS_QUERY = gql`
	query getOpenRoundsById($competitionId: String!) {
		getOpenRounds(competitionId: $competitionId) {
			_id
			id
		}
	}
`

const useStyles = makeStyles((theme) => ({
	root: {},
}))

export default function Results() {
	const { competitionId, userRegistered } = useContext(CompetitionContext)
	const theme = useTheme()
	const largeScreen = useMediaQuery(theme.breakpoints.up('lg'))
	const mediumScreen = useMediaQuery(theme.breakpoints.up('md'))

	const { loading, error, data } = useQuery(COMPETITION_OPEN_ROUNDS_QUERY, {
		variables: { competitionId: competitionId },
	})
	const [rounds, setRounds] = useState(null)
	useEffect(() => {
		!loading && !error && setRounds(data.getOpenRounds)
	}, [data, loading, error])
	const [tabs, setTabs] = useState(
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
	const [value, setValue] = useState(null)
	useEffect(() => {
		tabs.length > 0 && setValue(0)
	}, [tabs])
	useEffect(() => {
		if (rounds) {
			let roundTabs = []
			rounds.map((round) => {
				const { eventId, roundNumber } = parseActivityCode(round.id)
				roundTabs.push({
					label: `${activityKey[eventId]} Round ${roundNumber}`,
					value: tabs.length + roundTabs.length + 1,
					Icon: (
						<CubingIcon
							eventId={eventId}
							small={!mediumScreen && !largeScreen}
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

	const handleChange = (_, newValue) => {
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
			/>
			{tabs.map((tab, index) => (
				<TabPanel value={value} index={index} key={`tab-${index}`}>
					{<tab.Component roundId={tab.id} />}
				</TabPanel>
			))}
		</Fragment>
	)
}

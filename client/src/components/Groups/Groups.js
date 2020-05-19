import React, { useContext, useState, useEffect, Fragment } from 'react'
import IconTabs from '../IconTabs/IconTabs'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { CompetitionContext } from '../../contexts/CompetitionContext'
import Error from '../common/Error'
import LinearProgress from '@material-ui/core/LinearProgress'
import GroupIcon from '@material-ui/icons/Group'
import { parseActivityCode, activityKey } from '../../logic/activity'
import CubingIcon from '../common/CubingIcon'
import TabPanel from '../TabPanel/TabPanel'
import UserGroups from '../UserGroups/UserGroups'
import EventGroups from '../EventGroups.js/EventGroups'

const COMPETITION_GROUPS_QUERY = gql`
	query getWcifByCompetitionId($competitionId: String!) {
		getWcifById(competitionId: $competitionId) {
			events {
				id
				rounds {
					id
				}
			}
		}
	}
`

export default function Groups() {
	const competition = useContext(CompetitionContext)
	const { loading, error, data } = useQuery(COMPETITION_GROUPS_QUERY, {
		variables: { competitionId: competition.competitionId },
	})
	const [wcif, setWcif] = useState(null)
	useEffect(() => {
		console.log(data)
		!loading && !error && setWcif(data.getWcifByCompetitionId)
	}, [data, loading, error])
	const [tabs, setTabs] = useState(
		competition.user
			? [
					{
						label: 'My Groups',
						value: 'me',
						icon: <GroupIcon />,
						component: <UserGroups />,
					},
			  ]
			: []
	)
	const [value, setValue] = useState(null)
	useEffect(() => {
		tabs.length > 0 && setValue(0)
	}, [tabs])
	useEffect(() => {
		if (wcif) {
			let eventTabs = []
			wcif.events.map((event) => {
				event.rounds.map((round) => {
					const { eventId, roundNumber } = parseActivityCode(round)
					eventTabs.push({
						name: `${activityKey[eventId]} Round ${roundNumber}`,
						value: round,
						icon: <CubingIcon eventId={event} />,
						component: <EventGroups event={event} />,
					})
				})
			})
			setTabs([...tabs, ...eventTabs])
		}
	}, [wcif])
	if (loading || value === null) return <LinearProgress />
	if (error) return <Error message={error.toString()} />
	return (
		<Fragment>
			<IconTabs tabs={tabs} />
			{tabs.map((tab, index) => (
				<TabPanel
					value={tabs[value]?.value}
					index={tabs[index].value}
					key={`tab-${index}`}
				>
					{tabs[index].component}
				</TabPanel>
			))}
		</Fragment>
	)
}

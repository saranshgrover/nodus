import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import GroupIcon from '@material-ui/icons/Group'
import { IconTabsData } from 'components/IconTabs/types'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { CompetitionContext } from '../../contexts/CompetitionContext'
import {
	CompetitionGroupsQuery,
	useCompetitionGroupsQuery,
} from '../../generated/graphql'
import { activityKey } from '../../logic/activity'
import CubingIcon from '../common/CubingIcon'
import Error from '../common/Error'
import EventGroups from '../EventGroups/EventGroups'
import IconTabs from '../IconTabs/IconTabs'
import LinearProgress from '../LinearProgress/LinearProgress'
import TabPanel from '../TabPanel/TabPanel'
import UserGroups from '../UserGroups/UserGroups'

export default function Groups() {
	const { competitionId, userRegistered } = useContext(CompetitionContext)
	const theme = useTheme()
	const largeScreen = useMediaQuery(theme.breakpoints.up('lg'))
	const mediumScreen = useMediaQuery(theme.breakpoints.up('md'))

	const { loading, error, data } = useCompetitionGroupsQuery({
		variables: { competitionId },
	})
	const [wcif, setWcif] = useState<
		CompetitionGroupsQuery['getWcifByCompetitionId']
	>()
	useEffect(() => {
		!loading && !error && data && setWcif(data.getWcifByCompetitionId)
	}, [data, loading, error])
	const [tabs, setTabs] = useState<IconTabsData[]>(
		userRegistered
			? [
					{
						label: 'My Groups',
						value: 0,
						Icon: <GroupIcon />,
						Component: UserGroups,
						id: 'me',
					},
			  ]
			: []
	)
	const [value, setValue] = useState<null | number>(null)
	useEffect(() => {
		tabs.length > 0 && setValue(0)
	}, [tabs])
	useEffect(() => {
		if (wcif) {
			let eventTabs: typeof tabs = []
			wcif.events.map((event) => {
				eventTabs.push({
					label: `${activityKey[event.id]}`,
					value: tabs.length + eventTabs.length + 1,
					Icon: (
						<CubingIcon
							eventId={event.id}
							style={{
								color: `${theme.palette.competitionPrimary.main}`,
							}}
						/>
					),
					Component: EventGroups,
					id: event.id,
				})
			})
			setTabs([...tabs, ...eventTabs])
		}
	}, [wcif])
	if (loading || value === null || !wcif) return <LinearProgress />
	if (error) return <Error message={error.toString()} />
	const handleChange = (_: any, newValue: number) => {
		setValue(newValue)
	}
	return (
		<Fragment>
			<IconTabs
				//@ts-ignore
				onChange={handleChange}
				centered={largeScreen}
				variant={
					largeScreen ? 'standard' : mediumScreen ? 'fullWidth' : 'scrollable'
				}
				value={value}
				tabs={tabs}
				tabProps={{}}
			/>
			{tabs.map((tab, index) => (
				<TabPanel value={value} index={index} key={`tab-${index}`}>
					{<tab.Component eventId={tab.id} wcif={wcif} />}
				</TabPanel>
			))}
		</Fragment>
	)
}

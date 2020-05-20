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
import { activityKey } from '../../logic/activity'
import CubingIcon from '../common/CubingIcon'
import TabPanel from '../TabPanel/TabPanel'
import UserGroups from '../UserGroups/UserGroups'
import EventGroups from '../EventGroups/EventGroups'
import { useHistory } from 'react-router-dom'

const COMPETITION_GROUPS_QUERY = gql`
	query getWcifByCompetitionId($competitionId: String!) {
		getWcifByCompetitionId(competitionId: $competitionId) {
			name
			shortName
			id
			events {
				id
				rounds {
					id
				}
			}
			persons {
				name
				wcaUserId
				wcaId
				roles
				registration {
					eventIds
				}
				assignments {
					activityId
					assignmentCode
					stationNumber
				}
				personalBests {
					eventId
					best
					worldRanking
					type
				}
			}
			schedule {
				startDate
				numberOfDays
				venues {
					timezone
					name
					rooms {
						id
						name
						color
						activities {
							id
							name
							activityCode
							startTime
							endTime
							childActivities {
								id
								name
								activityCode
								startTime
								endTime
							}
						}
					}
				}
			}
		}
	}
`

const useStyles = makeStyles((theme) => ({
	root: {},
}))

export default function Groups() {
	const { competitionId, userRegistered } = useContext(CompetitionContext)
	const theme = useTheme()
	const largeScreen = useMediaQuery(theme.breakpoints.up('lg'))
	const mediumScreen = useMediaQuery(theme.breakpoints.up('md'))

	const { loading, error, data } = useQuery(COMPETITION_GROUPS_QUERY, {
		variables: { competitionId: competitionId },
	})
	const [wcif, setWcif] = useState(null)
	useEffect(() => {
		!loading && !error && setWcif(data.getWcifByCompetitionId)
	}, [data, loading, error])
	const [tabs, setTabs] = useState(
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
	const [value, setValue] = useState(null)
	useEffect(() => {
		tabs.length > 0 && setValue(0)
	}, [tabs])
	useEffect(() => {
		if (wcif) {
			let eventTabs = []
			wcif.events.map((event) => {
				eventTabs.push({
					label: `${activityKey[event.id]}`,
					value: tabs.length + eventTabs.length + 1,
					Icon: <CubingIcon eventId={event.id} />,
					Component: EventGroups,
					id: event.id,
				})
			})
			setTabs([...tabs, ...eventTabs])
		}
	}, [wcif])
	if (loading || value === null || wcif === null) return <LinearProgress />
	if (error) return <Error message={error.toString()} />
	const handleChange = (_, newValue) => {
		setValue(newValue)
	}
	return (
		<Fragment>
			<IconTabs
				onChange={handleChange}
				centered={largeScreen}
				variant={
					largeScreen ? 'standard' : mediumScreen ? 'fullWidth' : 'scrollable'
				}
				value={value}
				tabs={tabs}
			/>
			{tabs.map((tab, index) => (
				<TabPanel value={value} index={index} key={`tab-${index}`}>
					{<tab.Component eventId={tab.id} wcif={wcif} />}
				</TabPanel>
			))}
		</Fragment>
	)
}

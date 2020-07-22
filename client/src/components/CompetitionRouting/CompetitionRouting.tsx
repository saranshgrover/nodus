import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import useCompetition from 'hooks/useCompetition'
import React from 'react'
// @ts-ignore
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom'
import SwipeableViews from 'react-swipeable-views'
import { useRoutingFindByCompetitionIdQuery } from '../../generated/graphql'
import { isAdmin } from '../../logic/user'
import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import Error from '../common/Error'
import CompetitionAdmin from '../CompetitionAdmin/CompetitionAdmin'
import ElevatedTabs from '../ElevatedTabs/ElevatedTabs'
import Groups from '../Groups/Groups'
import Information from '../Information/Information'
import LinearProgress from '../LinearProgress/LinearProgress'
import Overview from '../Overview/Overview'
import Projector from '../Projector/Projector'
import Results from '../Results/Results'
import TabPanel from '../TabPanel/TabPanel'

// const useStyles = makeStyles((theme) => ({}))

const tabs = {
	overview: { name: 'Overview', component: <Overview /> },
	information: { name: 'Information', component: <Information /> },
	notifications: { name: 'Notifications', component: () => {} },
	results: { name: 'Results', component: <Results /> },
	groups: { name: 'Groups', component: <Groups /> },
}

export default function CompetitionRouting({
	match,
	history,
}: RouteComponentProps<{ compId: string; tab?: string }>) {
	const competition = useCompetition()
	const theme = useTheme()
	const largeScreen = useMediaQuery(theme.breakpoints.up('lg'))
	const mediumScreen = useMediaQuery(theme.breakpoints.up('md'))
	// const classes = useStyles()
	const { loading, error } = useRoutingFindByCompetitionIdQuery({
		variables: { competitionId: competition.competitionId! },
	})

	const [value, setValue] = React.useState(
		Math.max(
			0,
			match.params.tab ? competition.tabs.indexOf(match.params.tab) : 0
		)
	)
	const handleChange = (_: any, newValue: number) => {
		const tab = competition.tabs[newValue]
		history.push(`/competitions/${competition.competitionId}/${tab}`)
		setValue(newValue)
	}
	if (loading) return <LinearProgress />
	if (error) return <Error message={error.message} />

	return (
		<Switch>
			<AuthenticatedRoute
				authCallback={(user) => isAdmin(user, competition.competitionId)}
				RedirectComponent={
					<Redirect to={`/competitions/${match.params.compId}/`} />
				}
				exact
				path={`/competitions/${match.params.compId}/admin/:adminTab?`}
				component={CompetitionAdmin}
			/>
			<Route
				exact
				path={`/competitions/${match.params.compId}/project`}
				component={Projector}
			/>
			<Route>
				<ElevatedTabs
					centered={largeScreen}
					variant={
						largeScreen ? 'standard' : mediumScreen ? 'fullWidth' : 'scrollable'
					}
					value={value}
					// @ts-ignore
					onChange={handleChange}
					tabs={competition.tabs.map((tab, index) => ({
						key: index,
						label: tabs[tab].name,
					}))}
				/>
				<SwipeableViews
					axis='x'
					index={value}
					onChangeIndex={(index: number) => handleChange({}, index)}>
					{competition.tabs.map((tab, index) => (
						<TabPanel value={value} index={index} key={`tab-${index}`}>
							{tabs[tab].component}
						</TabPanel>
					))}
				</SwipeableViews>
			</Route>
		</Switch>
	)
}

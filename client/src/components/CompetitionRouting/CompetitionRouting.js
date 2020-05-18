import React, { useContext } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import LinearProgress from '@material-ui/core/LinearProgress'
import Error from '../common/Error'
import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme, makeStyles } from '@material-ui/core/styles'
import Overview from '../Overview/Overview'
import ElevatedTabs from '../ElevatedTabs/ElevatedTabs'
import Typography from '@material-ui/core/Typography'
import { CompetitionContext } from '../../contexts/CompetitionContext'
import SwipeableViews from 'react-swipeable-views'

const useStyles = makeStyles((theme) => ({}))

const FIND_BY_COMPETITION_ID_QUERY = gql`
	query wcif($competitionId: String!) {
		getWcifByCompetitionId(competitionId: $competitionId) {
			name
			shortName
			_id
		}
	}
`
const tabs = {
	overview: { value: 0, name: 'Overview', component: <Overview /> },
	information: { value: 1, name: 'Information', component: () => {} },
	notifications: { value: 2, name: 'Notifications', component: () => {} },
	results: { value: 3, name: 'Results', component: () => {} },
	groups: { value: 4, name: 'Groups', component: () => {} },
}

function TabPanel(props) {
	const { children, value, index, ...other } = props

	return (
		<Typography
			component='div'
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</Typography>
	)
}

export default function CompetitionRouting({ match, history }) {
	const competition = useContext(CompetitionContext)
	const theme = useTheme()
	const largeScreen = useMediaQuery(theme.breakpoints.up('lg'))
	const mediumScreen = useMediaQuery(theme.breakpoints.up('md'))
	const classes = useStyles()
	const { loading, error, data } = useQuery(FIND_BY_COMPETITION_ID_QUERY, {
		variables: { competitionId: competition.competitionId },
	})

	const [value, setValue] = React.useState(match.params.tab || 'information')
	const handleChange = (_, newValue) => {
		const tab = competition.tabs[newValue]
		history.push(`/competitions/${competition.competitionId}/${tab}`)
		setValue(tab)
	}
	if (loading) return <LinearProgress />
	if (error) return <Error message={error.toString()} />

	return (
		<>
			<ElevatedTabs
				centered={largeScreen}
				variant={
					largeScreen ? 'standard' : mediumScreen ? 'fullWidth' : 'scrollable'
				}
				value={competition.tabs.indexOf(value)}
				onChange={handleChange}
				tabs={competition.tabs.map((tab, index) => ({
					key: tabs[tab].value,
					label: tabs[tab].name,
				}))}
			/>
			<SwipeableViews
				axis='x'
				index={tabs[value].value}
				onChangeIndex={(index) => handleChange({}, index)}
			>
				{competition.tabs.map((tab, index) => (
					<TabPanel
						value={tabs[value].value}
						index={tabs[tab].value}
						key={`tab-${index}`}
					>
						{tabs[tab].component}
					</TabPanel>
				))}
			</SwipeableViews>
		</>
	)
}

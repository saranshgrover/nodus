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
	const [value, setValue] = React.useState(match.params.tab || 'overview')
	const handleChange = (event, newValue) => {
		history.push(
			`/competitions/${
				competition.competitionId
			}/${event.target.innerText.toLowerCase()}`
		)
		setValue(event.target.innerText.toLowerCase())
	}
	if (loading) return <LinearProgress />
	if (error) return <Error message={error.toString()} />

	return (
		<>
			<AppBar position='static' color='primary'>
				<ElevatedTabs
					centered={largeScreen}
					variant={
						largeScreen ? 'standard' : mediumScreen ? 'fullWidth' : 'scrollable'
					}
					value={tabs[value].value}
					onChange={handleChange}
					tabs={Object.keys(tabs).map((tab, index) => ({
						key: index,
						label: tabs[tab].name,
					}))}
				/>
			</AppBar>
			{Object.keys(tabs).map((tab, index) => (
				<TabPanel value={tabs[value].value} index={index} key={`tab-${index}`}>
					{tabs[tab].component}
				</TabPanel>
			))}
		</>
	)
}

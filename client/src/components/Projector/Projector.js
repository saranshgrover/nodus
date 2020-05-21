import React, { useState, useEffect, useContext, useRef } from 'react'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import { getWcif } from '../../logic/wca-api'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Error from '../common/Error'
import LinearProgress from '../LinearProgress/LinearProgress'
import { makeStyles } from '@material-ui/core'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import TodayIcon from '@material-ui/icons/Today'
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk'
import InfoIcon from '@material-ui/icons/Info'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents'

import AgendaScreen from './Screens/AgendaScreen'
import GroupScreen from './Screens/GroupScreen'
import InfoScreen from './Screens/InfoScreen'
import ResultsScreen from './Screens/ResultsScreen'
import SpotlightScreen from './Screens/SpotlightScreen'
import { CompetitionContext } from '../../contexts/CompetitionContext'

const PROJECTOR_QUERY = gql`
	query getWcifByCompetitionId($_id: String!, $competitionId: String!) {
		getWcifById(_id: $_id) {
			_id
			name
			locationName
			registrationOpen
			registrationClose
			schedule {
				_id
				startDate
				numberOfDays
				venues {
					_id
					rooms {
						_id
						activities {
							_id
							name
							id
							startTime
							endTime
						}
					}
				}
			}
			events {
				_id
				id
			}
		}
		getTopCompetitors(top: 50, _id: $_id) {
			_id
			name
			wcaUserId
			wcaId
			personalBests {
				_id
				eventId
				best
				type
				worldRanking
			}
			avatar {
				url
				thumbUrl
			}
		}
		getOpenRounds(competitionId: $competitionId) {
			_id
			id
		}
	}
`

const useStyles = makeStyles((theme) => ({
	logo: {
		maxHeight: 150,
		maxWidth: 100,
	},
	section: {
		height: '100%',
	},
	root: {
		minWidth: '100%',
		height: '15%',
	},
	name: {
		fontSize: 'calc(16px + 5vh)',
	},
	icon: {
		fontSize: '8vmin',
	},
	label: {
		fontSize: '4vmin',
	},
	toolbar: theme.mixins.toolbar,
}))

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />
})

const ICON = {
	AGENDA: TodayIcon,
	COMPETING: DirectionsWalkIcon,
	INFO: InfoIcon,
	SPOTLIGHT: EmojiEventsIcon,
	RESULTS: EqualizerIcon,
}

const getIndex = (currentScreen, length) =>
	currentScreen === length - 1 ? 0 : currentScreen + 1
const DURATION = (screen) => {
	switch (screen) {
		case 'AGENDA':
			return 5000
		case 'COMPETING':
			return 6000
		case 'INFO':
			return 7000
		case 'SPOTLIGHT':
			return 7000
		case 'RESULTS':
			return 7000
		case undefined:
			return 2000
		default:
			return 5000
	}
}

export default function Projector({ match }) {
	const [screens] = useState([
		'AGENDA',
		'COMPETING',
		'INFO',
		'SPOTLIGHT',
		'RESULTS',
	])
	const [iteration, setIteration] = useState(0)
	const iterationRef = React.useRef(iteration)
	iterationRef.current = iteration
	useEffect(() => {
		const timeout = setInterval(() => {
			setIteration(iterationRef.current + 1)
		}, DURATION(screens[iterationRef.current % screens.length]))
		return () => {
			clearTimeout(timeout)
		}
	}, [match.params.compId, iteration, screens])
	const screenComponents = {
		AGENDA: AgendaScreen,
		COMPETING: GroupScreen,
		INFO: InfoScreen,
		SPOTLIGHT: SpotlightScreen,
		RESULTS: ResultsScreen,
	}
	const getComponentFromScreen = () => {
		const currIteration = Math.round(iteration / screens.length)
		const topCompetitors = data.getTopCompetitors
		const openRounds = data.getOpenRounds
		const currTopCompetitor =
			topCompetitors[currIteration % topCompetitors.length]
		const currOpenRound = openRounds[currIteration % openRounds.length]
		const ScreenComponent =
			screenComponents[screens[Math.round(iteration % screens.length)]]
		return (
			<ScreenComponent
				wcif={wcif}
				topCompetitors={currTopCompetitor}
				currOpenRound={currOpenRound}
			/>
		)
	}
	const { _id, competitionId } = useContext(CompetitionContext)
	const { data, loading, error } = useQuery(PROJECTOR_QUERY, {
		variables: { _id, competitionId },
	})
	const classes = useStyles()
	if (loading) return <LinearProgress />
	if (error) return <Error message={error.message} />
	const wcif = data.getWcifById
	return (
		<div>
			<Dialog fullScreen open={true} TransitionComponent={Transition}>
				<Grid
					className={classes.root}
					container
					justify='space-around'
					direction='row'
					alignItems='center'
				>
					<Grid item className={classes.section}>
						<br />
						<img
							className={classes.logo}
							src='https://www.worldcubeassociation.org/files/WCAlogo_notext.svg'
							alt='wca'
						/>
					</Grid>
					<Grid item>
						<Typography className={classes.name}>{wcif.name}</Typography>
					</Grid>
					<Grid item>
						<Tabs centered value={iteration % screens.length}>
							{screens.map((screen) => {
								const CurrIcon = ICON[screen]
								return (
									<Tab
										key={screen}
										label={
											<Typography className={classes.label}>
												{screen}
											</Typography>
										}
										icon={<CurrIcon className={classes.icon} />}
									/>
								)
							})}
						</Tabs>
					</Grid>
				</Grid>
				<div className={classes.toolbar} />
				<div>{getComponentFromScreen()}</div>
			</Dialog>
		</div>
	)
}

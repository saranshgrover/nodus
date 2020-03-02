import React, { useState, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import { getWcif } from '../../server/wca-api'
import Error from '../common/Error'
import {
  LinearProgress,
  makeStyles,
  Tab,
  Tabs,
  Typography,
  Grid
} from '@material-ui/core'

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

const useStyles = makeStyles(theme => ({
  logo: {
    maxHeight: 150,
    maxWidth: 100
  },
  section: {
    height: '100%'
  },
  root: {
    minWidth: '100%',
    height: '15%'
  },
  name: {
    fontSize: 'calc(16px + 5vh)'
  },
  icon: {
    fontSize: '8vmin'
  },
  label: {
    fontSize: '4vmin'
  },
  toolbar: theme.mixins.toolbar
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const ICON = {
  AGENDA: TodayIcon,
  COMPETING: DirectionsWalkIcon,
  INFO: InfoIcon,
  SPOTLIGHT: EmojiEventsIcon,
  RESULTS: EqualizerIcon
}

const getIndex = (currentScreen, length) =>
  currentScreen === length - 1 ? 0 : currentScreen + 1
const DURATION = screen => {
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
  const [loading, setLoading] = useState(true)
  const [wcif, setWcif] = useState(null)
  const [error, setError] = useState(null)
  const [screens] = useState([
    'AGENDA',
    'COMPETING',
    'INFO',
    'SPOTLIGHT',
    'RESULTS'
  ])
  const [currentScreen, setCurrentScreen] = useState(-1)
  const currentScreenRef = React.useRef(currentScreen)
  currentScreenRef.current = currentScreen
  const getScreenFromName = () => {
    switch (screens[currentScreen]) {
      case 'AGENDA':
        return <AgendaScreen wcif={wcif} />
      case 'COMPETING':
        return <GroupScreen wcif={wcif} />
      case 'INFO':
        return <InfoScreen wcif={wcif} />
      case 'SPOTLIGHT':
        return <SpotlightScreen wcif={wcif} />
      case 'RESULTS':
        return <ResultsScreen wcif={wcif} />
      default:
        return <Error />
    }
  }

  useEffect(() => {
    const timeout = setInterval(() => {
      getWcif(match.params.compId)
        .then(wcif => setWcif(wcif))
        .catch(err => setError(err.message))
      setCurrentScreen(getIndex(currentScreenRef.current, screens.length))
      setLoading(false)
    }, DURATION(screens[currentScreenRef.current]))
    return () => {
      clearTimeout(timeout)
    }
  }, [match.params.compId, currentScreen, screens])
  const classes = useStyles()
  return (
    <div>
      {loading && <LinearProgress />}
      {error && <Error message={error} />}
      {!loading && wcif && (
        <Dialog fullScreen open={true} TransitionComponent={Transition}>
          <Grid
            className={classes.root}
            container
            justify='space-around'
            direction='row'
            alignItems='center'
          >
            {/* <Grid item className={classes.section}>
              <br />
              <img
                className={classes.logo}
                src='https://www.worldcubeassociation.org/files/WCAlogo_notext.svg'
                alt='wca'
              />
            </Grid> */}
            <Grid item>
              <Typography className={classes.name}>{wcif.name}</Typography>
            </Grid>
            <Grid item>
              <Tabs centered value={currentScreen}>
                {screens.map(screen => {
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
          {getScreenFromName()}
        </Dialog>
      )}
    </div>
  )
}

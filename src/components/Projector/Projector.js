import React, { useState, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import { getWcif } from '../../server/wca-api'
import Error from '../common/Error'
import { LinearProgress } from '@material-ui/core'
import RoomScreen from './Screens/RoomScreen'
import GroupScreen from './Screens/GroupScreen'
import MessageScreen from './Screens/MessageScreen'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const DURATION = {
  ROOM: 90000,
  GROUP: 90000,
  MESSAGE: 30000
}

export default function Projector({ match }) {
  const getScreenFromName = name => {
    switch (name) {
      case 'ROOM':
        return <RoomScreen />
      case 'MESSAGE':
        return <MessageScreen />
      case 'GROUP':
        return <GroupScreen />
      default:
        return <div />
    }
  }
  const [loading, setLoading] = useState(true)
  const [wcif, setWcif] = useState(null)
  const [error, setError] = useState(null)
  const [screens] = useState(['ROOM', 'GROUP', 'MESSAGE'])
  const [currentScreen, setCurrentScreen] = useState(screens[0])

  const screenCallback = () => {
    setCurrentScreen()
  }
  const getScreen = () => {
    return getScreenFromName(currentScreen)
  }
  useEffect(() => {
    getWcif(match.params.compId)
      .then(wcif => setWcif(wcif))
      .catch(err => setError(err.message))
    setLoading(false)
  }, [match.params.compId])
  return (
    <div>
      {loading && <LinearProgress />}
      {error && <Error message={error} />}
      {!loading && wcif && (
        <Dialog
          fullScreen
          open={true}
          TransitionComponent={Transition}
        ></Dialog>
      )}
    </div>
  )
}

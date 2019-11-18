import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import { getWcif } from '../../server/wca-api'
import Error from '../common/Error'
import { LinearProgress, CircularProgress } from '@material-ui/core'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function FullScreenDialog({ match }) {
  const [loading, setLoading] = useState(true)
  const [wcif, setWcif] = useState(null)
  const [error, setError] = useState(null)
  const getScreen = () => {
    return <div>HELLO</div>
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
        <Dialog fullScreen open={true} TransitionComponent={Transition}>
          {getScreen()}
        </Dialog>
      )}
    </div>
  )
}

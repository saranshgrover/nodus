import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ProjectorAdmin from './ProjectorAdmin'
import GeneralAdmin from './GeneralAdmin'
import NotificationsAdmin from './NotificationsAdmin'
import Error from '../../common/Error'
import { getExtensionData } from '../../../server/wcif'
import { saveWcifChanges } from '../../../server/wca-api'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  mainLoader: {
    position: 'absolute',
    left: '55%',
    top: '50%'
  }
}))

export default function Admin({ user, wcif, setWcif }) {
  const classes = useStyles()
  const [localWcif, setLocalWcif] = useState(wcif)
  const [loading, setLoading] = useState(false)
  const onWcifUpdate = () => {
    setLoading(true)
    saveWcifChanges(wcif, localWcif)
      .then(() => {
        setWcif(localWcif)
        setLoading(false)
      })
      .catch(err => <Error message={err} />)
  }
  return (
    <div className={classes.root}>
      {loading && <CircularProgress size={50} className={classes.mainLoader} />}
      {!loading && user === 'admin' && (
        <>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography className={classes.heading}>General</Typography>
            </ExpansionPanelSummary>
            <GeneralAdmin
              wcif={localWcif}
              setWcif={setLocalWcif}
              updateGeneralConfig={onWcifUpdate}
            />
          </ExpansionPanel>
          <ExpansionPanel
            disabled={!getExtensionData('GeneralConfig', wcif).useProjector}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel2a-content'
              id='panel2a-header'
            >
              <Typography className={classes.heading}>
                Venue Configuration
              </Typography>
            </ExpansionPanelSummary>
            <ProjectorAdmin
              wcif={localWcif}
              setWcif={setLocalWcif}
              updateProjectorConfig={onWcifUpdate}
              venues={localWcif.schedule.venues}
              id={localWcif.id}
            />
          </ExpansionPanel>
          <ExpansionPanel
            disabled={!getExtensionData('GeneralConfig', wcif).useTelegramNotif}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel3a-content'
              id='panel3a-header'
            >
              <Typography className={classes.heading}>Notifications</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <NotificationsAdmin
                wcif={localWcif}
                setWcif={setLocalWcif}
                updateNotificationsConfig={onWcifUpdate}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </>
      )}
      {user !== 'admin' && <Error message={'You are not an administrator'} />}
    </div>
  )
}

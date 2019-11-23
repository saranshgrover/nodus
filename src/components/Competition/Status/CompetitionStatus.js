import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import InfoIcon from '@material-ui/icons/Info'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import { makeStyles } from '@material-ui/core'
import { getDelays } from '../Overview/OverviewLogic'

const useStyles = makeStyles(theme => ({
  paper: {
    width: '100%',
    maxHeight: '100%',
    overflow: 'auto',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3)
  }
}))

export default function CompetitionStatus({ wcif }) {
  const roomDelays = getDelays(wcif.schedule)

  const classes = useStyles()
  return (
    <Paper className={classes.paper}>
      {wcif.schedule.venues.map(venue =>
        venue.rooms.map(room => {
          if (roomDelays[room.id] > 0)
            return (
              <Grid container spacing={2} key={room.id} alignItems='center'>
                <Grid item>
                  <InfoIcon style={{ color: room.color }} fontSize='large' />
                </Grid>
                <Grid item>
                  <Typography>
                    {`${room.name} is currently delayed by ${
                      roomDelays[room.id]
                    } minute(s).`}
                  </Typography>
                </Grid>
              </Grid>
            )
          else return <React.Fragment key={room.id}></React.Fragment>
        })
      )}
      {roomDelays.filter(delay => delay !== 0).length === 0 && (
        <Grid container spacing={2} alignItems='center'>
          <Grid item>
            <DoneAllIcon style={{ color: '#00ff00' }} fontSize='large' />
          </Grid>
          <Grid item>
            <Typography>{`${wcif.name} is running on schedule!`}</Typography>
          </Grid>
        </Grid>
      )}
    </Paper>
  )
}

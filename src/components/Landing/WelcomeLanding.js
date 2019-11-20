import React, { Component } from 'react'
import { Typography, Box, makeStyles, Grid, Divider } from '@material-ui/core'
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid'

const useStyles = makeStyles(theme => ({
  box: {
    borderRadius: '25px',
    margin: 'auto',
    height: '80vh',
    maxWidth: '80%',
    padding: theme.spacing(2)
  },
  icon: {
    fontSize: '4vmax'
  },
  grid: {
    padding: theme.spacing(3)
  }
}))
export default function WelcomeLanding() {
  const classes = useStyles()
  return (
    <>
      <Box className={classes.box} bgcolor='background.paper'>
        <Grid
          container
          className={classes.grid}
          direction='column'
          alignItems='center'
          spacing={1}
        >
          <Grid item>
            <FlipCameraAndroidIcon className={classes.icon} />
          </Grid>
          <Grid item>
            <Typography color='textPrimary' variant='h2'>{`myComp`}</Typography>
          </Grid>
          <Grid item>
            <Typography color='textSecondary' variant='subtitle2'>
              {`Live WCA Competition Feedback Software`}
            </Typography>
          </Grid>
        </Grid>
        <Divider />
      </Box>
    </>
  )
}

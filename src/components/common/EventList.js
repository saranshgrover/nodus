import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid, IconButton } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  icon: {
    fontSize: 20,
    padding: theme.spacing(1),
    '&:hover': {
      opacity: 0.7,
      color: theme.palette.primary.main
    }
  },
  iconSelect: {
    fontSize: 20,
    padding: theme.spacing(1),
    color: theme.palette.primary.main,
    '&:hover': {
      opacity: 0.7
    }
  }
}))

export default function EventList({
  selected = [],
  onClick,
  justify,
  events,
  alignment = 'row',
  size = 2,
  user = 'spectator',
  userInfo
}) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container direction={alignment} justify={justify}>
        {events.map(event => (
          <Grid item key={event}>
            <IconButton variant='inherit' onClick={() => onClick(event)}>
              <span
                className={
                  (!selected.includes(event)
                    ? classes.iconSelect
                    : classes.icon) + ` cubing-icon event-${event}`
                }
              />
            </IconButton>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

import React from 'react'
import Chip from '@material-ui/core/Chip'
import Grid from '@material-ui/core/Grid'

export default function OverviewFilterChips({ venues }) {
  const duties = ['Compete', 'Judge', 'Run', 'Scramble']
  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        {venues.map(venue =>
          venue.rooms.map(room => (
            <Chip
              clickable
              key={room.id}
              label={room.name}
              color='primary'
              style={{ backgroundColor: room.color }}
            />
          ))
        )}
      </Grid>
      <Grid item>
        {duties.map(duty => (
          <Chip clickable key={duty} label={duty} color='secondary' />
        ))}
      </Grid>
    </Grid>
  )
}

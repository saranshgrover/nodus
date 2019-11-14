import React from 'react'
import Chip from '@material-ui/core/Chip'
import Grid from '@material-ui/core/Grid'
import { assignedTo } from './OverviewLogic'

export default function OverviewFilterChips({
  venues,
  unselectedRooms,
  setUnselectedRooms,
  unselectedAssignments,
  setUnselectedAssignments
}) {
  const duties = [
    'competitor',
    'staff-judge',
    'staff-runner',
    'staff-scrambler'
  ]
  const updateSelectedRooms = roomId => {
    unselectedRooms.includes(roomId)
      ? setUnselectedRooms(unselectedRooms.filter(room => room !== roomId))
      : setUnselectedRooms([...unselectedRooms, roomId])
  }
  const updateSelectedAssignments = name => {
    unselectedAssignments.includes(name)
      ? setUnselectedAssignments(
          unselectedAssignments.filter(assignment => assignment !== name)
        )
      : setUnselectedAssignments([...unselectedAssignments, name])
  }
  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        {venues.map(venue =>
          venue.rooms.map(room => (
            <Chip
              clickable
              onClick={() => updateSelectedRooms(room.id)}
              key={room.id}
              label={room.name}
              style={
                unselectedRooms.includes(room.id)
                  ? {}
                  : { backgroundColor: room.color }
              }
            />
          ))
        )}
      </Grid>
      <Grid item>
        {duties.map(duty => (
          <Chip
            clickable
            onClick={() => updateSelectedAssignments(duty)}
            key={duty}
            label={assignedTo(duty)}
            color={unselectedAssignments.includes(duty) ? 'default' : 'primary'}
          />
        ))}
      </Grid>
    </Grid>
  )
}

import React, { useState } from 'react'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Button from '@material-ui/core/Button'
import FormGroup from '@material-ui/core/FormGroup'
import TextField from '@material-ui/core/TextField'
import { getRoomColors } from '../../../server/wcif'
import { Typography } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { mapIn } from '../../../server/tools'
import ProjectorRoomAdmin from './ProjectorRoomAdmin'
/*
TODO: Implement A COLOR PICKER for rooms
*/

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  title: {
    margin: theme.spacing(3),
    textAlign: 'center'
  },
  group: {
    justifyContent: 'center'
  },
  link: {
    justifyContent: 'center',
    maxWidth: 200
  }
}))

export default function ProjectorAdmin({
  wcif,
  setWcif,
  updateProjectorConfig,
  venues,
  id
}) {
  const projectorConfigUpdate = newRoom => {
    console.log(newRoom)
    setWcif(
      mapIn(wcif, ['schedule', 'venues'], venue =>
        mapIn(venue, ['rooms'], room =>
          room.id === newRoom.id ? newRoom : room
        )
      )
    )
  }
  const saveWcif = () => {
    updateProjectorConfig()
  }
  const classes = useStyles()
  return (
    <>
      <ExpansionPanelDetails>
        <FormGroup>
          {venues.map(venue =>
            venue.rooms.map(room => (
              <ProjectorRoomAdmin
                key={room.id}
                room={room}
                onRoomChange={projectorConfigUpdate}
              />
            ))
          )}
          <Typography className={classes.title} variant='h6' gutterBottom>
            Link to Projector Screens
          </Typography>
          <ButtonGroup className={classes.group}>
            <Button
              className={classes.link}
              variant='outlined'
              href={`/project/${id}/all`}
            >
              Slideshow
            </Button>
            <Button
              className={classes.link}
              variant='outlined'
              href={`/project/${id}/pin`}
            >
              Pinned Messages
            </Button>
            {venues.map(venue =>
              venue.rooms.map(room => (
                <Button
                  className={classes.link}
                  key={room.id}
                  variant='outlined'
                  href={`/project/${room.id}`}
                >
                  {room.name}
                </Button>
              ))
            )}
          </ButtonGroup>
        </FormGroup>
      </ExpansionPanelDetails>
      <ExpansionPanelActions>
        <Button size='small' color='primary' onClick={() => saveWcif()}>
          Save
        </Button>
      </ExpansionPanelActions>
    </>
  )
}

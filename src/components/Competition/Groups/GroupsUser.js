import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import 'moment-timezone'
import {
  getMyAssignmentsInOrder,
  getScheduleData,
  flattenActivities,
  assignedTo,
  getEventFromActivity,
  getGroupFromActivity,
  getDelays
} from '../Overview/OverviewLogic'

import Table from '@material-ui/core/Table'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import {
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid
} from '@material-ui/core'

import InfoIcon from '@material-ui/icons/Info'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import DoneAllIcon from '@material-ui/icons/DoneAll'

import Error from '../../common/Error'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  paper: {
    width: '100%',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3)
  },
  text: {
    margin: theme.spacing(3)
  },
  table: {
    overflowX: 'auto'
  },
  link: {
    color: theme.palette.primary.light,
    textDecoration: 'none'
  }
}))
export default function GroupsUser({ WCAID, match, userInfo, wcif }) {
  console.log(userInfo)
  // TODO: FIX ON MOBILE
  const wcaId = match ? match.params.wcaId : WCAID ? WCAID : null
  const myAssignments = getMyAssignmentsInOrder(wcaId, wcif)
  const user = wcif.persons.find(
    person => person.wcaId === wcaId || person.wcaUserId === parseInt(wcaId)
  )
  const mySchedule =
    myAssignments &&
    getScheduleData([], [], [], myAssignments, flattenActivities(wcif.schedule))
  const classes = useStyles()
  const roomDelays = getDelays(wcif.schedule)
  return (
    <>
      {myAssignments === null ? (
        <Error message={'Invalid ID'} />
      ) : (
        <Grid item className={classes.root} xs={12}>
          <Typography
            className={classes.text}
            align='center'
            variant='h3'
            component='h1'
          >
            {user.name}
          </Typography>
          <Typography
            className={classes.text}
            align='center'
            variant='h4'
            component='h1'
          >
            {user.wcaId}
          </Typography>
          <Paper className={classes.paper}>
            {wcif.schedule.venues.map(venue =>
              venue.rooms.map(room => {
                if (roomDelays[room.id] > 0)
                  return (
                    <Grid
                      container
                      spacing={2}
                      key={room.id}
                      alignItems='center'
                    >
                      <Grid item>
                        <InfoIcon
                          style={{ color: room.color }}
                          fontSize='large'
                        />
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
                  <Typography>
                    {`${wcif.name} is running on schedule!`}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Paper>
          <Paper className={classes.paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell size='small'>
                    <Typography>{`Time`} </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{`Event`} </Typography>
                  </TableCell>
                  <TableCell size='small'>
                    <Typography>{`Group`} </Typography>
                  </TableCell>
                  <TableCell size='small'>
                    <Typography>{`Activity`} </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{`Room`} </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mySchedule &&
                  mySchedule.map(assignment => (
                    <TableRow key={assignment.title}>
                      <TableCell>
                        <Typography>
                          {moment(assignment.startDate)
                            .tz(wcif.schedule.venues[0].timezone)
                            .format('hh:mm a')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>
                          {getEventFromActivity(
                            assignment.activity.activityCode
                          )}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Link
                          className={classes.link}
                          to={`/competitions/${wcif.id}/groups/${assignment.activity.room.id}/${assignment.activity.activityCode}`}
                        >
                          <Typography>
                            {getGroupFromActivity(
                              assignment.activity.activityCode
                            )}
                          </Typography>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Typography>
                          {assignedTo(assignment.assignmentCode)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Grid container alignItems='center'>
                          <Grid item>
                            <Typography>
                              {assignment.activity.room.name}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <FiberManualRecordIcon
                              style={{
                                fontSize: '50px',
                                color: assignment.activity.room.color
                              }}
                            />
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      )}
    </>
  )
}

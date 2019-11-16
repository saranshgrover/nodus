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
  getGroupFromActivity
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

import Error from '../../common/Error'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  paper: {
    width: '100%'
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
export default function GroupsUser({ match, userInfo, wcif }) {
  console.log(userInfo)
  // TODO: FIX ON MOBILE
  const myAssignments = getMyAssignmentsInOrder(match.params.wcaId, wcif)
  const user = wcif.persons.find(
    person =>
      person.wcaId === match.params.wcaId ||
      person.wcaUserId === parseInt(match.params.wcaId)
  )
  const mySchedule =
    myAssignments &&
    getScheduleData([], [], [], myAssignments, flattenActivities(wcif.schedule))
  const classes = useStyles()
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
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell size='small'> Time </TableCell>
                  <TableCell> Event </TableCell>
                  <TableCell size='small'> Group </TableCell>
                  <TableCell size='small'> Activity </TableCell>
                  <TableCell> Room </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mySchedule &&
                  mySchedule.map(assignment => (
                    <TableRow key={assignment.title}>
                      <TableCell>
                        {moment(assignment.startDate)
                          .tz(wcif.schedule.venues[0].timezone)
                          .format('hh:mm a')}
                      </TableCell>
                      <TableCell>
                        {getEventFromActivity(assignment.activity.activityCode)}
                      </TableCell>
                      <TableCell>
                        <Link
                          className={classes.link}
                          to={`/competitions/${wcif.id}/groups/${assignment.activity.room.id}/${assignment.activity.activityCode}`}
                        >
                          {getGroupFromActivity(
                            assignment.activity.activityCode
                          )}
                        </Link>
                      </TableCell>

                      <TableCell>
                        {assignedTo(assignment.assignmentCode)}{' '}
                      </TableCell>
                      <TableCell
                        style={{
                          backgroundColor: assignment.activity.room.color
                        }}
                      >
                        {' '}
                        {assignment.activity.room.name}{' '}
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

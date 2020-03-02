import React from 'react'
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
import { activityUrl } from '../../logic/activity'

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

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'

import Error from '../../common/Error'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  paper: {
    width: '100%',
    maxHeight: '100%',
    overflow: 'auto',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3)
  },
  text: {
    margin: theme.spacing(3)
  },
  tableCell: {
    paddingRight: 4,
    paddingLeft: 5
  },
  link: {
    color: theme.palette.primary.light,
    textDecoration: 'none'
  }
}))
export default function GroupsUser({ wcaId, userInfo, wcif }) {
  const myAssignments = getMyAssignmentsInOrder(wcaId, wcif)
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
          <Paper className={classes.paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableCell} size='small'>
                    <Typography>{`Time`} </Typography>
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <Typography>{`Event`} </Typography>
                  </TableCell>
                  <TableCell className={classes.tableCell} size='small'>
                    <Typography>{`Group`} </Typography>
                  </TableCell>
                  <TableCell className={classes.tableCell} size='small'>
                    <Typography>{`Activity`} </Typography>
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <Typography>{`Room`} </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mySchedule &&
                  mySchedule.map(assignment => (
                    <TableRow key={assignment.title}>
                      <TableCell className={classes.tableCell}>
                        <Typography>
                          {moment(assignment.startDate)
                            .tz(wcif.schedule.venues[0].timezone)
                            .format('hh:mm a')}
                        </Typography>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        <Typography>
                          {getEventFromActivity(
                            assignment.activity.activityCode
                          )}
                        </Typography>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        <Link
                          className={classes.link}
                          to={`/competitions/${
                            wcif.id
                          }/groups/events/${activityUrl(
                            assignment.activity.activityCode
                          )}`}
                        >
                          <Typography>
                            {getGroupFromActivity(
                              assignment.activity.activityCode
                            )}
                          </Typography>
                        </Link>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        <Typography>
                          {assignedTo(assignment.assignmentCode)}
                        </Typography>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
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

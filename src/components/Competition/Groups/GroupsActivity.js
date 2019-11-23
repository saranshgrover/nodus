import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  getActivityIdFromCode,
  getAssignmentsFromActivityId,
  flattenActivities,
  getPersonalBestFromActivity,
  assignedTo
} from '../Overview/OverviewLogic'

import {
  LinearProgress,
  Typography,
  TableHead,
  TableRow,
  Table,
  TableCell,
  TableBody,
  makeStyles
} from '@material-ui/core'

import Error from '../../common/Error'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    margin: theme.spacing(3)
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.light
  },
  top: {
    margin: 'auto',
    backgroundColor: theme.palette.primary.main
  },
  header: {
    backgroundColor: theme.palette.secondary.main
  },
  text: {
    margin: theme.spacing(3)
  },
  table: {
    margin: 'auto',
    maxWidth: 800
  },
  tableCell: {
    paddingRight: 4,
    paddingLeft: 5
  }
}))

export default function GroupsActivity({
  event,
  round,
  group,
  activities,
  history,
  wcif
}) {
  const activityCode = `${event}-r${round}-g${group}`

  const activity = getActivityIdFromCode(activityCode, activities)
  const [loading, setLoading] = useState(true)
  const [groupInfo, setGroupInfo] = useState([])
  useEffect(() => {
    setGroupInfo(
      getAssignmentsFromActivityId(
        getActivityIdFromCode(activityCode, activities).id,
        wcif
      )
    )
    setLoading(false)
  }, [wcif, activities, activityCode])
  const classes = useStyles()
  return (
    <>
      {loading && <LinearProgress />}
      {!loading && groupInfo[0].length > 0 && (
        <Table size='small' className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.top} align='center' colSpan={5}>
                <Typography> Competitors </Typography>
              </TableCell>
            </TableRow>
            <TableRow className={classes.header}>
              <TableCell className={classes.tableCell}>
                <Typography>Competitor</Typography>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Typography>WCA ID</Typography>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Typography>Seed Time</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groupInfo[0].map(competitor => (
              <TableRow key={competitor.wcaUserId}>
                <TableCell className={classes.tableCell}>
                  <Link
                    className={classes.link}
                    to={`/competitions/${wcif.id}/groups/competitors/${
                      competitor.wcaId ? competitor.wcaId : competitor.wcaUserId
                    }`}
                  >
                    <Typography> {competitor.name}</Typography>
                  </Link>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <Typography>
                    {competitor.wcaId ? competitor.wcaId : '-'}
                  </Typography>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <Typography>
                    {getPersonalBestFromActivity(
                      competitor,
                      activity.activityCode
                    )}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableHead>
            <TableRow>
              <TableCell className={classes.top} align='center' colSpan={5}>
                <Typography> Staff </Typography>
              </TableCell>
            </TableRow>
            <TableRow className={classes.header}>
              <TableCell className={classes.tableCell}>
                <Typography> Competitor </Typography>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Typography> WCA ID </Typography>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Typography> Duty </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groupInfo[1].map(competitor => (
              <TableRow key={competitor.wcaUserId}>
                <TableCell className={classes.tableCell}>
                  <Link
                    className={classes.link}
                    to={`/competitions/${wcif.id}/groups/competitors/${
                      competitor.wcaId ? competitor.wcaId : competitor.wcaUserId
                    }`}
                  >
                    <Typography>{competitor.name}</Typography>
                  </Link>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <Typography>{competitor.wcaId}</Typography>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <Typography>
                    {assignedTo(
                      competitor.assignments.find(
                        assignment => assignment.activityId === activity.id
                      ).assignmentCode
                    )}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      {!loading && groupInfo[0].length === 0 && (
        <Error message='Group is Invalid or has not begun' />
      )}
    </>
  )
}

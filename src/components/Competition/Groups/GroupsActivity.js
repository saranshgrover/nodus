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
  Grid,
  makeStyles,
  Tooltip,
  IconButton
} from '@material-ui/core'

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'

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
  }
}))

export default function GroupsActivity({ match, userInfo, wcif }) {
  const { activityCode } = match.params
  const activity = getActivityIdFromCode(
    activityCode,
    flattenActivities(wcif.schedule)
  )
  const [loading, setLoading] = useState(true)
  const [groupInfo, setGroupInfo] = useState([])
  useEffect(() => {
    setGroupInfo(
      getAssignmentsFromActivityId(
        getActivityIdFromCode(activityCode, flattenActivities(wcif.schedule))
          .id,
        wcif
      )
    )
    setLoading(false)
  }, [activityCode, wcif])
  const classes = useStyles()
  return (
    <>
      {loading && <LinearProgress />}
      {!loading && groupInfo[0] && (
        <div className={classes.root}>
          <Grid container spacing={2} alignItems='center' justify='center'>
            <Grid item>
              <Tooltip
                disableFocusListener
                disableTouchListener
                placement='top'
                title={`${activity.room.name}`}
              >
                <IconButton>
                  <FiberManualRecordIcon
                    style={{ color: activity.room.color, fontSize: '60px' }}
                  />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Typography
                className={classes.text}
                align='center'
                variant='h4'
                component='h1'
              >
                {activity.name}
              </Typography>
            </Grid>
          </Grid>
          <Table size='small' className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.top} align='center' colSpan={5}>
                  <Typography> Competitors </Typography>
                </TableCell>
              </TableRow>
              <TableRow className={classes.header}>
                <TableCell>
                  <Typography>Competitor</Typography>
                </TableCell>
                <TableCell>
                  <Typography>WCA ID</Typography>
                </TableCell>
                <TableCell>
                  <Typography>Seed Time</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groupInfo[0].map(competitor => (
                <TableRow key={competitor.wcaUserId}>
                  <TableCell>
                    <Link
                      className={classes.link}
                      to={`/competitions/${wcif.id}/groups/${
                        competitor.wcaId
                          ? competitor.wcaId
                          : competitor.wcaUserId
                      }`}
                    >
                      <Typography> {competitor.name}</Typography>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Typography>{competitor.wcaId}</Typography>
                  </TableCell>
                  <TableCell>
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
                <TableCell>
                  <Typography> Competitor </Typography>
                </TableCell>
                <TableCell>
                  <Typography> WCA ID </Typography>
                </TableCell>
                <TableCell>
                  <Typography> Duty </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groupInfo[1].map(competitor => (
                <TableRow key={competitor.wcaUserId}>
                  <TableCell>
                    {console.log(competitor)}
                    <Link
                      className={classes.link}
                      to={`/competitions/${wcif.id}/groups/${
                        competitor.wcaId
                          ? competitor.wcaId
                          : competitor.wcaUserId
                      }`}
                    >
                      <Typography>{competitor.name}</Typography>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Typography>{competitor.wcaId}</Typography>
                  </TableCell>
                  <TableCell>
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
        </div>
      )}
    </>
  )
}

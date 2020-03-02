import React, { useState, useEffect } from 'react'
import moment from 'moment'
import {
  makeStyles,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Typography
} from '@material-ui/core'
import Error from '../../common/Error'
import { parseGroupFromActivity, getGroupsOf } from '../../logic/activity'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    margin: theme.spacing(3)
  },
  link: {
    color: theme.palette.primary.light,
    cursor: 'pointer'
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
    margin: 'auto'
  },
  tableCell: {
    paddingRight: 4,
    paddingLeft: 5
  }
}))

export default function GroupsRound({
  history,
  setGroup,
  event,
  round,
  activities,
  wcif
}) {
  const handleChangeGroup = group => {
    setGroup(group)
    history.push(
      `/competitions/${wcif.id}/groups/events/${event}/${round}/${group}`
    )
  }
  const [groups, setGroups] = useState(null)
  useEffect(() => {
    const activity = `${event}-r${round}`
    const groups = getGroupsOf(activity, activities)
    groups.sort((a, b) =>
      a.startTime > b.startTime ? 1 : b.startTime > a.startTime ? -1 : 0
    )
    setGroups(groups)
  }, [activities, event, round])
  const classes = useStyles()
  return (
    <>
      {groups && groups.length > 0 ? (
        <Table size='small' className={classes.table}>
          <TableHead>
            <TableRow className={classes.header}>
              <TableCell className={classes.tableCell}>
                <Typography>Group</Typography>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Typography>Room</Typography>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <Typography>Start Time</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groups.map((group, index) => (
              <TableRow key={index}>
                <TableCell className={classes.tableCell}>
                  <Typography
                    onClick={() =>
                      handleChangeGroup(parseGroupFromActivity(group.activity))
                    }
                    className={classes.link}
                  >
                    {`Group ${parseGroupFromActivity(group.activity)}`}
                  </Typography>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <Typography> {group.room}</Typography>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <Typography>
                    {moment.utc(group.startTime).format('hh:mm a')}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Error message={'Invalid Group'} />
      )}
    </>
  )
}

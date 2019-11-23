import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  makeStyles,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Typography,
  LinearProgress
} from '@material-ui/core'
import Error from '../../common/Error'
import { activityKey } from '../Overview/OverviewLogic'
import { parseRoundFromActivity } from '../../logic/activity'
import { parseAdvancementCondition, parseCutoff } from '../../logic/event'

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

export default function GroupsEvent({
  history,
  setRound,
  events,
  event,
  wcif
}) {
  const [eventInfo, setEventInfo] = useState(null)
  const handleChangeRound = round => {
    setRound(round)
    history.push(`/competitions/${wcif.id}/groups/events/${event}/${round}`)
  }
  useEffect(() => {
    const localEvent = wcif.events.find(e => e.id === event)
    setEventInfo(localEvent)
  }, [])

  const classes = useStyles()
  return (
    <>
      {events.includes(event) ? (
        eventInfo ? (
          <Table size='small' className={classes.table}>
            <TableHead>
              <TableRow className={classes.header}>
                <TableCell className={classes.tableCell}>
                  <Typography>Round</Typography>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <Typography>Cutoff</Typography>
                </TableCell>
                <TableCell className={classes.tableCell}>
                  <Typography>Advancement Conditon</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {eventInfo.rounds.map(round => (
                <TableRow key={round.id}>
                  <TableCell className={classes.tableCell}>
                    <Typography
                      className={classes.link}
                      onClick={() =>
                        handleChangeRound(parseRoundFromActivity(round.id))
                      }
                    >
                      {`Round ${parseRoundFromActivity(round.id)}`}
                    </Typography>
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <Typography>
                      {round.cutoff ? parseCutoff(round.cutoff) : 'None'}
                    </Typography>
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <Typography>
                      {parseAdvancementCondition(round.advancementCondition)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <LinearProgress />
        )
      ) : (
        <Error message={'Invalid Event'} />
      )}
    </>
  )
}

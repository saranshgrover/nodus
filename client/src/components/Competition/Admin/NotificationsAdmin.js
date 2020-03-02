import React from 'react'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import FormGroup from '@material-ui/core/FormGroup'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'

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

export default function NotificationsAdmin({
  wcif,
  setWcif,
  updateProjectorConfig,
  venues,
  id
}) {
  const classes = useStyles()
  return (
    <>
      <ExpansionPanelDetails>
        <FormGroup>
          <Typography>
            {`You can use a telegram channel for live automated notifications to
            all competitiors. This isn't 100% integrated yet - but you can find
            out more on how to `}
            <Link href='https://github.com/saranshgrover/WCANotifiBot/wiki/How-to-use-WCA-Notification-Bot'>
              {`here`}
            </Link>
          </Typography>
          <Typography>
            {`Link competitiors to this link: `}
            <Link href={`https://t.me/${wcif.id}`}>{`t.me/${wcif.id}`} </Link>
          </Typography>
        </FormGroup>
      </ExpansionPanelDetails>
    </>
  )
}

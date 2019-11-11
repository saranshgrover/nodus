import React from 'react'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import NotificationsIcon from '@material-ui/icons/Notifications'
import AppsIcon from '@material-ui/icons/Apps'
import VideocamIcon from '@material-ui/icons/Videocam'
import GroupIcon from '@material-ui/icons/Group'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import NotesIcon from '@material-ui/icons/Notes'

export default function DashboardList({ user, onClick }) {
  const getIcon = text => {
    switch (text) {
      case 'Projector':
        return <VideocamIcon />
      case 'Groups':
        return <GroupIcon />
      case 'Notifications':
        return <NotificationsIcon />
      case 'Admin':
        return <SupervisorAccountIcon />
      case 'Incidents':
        return <NotesIcon />
      default:
        return <AppsIcon />
    }
  }
  return (
    <>
      <Divider />
      <List>
        {['Overview', 'Projector', 'Notifications', 'Groups'].map(text => (
          <ListItem button key={text} onClick={() => onClick(text)}>
            <ListItemIcon>{getIcon(text)}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      {user === 'admin' && (
        <List>
          {['Admin', 'Incidents'].map(text => (
            <ListItem button key={text} onClick={() => onClick(text)}>
              <ListItemIcon>{getIcon(text)}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      )}
    </>
  )
}

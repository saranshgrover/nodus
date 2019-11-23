import React from 'react'
import { Link } from 'react-router-dom'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'

export default function CompetitorList({ onClick, competitors }) {
  return (
    <Paper style={{ width: '40%' }}>
      <List>
        {competitors.map(competitor => (
          <ListItem
            button
            onClick={e => onClick(e, competitor)}
            key={competitor.wcaUserId}
            style={{ textAlign: 'center' }}
          >
            <ListItemAvatar>
              <Avatar
                style={{
                  width: 60,
                  height: 60
                }}
                alt={competitor.name}
                src={competitor.avatar.thumbUrl}
              />
            </ListItemAvatar>
            <ListItemText
              primary={competitor.name}
              secondary={
                competitor.wcaId ? competitor.wcaId : competitor.wcaUserId
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}

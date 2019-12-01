import React, { useState } from 'react'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    overflow: 'auto'
  },
  list: {
    height: '400',
    textAlign: 'center'
  }
}))

export default function CompetitorList({ onClick, competitors }) {
  console.log(competitors)
  const classes = useStyles()
  const [query, setQuery] = useState('')
  const [queryCompetitors, setQueryCompetitors] = useState(competitors)
  const handleSearchChange = event => {
    const query = event.target.value
    setQuery(query)
    query === ''
      ? setQueryCompetitors(competitors)
      : setQueryCompetitors(
          competitors.filter(
            competitor =>
              competitor.name.toLowerCase().includes(query.toLowerCase()) ||
              (competitor.wcaId &&
                competitor.wcaId.includes(query.toUpperCase()))
          )
        )
  }
  return (
    <Paper className={classes.paper}>
      <List className={classes.list}>
        <ListItem className={classes.list}>
          <TextField
            value={query}
            onChange={handleSearchChange}
            fullWidth={true}
            label='Search'
            id='outlined-basic'
          ></TextField>
        </ListItem>
        {queryCompetitors.map(competitor => (
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

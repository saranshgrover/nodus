import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';


export default function CompListUpcoming({myUpcomingComps, myManagableComps}) {
  return (
    <Paper>
        <List subheader={<ListSubheader>Upcoming Competitions</ListSubheader>}>
        {myUpcomingComps.map( comp => {
            return(
            <ListItem key={comp.id} button component={Link} to={`/competitions/${comp.id}`} >
                <ListItemText primary={comp.name} secondary={comp.start_date} />
            </ListItem>    
        )})}
        </List>
    </Paper>
  );
}
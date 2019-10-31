import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header({ signFunction, isSignedIn, infoReceived, userInfo }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            WCA Real Time
          </Typography>
          <Button onClick={signFunction} color="inherit" disableRipple>
            {isSignedIn && infoReceived
            ? `Hello, ${userInfo.me.name}`
            : 'Login'}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
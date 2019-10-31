import React, { Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { signIn } from '../../server/auth';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
  titleIcon: {
    marginRight: theme.spacing(2),
  },
  username: {
    marginRight: theme.spacing(1),
  },
}));

const Header = ({ userInfo, onSignIn, onSignOut }) => {
  const classes = useStyles();
  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          WCA Real Time
        </Typography>
        {userInfo ? (
          <Fragment>
            <Typography variant="subtitle1" className={classes.username}>
              {userInfo.name}
            </Typography>
            <Button color="inherit" onClick={onSignOut}>
              Hello, {userInfo.me.name}
            </Button>
          </Fragment>
        ) : (
          <Button color="inherit" onClick={onSignIn}>
            Sign in with the WCA
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { signIn, isSignedIn } from '../../server/auth'
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid'
import MenuIcon from '@material-ui/icons/Menu'
import { isMobile } from 'react-device-detect'

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  title: {
    textDecoration: 'none',
    color: 'white',
    flexGrow: 1,
    marginLeft: theme.spacing(1)
  },
  titleIcon: {
    marginRight: theme.spacing(2)
  },
  username: {
    marginRight: theme.spacing(1)
  }
}))

const Header = ({ history, setMobileOpen, userInfo, onSignOut }) => {
  const classes = useStyles()
  return (
    <AppBar position='sticky' color='primary' className={classes.appBar}>
      <Toolbar spacing={2} className={classes.titleIcon}>
        {isMobile && (
          <IconButton onClick={setMobileOpen} className={classes.titleIcon}>
            <MenuIcon size={10} />
          </IconButton>
        )}
        <FlipCameraAndroidIcon />
        <Typography
          variant='h6'
          className={classes.title}
          component={Link}
          to={'/'}
        >
          myComp
        </Typography>
        {userInfo && isSignedIn() ? (
          <Fragment>
            <Button color='inherit' onClick={onSignOut}>
              {userInfo.me.name}
            </Button>
          </Fragment>
        ) : (
          <Button color='inherit' onClick={signIn}>
            Sign in with the WCA
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header

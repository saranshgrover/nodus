// eslint-disable-next-line no-unused-vars
import React, {Component, useState} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { isSignedIn, signOut } from '../../server/auth'
import WelcomeLanding from './WelcomeLanding'
import LandingSignedIn from './LandingSignedIn'
import CssBaseline from '@material-ui/core/CssBaseline'
import Header from '../common/Header'
import Footer from '../common/Footer'
import { ThemeProvider } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import grey from '@material-ui/core/colors/grey';
import blueGrey from '@material-ui/core/colors/blueGrey';
import blue from '@material-ui/core/colors/blue';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

  const theme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: blue[200],
      },
      secondary: blueGrey,
    },
  });

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      minHeight: '100vh',
      flexDirection: 'column',
    },
    grow: {
      flexGrow: 1,
    },
    main: {
      padding: theme.spacing(2),
    },
    footer: {
      root: {
        padding: theme.spacing(2),
        //position: 'absolute',
        bottom: "0",
        width: "100%",
      },
      icon: {
        verticalAlign: 'middle',
      },
      grow: {
        flexGrow: 1,
      },
      link: {
        verticalAlign: 'middle',
        fontWeight: 500,
        color: grey['900'],
        '&:hover': {
          textDecoration: 'none',
          opacity: 0.7,
        },
      },
    }
  }));

 const App = ({userInfo}) =>  {
   const classes = useStyles()
   const [signedIn,setSignedIn] = useState(isSignedIn())
   const handleSignOut = () => {
     signOut()
     setSignedIn(false)
     setUser(null)
   }
   const [user,setUser] = useState(userInfo)
    return (
      <Router>
        <ThemeProvider theme={theme}>
          <div className={classes.root}>
            <CssBaseline/>
            <Header isSignedIn={signedIn} onSignOut={handleSignOut} userInfo={user} />
            <Grid container justify="center" className={classes.grow}>
            <Grid item xs={12} md={8} xl={6} className={classes.main} >
              {signedIn ? (
                <Switch>
              {<Route path="/" render={(props)=> <LandingSignedIn {...props} userInfo={user}/>} />}
                  <Redirect to="/" />
                </Switch>
              ) : (
                <Switch>
                  <Route exact path="/" component={WelcomeLanding} />
                  <Redirect to="/" />
                </Switch>
              )}
            </Grid>
              </Grid>
            
            <Footer className={classes.footer}/>
          </div>
          </ThemeProvider>
        </Router>
    );
  }

export default App
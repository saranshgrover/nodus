import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import Header from '../common/Header'
import Footer from '../common/Footer'

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import blue from '@material-ui/core/colors/blue'
import blueGrey from '@material-ui/core/colors/blueGrey'
import LinearProgress from '@material-ui/core/LinearProgress'

import { getMyManagableComps, getMyUpcomingComps } from '../../server/wca-api'
import { isSignedIn, signOut } from '../../server/auth'
import history from '../../server/history'
import { sortArrayByDate } from '../../server/tools'
import Dashboard from '../Competition/Dashboard/Dashboard'
import LandingSignedIn from './LandingSignedIn'
import WelcomeLanding from './WelcomeLanding'
import Projector from '../Projector/Projector'

// typography
const typography = {
  fontFamily: [
    'Playfair Display',
    'Open Sans',
    '"Helvetica Neue"',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"'
  ].join(',')
}

const darkTheme = {
  palette: {
    primary: blue,
    secondary: blueGrey,
    type: 'dark'
  },
  typography: typography
}
const lightTheme = {
  palette: {
    primary: blue,
    secondary: blueGrey,
    type: 'light'
  },
  typography: typography
}
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userInfo: this.props.userInfo,
      signedIn: isSignedIn(),
      theme: darkTheme,
      mobileOpen: false,
      upcomingComps: null,
      managableComps: null,
      loadinAdmin: true,
      loadingAll: true
    }
    if (this.state.signedIn) {
      getMyUpcomingComps(this.state.userInfo.me.id).then(res =>
        this.setState({
          upcomingComps: sortArrayByDate(res.upcoming_competitions),
          loadingAll: false
        })
      )
      getMyManagableComps(this.state.userInfo.me.id).then(res =>
        this.setState({
          managableComps: sortArrayByDate(res),
          loadingAdmin: false
        })
      )
    }
  }
  setMobileOpen = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen })
  }
  onSignOut = () => {
    this.setState({
      userInfo: null,
      signedIn: false,
      loadingAll: true,
      loadingAdmin: true
    })
    signOut()
  }

  toggleDarkTheme = () => {
    let newTheme =
      this.state.theme.palette.type === 'light' ? darkTheme : lightTheme
    this.setState({
      theme: newTheme
    })
  }

  render() {
    const {
      signedIn,
      userInfo,
      theme,
      mobileOpen,
      upcomingComps,
      managableComps,
      loadingAdmin,
      loadingAll
    } = this.state
    const muiTheme = createMuiTheme(theme)
    return (
      <>
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />
          <Router basename={process.env.PUBLIC_URL}>
            <Route
              render={props => (
                <Header
                  {...props}
                  userInfo={userInfo}
                  onSignOut={this.onSignOut}
                  setMobileOpen={this.setMobileOpen}
                />
              )}
            />
            {(loadingAll || loadingAdmin) && signedIn && <LinearProgress />}
            {!loadingAll && !loadingAdmin && signedIn ? (
              <Switch>
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/competitions`}
                  render={props => (
                    <LandingSignedIn
                      {...props}
                      userInfo={userInfo}
                      myUpcomingComps={this.state.upcomingComps}
                    />
                  )}
                />
                <Route path='/project/:compId' component={Projector} />

                <Route
                  path='/competitions/:compId/'
                  render={props => (
                    <Dashboard
                      {...props}
                      userInfo={userInfo}
                      mobileOpen={mobileOpen}
                      setMobileOpen={this.setMobileOpen}
                      managableComps={managableComps}
                      upcomingComps={upcomingComps}
                    />
                  )}
                />
                <Route exact path='/'>
                  <Redirect to='/competitions' />
                </Route>
                <Route exact path='/about' component={WelcomeLanding} />
              </Switch>
            ) : (
              <Switch>
                <Route exact path='/about' component={WelcomeLanding} />
                <Route exact path='/' component={WelcomeLanding} />
                <Route path='/project/:compId' component={Projector} />
              </Switch>
            )}
          </Router>
          <Footer
            currTheme={theme.palette.type}
            onThemeChange={this.toggleDarkTheme}
          />
        </ThemeProvider>
      </>
    )
  }
}

export default App

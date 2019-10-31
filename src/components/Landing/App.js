import React, {Component} from 'react';
import { isSignedIn, signIn, signOut } from '../../server/auth'
import  {getMe, getMyManagableComps, getMyUpcomingComps, myComps} from '../../server/wca-api'
import WelcomeLanding from './WelcomeLanding'
import LandingSignedIn from './LandingSignedIn'
import CssBaseline from '@material-ui/core/CssBaseline'
import Header from '../common/Header'
import Footer from '../common/Footer'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      userInfo: null, 
      upcomingComps : null,
      signedIn : isSignedIn(),
      error: null
    }
    if(this.state.signedIn) {
    getMe().then(user => this.setState({userInfo:user}))
      .catch(error => this.setState({error: error.message}))
     getMyManagableComps().then(competitions => this.setState({upcomingComps: competitions}))
    .catch(error => this.setState({error: error.message}))
    getMyUpcomingComps()
    console.log(myComps)
    }
  }
  getUserInfo() {
    getMe().then(user => this.setState({userInfo:user}))
    .catch(error => this.setState({error: error.message}))
    getMyManagableComps().then(competitions => this.setState({upcomingComps: competitions}))
    .catch(error => this.setState({error: error.message}))
  }

  handleSignOut =  () => {
    signOut()
    this.setState({signIn: isSignedIn(), userInfo: null, upcomingComps: null})
  }
  render() {
    const {
      userInfo,
      signedIn
    } = this.state
    console.log(userInfo)
    console.log(signedIn)
    return (
      <div className="App">
        <CssBaseline/>
        <Header isSignedIn={signedIn} onSignIn={signIn} onSignOut={this.handleSignOut} userInfo={userInfo} />
        <WelcomeLanding/>
        <Footer/>
      </div>
    );
  }
}
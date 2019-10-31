import React, {Component} from 'react';
import { isSignedIn } from '../server/auth'
import WelcomeLanding from './Landing/WelcomeLanding'
import LandingSignedIn from './Landing/LandingSignedIn'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        {isSignedIn()
        ? <LandingSignedIn />
        : <WelcomeLanding />}
      </div>
    );
  }
}
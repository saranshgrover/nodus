import React from 'react'
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom'
import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import Register from '../Authentication/Register'
import SignIn from '../Authentication/SignIn'
import Footer from '../common/Footer'
import Header from '../common/Header'
import Competition from '../CompetitionRouting/Competition'
import LandingSignedIn from '../Landing/LandingSignedIn'
import WelcomeLanding from '../Landing/WelcomeLanding'
import NewCompetition from '../New/NewCompetition'
import UserSettings from '../UserSettings/UserSettings'

export default function Navigation() {
	return (
		<Router basename={process.env.PUBLIC_URL}>
			<Header />
			<Switch>
				<Route exact path='/about' component={WelcomeLanding} />
				<Route exact path='/signin' component={SignIn} />
				<Route exact path='/register' component={Register} />
				<AuthenticatedRoute
					authCallback={(user) => user.isSignedIn()}
					RedirectComponent={<Redirect to='/' />}
					exact
					path='/new'
					component={NewCompetition}
				/>
				<Route exact path={`/competitions`} component={LandingSignedIn} />
				<Route path='/competitions/:compId/:tab?' component={Competition} />
				<Route exact path='/about' component={WelcomeLanding} />
				<AuthenticatedRoute
					authCallback={(user) => user.isSignedIn()}
					RedirectComponent={<Redirect to='/' />}
					exact
					path='/settings'
					component={UserSettings}
				/>
				<Route exact path='/' component={WelcomeLanding} />
				<Redirect to='/' />
			</Switch>
			<Footer />
		</Router>
	)
}

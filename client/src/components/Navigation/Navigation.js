import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import AuthenticatedRoute from "../AuthenticatedRoute/AuthenticatedRoute";
import LandingSignedIn from "../Landing/LandingSignedIn";
import WelcomeLanding from "../Landing/WelcomeLanding";
import Projector from "../Projector/Projector";
import NewCompetition from "../New/NewCompetition";
import SignIn from "../Authentication/SignIn";
import Register from "../Authentication/Register";
import Header from "../common/Header";
import Footer from "../common/Footer";
import Competition from "../CompetitionRouting/Competition";
import UserSettings from "../UserSettings/UserSettings";
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
				<Route
					exact
					path={`/competitions`}
					component={LandingSignedIn}
				/>
				<Route
					path='/competitions/:compId/:tab?'
					component={Competition}
				/>
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
	);
}

import React, { useState, useContext } from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom'
import Header from '../common/Header'
import Footer from '../common/Footer'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import blue from '@material-ui/core/colors/blue'
import blueGrey from '@material-ui/core/colors/blueGrey'
import Dashboard from '../Competition/Dashboard/Dashboard'
import LandingSignedIn from './LandingSignedIn'
import WelcomeLanding from './WelcomeLanding'
import Projector from '../Projector/Projector'
import NewCompetition from '../New/NewCompetition'
import SignIn from '../Authentication/SignIn'
import Register from '../Authentication/Register'
import Competition from '../CompetitionRouting/Competition'

// typography
const typography = {
	fontFamily: [
		'Playfair Display',
		'Open Sans',
		'"Helvetica Neue"',
		'"Apple Color Emoji"',
		'"Segoe UI Emoji"',
		'"Segoe UI Symbol"',
	].join(','),
}

const darkTheme = {
	palette: {
		primary: blue,
		secondary: blueGrey,
		type: 'dark',
	},
	typography: typography,
}
const lightTheme = {
	palette: {
		primary: blue,
		secondary: blueGrey,
		type: 'light',
	},
	typography: typography,
}

export default function App() {
	const [theme, setTheme] = useState(lightTheme)
	const [mobileOpen, setMobileOpen] = useState(false)
	const toggleDarkTheme = () => {
		let newTheme = theme.palette.type === 'light' ? darkTheme : lightTheme
		setTheme(newTheme)
	}
	const muiTheme = createMuiTheme(darkTheme)
	return (
		<ThemeProvider theme={muiTheme}>
			<CssBaseline />
			<Router basename={process.env.PUBLIC_URL}>
				<Route
					render={(props) => (
						<Header
							{...props}
							setMobileOpen={() => setMobileOpen(!mobileOpen)}
						/>
					)}
				/>
				<Switch>
					<Route exact path='/about' component={WelcomeLanding} />
					<Route exact path='/signin' component={SignIn} />
					<Route exact path='/register' component={Register} />
					<Route exact path='/new' component={NewCompetition} />
					<Route exact path={`/competitions`} component={LandingSignedIn} />
					<Route path='/project/:compId' component={Projector} />
					<Route path='/competitions/:compId/' component={Competition} />
					<Route exact path='/about' component={WelcomeLanding} />
					<Route exact path='/' component={WelcomeLanding} />
				</Switch>
			</Router>
			<Footer currTheme={theme.palette.type} onThemeChange={toggleDarkTheme} />
		</ThemeProvider>
	)
}

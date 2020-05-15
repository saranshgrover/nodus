import React, { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import LandingSignedIn from './LandingSignedIn'

export default function WelcomeLanding() {
	const user = useContext(UserContext)

	return (
		// TODO Add more here
		<LandingSignedIn />
	)
}

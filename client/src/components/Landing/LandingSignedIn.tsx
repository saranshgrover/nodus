import {
	LandingMyUpcomingCompetitionsQuery,
	useLandingMyUpcomingCompetitionsQuery,
} from 'generated/graphql'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/UserContext'
import LinearProgress from '../LinearProgress/LinearProgress'
import CompList from './CompList'

function LandingSignedIn() {
	const [upcomingCompetitions, setUpcomingCompetitions] = useState<
		LandingMyUpcomingCompetitionsQuery['getMyUpcomingCompetitions']
	>() // Set to null to avoid no comps being shown.
	const user = useContext(UserContext)
	// fixme
	const { data, error, loading } = useLandingMyUpcomingCompetitionsQuery()
	useEffect(() => {
		if (!loading && !error && data) {
			setUpcomingCompetitions(data.getMyUpcomingCompetitions)
		}
	}, [loading, error, user, data])

	if (loading || !upcomingCompetitions)
		// And made sure upcomingCompetitions is not null
		return <LinearProgress />
	return (
		<CompList
			subheader='My Upcoming Competitions'
			date={true}
			comps={upcomingCompetitions}
		/>
	)
}

export default LandingSignedIn

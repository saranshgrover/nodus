import React, { useState, useEffect } from 'react'
import LandingSignedIn from './LandingSignedIn'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import CompList from './CompList'
import LinearProgress from '../LinearProgress/LinearProgress'
import useUser from '../../hooks/useUser'
import {
	useLandingAllUpcomingCompetitionsQuery,
	LandingAllUpcomingCompetitionsQuery,
} from 'generated/graphql'

export default function WelcomeLanding() {
	const user = useUser()
	const [value, setValue] = React.useState(0)
	const { data, error, loading } = useLandingAllUpcomingCompetitionsQuery()
	const [upcomingCompetitions, setUpcomingCompetitions] = useState<
		LandingAllUpcomingCompetitionsQuery['getAllWcifs']
	>([])
	useEffect(() => {
		!loading && !error && data && setUpcomingCompetitions(data.getAllWcifs)
	}, [loading, error, data])
	if (loading) return <LinearProgress />
	return (
		<React.Fragment>
			<Tabs
				variant='fullWidth'
				value={value}
				onChange={(_, newValue) => setValue(newValue)}>
				<Tab value={0} label='Upcoming Competitions' />
				{user.isSignedIn() && <Tab value={1} label='Your Competitions' />}
			</Tabs>
			{value === 0 && (
				<CompList
					date={true}
					comps={upcomingCompetitions}
					subheader='Upcoming Competitions'
				/>
			)}
			{value === 1 && <LandingSignedIn />}
		</React.Fragment>
	)
}

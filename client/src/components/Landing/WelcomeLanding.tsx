import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import {
	LandingAllUpcomingCompetitionsQuery,
	useLandingAllUpcomingCompetitionsQuery,
} from 'generated/graphql'
import useSnackbar from 'hooks/useSnackbar'
import React, { useEffect, useState } from 'react'
import useUser from '../../hooks/useUser'
import About from '../About/About'
import LinearProgress from '../LinearProgress/LinearProgress'
import CompList from './CompList'
import LandingSignedIn from './LandingSignedIn'

export default function WelcomeLanding() {
	const user = useUser()
	const [value, setValue] = React.useState(0)
	const { data, error, loading } = useLandingAllUpcomingCompetitionsQuery()
	const [upcomingCompetitions, setUpcomingCompetitions] = useState<
		LandingAllUpcomingCompetitionsQuery['getAllWcifs']
	>([])
	const { addSnackbar } = useSnackbar()
	useEffect(() => {
		if (error) {
			addSnackbar({ variant: 'error', message: error.message })
		}
		!loading && !error && data && setUpcomingCompetitions(data.getAllWcifs)
	}, [loading, error, data])
	if (loading) return <LinearProgress />
	return (
		<React.Fragment>
			{!user.isSignedIn() ? (
				<About />
			) : (
				<Tabs
					variant='fullWidth'
					value={value}
					onChange={(_, newValue) => setValue(newValue)}>
					<Tab value={0} label='Upcoming Competitions' />
					{user.isSignedIn() && <Tab value={1} label='Your Competitions' />}
				</Tabs>
			)}
			{value === 0 && (
				<CompList
					date={true}
					comps={upcomingCompetitions}
					subheader='Competitions'
				/>
			)}
			{value === 1 && <LandingSignedIn />}
		</React.Fragment>
	)
}

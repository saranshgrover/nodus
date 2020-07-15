import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../contexts/UserContext'
import LandingSignedIn from './LandingSignedIn'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import CompList from './CompList'
import LinearProgress from '../LinearProgress/LinearProgress'

const GET_UPCOMING_COMPETITIONS = gql`
	{
		getAllWcifs {
			_id
			name
			competitionId
			schedule {
				_id
				startDate
				numberOfDays
				venues {
					_id
					countryIso2
					name
				}
			}
		}
	}
`

export default function WelcomeLanding() {
	const user = useContext(UserContext)
	const [upcomingCompetitions, setUpcomingCompetitions] = useState([]) // Set to null to avoid no comps being shown.
	const [value, setValue] = React.useState(0)
	const { data, error, loading } = useQuery(GET_UPCOMING_COMPETITIONS)
	useEffect(() => {
		!loading && !error && setUpcomingCompetitions(data.getAllWcifs)
	}, [loading, error, data])
	if (loading) return <LinearProgress />
	return (
		<React.Fragment>
			<Tabs
				variant='fullWidth'
				value={value}
				onChange={(_, newValue) => setValue(newValue)}>
				<Tab value={0} label='Upcoming Competitions'>
					<CompList date={true} comps={upcomingCompetitions} />
				</Tab>
				{user.isSignedIn() && (
					<Tab value={1} label='Your Competitions' />
				)}
			</Tabs>
			{value === 0 && (
				<CompList date={true} comps={upcomingCompetitions} />
			)}
			{value === 1 && <LandingSignedIn />}
		</React.Fragment>
	)
}

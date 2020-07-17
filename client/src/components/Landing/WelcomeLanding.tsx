import React, { useState, useEffect } from 'react'
import LandingSignedIn from './LandingSignedIn'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import CompList from './CompList'
import LinearProgress from '../LinearProgress/LinearProgress'
import { Query, Wcif } from '../../@types/graphql'
import useUser from '../../hooks/useUser'

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
	const user = useUser()
	const [upcomingCompetitions, setUpcomingCompetitions] = useState<Wcif[]>([]) // Set to null to avoid no comps being shown.
	const [value, setValue] = React.useState(0)
	const { data, error, loading } = useQuery<Query>(GET_UPCOMING_COMPETITIONS)

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
				{user.isSignedIn() && (
					<Tab value={1} label='Your Competitions' />
				)}
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

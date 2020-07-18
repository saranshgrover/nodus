import React, { useEffect, useState, useContext } from 'react'
import LinearProgress from '../LinearProgress/LinearProgress'
import CompList from './CompList'
import { getAllCompsToday } from '../../logic/wca-api'
import { Tabs, Tab } from '@material-ui/core'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { UserContext } from '../../contexts/UserContext'
import { useLandingMyUpcomingCompetitionsQuery } from 'generated/graphql'

const GET_MY_UPCOMING_COMPETITIONS = gql`
	{
		getMyUpcomingCompetitions {
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

function LandingSignedIn() {
	const [upcomingCompetitions, setUpcomingCompetitions] = useState(null) // Set to null to avoid no comps being shown.
	const user = useContext(UserContext)
	// fixme
	const { data, error, loading } = useLandingMyUpcomingCompetitionsQuery()
	useEffect(() => {
		!loading &&
			!error &&
			user.isSignedIn() &&
			setUpcomingCompetitions(data.getMyUpcomingCompetitions)
	}, [loading, error, user, data])

	if (loading || !upcomingCompetitions)
		// And made sure upcomingCompetitions is not null
		return <LinearProgress />
	return <CompList date={true} comps={upcomingCompetitions} />
}

export default LandingSignedIn

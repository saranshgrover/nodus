import React, { useEffect, useState, useContext } from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'
import CompList from './CompList'
import { getAllCompsToday } from '../../logic/wca-api'
import { Tabs, Tab } from '@material-ui/core'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { UserContext } from '../../contexts/UserContext'

const GET_UPCOMING_COMPETITIONS = gql`
	{
		getAllWcifs {
			_id
			name
			id
			schedule {
				startDate
				numberOfDays
				venues {
					countryIso2
					name
				}
			}
		}
	}
`
const GET_MY_UPCOMING_COMPETITIONS = gql`
	{
		getMyUpcomingCompetitions {
			_id
			name
			id
			schedule {
				startDate
				numberOfDays
				venues {
					countryIso2
					name
				}
			}
		}
	}
`

function LandingSignedIn() {
	const [upcomingCompetitions, setUpcomingCompetitions] = useState([])
	const [myCompetitions, setMyCompetitions] = useState([])
	const [value, setValue] = React.useState(myCompetitions?.length > 0 ? 1 : 0)
	const user = useContext(UserContext)
	const { data: data1, error: error1, loading: loading1 } = useQuery(
		GET_UPCOMING_COMPETITIONS
	)
	// fixme
	const { data: data2, error: error2, loading: loading2 } = useQuery(
		GET_MY_UPCOMING_COMPETITIONS
	)
	useEffect(() => {
		!loading2 &&
			!error2 &&
			user.isSignedIn() &&
			setMyCompetitions(data2.getMyUpcomingCompetitions)
	}, [loading2, error2, user, data2])
	useEffect(() => {
		!loading1 && !error1 && setUpcomingCompetitions(data1.getAllWcifs)
	}, [loading1, error1, data1])
	if (loading1 || loading2) return <LinearProgress />
	if (error1 || error2) console.error(`${error1}\n${error2}`)
	return (
		<>
			<Tabs
				value={value}
				onChange={(_, index) => setValue(index)}
				variant='fullWidth'
			>
				<Tab label='Upcoming Competitions' />
				{user.isSignedIn() && <Tab label='Your Competitions' />}
			</Tabs>
			{value === 0 && <CompList date={true} comps={upcomingCompetitions} />}
			{value === 1 && <CompList date={true} comps={myCompetitions} />}
		</>
	)
}

export default LandingSignedIn

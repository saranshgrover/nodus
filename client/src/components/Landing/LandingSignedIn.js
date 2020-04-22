import React, { useEffect, useState } from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'
import CompList from './CompList'
import { getAllCompsToday } from '../../logic/wca-api'
import { Tabs, Tab } from '@material-ui/core'

function LandingSignedIn({ myUpcomingComps, userInfo }) {
	const [allCompsToday, setAllCompsToday] = useState([])
	const [loadingToday, setLoadingToday] = useState(true)
	const [value, setValue] = React.useState(myUpcomingComps.length > 0 ? 1 : 0)

	useEffect(() => {
		getAllCompsToday(1).then((comps) => {
			setAllCompsToday(comps)
			setLoadingToday(false)
		})
	}, [])

	return (
		<>
			{!loadingToday ? (
				<>
					<Tabs
						value={value}
						onChange={(event, index) => setValue(index)}
						variant='fullWidth'
					>
						<Tab label='Upcoming Competitions' />
						<Tab label='Your Competitions' />
					</Tabs>
					{value === 0 && <CompList comps={allCompsToday} />}
					{value === 1 && (
						<CompList date={true} comps={myUpcomingComps} />
					)}
				</>
			) : (
				<LinearProgress />
			)}
		</>
	)
}

export default LandingSignedIn

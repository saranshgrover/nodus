import { default as Grid, default as Paper } from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import { makeStyles } from '@material-ui/core/styles'
import { NetworkStatus } from 'apollo-client'
import React, { useContext, useEffect } from 'react'
import { CompetitionContext } from '../../contexts/CompetitionContext'
import { useCompetitionInformationQuery } from '../../generated/graphql'
import Error from '../common/Error'
import GeneralInformation from './GeneralInformation'
import TopCompetitors from './TopCompetitors'
import UpcomingEvents from './UpcomingEvents'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(2, 3),
	},
	paper: {
		margin: theme.spacing(2),
		padding: theme.spacing(3),
		textAlign: 'center',
	},
	card: {
		textAlign: 'center',
		margin: theme.spacing(2),
		maxHeight: '200px',
	},
}))
export default function Information() {
	const competition = useContext(CompetitionContext)
	const {
		loading,
		error,
		data,
		refetch,
		networkStatus,
	} = useCompetitionInformationQuery({
		variables: { competitionId: competition.competitionId, top: 50 },
	}) // Gets competitors where world ranking is 50 or lower
	const classes = useStyles()
	useEffect(() => {
		// Refetch when data changes from same query
		if (networkStatus !== NetworkStatus.loading) refetch()
	}, [data])
	if (loading || !data) return <LinearProgress />
	else if (error) return <Error message={error.toString()} />
	else
		return (
			<div className={classes.root}>
				<GeneralInformation
					wcif={data.getWcifByCompetitionId}
					userConnectionInfo={competition.userRegistered}
					competitionId={competition.competitionId}
					showRegistration={true}
					showMessage={true}
				/>
				<Paper className={classes.paper}>
					<Grid
						container
						direction='row'
						justify='center'
						alignItems='flex-start'
						spacing={3}>
						<Grid item md={5}>
							<UpcomingEvents />
						</Grid>
						<Grid item md={5}>
							{data.getTopCompetitors.length > 0 && (
								<TopCompetitors topCompetitors={data.getTopCompetitors} />
							)}
						</Grid>
					</Grid>
				</Paper>
			</div>
		)
}

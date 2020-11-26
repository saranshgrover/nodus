import Divider from '@material-ui/core/Divider'
import LinearProgress from '@material-ui/core/LinearProgress'
import Link from '@material-ui/core/Link'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import { useGetMyNotificationsQuery } from 'generated/graphql'
import useCompetition from 'hooks/useCompetition'
import useSnackbar from 'hooks/useSnackbar'
import React, { ReactElement, useEffect } from 'react'

export default function CompetitionNotification(): ReactElement {
	const { competitionId } = useCompetition()
	const { loading, data, error } = useGetMyNotificationsQuery({
		pollInterval: 30000,
		variables: { competitionId },
	})
	const { addSnackbar } = useSnackbar()
	useEffect(() => {
		if (error) {
			addSnackbar({ variant: 'error', message: error.message })
		}
	}, [error])
	if (error) return <></>
	if (loading) return <LinearProgress />
	const notifications = data?.getMyNotifications || []
	return (
		<Paper>
			<List>
				{notifications.map((notification) => (
					<React.Fragment key={notification._id}>
						<Link href={notification.url ?? ''}>
							<ListItem>
								<ListItemText
									primary={notification.title}
									secondary={notification.body}
								/>
							</ListItem>
						</Link>
						<Divider />
					</React.Fragment>
				))}
			</List>
		</Paper>
	)
}

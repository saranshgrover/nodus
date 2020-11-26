import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListSubheader from '@material-ui/core/ListSubheader'
import Typography from '@material-ui/core/Typography'
import ConfirmationDialog from 'components/common/ConfirmationDialog'
import useCompetition from 'hooks/useCompetition'
import useSnackbar from 'hooks/useSnackbar'
import React, { ReactElement } from 'react'
import {
	ControlCenterUpdateOngoingGroupsMutation,
	useControlCenterUpdateOngoingGroupsMutation,
} from '../../generated/graphql'

interface Props {
	open: number[]
	close: number[]
	callback: (
		val?: ControlCenterUpdateOngoingGroupsMutation['updateOngoingGroups']
	) => void
}

/**
 * This function takes in the groups to open and close, and shows a dialog box confirming the action from the user, calls the mutation updating the groups, and then calls a callback function provided
 *
 */
export default function UpdateOngoingGroups({
	open,
	close,
	callback,
}: Props): ReactElement {
	const { activities, competitionId } = useCompetition()
	const { addSnackbar } = useSnackbar()
	const [
		updateOngoingGroups,
		{},
	] = useControlCenterUpdateOngoingGroupsMutation()
	if (!activities) {
		callback()
		return <></>
	}
	const openActivities = open.map(
		(id) => activities.find((activity) => activity.id === id)!
	)
	const closeActivities = close.map(
		(id) => activities.find((activity) => activity.id === id)!
	)

	const confirmationCallback = async (done: boolean) => {
		if (!done) {
			callback()
		} else {
			const variables = {
				competitionId,
				newGroups: [
					...openActivities.map((activity) => ({
						id: activity.id,
						parentId: activity.parentId,
						activityCode: activity.activityCode,
					})),
				],
				closeGroups: [
					...closeActivities.map((activity) => ({
						id: activity.id,
						parentId: activity.parentId,
						activityCode: activity.activityCode,
					})),
				],
			}
			console.log(variables)
			const res = await updateOngoingGroups({ variables })
			if (res.errors) {
				addSnackbar({
					variant: 'error',
					message: (res.errors || []).reduce<string>(
						(accum, val) => accum + `\n ${val.message}`,
						''
					),
				})
			} else {
				callback(res.data?.updateOngoingGroups)
			}
		}
	}

	return (
		<ConfirmationDialog
			callback={confirmationCallback}
			dialogTitle={'Update Ongoing Groups'}
			dialogContentText={
				<React.Fragment>
					{openActivities.length > 0 && (
						<List>
							<ListSubheader>
								<Typography variant='h6'>{'Open these groups?'}</Typography>
							</ListSubheader>
							{openActivities.map((activity) => (
								<ListItem key={activity.id}>
									<Typography>{activity.name}</Typography>
								</ListItem>
							))}
						</List>
					)}
					{closeActivities.length > 0 && (
						<List title={'Close these groups?'}>
							<ListSubheader>
								<Typography variant='h6'>{'Close these groups?'}</Typography>
							</ListSubheader>
							{closeActivities.map((activity) => (
								<ListItem key={activity.id}>
									<Typography>{activity.name}</Typography>
								</ListItem>
							))}
						</List>
					)}
				</React.Fragment>
			}
		/>
	)
}

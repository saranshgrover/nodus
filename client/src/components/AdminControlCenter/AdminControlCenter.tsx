import { NetworkStatus } from 'apollo-client'
import useCompetition from 'hooks/useCompetition'
import useSnackbar from 'hooks/useSnackbar'
import React, { ReactElement, useEffect, useState } from 'react'
import {
	ControlCenterGetOpenGroupsQuery,
	ControlCenterUpdateOngoingGroupsMutation,
	useControlCenterGetOpenGroupsQuery,
} from '../../generated/graphql'
import LinearProgress from '../LinearProgress/LinearProgress'
import ControlCenterBar from './ControlCenterBar'
import ControlCenterEventInfo from './ControlCenterEventInfo'

/**
 * Responsible for navigating the control of schedule/groups/notification management during the competition. This is a WIP and is extremeley essential to the application
 */
export default function AdminControlCenter(): ReactElement {
	const { competitionId } = useCompetition()
	const {
		loading,
		error,
		data,
		refetch,
		networkStatus,
	} = useControlCenterGetOpenGroupsQuery({
		variables: { competitionId },
		notifyOnNetworkStatusChange: true,
	})

	const [currentActivityId, setCurrentActivityId] = useState<number | null>()
	const [ongoingGroups, setOngoingGroups] = useState<
		ControlCenterGetOpenGroupsQuery['getOngoingGroups']
	>()
	const { addSnackbar } = useSnackbar()

	const handleNextCall = (
		newGroups: ControlCenterUpdateOngoingGroupsMutation['updateOngoingGroups']
	) => {
		const firstActivity =
			newGroups && newGroups.length > 0
				? newGroups[0].childActivities[0].id
				: null
		setCurrentActivityId(firstActivity)
		setOngoingGroups(newGroups)
	}

	useEffect(() => {
		if (error) addSnackbar({ variant: 'error', message: error.message })
		if (data && data.getOngoingGroups?.length === 0)
			addSnackbar({
				variant: 'warning',
				message: "There aren't any ongoing groups.",
			})
		if (data && data.getOngoingGroups) {
			setOngoingGroups(data.getOngoingGroups)
			console.log(data.getOngoingGroups)
			const firstActivity =
				data.getOngoingGroups.length > 0 &&
				data.getOngoingGroups[0].childActivities.length > 0
					? data.getOngoingGroups[0].childActivities[0].id
					: null
			setCurrentActivityId(firstActivity)
		}
	}, [error, data])
	if (
		loading ||
		!ongoingGroups ||
		currentActivityId === undefined ||
		networkStatus === NetworkStatus.refetch
	)
		return <LinearProgress />
	if (error) return <></>
	return (
		<div>
			<ControlCenterBar
				groups={ongoingGroups}
				currentActivityId={currentActivityId ?? -1}
				handleNextCall={handleNextCall}
			/>
			<ControlCenterEventInfo
				groups={ongoingGroups}
				setCurrentActivityId={setCurrentActivityId}
				currentActivityId={currentActivityId ?? -1}
				refetch={refetch}
				handleNextCall={handleNextCall}
			/>
		</div>
	)
}

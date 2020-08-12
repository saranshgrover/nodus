import { Hidden } from '@material-ui/core'
import ButtonBase from '@material-ui/core/ButtonBase'
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'
import LinearProgress from '@material-ui/core/LinearProgress'
import {
	createStyles,
	makeStyles,
	Theme,
	withStyles,
} from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined'
import NewReleasesIcon from '@material-ui/icons/NewReleases'
import classnames from 'classnames'
import {
	ControlCenterGetOpenGroupsQuery,
	ControlCenterUpdateOngoingGroupsMutation,
} from 'generated/graphql'
import moment from 'moment-timezone'
import React, { ReactElement, useEffect, useState } from 'react'
import { activityToString } from '../../../../shared/logic/activity'
import UpdateOngoingGroups from './UpdateOngoingGroups'

const ProgressIndicator = withStyles((theme: Theme) =>
	createStyles({
		root: {
			height: 10,
			borderRadius: 1,
			backgroundColor:
				theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
		},
		barColorPrimary: {
			background: green[500],
		},
	})
)(LinearProgress)

const useStyles = makeStyles((theme) => ({
	root: {},
	toolbarOffset: {
		height: '10vh',
	},
	progressIndicator: {
		width: '100%',
		display: 'grid',
		gridTemplateColumns: 'minmax(60vw, 90%) 1fr auto',
		height: '15px',
		background: theme.palette.background.paper,
	},
	toolbar: {
		background: theme.palette.background.paper,
		overflowX: 'hidden',
		width: `calc( 100vw - ${theme.spacing(7) + 1}px )`,
		[theme.breakpoints.up('sm')]: {
			width: `calc( 100vw - ${theme.spacing(9) + 1}px )`,
		},
	},
	toolbarInfo: {
		width: '70%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderRadius: '1em',
	},
	toolbarActions: {
		width: '30%',
	},
	button: {
		marginLeft: '1em',
		width: 'calc(100% - 1em)',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		backgroundColor: red[600],
		borderRadius: '1em',
	},
}))

interface Props {
	groups: ControlCenterGetOpenGroupsQuery['getOngoingGroups']
	currentActivityId: number
	handleNextCall: (
		variables: ControlCenterUpdateOngoingGroupsMutation['updateOngoingGroups']
	) => void
}

export default function ControlCenterBar({
	groups,
	currentActivityId,
	handleNextCall,
}: Props): ReactElement {
	function getCurrentActivity() {
		for (const group of groups) {
			const activity = group.childActivities.find(
				(activity) => activity.id === currentActivityId
			)
			if (activity) return { activity, group }
		}
		return
	}
	const classes = useStyles()

	const [currentInfo, setCurrentInfo] = useState<
		ReturnType<typeof getCurrentActivity>
	>()

	const [confirm, setConfirm] = useState(false)

	useEffect(() => {
		function getPercentageDifference(startTime?: string, endTime?: string) {
			if (!startTime || !endTime) return 0
			const duration = moment.duration(moment(startTime).diff(endTime))
			const minutes = duration.asMinutes()
			const elapsedDuration = moment.duration(moment(startTime).diff(moment()))
			const elapsedMinutes = elapsedDuration.asMinutes()
			return Math.max(
				0,
				Math.min(100, ((elapsedMinutes - minutes) * 100) / minutes)
			)
		}

		const currentInfo = getCurrentActivity()
		if (currentInfo) {
			setCurrentInfo(currentInfo)
			setPercentageDifference(
				getPercentageDifference(
					currentInfo.activity.startTime,
					currentInfo.activity.endTime
				)
			)
			const interval = setInterval(
				() =>
					setPercentageDifference(
						getPercentageDifference(
							currentInfo.activity.startTime,
							currentInfo.activity.endTime
						)
					),
				60000
			)
			return () => clearInterval(interval)
		}
		return
	}, [currentActivityId, groups])
	const [percentageDifference, setPercentageDifference] = useState<number>()
	function updateCallback(
		val?: ControlCenterUpdateOngoingGroupsMutation['updateOngoingGroups']
	) {
		setConfirm(false)
		if (val) handleNextCall(val)
	}
	if (!currentInfo) return <></>
	else {
		const { activity } = currentInfo
		return (
			<div className={classes.root}>
				{confirm && (
					<UpdateOngoingGroups
						close={[activity.id]}
						open={activity.next ? [activity.next.id] : []}
						callback={updateCallback}
					/>
				)}
				<Toolbar className={classnames(classes.toolbar, classes.toolbarOffset)}>
					<div
						className={classnames(classes.toolbarInfo, classes.toolbarOffset)}>
						<Hidden smDown>
							<Typography variant='h6'>
								{activity.next!
									? `Next: ${
											activityToString(activity.next!.activityCode, true) ??
											activity.next!.name
									  }`
									: ''}
							</Typography>
						</Hidden>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<CheckCircleOutlineOutlinedIcon fontSize='large' />
							<Typography variant='h4'>
								{activityToString(activity.activityCode, true) ?? activity.name}
							</Typography>
						</div>
						<Hidden smDown>
							<Typography variant='h6'>{'15 minutes ahead'}</Typography>
						</Hidden>
					</div>
					<div
						className={classnames(
							classes.toolbarActions,
							classes.toolbarOffset
						)}>
						<ButtonBase
							className={classes.button}
							disabled={!activity.next}
							onClick={() => setConfirm(true)}>
							<NewReleasesIcon />
							<Typography>
								{activity.next!
									? `Call ${activity.next!.name}`
									: 'No Upcoming Groups.'}
							</Typography>
						</ButtonBase>
					</div>
				</Toolbar>
				<div className={classes.progressIndicator}>
					<ProgressIndicator
						style={{ height: '15px', marginRight: '0.5em' }}
						variant='determinate'
						value={percentageDifference}
					/>
					<Typography style={{ lineHeight: '15px' }} variant='body1'>
						{moment(activity.endTime).format('LT')}
					</Typography>
				</div>
			</div>
		)
	}
}

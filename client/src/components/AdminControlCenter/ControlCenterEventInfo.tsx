import Accordion from '@material-ui/core/Accordion'
import AccordianDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Grow from '@material-ui/core/Grow'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'
import ExpandMoreOutlined from '@material-ui/icons/ExpandMoreOutlined'
import RefreshIcon from '@material-ui/icons/Refresh'
import SettingsIcon from '@material-ui/icons/Settings'
import {
	ControlCenterGetOpenGroupsQuery,
	ControlCenterUpdateOngoingGroupsMutation,
} from 'generated/graphql'
import useCompetition from 'hooks/useCompetition'
import { assignedTo } from 'logic/schedule'
import React, { ReactElement, useCallback, useState } from 'react'
import UpdateOngoingGroups from './UpdateOngoingGroups'

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		padding: theme.spacing(2),
	},
	list: {
		width: '100%',
	},
}))

interface Props {
	groups: ControlCenterGetOpenGroupsQuery['getOngoingGroups']
	setCurrentActivityId: (id: number) => void
	currentActivityId: number
	refetch: () => void
	handleNextCall: (
		variables: ControlCenterUpdateOngoingGroupsMutation['updateOngoingGroups']
	) => void
}

export default function ControlCenterEventInfo({
	groups,
	setCurrentActivityId,
	currentActivityId,
	refetch,
	handleNextCall,
}: Props): ReactElement {
	const getAllPossibleGroups = useCallback(() => {
		return groups.flatMap((group) => group.childActivities).flat()
	}, [groups])
	const classes = useStyles()
	const [open, setOpen] = useState(false)
	const { activities } = useCompetition()
	const [updateOpen, setUpdateOpen] = useState<
		ArrayElement<typeof activities>
	>()
	const allPossibleGroups = getAllPossibleGroups()
	const anchorRef = React.useRef<HTMLButtonElement>(null)
	const currentGroup = allPossibleGroups.find(
		(group) => group.id === currentActivityId
	)
	const competitors = !currentGroup
		? []
		: currentGroup.persons.filter((person) => {
				const assignment = person.assignments.find(
					(a) => a.activityId === currentActivityId
				)
				return (
					assignment && assignment.assignmentCode.indexOf('competitor') >= 0
				)
		  })
	const staff = !currentGroup
		? []
		: currentGroup.persons.filter(
				(person) =>
					person.assignments
						.find((a) => a.activityId === currentActivityId)!
						.assignmentCode.indexOf('staff') >= 0
		  )

	const handleSelect = (
		val?: ControlCenterUpdateOngoingGroupsMutation['updateOngoingGroups']
	) => {
		setUpdateOpen(undefined)
		setOpen(false)
		if (val) handleNextCall(val)
	}

	return (
		<div className={classes.root}>
			{Boolean(updateOpen) && (
				<UpdateOngoingGroups
					open={[updateOpen!.id]}
					close={[]}
					callback={handleSelect}
				/>
			)}
			<Grid container spacing={1} justify='space-between'>
				<Grid item>
					<Tabs
						variant='scrollable'
						value={currentActivityId}
						onChange={(_, newVal) => setCurrentActivityId(newVal)}>
						{allPossibleGroups.map((group) => (
							<Tab
								disableRipple
								key={group.id}
								label={group.name}
								value={group.id}
							/>
						))}
					</Tabs>
				</Grid>
				<Grid item>
					<ButtonGroup>
						<IconButton ref={anchorRef} onClick={() => setOpen(true)}>
							<AddCircleOutlineOutlinedIcon />
						</IconButton>
						<IconButton>
							<Tooltip title='Settings'>
								<SettingsIcon />
							</Tooltip>
						</IconButton>
						<IconButton onClick={() => refetch()}>
							<Tooltip title='Refresh'>
								<RefreshIcon />
							</Tooltip>
						</IconButton>
					</ButtonGroup>
					<Popper
						open={open}
						anchorEl={anchorRef.current}
						role={undefined}
						transition
						style={{ zIndex: 1 }}
						disablePortal>
						{({ TransitionProps, placement }) => (
							<Grow
								{...TransitionProps}
								style={{
									transformOrigin:
										placement === 'bottom' ? 'center top' : 'center bottom',
								}}>
								<Paper style={{ maxHeight: '50vh', overflow: 'scroll' }}>
									<ClickAwayListener onClickAway={() => setOpen(false)}>
										<MenuList id='split-button-menu'>
											{(activities || [])
												.filter(
													(activity) =>
														// @ts-ignore
														!activity.childActivities ||
														// @ts-ignore
														activity.childActivities.length <= 0
												)
												.map((activity) => (
													<MenuItem
														onClick={() => setUpdateOpen(activity)}
														disabled={activity.id === currentActivityId}
														key={activity.id}>
														{activity.name}
													</MenuItem>
												))}
										</MenuList>
									</ClickAwayListener>
								</Paper>
							</Grow>
						)}
					</Popper>
				</Grid>
			</Grid>
			<div>
				<Accordion defaultExpanded>
					<AccordionSummary expandIcon={<ExpandMoreOutlined />}>
						<Typography variant='body1'>{`Competitors`}</Typography>
					</AccordionSummary>
					<AccordianDetails>
						<List dense className={classes.list}>
							{competitors.map((competitor) => (
								<React.Fragment key={competitor.wcaUserId}>
									<ListItem>
										<ListItemText
											primary={competitor.name}
											secondary={competitor.wcaId}
										/>
										<ListItemSecondaryAction>
											<Tooltip title='Send an announcement. Note: Users may not have notifications enabled.'>
												<IconButton edge='end' aria-label='Announcement'>
													<AddAlertOutlinedIcon />
												</IconButton>
											</Tooltip>
										</ListItemSecondaryAction>
									</ListItem>
									<Divider variant='inset' />
								</React.Fragment>
							))}
						</List>
					</AccordianDetails>
				</Accordion>
				<Accordion defaultExpanded>
					<AccordionSummary expandIcon={<ExpandMoreOutlined />}>
						<Typography variant='body1'>{`Staff`}</Typography>
					</AccordionSummary>
					<AccordianDetails>
						<List dense className={classes.list}>
							{staff.map((competitor) => (
								<React.Fragment key={competitor.wcaUserId}>
									<ListItem key={competitor.wcaUserId}>
										<ListItemText
											primary={competitor.name}
											secondary={assignedTo(
												competitor.assignments.find(
													(c) => c.activityId === currentActivityId
												)!.assignmentCode
											)}
										/>
										<ListItemSecondaryAction>
											<Tooltip title='Send an announcement. Note: Users may not have notifications enabled.'>
												<IconButton>
													<AddAlertOutlinedIcon />
												</IconButton>
											</Tooltip>
										</ListItemSecondaryAction>
									</ListItem>
									<Divider variant='inset' />
								</React.Fragment>
							))}
						</List>
					</AccordianDetails>
				</Accordion>
			</div>
		</div>
	)
}

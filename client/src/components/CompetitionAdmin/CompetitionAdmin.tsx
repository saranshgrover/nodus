import Drawer from '@material-ui/core/Drawer'
import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import AdminControlCenter from 'components/AdminControlCenter/AdminControlCenter'
import useSnackbar from 'hooks/useSnackbar'
import React, { useContext, useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { CompetitionContext } from '../../contexts/CompetitionContext'
import CompetitorsSetup from '../New/Setup/CompetitorsSetup'
import EventsSetup from '../New/Setup/EventsSetup/EventsSetup'
import GroupsSetup from '../New/Setup/GroupsSetup/GroupsSetup'
import ScheduleSetup from '../New/Setup/ScheduleSetup'
import SettingsSetup from '../New/Setup/SettingsSetup'
import Projector from '../Projector/Projector'
import AdminDrawerList from './AdminDrawerList'

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	drawer: {
		flexShrink: 0,
		whiteSpace: 'nowrap',
		overflowX: 'hidden',
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9) + 1,
		},
	},
	content: {
		flexGrow: 1,
		width: '100%',
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
}))

export default function CompetitionAdmin() {
	const classes = useStyles()
	const competition = useContext(CompetitionContext)
	const { competitionId } = competition
	const [confirm, setConfirm] = useState(false)
	const handleConfirm = () => setConfirm(true)
	const { addSnackbar } = useSnackbar()
	useEffect(() => {
		if (confirm) {
			addSnackbar({ variant: 'success', message: 'Saved!' })
		}
	}, [confirm])
	return (
		<div className={classes.root}>
			<Drawer
				className={classNames(classes.drawer)}
				variant='permanent'
				classes={{ paper: classes.drawer }}>
				<div className={classes.toolbar} />
				<AdminDrawerList />
			</Drawer>
			<main className={classNames(classes.content)}>
				<Switch>
					<Route
						exact
						path={`/competitions/${competitionId}/admin/control-center`}>
						<AdminControlCenter />
					</Route>
					<Route
						exact
						path={`/competitions/${competitionId}/admin/competitors`}
						component={CompetitorsSetup}>
						<CompetitorsSetup id={competition._id} onComplete={handleConfirm} />
					</Route>
					<Route exact path={`/competitions/${competitionId}/admin/events`}>
						<EventsSetup id={competition._id} onComplete={handleConfirm} />
					</Route>
					<Route exact path={`/competitions/${competitionId}/admin/groups`}>
						{
							// @ts-ignore
							<GroupsSetup id={competition._id} onComplete={handleConfirm} />
						}
					</Route>
					<Route
						exact
						path={`/competitions/${competitionId}/admin/incidents`}
					/>
					<Route
						exact
						path={`/competitions/${competitionId}/admin/notifications`}
					/>
					<Route
						exact
						path={`/competitions/${competitionId}/admin/projector`}
						component={Projector}
					/>
					<Route exact path={`/competitions/${competitionId}/admin/schedule`}>
						{
							// @ts-ignore
							<ScheduleSetup id={competition._id} onComplete={handleConfirm} />
						}
					</Route>
					<Route exact path={`/competitions/${competitionId}/admin/settings`}>
						{
							// @ts-ignore
							<SettingsSetup id={competition._id} onComplete={handleConfirm} />
						}
					</Route>
					<Redirect
						to={`/competitions/${competitionId}/admin/control-center`}
					/>
				</Switch>
			</main>
		</div>
	)
}

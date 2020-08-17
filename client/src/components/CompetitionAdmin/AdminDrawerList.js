import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Tooltip from '@material-ui/core/Tooltip'
import AppsIcon from '@material-ui/icons/Apps'
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents'
import GroupIcon from '@material-ui/icons/Group'
import NotesIcon from '@material-ui/icons/Notes'
import NotificationsIcon from '@material-ui/icons/Notifications'
import ScheduleIcon from '@material-ui/icons/Schedule'
import SettingsIcon from '@material-ui/icons/Settings'
import SyncIcon from '@material-ui/icons/Sync'
import VideocamIcon from '@material-ui/icons/Videocam'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { CompetitionContext } from '../../contexts/CompetitionContext'

export default function DashboardList() {
	const history = useHistory()
	const competition = useContext(CompetitionContext)
	const { competitionId } = competition
	const getIcon = (text) => {
		switch (text) {
			case 'Projector':
				return <VideocamIcon />
			case 'Groups':
				return <GroupIcon />
			case 'Notifications':
				return <NotificationsIcon />
			case 'Incidents':
				return <NotesIcon />
			case 'Schedule':
				return <ScheduleIcon />
			case 'Results':
				return <EmojiEventsIcon />
			case 'Settings':
				return <SettingsIcon />
			case 'Sync':
				return <SyncIcon />
			default:
				return <AppsIcon />
		}
	}
	return (
		<div style={{ marginTop: '15px' }}>
			<List>
				{[
					'Control Center',
					'Sync',
					'Competitors',
					'Events',
					'Groups',
					...(competition.userRoles.some((role) => role.includes('delegate'))
						? ['Incidents']
						: ''),
					// 'Notifications',
					'Projector',
					'Schedule',
					'Settings',
				].map((text) => (
					<ListItem
						button
						key={text}
						onClick={() =>
							history.push(
								`/competitions/${competitionId}/admin/${text
									.replace(/\s+/g, '-')
									.toLowerCase()}`
							)
						}>
						<Tooltip title={text}>
							<ListItemIcon>{getIcon(text)}</ListItemIcon>
						</Tooltip>
					</ListItem>
				))}
			</List>
		</div>
	)
}

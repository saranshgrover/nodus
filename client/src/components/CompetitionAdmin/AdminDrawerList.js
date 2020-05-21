import React, { useContext } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AppsIcon from "@material-ui/icons/Apps";
import VideocamIcon from "@material-ui/icons/Videocam";
import GroupIcon from "@material-ui/icons/Group";
import NotesIcon from "@material-ui/icons/Notes";
import ScheduleIcon from "@material-ui/icons/Schedule";
import { useHistory } from "react-router-dom";
import { CompetitionContext } from "../../contexts/CompetitionContext";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import SettingsIcon from "@material-ui/icons/Settings";

export default function DashboardList() {
	const history = useHistory();
	const competition = useContext(CompetitionContext);
	const { competitionId } = competition;
	const getIcon = (text) => {
		switch (text) {
			case "Projector":
				return <VideocamIcon />;
			case "Groups":
				return <GroupIcon />;
			case "Notifications":
				return <NotificationsIcon />;
			case "Incidents":
				return <NotesIcon />;
			case "Schedule":
				return <ScheduleIcon />;
			case "Results":
				return <EmojiEventsIcon />;
			case "Settings":
				return <SettingsIcon />;
			default:
				return <AppsIcon />;
		}
	};
	return (
		<div style={{ marginTop: "15px" }}>
			<List>
				{[
					"Control Center",
					"Competitors",
					"Events",
					"Groups",
					...(competition.userRoles.some((role) =>
						role.includes("delegate")
					)
						? ["Incidents"]
						: ""),
					// 'Notifications',
					"Projector",
					"Schedule",
					"Settings",
				].map((text) => (
					<ListItem
						button
						key={text}
						onClick={() =>
							history.push(
								`/competitions/${competitionId}/admin/${text
									.replace(/\s+/g, "-")
									.toLowerCase()}`
							)
						}
					>
						<ListItemIcon>{getIcon(text)}</ListItemIcon>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</div>
	);
}

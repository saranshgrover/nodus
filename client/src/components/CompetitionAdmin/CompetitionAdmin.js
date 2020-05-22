import React, { Fragment, useContext, useState } from "react";
import { Switch, Route } from "react-router-dom";
import AdminDrawerList from "./AdminDrawerList";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import classNames from "classnames";
import { CompetitionContext } from "../../contexts/CompetitionContext";
import CompetitorsSetup from "../New/Setup/CompetitorsSetup";
import EventsSetup from "../New/Setup/EventsSetup/EventsSetup";
import GroupsSetup from "../New/Setup/GroupsSetup/GroupsSetup";
import ScheduleSetup from "../New/Setup/ScheduleSetup";
import SettingsSetup from "../New/Setup/SettingsSetup";
import Projector from "../Projector/Projector";
import MySnackbar from "../common/MySnackbar";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
	appBar: {
		color: theme.palette.type === "dark" ? "#fff" : null,
		backgroundColor: theme.palette.type === "dark" ? grey["900"] : null,
	},
	appBarShift: {
		[theme.breakpoints.up("lg")]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
	},
	drawer: {
		[theme.breakpoints.up("lg")]: {
			width: drawerWidth,
		},
	},
	content: {
		position: "relative" /* For LinearProgress */,
		overflowY: "auto",
		padding: theme.spacing(2, 1),
		[theme.breakpoints.up("md")]: {
			padding: theme.spacing(3),
		},
	},
	toolbar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		padding: "0 8px",
		...theme.mixins.toolbar,
	},
}));

export default function CompetitionAdmin() {
	const classes = useStyles();
	const competition = useContext(CompetitionContext);
	const { competitionId } = competition;
	const [confirm, setConfirm] = useState(false);
	const handleConfirm = () => setConfirm(true);
	return (
		<Fragment>
			{confirm && (
				<MySnackbar
					closeCallback={() => setConfirm(false)}
					variant='success'
					message='Saved'
				/>
			)}
			<Drawer variant='permanent' classes={{ paper: classes.drawer }}>
				<div className={classes.toolbar} />
				<AdminDrawerList />
			</Drawer>
			<div className={classNames(classes.content, classes.appBarShift)}>
				<Switch>
					<Route
						exact
						path={`/competitions/${competitionId}/admin/control-center`}
					>
						<CompetitorsSetup
							id={competition._id}
							onComplete={() => console.log("complete")}
						/>
					</Route>
					<Route
						exact
						path={`/competitions/${competitionId}/admin/competitors`}
						component={CompetitorsSetup}
					>
						<CompetitorsSetup
							id={competition._id}
							onComplete={handleConfirm}
						/>
					</Route>
					<Route
						exact
						path={`/competitions/${competitionId}/admin/events`}
					>
						<EventsSetup
							id={competition._id}
							onComplete={handleConfirm}
						/>
					</Route>
					<Route
						exact
						path={`/competitions/${competitionId}/admin/groups`}
					>
						<GroupsSetup
							id={competition._id}
							onComplete={handleConfirm}
						/>
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
					<Route
						exact
						path={`/competitions/${competitionId}/admin/schedule`}
					>
						<ScheduleSetup
							id={competition._id}
							onComplete={handleConfirm}
						/>
					</Route>
					<Route
						exact
						path={`/competitions/${competitionId}/admin/settings`}
					>
						<SettingsSetup
							id={competition._id}
							onComplete={handleConfirm}
						/>
					</Route>
				</Switch>
			</div>
		</Fragment>
	);
}

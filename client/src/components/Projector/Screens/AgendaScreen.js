import React, { useState, useEffect } from "react";
import UpcomingEvents from "../../Information/UpcomingEvents";
import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
	},
	title: {
		fontSize: "6vh",
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
	},
	list: {
		backgroundColor: theme.palette.background.paper,
	},
}));

export default function AgendaScreen({ wcif, topCompetitors }) {
	const classes = useStyles();
	return (
		<Paper className={classes.paper} square elevation={24}>
			<Grid container direction='column'>
				<Grid item>
					<UpcomingEvents wcif={wcif} />
				</Grid>
			</Grid>
		</Paper>
	);
}

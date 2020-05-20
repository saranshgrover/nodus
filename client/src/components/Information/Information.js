import React, { useContext } from "react";
import { CompetitionContext } from "../../contexts/CompetitionContext";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Grid";
import TopCompetitors from "./TopCompetitors";
import GeneralInformation from "./GeneralInformation";
import UpcomingEvents from "./UpcomingEvents";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		padding: theme.spacing(2, 3),
	},
	paper: {
		margin: theme.spacing(2),
		padding: theme.spacing(3),
		textAlign: "center",
	},
	card: {
		textAlign: "center",
		margin: theme.spacing(2),
		maxHeight: "200px",
	},
}));

export default function Information() {
	const competition = useContext(CompetitionContext);
	const classes = useStyles();
	console.log(competition);
	return (
		<div className={classes.root}>
			<GeneralInformation
				_id={competition._id}
				userConnectionInfo={competition.userConnectionInfo}
			/>
			<Paper className={classes.paper}>
				<Grid
					container
					direction='row'
					justify='center'
					alignItems='flex-start'
					spacing={3}
				>
					<Grid item md={5}>
						<UpcomingEvents _id={competition._id} />
					</Grid>
					<Grid item md={5}>
						<TopCompetitors _id={competition._id} />
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
}

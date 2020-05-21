import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import { activityKey } from "../../logic/activity";

const useStyles = makeStyles((theme) => ({
	list: {
		backgroundColor: theme.palette.background.paper,
		maxHeight: "600px",
		overflow: "scroll",
	},
	avatar: {
		marginLeft: 10,
		width: theme.spacing(8),
		height: theme.spacing(8),
	},
	rankings: {
		padding: 10,
		margin: 10,
		backgroundColor: theme.palette.background.default,
	},
	listItem: {
		width: "100%",
	},
	centered: {
		textAlign: "center",
	},
}));

const getBestRanking = (competitor) => {
	// Given a competitor, find best ranking to show
	let highestRanking = competitor.personalBests[0].worldRanking;
	let rankIndex = 0;
	competitor.personalBests.forEach((best, index) => {
		if (highestRanking > best.worldRanking) {
			// Found better ranking
			highestRanking = best.worldRanking;
			rankIndex = index;
		}
	});
	return competitor.personalBests[rankIndex];
};

const displayRanking = (competitor, classes) => {
	let hasSingle = false;
	competitor.personalBests.forEach((best) => {
		if (best.type == "single") hasSingle = true;
	});
	let hasAverage = false;
	competitor.personalBests.forEach((best) => {
		if (best.type == "average") hasAverage = true;
	});
	return (
		<Grid container direction='row' alignItems='center'>
			{hasSingle && (
				<Paper className={classes.rankings}>
					<Typography variant='h6'>Single</Typography>
					<Grid
						spacing={2}
						container
						direction='row'
						justify='flex-start'
					>
						{competitor.personalBests.map((best) => {
							if (best.type == "single")
								return (
									<Grid item key={best._id}>
										<Icon variant='inherit'>
											<span
												className={`cubing-icon event-${best.eventId}`}
											/>
										</Icon>
										<Grid className={classes.centered} item>
											{best.worldRanking}
										</Grid>
									</Grid>
								);
						})}
					</Grid>
				</Paper>
			)}
			{hasAverage && (
				<Paper className={classes.rankings}>
					<Typography variant='h6'>Average</Typography>
					<Grid
						spacing={2}
						container
						direction='row'
						justify='flex-start'
					>
						{competitor.personalBests.map((best) => {
							if (best.type == "average")
								return (
									<Grid item key={best._id}>
										<Icon variant='inherit'>
											<span
												className={`cubing-icon event-${best.eventId}`}
											/>
										</Icon>
										<Grid className={classes.centered} item>
											{best.worldRanking}
										</Grid>
									</Grid>
								);
						})}
					</Grid>
				</Paper>
			)}
		</Grid>
	);
};

export default function TopCompetitors({ topCompetitors, ...props }) {
	const classes = useStyles();
	console.log(topCompetitors);
	return (
		<>
			<Typography variant='h4'>Top Competitors</Typography>
			<Typography>Showing rankings for top 50 in the world</Typography>
			{topCompetitors.length > 0 ? (
				<List className={classes.list} {...props}>
					{topCompetitors.map((competitor, index) => (
						<React.Fragment key={competitor.wcaUserId}>
							<Grid
								container
								direction='row'
								alignItems='center'
								justify='flex-start'
							>
								<Grid item>
									<Avatar
										className={classes.avatar}
										alt={competitor.name}
										src={competitor.avatar.thumbUrl}
									/>
								</Grid>
								<Grid item>
									<ListItem>
										<Typography variant='h5'>
											{competitor.name}
										</Typography>
									</ListItem>
									<ListItem>
										{displayRanking(competitor, classes)}
									</ListItem>
								</Grid>
							</Grid>
							{index < topCompetitors.length - 1 && <Divider />}
						</React.Fragment>
					))}
				</List>
			) : (
				<Typography>There are no top competitors</Typography>
			)}
		</>
	);
}

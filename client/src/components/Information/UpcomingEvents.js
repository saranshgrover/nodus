import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Error from "../common/Error";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import { flattenActivities } from "../../logic/schedule";
import moment from "moment-timezone";

const useStyles = makeStyles((theme) => ({
	list: {
		backgroundColor: theme.palette.background.paper,
	},
}));

const isHappeningNow = (event, minutes) => {
	const now = moment();
	const startTime = moment(event.startTime);
	const endTime = moment(event.endTime);

	if (now.isBetween(startTime, endTime)) {
		return { bool: true, message: `Ends ${now.to(endTime)}` };
	} else if (
		Math.abs(now.diff(startTime, "minute")) < minutes &&
		now.isBefore(endTime)
	) {
		return { bool: true, message: `Starting ${now.to(startTime)}` };
	} else return { bool: false };
};

export default function UpcomingEvents({ wcif }) {
	const classes = useStyles();
	let transformedActs = flattenActivities(wcif.schedule).map((round) => {
		let data = isHappeningNow(round, 60);
		if (data.bool) {
			round.message = data.message;
			return round;
		}
		return null;
	});
	// Remove nulls
	transformedActs = transformedActs.filter((round) => {
		if (round) return round;
	});
	const ongoingActivities = transformedActs.filter(
		(round) => round.message.indexOf("Ends") >= 0
	);
	const upcomingActivities = transformedActs.filter(
		(round) => round.message.indexOf("Ends") === -1
	);
	return (
		<>
			<Typography variant='h4'>Ongoing and Upcoming Rounds</Typography>
			{transformedActs.length > 0 ? (
				<>
					<List className={classes.list}>
						{ongoingActivities.length > 0 && (
							<>
								<Typography variant='h5'>
									Ongoing Events
								</Typography>
								{ongoingActivities.map((round, index) => (
									<React.Fragment key={round.id}>
										<ListItem>
											<Typography variant='h5'>
												{round.name}
											</Typography>
										</ListItem>
										<ListItem>
											<Typography>
												{round.message}
											</Typography>
										</ListItem>
										{index < transformedActs.length - 1 && (
											<Divider />
										)}
									</React.Fragment>
								))}
							</>
						)}
						{upcomingActivities.length > 0 && (
							<>
								<Typography variant='h5'>
									Upcoming Events
								</Typography>
								{upcomingActivities.map((round, index) => (
									<React.Fragment key={round.id}>
										<ListItem>
											<Typography variant='h5'>
												{round.name}
											</Typography>
										</ListItem>
										<ListItem>
											<Typography>
												{round.message}
											</Typography>
										</ListItem>
										{index <
											upcomingActivities.length - 1 && (
											<Divider />
										)}
									</React.Fragment>
								))}
							</>
						)}
					</List>
				</>
			) : (
				<Typography>
					There are no events occuring in the next hour
				</Typography>
			)}
		</>
	);
}

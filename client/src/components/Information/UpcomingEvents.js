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

const GET_COMPETITION_INFORMATION = gql`
	query getWcifById($_id: String!) {
		getWcifById(_id: $_id) {
			name
			schedule {
				venues {
					rooms {
						activities {
							name
							id
							startTime
							endTime
						}
					}
				}
			}
		}
	}
`;

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
		return { bool: true, message: "Ongoing" };
	} else if (
		Math.abs(now.diff(startTime, "minute")) < minutes &&
		now.isBefore(endTime)
	) {
		return { bool: true, message: `Happening ${now.to(startTime)}` };
	} else return { bool: false };
};

export default function UpcomingEvents({ _id }) {
	const { loading, error, data } = useQuery(GET_COMPETITION_INFORMATION, {
		variables: { _id }, // Gets competitors where world ranking is 50 or lower
	});
	const classes = useStyles();
	if (loading) return <LinearProgress />;
	if (error) return <Error message={error.toString()} />;
	const compData = data.getWcifById;
	let transformedActs = flattenActivities(compData.schedule).map((round) => {
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
	return (
		<>
			<Typography variant='h4'>Now and Upcoming Rounds</Typography>
			{transformedActs.length > 0 ? (
				<List className={classes.list}>
					{transformedActs.map((round, index) => (
						<React.Fragment key={round.id}>
							<ListItem>
								<Typography variant='h5'>
									{round.name}
								</Typography>
							</ListItem>
							<ListItem>
								<Typography>{round.message}</Typography>
							</ListItem>
							{index < transformedActs.length - 1 && <Divider />}
						</React.Fragment>
					))}
				</List>
			) : (
				<Typography>
					There are no events occuring in the next hour
				</Typography>
			)}
		</>
	);
}

import React, { useContext, useState } from "react";
import { CompetitionContext } from "../../contexts/CompetitionContext";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Grid";
import TopCompetitors from "./TopCompetitors";
import GeneralInformation from "./GeneralInformation";
import UpcomingEvents from "./UpcomingEvents";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useQuery } from "@apollo/react-hooks";
import Error from "../common/Error";
import gql from "graphql-tag";

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

const GET_COMPETITION_INFORMATION = gql`
	query getWcifById($_id: String!, $top: Int!) {
		getWcifById(_id: $_id) {
			_id
			name
			locationName
			registrationOpen
			registrationClose
			schedule {
				_id
				startDate
				numberOfDays
				venues {
					_id
					rooms {
						_id
						activities {
							_id
							name
							id
							startTime
							endTime
						}
					}
				}
			}
			events {
				_id
				id
			}
		}
		getTopCompetitors(top: $top, _id: $_id) {
			_id
			name
			wcaUserId
			personalBests {
				_id
				eventId
				best
				type
				worldRanking
			}
			avatar {
				thumbUrl
			}
		}
	}
`;

export default function Information() {
	const competition = useContext(CompetitionContext);
	const { loading, error, data } = useQuery(GET_COMPETITION_INFORMATION, {
		variables: { _id: competition._id, top: 50 }, // Gets competitors where world ranking is 50 or lower
	});
	const classes = useStyles();
	console.log(competition);
	if (loading) return <LinearProgress />;
	if (error) return <Error message={error.toString()} />;
	console.log(data);
	return (
		<div className={classes.root}>
			<GeneralInformation
				wcif={data.getWcifById}
				userConnectionInfo={competition.userRegistered}
				showRegistration={true}
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
						<UpcomingEvents wcif={data.getWcifById} />
					</Grid>
					<Grid item md={5}>
						<TopCompetitors
							topCompetitors={data.getTopCompetitors}
						/>
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
}

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import { useRouteMatch } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";
import Error from "../components/common/Error";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { flattenActivities } from "../logic/schedule";
import {
	createMuiTheme,
	makeStyles,
	ThemeProvider,
} from "@material-ui/core/styles";
import { themeColors } from "../logic/consts";
import blueGrey from "@material-ui/core/colors/blueGrey";

const CompetitionContext = createContext(null);

CompetitionContext.displayName = "CompetitionContext";
export { CompetitionContext };

const FIND_BY_COMPETITION_ID_QUERY = gql`
	query getWcifByCompetitionId($competitionId: String!) {
		getWcifByCompetitionId(competitionId: $competitionId) {
			name
			shortName
			_id
			id
			settings {
				colorTheme
			}
			persons {
				_id
				wcaUserId
				registrantId
			}
			schedule {
				_id
				startDate
				numberOfDays
				venues {
					_id
					timezone
					name
					rooms {
						_id
						id
						name
						color
						activities {
							_id
							id
							name
							activityCode
							startTime
							endTime
							childActivities {
								_id
								id
								name
								activityCode
								startTime
								endTime
							}
						}
					}
				}
			}
		}
	}
`;

const CompetitionProvider = ({ competitionId, children }) => {
	const { loading, error, data } = useQuery(FIND_BY_COMPETITION_ID_QUERY, {
		variables: { competitionId: competitionId },
	});

	const user = useContext(UserContext);
	const userCompetition =
		user.isSignedIn() &&
		user.info.competitions.find(
			(competition) => competition.competitionId === competitionId
		);
	let userRoles = [];
	let userConnectionInfo = {};
	let competitionType = "LOCAL";
	let tabs = ["information", "groups", "results", "notifications"];
	let registrantId = null;
	if (loading) return <LinearProgress />;
	if (error) return <Error message={error.toString()} />;
	const wcif = data.getWcifByCompetitionId;
	const activities = flattenActivities(wcif.schedule);
	console.log(activities);
	if (userCompetition) {
		userRoles = userCompetition.roles;
		userConnectionInfo = user.info.connections.find(
			(connection) =>
				connection.connectionType === userCompetition.competitionType
		);
		competitionType = userCompetition.competitionType;
		tabs = ["overview", ...tabs];
		registrantId = parseInt(
			wcif.persons.find(
				(person) => person.wcaUserId === userConnectionInfo.content.id
			)?.registrantId
		);
	}
	const primary = wcif.settings.colorTheme;
	const theme = createMuiTheme({
		palette: {
			primary: {
				main: themeColors[primary],
			},
			secondary: blueGrey,
			type: "dark",
		},
	});
	return (
		<ThemeProvider theme={theme}>
			<CompetitionContext.Provider
				value={
					competitionId
						? {
								userRegistered: Boolean(userCompetition), // this needs to be changed
								_id: wcif._id,
								competitionId: competitionId,
								name: wcif.name,
								userRoles: userRoles,
								registrantId: registrantId,
								userConnectionInfo: userConnectionInfo,
								competitionType: competitionType,
								tabs: tabs,
								activities: activities,
						  }
						: { error: "No Competition described" }
				}
			>
				{children}
			</CompetitionContext.Provider>
		</ThemeProvider>
	);
};

export default CompetitionProvider;

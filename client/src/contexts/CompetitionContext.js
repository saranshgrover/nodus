import React, { createContext, useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import LinearProgress from "@material-ui/core/LinearProgress";
import Error from "../components/common/Error";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { flattenActivities } from "../logic/schedule";
import { themeColors } from "../logic/consts";
import blueGrey from "@material-ui/core/colors/blueGrey";
import {ToggleThemeContext} from '../contexts/ThemeProvider'

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
	const {updateTheme} = useContext(ToggleThemeContext)
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
	useEffect(() => {
		if(data && data.getWcifByCompetitionId) {
			const themeColor = data.getWcifByCompetitionId.settings.colorTheme
			if(themeColor) {
				const theme = themeColors[themeColor]
				// TODO: work on adding more theme customization besides 'main'
				updateTheme({primary: {main: theme}, secondary: blueGrey})
			}
		}
	},[data])
	if (loading) return <LinearProgress />;
	if (error) return <Error message={error.toString()} />;
	const wcif = data.getWcifByCompetitionId;
	const activities = flattenActivities(wcif.schedule);
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
	return (
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
	);
};

export default CompetitionProvider;

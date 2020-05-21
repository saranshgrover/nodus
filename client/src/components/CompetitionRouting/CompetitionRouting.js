import React, { useContext, Fragment } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import AuthenticatedRoute from "../AuthenticatedRoute/AuthenticatedRoute";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import LinearProgress from "../LinearProgress/LinearProgress";
import Error from "../common/Error";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import Overview from "../Overview/Overview";
import ElevatedTabs from "../ElevatedTabs/ElevatedTabs";
import { CompetitionContext } from "../../contexts/CompetitionContext";
import SwipeableViews from "react-swipeable-views";
import { isAdmin } from "../../logic/user";
import CompetitionAdmin from "../CompetitionAdmin/CompetitionAdmin";
import Groups from "../Groups/Groups";
import Results from "../Results/Results";
import Information from "../Information/Information";
import TabPanel from "../TabPanel/TabPanel";
import Projector from "../Projector/Projector";
const useStyles = makeStyles((theme) => ({}));

const FIND_BY_COMPETITION_ID_QUERY = gql`
	query wcif($competitionId: String!) {
		getWcifByCompetitionId(competitionId: $competitionId) {
			name
			shortName
			_id
		}
	}
`;
const tabs = {
	overview: { name: "Overview", component: <Overview /> },
	information: { name: "Information", component: <Information /> },
	notifications: { name: "Notifications", component: () => {} },
	results: { name: "Results", component: <Results /> },
	groups: { name: "Groups", component: <Groups /> },
};

export default function CompetitionRouting({ match, history }) {
	const competition = useContext(CompetitionContext);
	const theme = useTheme();
	const largeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const mediumScreen = useMediaQuery(theme.breakpoints.up("md"));
	const classes = useStyles();
	const { loading, error, data } = useQuery(FIND_BY_COMPETITION_ID_QUERY, {
		variables: { competitionId: competition.competitionId },
	});

	const [value, setValue] = React.useState(
		Math.max(0, competition.tabs.indexOf(match.params.tab))
	);
	const handleChange = (_, newValue) => {
		const tab = competition.tabs[newValue];
		history.push(`/competitions/${competition.competitionId}/${tab}`);
		setValue(newValue);
	};
	if (loading) return <LinearProgress />;
	if (error) return <Error message={error.message} />;

	return (
		<Switch>
			<AuthenticatedRoute
				authCallback={(user) =>
					isAdmin(user, competition.competitionId)
				}
				RedirectComponent={
					<Redirect to={`/competitions/${match.params.compId}/`} />
				}
				exact
				path={`/competitions/${match.params.compId}/admin/:adminTab?`}
				component={CompetitionAdmin}
			/>
			<Route
				exact
				path={`/competitions/${match.params.compId}/project`}
				component={Projector}
			/>
			<Route>
				<ElevatedTabs
					centered={largeScreen}
					variant={
						largeScreen
							? "standard"
							: mediumScreen
							? "fullWidth"
							: "scrollable"
					}
					value={value}
					onChange={handleChange}
					tabs={competition.tabs.map((tab, index) => ({
						key: index,
						label: tabs[tab].name,
					}))}
				/>
				<SwipeableViews
					axis='x'
					index={value}
					onChangeIndex={(index) => handleChange({}, index)}
				>
					{competition.tabs.map((tab, index) => (
						<TabPanel
							value={value}
							index={index}
							key={`tab-${index}`}
						>
							{tabs[tab].component}
						</TabPanel>
					))}
				</SwipeableViews>
			</Route>
		</Switch>
	);
}

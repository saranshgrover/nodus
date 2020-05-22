import React, { useContext, useState, useEffect } from "react";
import { CompetitionContext } from "../../../contexts/CompetitionContext";
import Grid from "@material-ui/core/Grid";
import GroupTable from "../../GroupTable/GroupTable";
import { parseActivityCode, activityKey } from "../../../logic/activity";
import Typography from "@material-ui/core/Typography";
import CubingIcon from "../../common/CubingIcon";

export default function GroupScreen({ wcif }) {
	const { activities } = useContext(CompetitionContext);
	const [currActivities, setCurrActivities] = useState(null);
	useEffect(() => {
		setCurrActivities(
			activities.filter(
				(activity) => activity.activityCode === "pyram-r1-g1"
			)
		);
	}, []);
	if (!currActivities) return <></>;
	return (
		<Grid>
			{currActivities.map((activity) => {
				const { eventId, roundNumber, groupNumber } = parseActivityCode(
					activity.activityCode
				);
				return (
					<Grid item key={activity.id}>
						<Typography align='center' variant='h5'>
							<CubingIcon eventId={eventId} />
							{`Round ${roundNumber} Group ${groupNumber}`}
						</Typography>
						<GroupTable wcif={wcif} activity={activity} />
					</Grid>
				);
			})}
		</Grid>
	);
}

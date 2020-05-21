import React from "react";
import TopCompetitors from "../../Information/TopCompetitors";
export default function SpotlightScreen({ topCompetitors }) {
	return (
		<TopCompetitors
			style={{ overflow: "hidden" }}
			topCompetitors={topCompetitors}
		/>
	);
}

import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import StepActions from "./StepActions";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import LinearProgress from "@material-ui/core/LinearProgress";
import { themeColors } from "../../../logic/consts";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const COMPETITION_INFO_QUERY = gql`
	query getWcifById($id: String!) {
		getWcifById(_id: $id) {
			id
			_id
			settings {
				imageUrl
				message
				colorTheme
			}
		}
	}
`;

const UPDATE_COMPETITION_INFO_MUTATION = gql`
	mutation updateWcifSettings($id: String!, $settings: SettingInput) {
		updateWcifSettings(_id: $id, settings: $settings) {
			id
			_id
		}
	}
`;

export default function SettingsSetup({ id, onComplete, handleBack }) {
	const [localData, setLocalData] = useState(null);
	const query = useQuery(COMPETITION_INFO_QUERY, {
		variables: { id: id },
	});
	useEffect(() => {
		!query.loading && !query.error && setLocalData(query.data.getWcifById);
	}, [query.loading, query.error, query.data]);

	const [updateWcifSettings, mutationOptions] = useMutation(
		UPDATE_COMPETITION_INFO_MUTATION
	);

	if (query.loading || !localData) return <LinearProgress />;
	if (query.error) console.error(query.error);

	const handleComplete = () => {
		updateWcifSettings({
			variables: { id, settings: localData.settings },
		}).then(() => onComplete());
	};

	const handleReset = () => {};

	const handleChange = ({ target: { name, value } }) => {
		// const v = isNaN(value) ? value : parseInt(value);
		setLocalData({ settings: { ...localData.settings, [name]: value } });
	};

	return (
		<Grid container direction='column' justify='space-between'>
			<FormControl>
				<Grid
					container
					direction='column'
					spacing={2}
					justify='center'
					xs={12}
					alignItems='center'
					alignContent='center'
					wrap='nowrap'
				>
					<Grid item>
						<TextField
							fullWidth
							value={localData.settings.imageUrl}
							label='Image URL'
							name='imageUrl'
							onChange={handleChange}
						/>
					</Grid>
					<Grid item>
						<FormControl>
							<InputLabel id='theme'>Color Theme</InputLabel>
							<Select
								labelId='theme'
								id='theme'
								value={localData.settings.colorTheme}
								name={"colorTheme"}
								onChange={handleChange}
							>
								{Object.keys(themeColors).map((key) => (
									<MenuItem value={key}>
										<>
											{`${key.split("_")[0]}-${
												key.split("_")[1]
											}`}
											<span
												style={{
													height: "20px",
													width: "20px",
													backgroundColor:
														themeColors[key],
												}}
											/>
										</>
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item>
						<TextField
							value={localData.settings.message}
							multiline
							rows={5}
							label='Competition Message'
							name='message'
							variant='outlined'
							onChange={handleChange}
						/>
					</Grid>
				</Grid>
			</FormControl>

			<Grid item>
				<StepActions
					handleBack={handleBack}
					loading={mutationOptions.loading}
					handleComplete={handleComplete}
					handleReset={handleReset}
				/>
			</Grid>
		</Grid>
	);
}

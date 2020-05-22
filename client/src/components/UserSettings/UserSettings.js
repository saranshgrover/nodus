import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import {
	Grid,
	Button,
	FormControl,
	FormHelperText,
	FormLabel,
} from "@material-ui/core";
import WCAButton from "../common/WCAButton";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Error from "../common/Error";

const UPDATE_USER_MUTATION = gql`
	mutation updateUser(
		$_id: String!
		$newName: String!
		$newEmail: String!
		$newUsername: String!
	) {
		updateUser(
			_id: $_id
			newName: $newName
			newEmail: $newEmail
			newUsername: $newUsername
		) {
			_id
		}
	}
`;

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(10),
		margin: "auto",
		width: "50vw",
		minHeight: "20vh",
	},
	input: {
		width: "30vw",
		margin: theme.spacing(2),
	},
	title: {
		margin: theme.spacing(4),
	},
	button: {
		margin: theme.spacing(2),
	},
}));
export default function UserSettings() {
	const classes = useStyles();
	const { info } = useContext(UserContext);
	const handleUserChange = ({ target: { name, value, ...other } }) =>
		setUser({ ...user, [name]: { ...user[name], value } });
	const [user, setUser] = useState({
		name: {
			value: info.name,
			error: "",
			label: "Full Name",
			helperText: "",
		},
		username: {
			value: info.username,
			error: "",
			label: "Your Username",
			helperText:
				"Must be at least 6 characters long. Must have at least 1 letter and 1 number.",
		},
		email: {
			value: info.email,
			error: "",
			label: "Your Email Address",
			helperText: "",
		},
	});

	const [updateUser, { loading, error }] = useMutation(UPDATE_USER_MUTATION);
	const handleSubmit = () => {
		updateUser({
			variables: {
				_id: info._id,
				newName: user.name.value,
				newEmail: user.email.value,
				newUsername: user.username.value,
			},
		});
	};
	console.log(info);
	return (
		<>
			<Paper square className={classes.paper}>
				<Grid
					container
					direction='column'
					alignItems='center'
					alignContent='center'
					justify='center'
					spacing={2}
				>
					<FormControl error={Boolean(error)}>
						<Grid item>
							<Typography
								className={classes.title}
								color='primary'
								variant='h5'
							>
								User Settings
							</Typography>
						</Grid>
						{Object.keys(user).map((key) => (
							<Grid item key={key}>
								<TextField
									error={user[key].error !== ""}
									fullWidth
									className={classes.input}
									id='outlined-basic'
									label={user[key].label}
									name={key}
									value={user[key].value}
									helperText={
										user[key].error !== ""
											? user[key].error
											: user[key].helperText
									}
									type={key === "email" ? key : "text"}
									onChange={handleUserChange}
								/>
							</Grid>
						))}
						{!loading && (
							<>
								<Grid item>
									<Button
										className={classes.button}
										disabled={loading}
										varaint='outlined'
										color='primary'
										onClick={handleSubmit}
									>
										Save
									</Button>
								</Grid>
							</>
						)}
						{loading && (
							<Grid item>
								<CircularProgress size={24} />
							</Grid>
						)}
						<FormHelperText>
							{error ? error.message : ""}
						</FormHelperText>
					</FormControl>
				</Grid>
			</Paper>
			<Paper square className={classes.paper}>
				<Grid
					container
					direction='column'
					justify='center'
					alignContent='center'
				>
					<Grid item>
						<Typography
							className={classes.title}
							color='primary'
							variant='h5'
						>
							Connections
						</Typography>
					</Grid>
					{info.connections.map((connection) => (
						<Grid item key={connection.connectionType}>
							<WCAButton
								variant='contained'
								color='primary'
								onClick={() => {}}
								text={connection.content.wca.id}
							/>
						</Grid>
					))}
				</Grid>
			</Paper>
		</>
	);
}

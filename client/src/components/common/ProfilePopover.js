import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import { FaceOutlined as FaceIcon } from "@material-ui/icons";
import { UserContext } from "../../contexts/UserContext";
import { useHistory } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme) => ({
	popover: {
		background: theme.palette.background.paper,
		width: theme.spacing(40),
		borderRadius: theme.shape.borderRadius,
	},
	container: {
		display: "flex",
		padding: theme.spacing(2),
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		width: theme.spacing(6),
		height: theme.spacing(6),
		margin: theme.spacing(1),
		background: theme.palette.background.default,
	},
	userInfo: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		paddingLeft: theme.spacing(1),
	},
	userName: {
		fontSize: "1rem",
		fontWeight: 500,
	},
	userEmail: {
		fontSize: "0.9rem",
	},
	bar: {
		padding: theme.spacing(2),
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	buttonSignout: {
		borderRadius: theme.spacing(0.5),
		padding: theme.spacing(0.5, 2),
		fontSize: "0.8rem",
		fontWeight: 500,
		textTransform: "none",
	},
}));

export default function ProfilePopover({ anchorEl, isOpen, onClose }) {
	const history = useHistory();
	const classes = useStyles();
	const theme = useTheme();
	const id = isOpen ? "profile-popover" : undefined;
	const { info, isSignedIn, signOut } = useContext(UserContext);
	const { username, email, name } = info;
	return (
		<div>
			<Popover
				id={id}
				open={isOpen}
				anchorEl={anchorEl}
				onClose={onClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
				classes={{
					paper: classes.popover,
				}}
			>
				<div className={classes.container}>
					<FaceIcon fontSize='large' />
					<div className={classes.userInfo}>
						<Typography
							className={classes.userName}
							variant='h6'
							component='span'
							color='textPrimary'
						>
							{username}
						</Typography>
						<Typography
							className={classes.userEmail}
							variant='body1'
							component='span'
							color='textSecondary'
						>
							{email}
						</Typography>
					</div>
				</div>
				<MenuItem onClick={() => history.push(`/settings`)}>
					{"Settings"}
				</MenuItem>
				<MenuItem onClick={() => history.push("/new")}>
					{`New Competition`}
				</MenuItem>
				<Divider />
				<div className={classes.bar}>
					<Button
						variant='outlined'
						size='small'
						onClick={signOut}
						classes={{ root: classes.buttonSignout }}
					>
						Sign out
					</Button>
				</div>
			</Popover>
		</div>
	);
}

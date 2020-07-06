import React, {
	Fragment,
	useContext,
	useState,
	useEffect,
	useRef,
} from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import FlipCameraAndroidIcon from "@material-ui/icons/FlipCameraAndroid";
import { UserContext } from "../../contexts/UserContext";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { useHistory, useRouteMatch } from "react-router-dom";
import LockIcon from "@material-ui/icons/Lock";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Link from "@material-ui/core/Link";
import { isAdmin } from "../../logic/user";
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import ProfilePopover from "./ProfilePopover";

const useStyles = makeStyles((theme) => ({
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
	},
	title: {
		textDecoration: "none",
		color: "white",
		flexGrow: 1,
		marginLeft: theme.spacing(1),
	},
	titleIcon: {
		maxHeight:'10%',
		marginRight: theme.spacing(2),
	},
	username: {
		marginRight: theme.spacing(1),
	},
	container: theme.mixins.toolbar
}));

function HideOnScroll(props) {
	const { children, window } = props;
	const trigger = useScrollTrigger({ target: window ? window() : undefined });
  
	return (
	  <Slide appear={false} direction="down" in={!trigger}>
		{children}
	  </Slide>
	);
  }
  
  



export default function Header() {
	// TODOp1: This rerenders/remounts EVERY TIME THE LOCATION CHANGES IN WINDOW
	const match = useRouteMatch("/competitions/:competitionId/:tab?") || {
		params: {
			competitionId: "",
			tab: "",
		},
	};
	const history = useHistory();
	const profileMenuRef = useRef();
	const [menuOpen, setMenuOpen] = useState(false);
	// I don't like how this is done. We need a better way
	const [admin, setAdmin] = useState(false);
	const user = useContext(UserContext);
	useEffect(() => {
		const competitionId = match?.params?.competitionId;
		isAdmin(user, competitionId) && setAdmin(true);
	}, [match.params.competitionId, match.params.tab]);
	const classes = useStyles();
	return (
		<React.Fragment>
		<HideOnScroll>
		<AppBar className={classes.appBar} color='primary'>
			<Toolbar spacing={2} className={classes.titleIcon}>
				<Typography
					component={Link}
					variant='h6'
					className={classes.title}
					onClick={() => {
						setAdmin(false); // Stops Admin button from showing with going to home
						history.push("/");
					}}
				>
					<img
						style={{ width: "64px", height: "64px" }}
						src={`${process.env.PUBLIC_URL}/nodus-orange.png`}
					/>
				</Typography>
				{admin && (
					<Button
						variant='text'
						onClick={() =>
							history.push(
								`/competitions/${match.params.competitionId}/${
									match.params.tab === "admin" ? "" : "admin"
								}`
							)
						}
						startIcon={
							match.params.tab === "admin" ? (
								<VisibilityIcon />
							) : (
								<LockIcon />
							)
						}
					>
						{match.params.tab === "admin" ? "Public" : "Admin"}
					</Button>
				)}
				{user.isSignedIn() ? (
					<>
						<Button
							endIcon={<ArrowDropDownIcon />}
							ref={profileMenuRef}
							onClick={() => setMenuOpen(true)}
							variant='text'
							style={{ textTransform: "none" }}
						>
							{user.info.username}
						</Button>
					</>
				) : (
					<Button
						variant='contained'
						color='secondary'
						onClick={() => history.push("/signin")}
					>
						Sign In
					</Button>
				)}
			</Toolbar>
			{user.isSignedIn() && (
				<ProfilePopover
					anchorEl={profileMenuRef.current}
					isOpen={menuOpen}
					onClose={() => setMenuOpen(false)}
				/>
			)}
		</AppBar>
		</HideOnScroll>
		<div className={classes.container}/>
		</React.Fragment>
	);
}

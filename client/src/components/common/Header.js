import React, { Fragment, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid'
import MenuIcon from '@material-ui/icons/Menu'
import { isMobile } from 'react-device-detect'
import { UserContext } from '../../contexts/UserContext'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

const useStyles = makeStyles((theme) => ({
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
	},
	title: {
		textDecoration: 'none',
		color: 'white',
		flexGrow: 1,
		marginLeft: theme.spacing(1),
	},
	titleIcon: {
		marginRight: theme.spacing(2),
	},
	username: {
		marginRight: theme.spacing(1),
	},
}))

export default function Header({ history, setMobileOpen }) {
	const [menuOpen, setMenuOpen] = useState(false)
	const [anchorEl, setAnchorEl] = useState()
	const recordButtonPosition = (event) => {
		setAnchorEl(event.currentTarget)
		setMenuOpen(!menuOpen)
	}
	const user = useContext(UserContext)
	const classes = useStyles()
	return (
		<AppBar position='sticky' color='primary' className={classes.appBar}>
			<Toolbar spacing={2} className={classes.titleIcon}>
				{isMobile && (
					<IconButton onClick={setMobileOpen} className={classes.titleIcon}>
						<MenuIcon size={10} />
					</IconButton>
				)}
				<FlipCameraAndroidIcon />
				<Typography
					variant='h6'
					className={classes.title}
					component={Link}
					to={'/'}
				>
					Nodus
				</Typography>
				{user.isSignedIn() ? (
					<Fragment>
						<Button
							endIcon={<ArrowDropDownIcon />}
							onClick={recordButtonPosition}
							variant='text'
							style={{ textTransform: 'none' }}
						>
							{user.info.username}
						</Button>

						<Menu
							anchorEl={anchorEl}
							open={menuOpen}
							onClose={() => setMenuOpen(false)}
						>
							<MenuItem onClick={() => history.push(`/settings`)}>
								{'Settings'}
							</MenuItem>
							<MenuItem onClick={user.signOut}>Sign Out</MenuItem>
						</Menu>
					</Fragment>
				) : (
					<Button
						variant='contained'
						color='secondary'
						onClick={() => history.push('/signin')}
					>
						Sign In
					</Button>
				)}
			</Toolbar>
		</AppBar>
	)
}

import React, {useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import DashboardList from './DashboardList';
import Competition from './Competition'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Dashboard( {match,location,history,container, mobileOpen, setMobileOpen,userInfo, managableComps, upcomingComps}) {
  const classes = useStyles();
  const onItemChange = (text) => {
      const newUrl = location.pathname.slice(0,location.pathname.lastIndexOf('/')) + '/' + text;
      history.push(newUrl)
  }
  const [user] = useState((managableComps.filter(comp=>comp.id===match.params.compId).length>0 ? 'admin' : upcomingComps.filter(comp=>comp.id===match.params.compId).length>0 ? 'competitor' : 'spectator'))

  return (
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={'left'}
            open={mobileOpen}
            onClose={setMobileOpen}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <div>
              <div className={classes.toolbar} />
              <DashboardList user={user} onClick={onItemChange}/>
            </div>
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <div>
              <div className={classes.toolbar} />
              <DashboardList user={user} onClick={onItemChange}/>
            </div>
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {<Competition user={user} compId={match.params.compId} userInfo={userInfo} component={match.params.component} />}
      </main>
    </div>
  );
}

export default Dashboard;
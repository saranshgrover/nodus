import React, { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ProjectorAdmin from './ProjectorAdmin'
import GeneralAdmin from './GeneralAdmin'
import NotificationsAdmin from './NotificationsAdmin'

import {getExtensionData} from '../../../server/wcif'


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function Admin({wcif,setWcif}) {
  const classes = useStyles();
  const [localGeneral,setLocalGeneral] = useState(getExtensionData('GeneralConfig',wcif))
  const [localProjector,setLocalProjector] = useState(getExtensionData('ScheduleConfig',wcif))
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>General</Typography>
        </ExpansionPanelSummary>
        <GeneralAdmin generalConfig={localGeneral} updateGeneralConfig={setLocalGeneral}/>
      </ExpansionPanel>
      <ExpansionPanel disabled={!(localGeneral.useProjector)}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Projector</Typography>
        </ExpansionPanelSummary>
          <ProjectorAdmin localProjector={localProjector} setProjectorConfig={setLocalProjector} venues={wcif.schedule.venues} id={wcif.id}/>
      </ExpansionPanel>
      <ExpansionPanel disabled={!localGeneral.useTelegramNotif}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography className={classes.heading}> Notifications</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <NotificationsAdmin/>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
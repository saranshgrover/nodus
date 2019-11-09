import React, {useState} from 'react'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Button from '@material-ui/core/Button'
import FormGroup from '@material-ui/core/FormGroup'
import TextField from '@material-ui/core/TextField'
import {getRoomColors} from '../../../server/wcif'
import { Typography } from '@material-ui/core'
import Divider from '@material-ui/core/Divider';
import {makeStyles} from '@material-ui/core/styles'
import ButtonGroup from '@material-ui/core/ButtonGroup'
/*
TODO: Implement A COLOR PICKER for rooms
*/

const useStyles = makeStyles(theme=>({
    root: {
      width: '100%',
    },
    title: {
        margin: theme.spacing(3),
        textAlign:'center',
    },
    group: {
        justifyContent: 'center',
    },
    link: {
        justifyContent:'center',
        maxWidth: 200,
    },
  }));

export default function ProjectorAdmin({localProjector,setProjectorConfig,venues,id}) {
    const [localConfig, setLocalConfig] = useState(localProjector)
    const [roomColors,setRoomColors] = useState(getRoomColors(venues))
    const onValueChange = (name) => (event) => {
        setLocalConfig({
            ...localConfig,
            [name]: event.target.value,
        })
    }
    const saveWcif = () => {
        setProjectorConfig(localConfig)
    }
    const classes = useStyles();
    return (
    <>
        <ExpansionPanelDetails>
            <FormGroup>
            <TextField
                id="outlined-number"
                label="Delay (minutes)"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                value={localConfig.delay}
                onChange={onValueChange('delay')}
                margin="normal"
                variant="outlined"
            />
             <TextField
                id="outlined-multiline-static"
                label="Pinned Messsage"
                type="text"
                InputLabelProps={{
                    shrink: true,
                }}
                multiline
                rows='4'
                value={localConfig.pinnedMessage}
                onChange={onValueChange('pinnedMessage')}
                margin="normal"
                variant="outlined"
                helperText="Use this if you would like to project a message at the competition. You might want to include WiFi details, lunch details among other stuff. Come back if you wish to add anything."
            />
            <Divider/>
            <Typography className={classes.title} variant='h6' gutterBottom>Link to Projector Screens</Typography>
            <ButtonGroup className={classes.group}>
                <Button className={classes.link} variant="outlined" href={`live/${id}/all`} >
                    Slideshow
                </Button>
                <Button className={classes.link} variant="outlined"  href={`live/${id}/pin`} >
                    Pinned Message
                </Button>
                {venues.map(venue =>venue.rooms.map(room=> 
                    <Button className={classes.link} key={room.id} variant='outlined' href={`live/${room.id}`}>
                        {room.name}
                    </Button>
                    ))}
            </ButtonGroup>
            </FormGroup>
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
            <Button size="small" color="primary" onClick={()=>saveWcif()}>Save</Button>
        </ExpansionPanelActions>
    </>
        
    )
}

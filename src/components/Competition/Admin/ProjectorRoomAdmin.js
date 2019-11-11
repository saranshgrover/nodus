import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import { getExtensionData, setExtensionData } from '../../../server/wcif'
import { setIn } from '../../../server/tools'

export default function ProjectorRoomAdmin({room,onRoomChange}) {
    const onValueChange = (name) => (event) => {
        onRoomChange(
            setExtensionData(
                'ScheduleConfig',
                room,
                setIn(getExtensionData('ScheduleConfig',room),[name],event.target.value)
            ))
    }
    const localConfig = getExtensionData('ScheduleConfig',room)
    return (
    <>
        <Typography variant='h6'>{room.name}</Typography>
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
    </>
    )
}

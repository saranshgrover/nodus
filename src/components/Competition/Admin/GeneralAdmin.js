import React, {useState, useEffect} from 'react'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Button from '@material-ui/core/Button'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import NativeSelect from '@material-ui/core/NativeSelect'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import { setExtensionData, getExtensionData } from '../../../server/wcif'
import {setIn} from '../../../server/tools'

export default function GeneralAdmin({wcif,setWcif,updateGeneralConfig}) {
    const localConfig = getExtensionData('GeneralConfig',wcif)
    const onValueChange = (name) => (event) => {
        setWcif(
            setExtensionData(
                'GeneralConfig',
                wcif,
                setIn(getExtensionData('GeneralConfig',wcif),[name],event.target.value)
            )
        )
    }
    const onCheckboxChange = (name) => (event) => {
        setWcif(
            setExtensionData(
                'GeneralConfig',
                wcif,
                setIn(getExtensionData('GeneralConfig',wcif),[name],event.target.checked)
            )
        )
        console.log(wcif)
        console.log(getExtensionData('GeneralConfig',wcif))
    }
    const saveWcif = () => {
        updateGeneralConfig()
    }
    return (
    <>
        <ExpansionPanelDetails>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch
                        checked={localConfig.useProjector}
                        value='useProjector'
                        onChange={onCheckboxChange('useProjector')}
                        />
                    }
                    label='Use Projector'
                />
                <FormControlLabel
                    control={
                        <Switch
                        checked={localConfig.useTelegramNotif}
                        value='useTelegramNotif'
                        onChange={onCheckboxChange('useTelegramNotif')}
                        />
                    }
                    label='Use Telegram Notifications'
                />
                <FormControlLabel
                    control={
                        <Switch
                        checked={localConfig.showGroups}
                        value='useGroups'
                        onChange={onCheckboxChange('useGroups')}
                        />
                    }
                    label='Show Groups & Assignments'
                />
                {
                <FormControl
                    required
                    style={{
                        margin:20,
                        minWidth: 120,
                    }}
                    control={
                        <div>
                            <InputLabel htmlFor='group-tool-helper'>Group Tool Used</InputLabel>
                            <NativeSelect
                            value={localConfig.groupTool}
                            onChange={onValueChange('groupTool')}
                            >
                            <option value=''>None</option>
                            <option value='groupifier'>Groupifier</option>
                            </NativeSelect>
                            <FormHelperText>Select the tool you used to generate groups. Only programs that communicate with WCIF are usable. If not selected, competitors will be unable to view their groups and you will have to manually proceed groups on the projector.</FormHelperText>
                        </div>
                    }
                />}     
            </FormGroup>
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
            <Button size="small" color="primary" onClick={()=>saveWcif()}>Save</Button>
        </ExpansionPanelActions>
    </>
    )
}

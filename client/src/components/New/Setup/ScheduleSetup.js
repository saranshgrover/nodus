import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import LinearProgress from '@material-ui/core/LinearProgress'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import StepActions from './StepActions'
import DateFnsUtils from '@date-io/date-fns'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import CompetitionCalendar from './CompetitionCalendar'

const COMPETITION_SCHEDULE_QUERY = gql`
    query getWcifById($id: String!) {
        getWcifById(_id: $id) {
            schedule {
                startDate
                numberOfDays
                venues {
                    id
                    name
                    timezone
                    rooms {
                        id
                        name
                        color
                        activities {
                            id
                            name
                            activityCode
                            startTime
                            endTime
                            scrambleSetId
                        }
                    }
                }
            }
        }
    }
`
const UPDATE_COMPETITION_SCHEDULE_MUTATION = gql`
    mutation updateWcifSchedule($id: String!, $schedule: ScheduleInput!) {
        updateWcifSchedule(_id: $id, schedule: $schedule) {
            id
        }
    }
`

export default function ScheduleSetup({ id, handleReset, onComplete, handleBack }) {
    const [localData, setLocalData] = useState(null)
    const query = useQuery(COMPETITION_SCHEDULE_QUERY, {
        variables: { id: id },
    })
    useEffect(() => {
        !query.loading && !query.error && setLocalData(query.data.getWcifById)
        !query.loading && !query.error && console.table(query.data.getWcifById)
    }, [query.loading, query.error, query.data])

    const [updateWcifSchedule, mutationOptions] = useMutation(UPDATE_COMPETITION_SCHEDULE_MUTATION)

    const handleComplete = () => {
        console.log(localData)
        updateWcifSchedule({
            variables: { id, schedule: localData.schedule },
        }).then(() => onComplete())
    }

    if (query.loading || !localData) return <LinearProgress />
    if (query.error) console.error(query.error)

    const handleDateChange = (e) => {
        setLocalData({ ...localData, schedule: { ...localData.schedule, startDate: e.toISOString() } })
    }

    const handleScheduleChange = ({ target: { name, value } }) => {
        let v = null
        if (name === 'startDate') {
            v = new Date()
            v.setUTCHours(0, 0, 0, 0)
            v = v.toISOString()
        } else {
            v = isNaN(value) ? value : parseInt(value)
        }
        setLocalData({ ...localData, schedule: { ...localData.schedule, [name]: v } })
    }
    return (
        <Grid container direction='column' justify='space-between'>
            <Grid item>
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
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant='inline'
                                format='MM/dd/yyyy'
                                // margin="normal"
                                fullWidth
                                value={new Date(localData.schedule.startDate)}
                                label='Start Date'
                                name='startDate'
                                onChange={handleDateChange}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item>
                        <TextField
                            fullWidth
                            value={localData.schedule.numberOfDays}
                            label='Number of days'
                            name='numberOfDays'
                            type='number'
                            onChange={handleScheduleChange}
                        />
                    </Grid>
                    <Grid item></Grid>
                </Grid>
            </Grid>
            <Grid item>
                <CompetitionCalendar schedule={localData.schedule} updateData={setLocalData} />
            </Grid>
            <Grid item>
                <StepActions
                    handleBack={handleBack}
                    loading={mutationOptions.loading}
                    handleComplete={handleComplete}
                    handleReset={handleReset}
                />
            </Grid>
        </Grid>
    )
}

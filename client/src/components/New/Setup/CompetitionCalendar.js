import React, { Component } from 'react'
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler'
import {
    Scheduler,
    DayView,
    Appointments,
    AppointmentForm,
    AppointmentTooltip,
    ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui'

export default function CompetitionCalendar({ schedule, updateData }) {
    let appointments = []
    schedule.venues[0].rooms.forEach((room, roomIndex) => {
        let roomArray = room.activities.map((activity, actIndex) => {
            const result = {
                ...activity,
                startDate: new Date(activity.startTime),
                endDate: activity.endTime,
                title: activity.name,
                roomId: room.id,
            }
            return result
        })
        appointments = appointments.concat(roomArray)
    })

    const commitChanges = ({ added, changed, deleted }) => {
        if (added) {
        }
        if (changed) {
            appointments = appointments.map((appointment) =>
                changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment
            )
            let newRooms = schedule.venues[0].rooms
            schedule.venues[0].rooms.forEach((room, roomIndex) => {
                newRooms[roomIndex].activities = appointments.filter((appointment) => {
                    if (appointment.roomId === room.id) {
                        appointment.endTime = appointment.endDate
                        delete appointment.endDate
                        appointment.startTime = appointment.startDate
                        delete appointment.startDate
                        appointment.name = appointment.title
                        delete appointment.title
                        delete appointment.roomId
                        return appointment
                    }
                    return null
                })
            })
            schedule.venues[0].rooms = newRooms
            console.log(newRooms)
            console.log(schedule)
            updateData({ schedule })
        }
        if (deleted) {
        }
        return schedule
    }
    return (
        <Scheduler data={appointments} height={600}>
            <ViewState currentDate={new Date(schedule.startDate).toUTCString()} />
            <EditingState onCommitChanges={commitChanges} />
            <IntegratedEditing />
            <DayView startDayHour={0} endDayHour={24} />
            <ConfirmationDialog />
            <Appointments />
            <AppointmentTooltip showOpenButton showDeleteButton />
            <AppointmentForm />
        </Scheduler>
    )
}

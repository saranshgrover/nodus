import React, { Component } from 'react'
import {
	ViewState,
	EditingState,
	IntegratedEditing,
	GroupingState,
	IntegratedGrouping,
} from '@devexpress/dx-react-scheduler'
import {
	Scheduler,
	DayView,
	Appointments,
	AppointmentForm,
	AppointmentTooltip,
	ConfirmationDialog,
	Resources,
	GroupingPanel,
	DragDropProvider,
} from '@devexpress/dx-react-scheduler-material-ui'
import moment from 'moment-timezone'

const messages = {
	moreInformationLabel: '',
}

const TextEditor = (props) => {
	if (props.type === 'multilineTextEditor') {
		return null
	}
	return <AppointmentForm.TextEditor {...props} />
}

export default function CompetitionCalendar({ schedule, updateData }) {
	const convertCompTimezoneToUser = (time) => {
		//  Convert competiton timezone to user timezone
		let convertedDate = new Date(
			moment(time).tz(schedule.venues[0].timezone).format('YYYY-MM-DD HH:mm')
		)
		return convertedDate
	}
	const convertUserTimezoneToComp = (time) => {
		//  Convert user timezone to comp's timezone. This reverses convertCompTimezoneToUser()
		let noTimezone = moment(time).format('YYYY-MM-DD HH:mm')
		// let convertedDate = new Date(
		// 	moment
		// 		.tz(noTimezone, schedule.venues[0].timezone)
		// 		.format("YYYY-MM-DDTHH:mm:ssZ") // Converts to ISO string without using toISOString() as this func converts timezone back to user's local timezone
		// );
		let convertedDate = new Date(
			moment.tz(noTimezone, schedule.venues[0].timezone).toISOString()
		)
		console.log(`Converting ${time} -to- ${convertedDate}`)
		return convertedDate
	}
	let appointments = []
	schedule.venues[0].rooms.forEach((room, roomIndex) => {
		let roomArray = room.activities.map((activity, actIndex) => {
			const result = {
				...activity,
				startDate: convertCompTimezoneToUser(activity.startTime),
				endDate: convertCompTimezoneToUser(activity.endTime),
				title: activity.name,
				roomId: room.id,
			}
			return result
		})
		appointments = appointments.concat(roomArray)
	})
	console.log(appointments)

	const getNewId = () => {
		// IDs in rounds are sequential. New id is largest ID plus 1
		let newId = 0
		appointments.forEach((appointment) => {
			if (newId < appointment.id) newId = appointment.id
		})
		return newId + 1
	}

	const commitChanges = ({ added, changed, deleted }) => {
		if (added) {
			Object.assign(added, { id: getNewId() })
			console.log(added)
			appointments.push(added)
		}
		if (changed) {
			console.log(changed)
			appointments = appointments.map((appointment) =>
				changed[appointment.id]
					? { ...appointment, ...changed[appointment.id] }
					: appointment
			)
		}
		if (deleted) {
			appointments = appointments.filter(
				(appointment) => deleted !== appointment.id
			)
		}
		let newRooms = schedule.venues[0].rooms
		schedule.venues[0].rooms.forEach((room, roomIndex) => {
			newRooms[roomIndex].activities = appointments.filter((appointment) => {
				if (appointment.roomId === room.id) {
					appointment.endTime = convertUserTimezoneToComp(appointment.endDate)
					delete appointment.endDate
					appointment.startTime = convertUserTimezoneToComp(
						appointment.startDate
					)
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
		updateData({ schedule })
		return schedule
	}

	const formatRoomsToArray = () => {
		// Returns an array where each object has an id and text
		let formattedArray = []
		schedule.venues[0].rooms.forEach((room) => {
			formattedArray.push({ id: room.id, text: room.name })
		})
		console.log(formattedArray)
		return formattedArray
	}

	const Layout = ({ onFieldChange, appointmentData, ...restProps }) => {
		const onCustomFieldChange = (nextValue) => {
			onFieldChange({ customField: nextValue })
		}
		return (
			<AppointmentForm.BasicLayout
				appointmentData={appointmentData}
				onFieldChange={onFieldChange}
				{...restProps}
			></AppointmentForm.BasicLayout>
		)
	}

	let grouping = [{ resourceName: 'roomId' }]

	let resources = [
		{
			fieldName: 'roomId',
			title: 'Location',
			instances: formatRoomsToArray(),
		},
	]

	// const formatDayScaleDate = (date, options) => {
	// 	const momentDate = moment(date);
	// 	return momentDate.format();
	// };

	// const DayScaleCell = ({ formatDate, classes, ...restProps }) => (
	// 	<DayView.DayScaleCell {...restProps} formatDate={formatDayScaleDate} />
	// );

	console.log(resources)

	return (
		<Scheduler data={appointments} height={600}>
			<ViewState currentDate={schedule.startDate} />
			<EditingState onCommitChanges={commitChanges} />
			<GroupingState grouping={grouping} />
			<DayView
				startDayHour={0}
				endDayHour={24}
				intervalCount={schedule.numberOfDays}
				// dayScaleCellComponent={DayScaleCell}
			/>
			<Appointments />
			<Resources data={resources} mainResourceName='roomId' />
			<IntegratedGrouping />
			<IntegratedEditing />
			<GroupingPanel />

			<ConfirmationDialog />

			<AppointmentTooltip showOpenButton showDeleteButton />
			<AppointmentForm
				basicLayoutComponent={Layout}
				textEditorComponent={TextEditor} // Remove multi-layer textbox
				messages={messages}
			/>
			<DragDropProvider />
		</Scheduler>
	)
}

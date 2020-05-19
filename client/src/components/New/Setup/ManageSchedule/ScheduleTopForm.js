import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import DateFnsUtils from '@date-io/date-fns'
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from '@material-ui/pickers'

export default function ScheduleTopForm({
	date,
	handleDateChange,
	numberOfDays,
	handleNumberOfDays,
}) {
	const [localNumDays, setLocalNumDays] = useState(numberOfDays)
	return (
		<>
			<Grid item>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<KeyboardDatePicker
						disableToolbar
						variant='inline'
						format='MM/dd/yyyy'
						fullWidth
						value={`${date}T00:00:00`}
						label='Start Date'
						name='startDate'
						onChange={handleDateChange}
					/>
				</MuiPickersUtilsProvider>
			</Grid>
			<Grid item>
				<TextField
					fullWidth
					error={localNumDays <= 0}
					helperText='This value must be greater than 0'
					value={localNumDays}
					label='Number of days'
					name='numberOfDays'
					type='number'
					onChange={(e) => setLocalNumDays(parseInt(e.target.value))}
				/>
				<Button
					variant='outlined'
					onClick={() => {
						handleNumberOfDays(localNumDays)
					}}
				>
					Set
				</Button>
			</Grid>
		</>
	)
}

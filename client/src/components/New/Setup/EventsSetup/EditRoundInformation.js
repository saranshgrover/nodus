import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'

export default function EditRoundInformation({ round, onComplete }) {
	const [localRound, setLocalRound] = useState(round)
	console.log(localRound)
	return (
		<Dialog open={true} onClose={() => onComplete(round)}>
			<DialogTitle>Edit Round Information</DialogTitle>
			<DialogContent>
				<Grid container direction='column' xs={12}>
					<Grid item container>
						<TextField
							name='attemptResult'
							label='Result Cutoff'
							value={localRound.cutoff?.attemptResult}
							onChange={(e) =>
								setLocalRound({
									...localRound,
									cutoff: {
										...localRound?.cutoff,
										attemptResult: e.target.value,
									},
								})
							}
						/>
					</Grid>
					<Grid item container>
						<TextField
							name='numberOfAttempts'
							label='Number of Attempts'
							value={localRound.cutoff?.numberOfAttempts}
							onChange={(e) =>
								setLocalRound({
									...localRound,
									cutoff: {
										...localRound.cutoff,
										numberOfAttempts: e.target.value,
									},
								})
							}
						/>
					</Grid>
					<Grid item container>
						<InputLabel>Type</InputLabel>
						<Select
							style={{ width: '80%' }}
							value={localRound.advancementCondition?.type}
							onChange={(e) =>
								setLocalRound({
									...localRound,
									advancementCondition: {
										...localRound.advancementCondition,
										type: e.target.value,
									},
								})
							}
						>
							<MenuItem value={'ranking'}>Ranking</MenuItem>
							<MenuItem value={'percent'}>Percent</MenuItem>
							<MenuItem value={'attemptResult'}>Attempt</MenuItem>
						</Select>
					</Grid>
					<Grid item container>
						<TextField
							name='level'
							label={localRound.advancementCondition?.type || 'Level'}
							value={localRound.advancementCondition?.level[0]}
							onChange={(e) =>
								setLocalRound({
									...localRound,
									cutoff: {
										...localRound.advancementCondition,
										level: [e.target.value],
									},
								})
							}
						/>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => onComplete(round)} color='primary'>
					Cancel
				</Button>
				<Button onClick={() => onComplete(localRound)} color='primary'>
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
	)
}

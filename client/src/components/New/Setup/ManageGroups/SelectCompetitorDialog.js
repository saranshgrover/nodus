import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Checkbox from '@material-ui/core/Checkbox'
import { getPreciseTime } from '../../../../server/tools'

export default function SelectCompetitorDialog({
	competitors,
	onSubmit,
	onCancel,
}) {
	const [newCompetitors, setNewCompetitors] = React.useState(competitors)
	const [assignments, setAssignments] = React.useState([])
	const handleChange = (checked, competitor) => {
		if (checked) {
			setAssignments([...assignments, competitor])
			setNewCompetitors(
				newCompetitors.filter((c) => c.wcaUserId !== competitor.wcaUserId)
			)
		} else {
			setNewCompetitors([...newCompetitors, competitor])
			setAssignments(
				assignments.filter((c) => c.wcaUserId !== competitor.wcaUserId)
			)
		}
	}
	return (
		<Dialog fullScreen open={true}>
			<DialogTitle>Select Competitors</DialogTitle>
			<DialogContent>
				<Table size='small'>
					<TableHead>
						<TableRow>
							<TableCell align='left'>Select</TableCell>
							<TableCell>Name</TableCell>
							<TableCell>WCA ID</TableCell>
							<TableCell align='right'>Seed Time</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{competitors.map((competitor) => (
							<TableRow key={competitor.wcaUserId}>
								<TableCell>
									<Checkbox
										checked={newCompetitors.indexOf(competitor) === -1}
										onChange={(e) => handleChange(e.target.checked, competitor)}
									/>
								</TableCell>
								<TableCell>{competitor.name}</TableCell>
								<TableCell>
									{competitor.wcaId ? competitor.wcaId : ''}
								</TableCell>
								<TableCell align='right'>
									{competitor.result
										? getPreciseTime(competitor.result.average)
										: ''}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</DialogContent>
			<DialogActions>
				<Button color='primary' variant='outlined' onClick={onCancel}>
					Cancel
				</Button>
				<Button
					color='primary'
					variant='outlined'
					onClick={() => onSubmit(newCompetitors, assignments)}
				>
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
	)
}

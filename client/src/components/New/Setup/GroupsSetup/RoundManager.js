import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import WarningIcon from '@material-ui/icons/Warning'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import LinearProgress from '@material-ui/core/LinearProgress'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'

import { getQualified } from '../../../logic/groups'
import { getPreciseTime } from '../../../../logic/tools'
import SelectCompetitorDialog from './SelectCompetitorDialog'

const useStyles = makeStyles((theme) => ({
	root: {
		width: '75vw',
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		flexBasis: '33.33%',
		flexShrink: 0,
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
	},
	footer: {
		textAlign: 'center',
	},
}))

export default function RoundManager({
	wcif,
	setWcif,
	event,
	round,
	setCompleted,
}) {
	console.log(round)
	const classes = useStyles()
	const [competitors, setCompetitors] = React.useState(null)
	const [assignedCompetitors, setAssignedCompetitors] = React.useState([])
	const [competitorDialog, setCompetitorDialog] = React.useState(null)
	const groups = round.scrambleSetCount
	React.useEffect(() => {
		const qualified = getQualified(round, round.number, wcif)
		setCompetitors(qualified)
	}, [round, wcif])
	const onDialogSubmit = (newCompetitors, newAssignedCompetitors) => {
		setCompetitors(newCompetitors)
		const withGroup = newAssignedCompetitors.map((competitor) => ({
			...competitor,
			group: competitorDialog.group,
		}))
		console.log([...assignedCompetitors, ...withGroup])
		setAssignedCompetitors([...assignedCompetitors, ...withGroup])
		if (newCompetitors.length === 0) {
			setCompleted(true)
		}
		setCompetitorDialog(null)
	}
	return (
		<>
			{competitors === null ? (
				<LinearProgress />
			) : (
				<div className={classes.root}>
					{competitorDialog !== null && (
						<SelectCompetitorDialog
							competitors={competitors}
							onSubmit={onDialogSubmit}
							onCancel={() => setCompetitorDialog(null)}
						/>
					)}
					<Grid
						spacing={2}
						container
						direction='row'
						alignItems='center'
						justify='center'
					>
						<Grid item>
							{competitors.length === 0 ? (
								<CheckCircleIcon color='primary' fontSize='large' />
							) : (
								<WarningIcon color='error' fontSize='large' />
							)}
						</Grid>
						<Grid item>
							<Typography
								style={{
									textAlign: 'center',
									marginBottom: '2vh',
								}}
								variant='h4'
							>
								{`Round ${round.number}`}
							</Typography>
						</Grid>
					</Grid>
					{[...Array(groups)].map((group, index) => (
						<ExpansionPanel key={index}>
							<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
								<Typography className={classes.heading}>
									<IconButton
										onClick={() =>
											setCompetitorDialog({
												group: index + 1,
												role: 'competitor',
											})
										}
									>
										<AddCircleIcon />
									</IconButton>
									{`Group ${index + 1}`}
								</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<Table className={classes.table} size='small'>
									<TableHead>
										<TableRow>
											<TableCell>Competitor</TableCell>
											<TableCell>WCA ID</TableCell>
											<TableCell align='right'>{`Seed Time`}</TableCell>
											{round.number > 1 && (
												<TableCell align='right'>Seed Rank</TableCell>
											)}
										</TableRow>
									</TableHead>
									<TableBody>
										{assignedCompetitors
											.filter((competitor) => competitor.group === index + 1)
											.map((competitor) => (
												<TableRow key={competitor.wcaUserId}>
													<TableCell>{competitor.name}</TableCell>
													<TableCell>
														{competitor.wcaId ? competitor.wcaId : ''}
													</TableCell>
													<TableCell>
														{competitor.result
															? getPreciseTime(competitor.result.average)
															: ''}
													</TableCell>
													{round.number > 1 && (
														<TableCell>{competitor.result.ranking}</TableCell>
													)}
												</TableRow>
											))}
									</TableBody>
								</Table>
							</ExpansionPanelDetails>
						</ExpansionPanel>
					))}
				</div>
			)}
		</>
	)
}

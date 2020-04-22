import React from 'react'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import WCAButton from '../common/WCAButton'

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: '10px',
	},
}))

export default function CompetitionTypeSelector({ onSelect }) {
	const classes = useStyles()
	const handleClick = (e) => {
		console.log(e.target)
	}
	return (
		<Grid
			className={classes.root}
			container
			direction='column'
			justify='center'
			alignContent='center'
			alignItems='center'
			spacing={4}
			xs={12}
		>
			<Grid item>
				<Button variant='contained' onClick={() => onSelect('generic')}>
					Start from Scratch
				</Button>
			</Grid>
			<Grid item>
				<WCAButton
					variant='contained'
					onClick={() => onSelect('wca')}
					text={`Import from WCA`}
					start={true}
				/>
			</Grid>
		</Grid>
	)
}

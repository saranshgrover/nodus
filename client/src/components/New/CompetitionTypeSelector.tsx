import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'
import React from 'react'
import WCAButton from '../common/WCAButton'

const useStyles = makeStyles(() => ({
	root: {
		marginTop: '10px',
	},
}))

interface Props {
	onSelect: (val: string) => void
}

export default function CompetitionTypeSelector({ onSelect }: Props) {
	const classes = useStyles()
	return (
		<Grid
			className={classes.root}
			container
			direction='column'
			justify='center'
			alignContent='center'
			alignItems='center'
			spacing={4}
			xs={12}>
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

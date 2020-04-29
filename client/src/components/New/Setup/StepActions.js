import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'

export default function StepActions({
	handleComplete,
	handleBack,
	handleReset,
	loading,
}) {
	return (
		<Grid
			container
			spacing={1}
			xs={12}
			direction='row'
			justify='space-between'
			alignItems='flex-end'
			alignContent='center'
			wrap='nowrap'
		>
			<Grid item>
				<Button
					disabled={loading || handleBack === null}
					variant='outlined'
					color='default'
					onClick={handleBack}
				>
					{`Back`}
				</Button>
			</Grid>
			<Grid item>
				<ButtonGroup disabled={loading} variant='outlined' color='default'>
					<Button onClick={handleReset} disabled={loading}>
						{'Reset'}
					</Button>
					<Button onClick={handleComplete} disabled={loading}>
						{'Save and Continue'}
					</Button>
				</ButtonGroup>
			</Grid>
		</Grid>
	)
}

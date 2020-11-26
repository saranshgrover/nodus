import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import React, { useState } from 'react'
import CompetitionTypeSelector from './CompetitionTypeSelector'
import CompetitionSetup from './Setup/CompetitionSetup'
import WCASelector from './WCA/WCASelector'

export default function NewCompetition() {
	const [selectedCompType, setSelectedCompType] = useState('')
	return (
		<>
			<Paper style={{ marginTop: '2vh', minHeight: '5vh' }}>
				<Typography
					variant='h4'
					align='center'>{`New Competition Setup`}</Typography>
			</Paper>
			{selectedCompType ? (
				<CompetitionSetup
					StartComponent={selectedCompType === 'wca' ? WCASelector : null}
				/>
			) : (
				<CompetitionTypeSelector
					onSelect={(type: string) => setSelectedCompType(type)}
				/>
			)}
		</>
	)
}

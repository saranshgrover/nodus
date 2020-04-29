import React, { useState, useEffect } from 'react'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles'
import InfoSetup from './InfoSetup'
import CompetitorsSetup from './CompetitorsSetup'
import GroupsSetup from './GroupsSetup'
import ScheduleSetup from './ScheduleSetup'
import SettingsSetup from './SettingsSetup'
import EventsSetup from './EventsSetup/EventsSetup'
import Error from '../../common/Error'

const useStyles = makeStyles((theme) => ({}))

export default function CompetitionSetup({ StartComponent }) {
	const step0 = StartComponent !== null
	const [id, setId] = useState('')
	useEffect(() => {
		id !== '' && setCurrentStep(0 + step0)
	}, [id, step0])
	const handleCompleteStep = () => {
		setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
	}
	const handleBack = () => {
		setCurrentStep(Math.max(0, currentStep - 1))
	}
	const handleComplete = () => {}
	const [currentStep, setCurrentStep] = useState(0)
	const classes = useStyles()
	const steps = [
		...(step0 ? ['Import Data'] : []),
		'Info',
		'Competitors',
		'Events',
		'Schedule',
		'Groups',
		'Settings',
	]
	const getStepComponent = () => {
		let step = currentStep
		if (step === 0 && step0) return <StartComponent setData={setId} />
		if (step0) step -= 1
		const props = {
			id: id,
			onComplete: handleCompleteStep,
			handleBack: handleBack,
		}
		switch (step) {
			case 0:
				return <InfoSetup {...props} />
			case 1:
				return <CompetitorsSetup {...props} />
			case 2:
				return <EventsSetup {...props} />
			case 3:
				return <ScheduleSetup {...props} />
			case 4:
				return <GroupsSetup {...props} />
			case 5:
				return (
					<SettingsSetup
						id={id}
						onComplete={handleComplete}
						handleBack={handleBack}
					/>
				)
			default:
				return <Error />
		}
	}
	return (
		<div className={classes.root}>
			<Stepper activeStep={currentStep} alternativeLabel>
				{steps.map((step, i) => (
					<Step key={i}>
						<StepLabel>{step}</StepLabel>
					</Step>
				))}
			</Stepper>
			{getStepComponent()}
		</div>
	)
}

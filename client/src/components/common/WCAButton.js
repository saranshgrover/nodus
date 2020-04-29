import React from 'react'
import Button from '@material-ui/core/Button'
import SvgIcon from '@material-ui/core/SvgIcon'
import Icon from '@material-ui/core/Icon'
import WCASvg from '../../images/WCAlogo.svg'

function ButtonIcon() {
	return (
		<img
			style={{ width: '2vw', height: '2vw' }}
			src='https://www.worldcubeassociation.org/files/WCAlogo_notext.svg'
		/>
	)
}

export default function WCAButton({ text, start, onClick }) {
	return (
		<Button
			startIcon={start && <ButtonIcon />}
			endIcon={!start && <ButtonIcon />}
			onClick={onClick}
			variant='contained'
			color='primary'
		>
			{text}
		</Button>
	)
}

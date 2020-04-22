import React from 'react'
import Button from '@material-ui/core/Button'
import SvgIcon from '@material-ui/core/SvgIcon'
import Icon from '@material-ui/core/Icon'
import WCASvg from '../../images/WCAlogo.svg'

function ButtonIcon() {
	return (
		<Icon>
			<img src='../../images/WCAlogo.svg' />
		</Icon>
	)
}

export default function WCAButton({ text, start, onClick }) {
	return (
		<Button
			startIcon={start && <ButtonIcon />}
			endIcon={!start && <ButtonIcon />}
			onClick={onClick}
		>
			{text}
		</Button>
	)
}

import Button from '@material-ui/core/Button'
import React from 'react'

function ButtonIcon() {
	return (
		<img
			style={{ width: '2vw', height: '2vw' }}
			src='https://www.worldcubeassociation.org/files/WCAlogo_notext.svg'
		/>
	)
}

export default function WCAButton({ text, start = false, onClick, ...props }) {
	return (
		<Button
			startIcon={start && <ButtonIcon />}
			endIcon={!start && <ButtonIcon />}
			onClick={onClick}
			{...props}>
			{text}
		</Button>
	)
}

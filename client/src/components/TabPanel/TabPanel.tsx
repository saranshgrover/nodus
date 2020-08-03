import Box from '@material-ui/core/Box'
import Typography, { TypographyProps } from '@material-ui/core/Typography'
import React from 'react'

interface Props extends TypographyProps {
	value: any
	index: any
}

export default function TabPanel(props: React.PropsWithChildren<Props>) {
	const { children, value, index, ...other } = props

	return (
		// @ts-ignore
		<Typography
			component='div'
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}>
			{value === index && <Box>{children}</Box>}
		</Typography>
	)
}

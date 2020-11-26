import { Theme } from '@material-ui/core'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { IconTabsProps } from './types'

const useTabsStyles = makeStyles(({ spacing, palette }: Theme) => {
	const indicatorBackground =
		palette.type === 'dark' ? 'rgba(255, 255, 255, .2)' : 'rgba(0,0,0,0.2)'
	const borderRadius = spacing(1)
	return {
		root: {
			width: '100%',
			boxShadow: '0px 3px 15px rgba(34, 35, 58, 0.5)',
		},
		indicator: {
			height: '100%',
			borderRadius,
			backgroundColor: indicatorBackground,
		},
	}
})

const useTabStyles = makeStyles(({ breakpoints, palette }: Theme) => {
	const labelColor = palette.text.primary
	return {
		root: {
			textTransform: 'initial',
			minWidth: 0,
			[breakpoints.up('md')]: {
				minWidth: 0,
			},
		},
		wrapper: {
			fontWeight: 'normal',
			letterSpacing: 0.5,
			color: labelColor,
		},
	}
})

const IconTabs = ({ tabs, tabProps, ...props }: IconTabsProps) => {
	const tabsClasses = useTabsStyles(props)
	const tabClasses = useTabStyles(tabProps)
	return (
		<Tabs {...props} classes={tabsClasses}>
			{tabs.map((tab, index) => (
				<Tab
					classes={tabClasses}
					key={index}
					label={tab.label}
					icon={tab.Icon}
				/>
			))}
		</Tabs>
	)
}

export default IconTabs

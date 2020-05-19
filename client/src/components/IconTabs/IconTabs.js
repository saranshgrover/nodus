import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const useTabsStyles = makeStyles(({ spacing, palette }) => {
	const tabsBackground = `linear-gradient(60deg,${palette.primary.light} , ${palette.primary.dark})`
	const indicatorBackground = 'rgba(255, 255, 255, .2)'
	const borderRadius = spacing(1)
	return {
		root: {
			width: '100%',
			background: tabsBackground,
			padding: 10,
			boxShadow: '0px 3px 15px rgba(34, 35, 58, 0.5)',
		},
		indicator: {
			height: '100%',
			borderRadius,
			backgroundColor: indicatorBackground,
		},
	}
})

const useTabStyles = makeStyles(({ breakpoints, spacing, palette }) => {
	const tabsGutter = spacing(2)
	const labelColor = palette.text.primary
	return {
		root: {
			textTransform: 'initial',
			margin: `0 ${tabsGutter}px`,
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

const IconTabs = ({ tabs, tabProps, ...props }) => {
	const tabsClasses = useTabsStyles(props)
	const tabClasses = useTabStyles(tabProps)
	return (
		<Tabs {...props} classes={tabsClasses}>
			{tabs.map((tab, index) => (
				<Tab
					key={tab.value}
					index={tab.index}
					label={tab.label}
					icon={tab.icon}
				/>
			))}
		</Tabs>
	)
}

export default IconTabs

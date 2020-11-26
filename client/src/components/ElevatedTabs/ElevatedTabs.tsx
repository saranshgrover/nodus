import { Theme } from '@material-ui/core'
import Tab, { TabProps } from '@material-ui/core/Tab'
import Tabs, { TabsProps } from '@material-ui/core/Tabs'
import { makeStyles } from '@material-ui/styles'
import React from 'react'

const useTabsStyles = makeStyles(({ spacing, palette }: Theme) => {
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

const useTabStyles = makeStyles(({ breakpoints, spacing, palette }: Theme) => {
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

export interface ElevatedTabsProps {
	tabs: Array<{ key: any; label: string }>
	tabProps?: TabProps
}

const ElevatedTabs = ({
	tabs,
	tabProps = {},
	...props
}: ElevatedTabsProps & TabsProps) => {
	const tabsClasses = useTabsStyles(props)
	const tabClasses = useTabStyles(tabProps)
	return (
		<Tabs {...props} classes={tabsClasses}>
			{tabs.map((tab) => (
				<Tab classes={tabClasses} key={tab.key} label={tab.label} />
			))}
		</Tabs>
	)
}

export default ElevatedTabs

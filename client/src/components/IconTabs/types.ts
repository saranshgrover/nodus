import { TabProps, TabsProps } from '@material-ui/core'
export type IconTabsProps = TabsProps & IconTabs

export interface IconTabs {
	tabs: IconTabsData[]
	tabProps: TabProps
}

export interface IconTabsData {
	label: string
	value: number
	Icon: JSX.Element
	Component: any
	id: string
}

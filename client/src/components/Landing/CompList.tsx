import { TextField } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import {
	LandingAllUpcomingCompetitionsQuery,
	LandingMyUpcomingCompetitionsQuery,
} from 'generated/graphql'
import React, { useEffect, useState } from 'react'
import FlagIconFactory from 'react-flag-icon-css'
import { Link } from 'react-router-dom'
import { compDatesToString } from '../../logic/tools'
const FlagIcon = FlagIconFactory(React, { useCssModules: false })

const useStyles = makeStyles(() => ({
	paper: {
		height: 400,
		overflow: 'auto',
	},
	list: {
		textAlign: 'center',
	},
}))

interface Props {
	date?: boolean
	// TODO Fix this type?
	comps: NonNullable<
		| LandingMyUpcomingCompetitionsQuery['getMyUpcomingCompetitions']
		| LandingAllUpcomingCompetitionsQuery['getAllWcifs']
	>
	subheader: string
}

export default function CompList({ comps, subheader }: Props) {
	useEffect(() => {
		setQueryComps(comps)
	}, [comps])
	const [query, setQuery] = useState<string>('')
	const [queryComps, setQueryComps] = useState(comps)
	const handleSearchChange = (event: any) => {
		setQuery(event.target.value)
		event.target.value === ''
			? setQueryComps(comps)
			: setQueryComps(
					comps.filter((comp) =>
						comp.name.toLowerCase().includes(event.target.value.toLowerCase())
					)
			  )
	}
	const classes = useStyles()
	return (
		<Paper>
			<List
				className={classes.list}
				style={{ overflow: 'auto' }}
				subheader={
					<ListSubheader disableSticky={true}>{subheader}</ListSubheader>
				}>
				{comps.length === 0 ? (
					<ListItem>
						<ListItemText>You have no upcoming comps!</ListItemText>
					</ListItem>
				) : (
					<ListItem className={classes.list}>
						<TextField
							value={query}
							onChange={handleSearchChange}
							fullWidth={true}
							label='Search'
							id='outlined-basic'></TextField>
					</ListItem>
				)}
				{queryComps.map((comp) => {
					return (
						<ListItem
							alignItems='center'
							key={comp.competitionId}
							button
							component={Link}
							to={`/competitions/${comp.competitionId}/overview`}>
							<ListItemIcon
								children={
									<FlagIcon
										size={'2x'}
										code={comp.schedule.venues[0].countryIso2?.toLowerCase()}
									/>
								}
							/>
							<ListItemText
								key={comp.competitionId + '-about'}
								primary={comp.name}
								secondary={
									<React.Fragment key={comp.competitionId + '-fragment'}>
										<Typography
											key={comp.competitionId + 'date'}
											component='span'
											variant='body2'
											color='textPrimary'>
											{compDatesToString(
												comp.schedule.startDate,
												comp.schedule.numberOfDays
											)}
										</Typography>
									</React.Fragment>
								}
							/>
						</ListItem>
					)
				})}
			</List>
		</Paper>
	)
}

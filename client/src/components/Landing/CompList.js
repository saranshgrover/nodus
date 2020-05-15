import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListSubheader from '@material-ui/core/ListSubheader'
// eslint-disable-next-line no-unused-vars
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import FlagIconFactory from 'react-flag-icon-css'
import { compDatesToString } from '../../logic/tools'
import { makeStyles } from '@material-ui/styles'
import { TextField } from '@material-ui/core'
const FlagIcon = FlagIconFactory(React, { useCssModules: false })

const useStyles = makeStyles((theme) => ({
	paper: {
		height: 400,
		overflow: 'auto',
	},
	list: {
		textAlign: 'center',
	},
}))

export default function CompList({ comps, subheader }) {
	console.log(comps)
	const [query, setQuery] = useState('')
	const [queryComps, setQueryComps] = useState(comps)
	const handleSearchChange = (event) => {
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
				}
			>
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
							id='outlined-basic'
						></TextField>
					</ListItem>
				)}
				{queryComps.map((comp) => {
					return (
						<ListItem
							alignItems='center'
							key={comp.id}
							button
							component={Link}
							to={`/competitions/${comp.id}/overview`}
						>
							<ListItemIcon
								children={
									<FlagIcon
										size={'2x'}
										code={
											comp.country_iso2
												? comp.country_iso2.toLowerCase()
												: comp.schedule.venues[0].countryIso2?.toLowerCase()
										}
									/>
								}
							/>
							<ListItemText
								key={comp.id + '-about'}
								primary={comp.name}
								secondary={
									<React.Fragment key={comp.id + '-fragment'}>
										<Typography
											key={comp.id + 'date'}
											component='span'
											variant='body2'
											color='textPrimary'
										>
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

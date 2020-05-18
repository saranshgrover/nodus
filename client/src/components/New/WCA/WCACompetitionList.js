import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListSubheader from '@material-ui/core/ListSubheader'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import FlagIconFactory from 'react-flag-icon-css'
import { compDatesToString } from '../../../logic/tools'
import makeStyles from '@material-ui/styles/makeStyles'
import TextField from '@material-ui/core/TextField'
import moment from 'moment'

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

export default function CompList({ comps, subheader, date = false, onClick }) {
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
	console.log(comps)
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
						<ListItemText>You have no upcoming managable competitions!</ListItemText>
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
							component={Button}
							onClick={() => onClick(comp.id)}
						>
							<ListItemIcon
								children={
									<FlagIcon
										size={'2x'}
										code={comp.country_iso2.toLowerCase()}
									/>
								}
							/>
							<ListItemText
								key={comp.id + '-about'}
								primary={comp.name}
								secondary={
									date ? (
										<React.Fragment key={comp.id + '-fragment'}>
											<Typography
												key={comp.id + 'date'}
												component='span'
												variant='body2'
												color='textPrimary'
											>
												{compDatesToString(
													comp.start_date,
													moment(comp.end_date).diff(comp.start_date, 'days') +
														1
												)}
											</Typography>
										</React.Fragment>
									) : (
										<> </>
									)
								}
							/>
						</ListItem>
					)
				})}
			</List>
		</Paper>
	)
}

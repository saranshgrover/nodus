import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import CubingIcon from '../common/CubingIcon'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import CardActionArea from '@material-ui/core/CardActionArea'

const useStyles = makeStyles(({ palette }) => ({
	card: {
		borderRadius: 12,
		minWidth: 256,
		textAlign: 'center',
	},
	avatar: {
		width: '20vw',
		height: '20vw',
		margin: 'auto',
	},
	heading: {
		fontSize: '5vh',
		fontWeight: 'bold',
		letterSpacing: '0.5px',
		marginTop: 8,
		marginBottom: 0,
	},
	subheader: {
		fontSize: '2vh',
		color: palette.grey[500],
		marginBottom: '0.875em',
	},
	statLabel: {
		fontSize: 12,
		color: palette.grey[500],
		fontWeight: 500,
		fontFamily:
			'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
		margin: 0,
	},
	statValue: {
		fontSize: '3vh',
		fontWeight: 'bold',
		marginBottom: 4,
		letterSpacing: '1px',
	},
}))

const CompetitorCard = ({ competitor }) => {
	const styles = useStyles()
	return (
		<Card className={styles.card}>
			<CardMedia image={competitor.avatar.url} />
			<CardContent>
				<Typography className={styles.heading}>{competitor.name}</Typography>
				<Typography className={styles.subheader}>{competitor.wcaId}</Typography>
			</CardContent>
			<Divider light />
			<Box display={'flex'}>
				{competitor.personalBests.map((personalBest, index) => (
					<Box key={index} p={2} flex={'auto'}>
						<span className={styles.statLabel}>
							<CubingIcon eventId={personalBest.eventId} />
						</span>
						<p className={styles.statValue}>{`${personalBest.worldRanking}`}</p>
					</Box>
				))}
			</Box>
		</Card>
	)
}

export default CompetitorCard

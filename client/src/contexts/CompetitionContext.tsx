import blueGrey from '@material-ui/core/colors/blueGrey'
import LinearProgress from '@material-ui/core/LinearProgress'
import useUser from 'hooks/useUser'
import React, { createContext, useContext, useEffect } from 'react'
import Error from '../components/common/Error'
import {
	Activity,
	ChildActivity,
	ExternalConnection,
	Scalars,
	useContextGetCompetitionQuery,
} from '../generated/graphql'
import { themeColors } from '../logic/consts'
import { flattenActivities } from '../logic/schedule'
import { ToggleThemeContext } from './ThemeProvider'

export interface ICompetitionContext {
	userRegistered: boolean
	_id: Scalars['ObjectId']
	competitionId: string
	name: string
	userRoles: string[]
	registrantId: number | undefined | null
	userConnectionInfo: Omit<ExternalConnection, 'accessToken'> | undefined
	competitionType: string
	tabs: string[]
	activities:
		| ((Activity | ChildActivity) & {
				parentId: number | null
		  })[]
		| undefined
}

// https://stackoverflow.com/a/61336826/8056181
const CompetitionContext = createContext<ICompetitionContext>(
	{} as ICompetitionContext
)

CompetitionContext.displayName = 'CompetitionContext'
export { CompetitionContext }

const CompetitionProvider = ({
	competitionId,
	children,
}: React.PropsWithChildren<{ competitionId: string }>) => {
	const { loading, error, data } = useContextGetCompetitionQuery({
		variables: { competitionId },
	})
	const user = useUser()
	const { updateTheme } = useContext(ToggleThemeContext)
	const userCompetition =
		user &&
		user.isSignedIn() &&
		user.info?.competitions.find(
			(competition) => competition.competitionId === competitionId
		)
	let userRoles: string[] = []
	let userConnectionInfo: ICompetitionContext['userConnectionInfo'] = undefined
	let competitionType: string = 'LOCAL'
	let tabs: string[] = ['information', 'groups', 'results', 'notifications']
	let registrantId = undefined
	useEffect(() => {
		if (data && data.getWcifByCompetitionId) {
			const themeColor = data.getWcifByCompetitionId.settings.colorTheme
			if (themeColor) {
				const theme = themeColors[themeColor]
				// TODO: work on adding more theme customization besides 'main'
				updateTheme({ primary: { main: theme }, secondary: blueGrey })
			}
		}
	}, [data])
	if (loading) return <LinearProgress />
	if (error) return <Error message={error.toString()} />
	const wcif = data!.getWcifByCompetitionId
	const activities: ((Activity | ChildActivity) & {
		parentId: number | null
	})[] = wcif ? flattenActivities(wcif.schedule) : []
	if (userCompetition) {
		userRoles = userCompetition.roles
		userConnectionInfo = user.info?.connections.find(
			(connection) =>
				connection.connectionType === userCompetition.competitionType
		)
		competitionType = userCompetition.competitionType
		tabs = ['overview', ...tabs]
		if (userConnectionInfo) {
			registrantId = wcif!.persons.find(
				(person) => person.wcaUserId === userConnectionInfo!.content.id
			)?.registrantId
		}
	}
	return (
		<CompetitionContext.Provider
			value={{
				userRegistered: Boolean(userCompetition), // this needs to be changed
				_id: wcif!._id,
				competitionId: competitionId,
				name: wcif!.name,
				userRoles: userRoles,
				registrantId: registrantId,
				userConnectionInfo: userConnectionInfo,
				competitionType: competitionType,
				tabs: tabs,
				activities: activities,
			}}>
			{children}
		</CompetitionContext.Provider>
	)
}

export default CompetitionProvider

import { DocumentType } from '@typegoose/typegoose'
import axios, { AxiosResponse } from 'axios'
import { ObjectId } from 'mongodb'
import { Service } from 'typedi'
import { config } from '../../config'
import { Person, Wcif } from '../../entities'
import { UserMongooseModel } from '../user/model'
import {
	ActivityWithPerons,
	ChildActivityWithPersons,
	GroupInfo,
} from './input'
import WcifModel from './model'
import addCompetitionToUsers from './utils/addCompetitionToUsers'
import createModelFromWcif from './utils/createModelFromWcif'
import getOpenActivities from './utils/getOpenActivities'

@Service() // Dependencies injection
export default class WcifService {
	constructor(private readonly wcifModel: WcifModel) {}

	public async getById(_id: ObjectId): Promise<Wcif | null> {
		return this.wcifModel.getById(_id)
	}

	public async addWcif(competitionId: string, userId: string): Promise<Wcif> {
		// Ensure competition is not already in database
		const competition = await this.wcifModel.exists(competitionId)
		if (competition) {
			throw new Error(`Error: Document with '${competitionId}' already exists.`)
		}
		const user = await UserMongooseModel.findById(userId)
		const wcaConnection = user!.connections.find(
			(connection) => connection.connectionType === 'WCA'
		)
		if (!wcaConnection) {
			throw new Error('No WCA Connection found')
		}
		const wcaAccessToken = wcaConnection.accessToken
		const res: AxiosResponse<Partial<Wcif> & { id: string }> = await axios({
			url: `${config.wca.originURL}/api/v0/competitions/${competitionId}/wcif/`,
			method: 'GET',
			headers: {
				Authorization: `Bearer ${wcaAccessToken}`,
				'Content-Type': 'application/json',
			},
		})
		const data = await res.data
		const wcifData = await createModelFromWcif(data, competitionId)
		const wcif = await this.wcifModel.create(wcifData)
		const persons = wcif.persons
		// DONT await this since it isn't necessary for completing the mutation
		addCompetitionToUsers(wcif)
		const savedWcif = await wcif.save()
		if (!savedWcif) throw new Error('Error saving document')
		return wcif
	}

	public async getUpcomingCompetitionsFor(
		userId: string
	): Promise<Wcif[] | null> {
		const user = await UserMongooseModel.findById(userId).lean().exec()
		if (!user) return null
		const competitions = user.competitions
		const Wcifs: Wcif[] = []
		if (competitions.length > 0) {
			for (const competition of competitions) {
				const wcif = await this.findByCompetitionId(competition.competitionId)
				if (wcif) {
					Wcifs.push(wcif)
				}
			}
		}
		return Wcifs
	}

	public async findByCompetitionId(
		competitionId: string
	): Promise<DocumentType<Wcif>> {
		const competition = await this.wcifModel.findByCompetitionId(competitionId)
		if (!competition)
			throw new Error(`Unable to find competition: ${competitionId}`)
		return competition
	}

	public async findByCompetitionIdLean(competitionId: string) {
		const competition = await this.wcifModel.findByCompetitionIdLean(
			competitionId
		)
		if (!competition)
			throw new Error(`Unable to find competition: ${competitionId}`)
		return competition
	}

	public async getAllWcifs(): Promise<Wcif[]> {
		return this.wcifModel.findAll()
	}

	public async getTopCompetitors(
		competitionId: string,
		top: number
	): Promise<Person[]> {
		const competition = await this.findByCompetitionId(competitionId)
		if (!competition)
			throw new Error(`Error finding competition: ${competitionId}`)
		let persons = competition.persons
		let filteredPersons: Person[] = []
		for (const person of persons) {
			let isTop = false
			let personalBests = person.personalBests
			personalBests = personalBests.filter((best) => {
				if (best.worldRanking <= top) {
					isTop = true
					return true
				} else return false
			})
			if (isTop) {
				person.personalBests = personalBests
				filteredPersons.push(person)
			}
		}
		return filteredPersons
	}

	public async deleteWcif(competitionId: string): Promise<Wcif> {
		const competition = await this.findByCompetitionId(competitionId)
		if (!competition)
			throw new Error(`No Competition found for: ${competitionId}`)
		const persons = competition.persons
		for (const person of persons) {
			const user = await UserMongooseModel.findOne({
				connections: {
					$elemMatch: {
						$and: [
							{ connectionType: 'WCA' },
							{ 'content.id': person.wcaUserId },
						],
					},
				},
			})
			if (
				user &&
				user.competitions &&
				user.competitions.some(
					(comp) => comp.competitionId === competition.competitionId
				)
			) {
				user.competitions = user.competitions.filter(
					(competition) => competition.competitionId !== competitionId
				)
				await user.save()
			}
		}
		const deletedWcif = await this.wcifModel.deleteWcif(competitionId)
		return deletedWcif!
	}

	public async getOngoingGroups(
		competitionId: string
	): Promise<ActivityWithPerons[]> {
		const competition = await this.findByCompetitionIdLean(competitionId)
		const openActivities = getOpenActivities(competition)
		const ongoingGroups: ActivityWithPerons[] = []
		for (const activity of openActivities) {
			const activityWithPersons = {
				...activity,
				childActivities: activity.childActivities.map(
					(childActivity: Omit<ChildActivityWithPersons, 'persons'>) => ({
						...childActivity,
						persons: competition.persons.filter((person) =>
							person.assignments.some(
								(assignment) => assignment.activityId === childActivity.id
							)
						),
					})
				),
			}
			ongoingGroups.push(activityWithPersons)
		}
		return ongoingGroups
	}

	public async updateOngoingGroups(
		competitionId: string,
		newGroups: GroupInfo[],
		closeGroups: GroupInfo[]
	): Promise<ActivityWithPerons[]> {
		const competition = await this.findByCompetitionId(competitionId)
		const flatActivities = competition.schedule.venues.flatMap((venue) =>
			venue.rooms.flatMap((room) => room.activities)
		)
		for (const group of closeGroups) {
			if (group.parentId === null) {
				const activity = flatActivities.find(
					(activity) => activity.id === group.id
				)
				if (activity) activity.ongoing = false
			} else {
				const parentActivity = flatActivities.find(
					(activity) => activity.id === group.parentId
				)
				if (!parentActivity) {
				} else {
					const childActivity = parentActivity.childActivities.find(
						(childActivity) => childActivity.id === group.id
					)
					if (childActivity) {
						childActivity.ongoing = false
						parentActivity.ongoing = false
					}
				}
			}
		}
		for (const group of newGroups) {
			if (group.parentId === null) {
				const activity = flatActivities.find(
					(activity) => activity.id === group.id
				)
				if (activity) activity.ongoing = true
			} else {
				const parentActivity = flatActivities.find(
					(activity) => activity.id === group.parentId
				)
				if (!parentActivity) {
				} else {
					const childActivity = parentActivity.childActivities.find(
						(childActivity) => childActivity.id === group.id
					)
					if (childActivity) {
						childActivity.ongoing = true
						parentActivity.ongoing = true
					}
				}
			}
		}
		await competition.save()
		return this.getOngoingGroups(competitionId)
	}
}

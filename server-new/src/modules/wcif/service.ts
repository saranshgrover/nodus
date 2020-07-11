import { Service } from 'typedi'
import { ObjectId } from 'mongodb'

import WcifModel from './model'
import { Wcif } from '../../entities/wcif/wcif'
import { NewWcifInput } from './input'
import { Document } from 'mongoose'
import { UserMongooseModel } from '../user/model'
import axios, { AxiosResponse } from 'axios'
import { config } from '../../config'

@Service() // Dependencies injection
export default class WcifService {
	constructor(private readonly wcifModel: WcifModel) {}

	public async getById(_id: ObjectId): Promise<Wcif | null> {
		return this.wcifModel.getById(_id)
	}

	public async addWcif(competitionId: string, userId: string): Promise<Wcif> {
		// Ensure competition is not already in database
		const competition = await this.wcifModel.exists(competitionId)
		console.log(competition)
		if (competition) {
			throw new Error(
				`Error: Document with '${competitionId}' already exists.`
			)
		}

		const user = await UserMongooseModel.findById(userId)
		const wcaConnection = user!.connections.find(
			(connection) => connection.connectionType === 'WCA'
		)
		if (!wcaConnection) {
			throw new Error('No WCA Connection found')
		}
		const wcaAccessToken = wcaConnection.accessToken
		const res: AxiosResponse<Wcif & { id: string }> = await axios({
			url: `${config.wca.originURL}/api/v0/competitions/${competitionId}/wcif/`,
			method: 'GET',
			headers: {
				Authorization: `Bearer ${wcaAccessToken}`,
				'Content-Type': 'application/json',
			},
		})
		const data = await res.data
		// Get more information not stored in the WCIF
		const compInformation = await axios({
			url: `${config.wca.originURL}/api/v0/competitions/${competitionId}/`,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		// Attach some data
		const compInfoData = compInformation.data
		data.locationName = compInfoData.venue_address
		data.registrationOpen = compInfoData.registration_open
		data.registrationClose = compInfoData.registration_close
		// Attach starting settings data
		data.settings = {
			_id: new ObjectId(),
			message: '',
			imageUrl: '',
			colorTheme: 'orange_200', // Orange default
		}
		data.competitionId = data.id
		const wcifId = data.id
		delete data.id
		const wcif = await this.wcifModel.create(data)
		const persons = wcif.persons
		// TODO: Make this cleaner
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
				!user.competitions.some(
					(competition) => competition.competitionId === wcifId
				)
			) {
				let endDate = new Date(wcif.schedule.startDate)
				endDate.setDate(
					endDate.getDate() + wcif.schedule.numberOfDays - 1
				)
				const roles: string[] = person.roles.map((role) =>
					['organizer', 'delegate'].includes(role)
						? role
						: role === 'trainee_delegate'
						? 'traineeDelegate'
						: ''
				)
				console.log(person.roles)
				user.competitions.push({
					competitionType: 'WCA',
					competitionId: wcifId,
					startDate: wcif.schedule.startDate,
					endDate: endDate.toISOString().split('T')[0],
					roles: roles,
				})
				await user.save()
			}
		}
		delete wcif.id
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
				const wcif = await this.findByCompetitionId(
					competition.competitionId
				)
				if (wcif) {
					Wcifs.push(wcif)
				}
			}
		}
		return Wcifs
	}

	public async findByCompetitionId(
		competitionId: string
	): Promise<Wcif | null> {
		return await this.wcifModel.findByCompetitionId(competitionId)
	}
}

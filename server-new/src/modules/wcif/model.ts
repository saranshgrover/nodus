import { getModelForClass, DocumentType } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'

import { Wcif } from '../../entities/wcif'
import { NewWcifInput } from './input'
import { Document } from 'mongoose'

// This generates the mongoose model for us
export const WcifMongooseModel = getModelForClass(Wcif)

export default class WcifModel {
	async getById(_id: ObjectId): Promise<Wcif | null> {
		// Use mongoose as usual
		return WcifMongooseModel.findById(_id).lean().exec()
	}

	async create(data: Wcif): Promise<DocumentType<Wcif>> {
		// TODO: Change any
		const wcif = new WcifMongooseModel(data)
		await wcif.save()
		return wcif
	}

	async findByCompetitionId(
		competitionId: string
	): Promise<DocumentType<Wcif> | null> {
		return await WcifMongooseModel.findOne({ competitionId })
	}

	async exists(competitionId: string): Promise<boolean> {
		return await WcifMongooseModel.exists({ competitionId: competitionId })
	}

	async findAll(): Promise<Wcif[]> {
		return await WcifMongooseModel.find().lean().exec()
	}

	async deleteWcif(competitionId: string): Promise<Wcif | null> {
		return await WcifMongooseModel.findOneAndRemove({
			competitionId,
		}).exec()
	}
}

import { Service } from 'typedi'
import { ObjectId } from 'mongodb'

import WcifModel from './model'
import { Wcif } from '../../entities/wcif/wcif'
import { NewWcifInput } from './input'
import { Document } from 'mongoose'

@Service() // Dependencies injection
export default class WcifService {
	constructor(private readonly wcifModel: WcifModel) {}

	public async getById(_id: ObjectId): Promise<Wcif | null> {
		return this.wcifModel.getById(_id)
	}

	public async addWcif(data: Wcif): Promise<Wcif> {
		const newWcif = await this.wcifModel.create(data)
		// this is where we'd fetch the wcif from wca right?
		// Business logic goes here
		// Example:
		// Trigger push notification, analytics, ...

		return newWcif
	}
}

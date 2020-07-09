import { getModelForClass } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'

import { User } from '../../entities'

// This generates the mongoose model for us
export const UserMongooseModel = getModelForClass(User)

export default class UserModel {
	async getById(_id: ObjectId): Promise<User | null> {
		// Use mongoose as usual
		return UserMongooseModel.findById(_id).lean().exec()
	}
}

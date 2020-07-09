import { Service } from 'typedi'
import { ObjectId } from 'mongodb'

import UserModel from './model'

@Service() // Dependencies injection
export default class UserService {
	constructor(private readonly userModel: UserModel) {}

	public getById(id: ObjectId) {
		return this.userModel.getById(id)
	}
}

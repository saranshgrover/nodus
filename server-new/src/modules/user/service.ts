import { ObjectId } from 'mongodb'
import { Service } from 'typedi'
import { UserPushSubscription } from '../../entities/user/pushSubscription'
import UserModel from './model'

@Service() // Dependencies injection
export default class UserService {
	constructor(private readonly userModel: UserModel) {}

	public getById(id: ObjectId) {
		return this.userModel.getById(id)
	}

	public findById(id: ObjectId) {
		return this.userModel.findById(id)
	}

	public async subscribeUser(id: ObjectId, subscription: UserPushSubscription) {
		const user = await this.findById(id)
		if (user) {
			if (
				user.subscriptions.some((sub) => sub.endpoint === subscription.endpoint)
			)
				return false
			user.subscriptions.push(subscription)
			await user.save()
			return true
		}
		return false
	}
}

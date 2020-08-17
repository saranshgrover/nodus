import * as faker from 'faker'
import { ObjectId } from 'mongodb'
import { User } from '../../entities'
import createUsername from '../../utils/auth/createUsername'

export const createUser = (): User => {
	const name = faker.name.findName()
	const username = createUsername(name)

	return {
		_id: new ObjectId(),
		username,
		name,
		competitions: [],
		connections: [],
		email: faker.internet.email(),
		hashedPassword: faker.internet.password(),
		primaryAuthenticationType: 'LOCAL',
		subscriptions: [],
	}
}

export const createWcaUser = (): User => {
	const user = createUser()
	user.primaryAuthenticationType = 'WCA'
	user.connections.push({
		accessToken: faker.random.uuid(),
		connectionType: 'WCA',
		content: {
			birthdate: faker.date.past().toString(),
			id: faker.random.number(),
			photos: [faker.image.avatar()],
			delegateStatus: '',
			teams: [],
			wcaId: '2019TEST01',
		},
	})
	return user
}

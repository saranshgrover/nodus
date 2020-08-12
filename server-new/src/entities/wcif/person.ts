import { prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Authorized, Field, InputType, Int, ObjectType } from 'type-graphql'
import { ExternalConnection, User } from '../user'
import { UserPushSubscription } from '../user/pushSubscription'
import { Assignment } from './assignment'
import { Avatar } from './avatar'
import { PersonalBest } from './personalBest'
import { Registration } from './registration'

@ObjectType()
export class UserSubscription implements Partial<User> {
	@Field()
	@prop()
	name: string
	@prop()
	@Field()
	username!: string

	@Field()
	@prop()
	_id: ObjectId

	@prop({ type: ExternalConnection })
	@Field(() => [ExternalConnection])
	connections: ExternalConnection[]

	// should this be a graphql iterable field? if so, what permissions?
	@prop({ type: UserPushSubscription })
	@Field(() => [UserPushSubscription])
	subscriptions: UserPushSubscription[]
}

@InputType('PersonInput')
@ObjectType('Person')
export class Person {
	@Field()
	readonly _id!: ObjectId

	@prop()
	@Field()
	name!: string

	@prop()
	@Field((type) => Int)
	wcaUserId!: number

	@prop()
	@Field({ nullable: true })
	wcaId: string

	@prop()
	@Field((type) => Int, { nullable: true })
	registrantId!: number

	@prop()
	@Field()
	countryIso2!: string

	@prop()
	@Field()
	gender!: string

	@prop()
	@Field({ nullable: true })
	@Authorized<AuthType>([
		{
			queryType: 'competition',
			roles: ['organizer', 'delegate', 'traineeDelegate', 'staff'],
		},
	])
	birthdate!: string

	@prop()
	@Field({ nullable: true })
	@Authorized<AuthType>([
		{
			queryType: 'competition',
			roles: ['organizer', 'delegate', 'traineeDelegate', 'staff'],
		},
	])
	email!: string

	@prop({ type: Registration })
	@Field(() => Registration)
	registration!: Registration

	@prop()
	@Field(() => Avatar)
	avatar!: Avatar

	@prop({ type: String })
	@Field(() => [String])
	roles!: string[]

	@prop({ type: Assignment })
	@Field(() => [Assignment])
	assignments!: Assignment[]

	@prop({ type: PersonalBest })
	@Field(() => [PersonalBest])
	personalBests!: PersonalBest[]

	@prop({ type: UserSubscription })
	@Field(() => [UserSubscription])
	subscribers: UserSubscription[]
}

import { prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Field, ObjectType } from 'type-graphql'
import { Competition } from './competition'
import { ExternalConnection } from './externalConnection'
import { UserPushSubscription } from './pushSubscription'

@ObjectType()
export class User {
	@Field()
	readonly _id!: ObjectId

	@prop()
	@Field()
	username!: string

	@prop()
	@Field()
	email!: string

	@prop()
	@Field()
	name: string

	@prop()
	password: string

	@prop()
	@Field()
	primaryAuthenticationType: string

	@prop({ type: Competition })
	@Field(() => [Competition])
	competitions: Competition[]

	@prop({ type: ExternalConnection })
	@Field(() => [ExternalConnection])
	connections: ExternalConnection[]

	// should this be a graphql iterable field? if so, what permissions?
	@prop({ type: UserPushSubscription })
	@Field(() => [UserPushSubscription])
	subscriptions: UserPushSubscription[]
}

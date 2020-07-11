import { ObjectType, Field } from 'type-graphql'
import { prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'

import { Competition } from './competition'
import { ExternalConnection } from './externalConnection'

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
	hashedPassword: string

	@prop()
	@Field()
	primaryAuthenticationType: string

	@prop({ type: Competition })
	@Field(() => [Competition])
	competitions: Competition[]

	@prop({ type: ExternalConnection })
	@Field(() => [ExternalConnection])
	connections: ExternalConnection[]
}

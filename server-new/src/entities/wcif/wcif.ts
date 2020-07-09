import { ObjectType, InputType, Field, Int } from 'type-graphql'
import { prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Extension } from './extension'
import { Person } from './person'
import { Event } from './event'
import { Schedule } from './schedule'
import { Setting } from './setting'

@InputType('WcifInput')
@ObjectType('Wcif')
export class Wcif {
	@Field()
	readonly _id!: ObjectId

	@prop()
	@Field(() => String)
	competitionid: string

	@prop()
	@Field()
	name!: string

	@prop()
	@Field()
	shortName: string

	@prop()
	@Field(() => [Person])
	persons: Person[]

	@prop()
	@Field(() => [Event])
	events: Event[]

	@prop()
	@Field(() => Schedule)
	schedule: Schedule

	@prop()
	@Field(() => Int)
	competitorLimit: number

	@prop()
	@Field(() => [Extension])
	extensions: Extension[]

	@prop()
	@Field()
	locationName!: string

	@prop()
	@Field()
	registrationOpen!: string

	@prop()
	@Field()
	registrationClose!: string

	@prop()
	@Field(() => [Setting])
	settings!: Setting[]
}

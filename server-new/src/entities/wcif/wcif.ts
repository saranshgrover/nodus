import { prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Field, InputType, Int, ObjectType } from 'type-graphql'
import { Event } from './event'
import { Extension } from './extension'
import { Person } from './person'
import { Schedule } from './schedule'
import { Setting } from './setting'

@InputType('WcifInput')
@ObjectType('Wcif')
export class Wcif {
	@Field()
	readonly _id!: ObjectId

	@prop()
	@Field()
	competitionId: string

	@prop()
	@Field()
	name!: string

	@prop()
	@Field()
	shortName: string

	@prop({ type: Person })
	@Field(() => [Person])
	persons!: Person[]

	@prop({ type: Event })
	@Field(() => [Event])
	events: Event[]

	@prop({ type: Schedule })
	@Field(() => Schedule)
	schedule: Schedule

	@prop()
	@Field(() => Int)
	competitorLimit: number

	@prop({ type: Extension })
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

	@prop({ type: Setting })
	@Field(() => Setting)
	settings!: Setting
}

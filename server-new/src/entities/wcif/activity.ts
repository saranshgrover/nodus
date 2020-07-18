import { ObjectType, Field, InputType, Int } from 'type-graphql'
import { prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Extension } from './extension'
import { ChildActivity } from './childActivity'

@InputType('ActivityInput')
@ObjectType('Activtiy')
export class Activity {
	@Field()
	readonly _id!: ObjectId

	@prop()
	@Field()
	name!: string

	@prop()
	@Field()
	activityCode!: string

	@prop()
	@Field()
	startTime!: string

	@prop()
	@Field()
	endTime!: string

	@prop()
	@Field(() => Int)
	scrambleSetId!: number

	@prop()
	@Field(() => Int)
	id!: number

	@prop({ type: ChildActivity })
	@Field(() => [ChildActivity])
	childActivities!: ChildActivity[]

	@prop({ type: Extension })
	@Field(() => [Extension])
	extensions!: Extension[]
}

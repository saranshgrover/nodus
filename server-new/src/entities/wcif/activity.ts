import { prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Field, InputType, Int, ObjectType } from 'type-graphql'
import { ChildActivity } from './childActivity'
import { Extension } from './extension'

@InputType('ActivityInput')
@ObjectType('Activity')
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

	@prop({ default: false })
	@Field(() => Boolean, { defaultValue: false })
	ongoing: boolean
}

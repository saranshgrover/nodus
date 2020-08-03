import { prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Field, InputType, Int, ObjectType } from 'type-graphql'
import { Extension } from './extension'

@InputType('ChildActivityInput')
@ObjectType('ChildActivity')
export class ChildActivity {
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
	@Field((type) => Int)
	scrambleSetId!: number

	@prop()
	@Field((type) => Int)
	id!: number

	@prop({ type: Extension })
	@Field((type) => [Extension])
	extensions!: Extension[]

	@prop({ default: false })
	@Field(() => Boolean, { defaultValue: false })
	ongoing: boolean
}

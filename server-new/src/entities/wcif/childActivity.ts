import { ObjectType, Field, InputType, Int } from 'type-graphql'
import { prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
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

	@prop()
	@Field((type) => [Extension])
	extensions!: Extension[]
}

import { ObjectType, Field, InputType, Int } from 'type-graphql'
import { prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'

@InputType('AssignmentInput')
@ObjectType('Assignment')
export class Assignment {
	@Field()
	readonly _id!: ObjectId

	@prop()
	@Field()
	assignmentCode!: string

	@prop()
	@Field(() => [Int])
	activityId!: number[]

	@prop()
	@Field(() => [Int])
	stationNumber!: number[]
}

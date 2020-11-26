import { prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Field, InputType, Int, ObjectType } from 'type-graphql'

@InputType('AssignmentInput')
@ObjectType('Assignment')
export class Assignment {
	@Field()
	readonly _id!: ObjectId

	@prop()
	@Field()
	assignmentCode!: string

	@prop()
	@Field(() => Int)
	activityId!: number

	@prop()
	@Field(() => Int, { nullable: true })
	stationNumber!: number
}

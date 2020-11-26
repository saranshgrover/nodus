import { prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Field, InputType, Int, ObjectType } from 'type-graphql'

@InputType('TimeLimitInput')
@ObjectType('TimeLimit')
export class TimeLimit {
	@Field()
	readonly _id!: ObjectId

	@prop()
	@Field((type) => Int)
	centiseconds!: number

	@prop()
	@Field((type) => [String])
	cumulativeRoundIds!: string[]
}

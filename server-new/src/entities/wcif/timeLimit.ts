import { ObjectType, Field, Int, InputType } from 'type-graphql'
import { prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'

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
	cumulativeRoundIds!: string
}

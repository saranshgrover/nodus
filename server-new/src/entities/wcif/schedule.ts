import { ObjectType, Field, Int, InputType } from 'type-graphql'
import { prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Venue } from './venue'

@InputType('ScheduleInput')
@ObjectType('Schedule')
export class Schedule {
	@Field()
	readonly _id!: ObjectId

	@prop()
	@Field()
	startDate!: string

	@prop()
	@Field((type) => Int)
	numberOfDays!: number

	@prop({ type: Venue })
	@Field((type) => [Venue])
	venues!: Venue[]
}

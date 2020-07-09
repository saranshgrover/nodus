import { ObjectType, InputType, Field, Int } from 'type-graphql'
import { prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'

@InputType('PersonalBestInput')
@ObjectType('PersonalBest')
export class PersonalBest {
	@Field()
	readonly _id!: ObjectId

	@prop()
	@Field()
	eventId!: string

	@prop()
	@Field((type) => Int)
	best!: number

	@prop()
	@Field((type) => Int)
	worldRanking!: number

	@prop()
	@Field((type) => Int)
	continentalRanking!: number

	@prop()
	@Field((type) => Int)
	nationalRanking!: number

	@prop()
	@Field()
	type!: string
}

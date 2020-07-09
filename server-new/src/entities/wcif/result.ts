import { ObjectType, Field, Int, InputType } from 'type-graphql'
import { prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Attempt } from './attempt'

@InputType('ResultInput')
@ObjectType('Result')
export class Result {
	@Field()
	readonly _id!: ObjectId

	@prop()
	@Field()
	personId!: string

	@prop()
	@Field((type) => Int)
	ranking!: number

	@prop()
	@Field((type) => Int)
	best!: number

	@prop()
	@Field((type) => Int)
	average!: number

	@prop()
	@Field((type) => [Attempt])
	attempts!: Attempt[]
}

import { ObjectType, Field, InputType, Int } from 'type-graphql'
import { prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'

@InputType('CutoffInput')
@ObjectType('Cutoff')
export class Cutoff {
	@Field()
	readonly _id!: ObjectId

	@prop()
	@Field((type) => Int)
	numberOfAttempts!: number

	@prop()
	@Field((type) => [Int])
	attemptResult!: number[]
}

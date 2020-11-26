import { ObjectType, Field, InputType, Int } from 'type-graphql'
import { prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'

@InputType('AttemptInput')
@ObjectType('Attempt')
export class Attempt {
	@Field()
	readonly _id!: ObjectId

	@prop()
	@Field((type) => Int)
	result!: number

	@prop()
	@Field()
	reconstruction!: string
}

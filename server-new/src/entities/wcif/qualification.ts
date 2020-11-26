import { ObjectType, Field, Int, InputType } from 'type-graphql'
import { prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'

@InputType('QualificationInput')
@ObjectType('Qualification')
export class Qualification {
	@Field()
	readonly _id!: ObjectId

	@prop()
	@Field()
	when!: string

	@prop()
	@Field()
	type!: string

	@prop()
	@Field((type) => [Int])
	attemptResult!: number[]
}

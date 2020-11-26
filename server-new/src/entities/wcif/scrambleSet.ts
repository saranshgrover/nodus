import { ObjectType, Field, InputType } from 'type-graphql'
import { prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'

@InputType('ScrambleSetInput')
@ObjectType('ScrambleSet')
export class ScrambleSet {
	@Field()
	readonly _id!: ObjectId

	@prop()
	@Field()
	id!: string

	@prop()
	@Field((type) => [String])
	scrambles!: string[]

	@prop()
	@Field((type) => [String])
	extraScrambles!: string[]
}

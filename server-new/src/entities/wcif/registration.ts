import { ObjectType, Field, Int, InputType } from 'type-graphql'
import { prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'

@InputType('RegistrationInput')
@ObjectType('Registration')
export class Registration {
	@Field()
	readonly _id!: ObjectId

	@prop()
	@Field((type) => [String])
	eventIds!: string[]

	@prop()
	@Field()
	status!: string

	@prop()
	@Field()
	comments!: string

	@prop()
	@Field((type) => Int)
	wcaRegistrationId!: number

	@prop()
	@Field((type) => Int)
	guests!: number
}

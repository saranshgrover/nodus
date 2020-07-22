import { prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Field, InputType, Int, ObjectType } from 'type-graphql'

@InputType('RegistrationInput')
@ObjectType('Registration')
export class Registration {
	@Field()
	readonly _id!: ObjectId

	@prop({ type: String })
	@Field((type) => [String])
	eventIds!: string[]

	@prop()
	@Field()
	status!: string

	@prop({ type: String })
	@Field(() => String, { nullable: true })
	comments: string | null

	@prop()
	@Field((type) => Int)
	wcaRegistrationId!: number

	@prop()
	@Field((type) => Int, { nullable: true })
	guests: number
}

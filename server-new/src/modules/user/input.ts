import { Field, InputType, ID } from 'type-graphql'
import { MaxLength, MinLength, IsEmail } from 'class-validator'
import { User } from '../../entities'
import { ObjectId } from 'mongodb'

@InputType()
export class UpdateUserInput implements Partial<User> {
	@Field()
	readonly _id!: ObjectId

	@Field()
	newName?: string

	@Field()
	@IsEmail()
	newEmail?: string

	@Field()
	newUsername?: string
}

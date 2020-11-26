import { IsEmail } from 'class-validator'
import { ObjectId } from 'mongodb'
import { Field, InputType } from 'type-graphql'
import { User } from '../../entities'

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

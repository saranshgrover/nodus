import { ObjectType, Field, InputType, Int, Authorized } from 'type-graphql'
import { prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Registration } from './registration'
import { Avatar } from './avatar'
import { Assignment } from './assignment'
import { PersonalBest } from './personalBest'

@InputType('PersonInput')
@ObjectType('Person')
export class Person {
	@Field()
	readonly _id!: ObjectId

	@prop()
	@Field()
	name!: string

	@prop()
	@Field((type) => Int)
	wcaUserId!: number

	@prop()
	@Field({ nullable: true })
	wcaId: string

	@prop()
	@Field((type) => Int)
	registrationId!: number

	@prop()
	@Field()
	countryIso2!: string

	@prop()
	@Field()
	gender!: string

	@prop()
	@Field({ nullable: true })
	@Authorized<AuthType>([
		{
			queryType: 'competition',
			roles: ['organizer', 'delegate', 'traineeDelegate', 'staff'],
		},
	])
	birthdate!: string

	@prop()
	@Field({ nullable: true })
	@Authorized<AuthType>([
		{
			queryType: 'competition',
			roles: ['organizer', 'delegate', 'traineeDelegate', 'staff'],
		},
	])
	email!: string

	@prop()
	@Field(() => Registration)
	registration!: Registration

	@prop()
	@Field(() => Avatar)
	avatar!: Avatar

	@prop({ type: String })
	@Field(() => [String])
	roles!: string[]

	@prop()
	@Field(() => [Assignment])
	assignments!: Assignment[]

	@prop()
	@Field(() => [PersonalBest])
	personalBests!: PersonalBest[]
}

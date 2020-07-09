import { ObjectType, Field, InputType, Int } from 'type-graphql'
import { prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Round } from './round'
import { Extension } from './extension'
import { Qualification } from './qualification'

@InputType('EventInput')
@ObjectType('Event')
export class Event {
	@Field()
	readonly _id!: ObjectId

	@prop()
	@Field(() => [Round])
	rounds: Round[]

	@prop()
	@Field(() => [Extension])
	extensions!: Extension[]

	@prop()
	@Field(() => Int)
	competitorLimit!: number

	@prop()
	@Field(() => Qualification)
	qualification: Qualification
}

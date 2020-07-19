import { prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Field, InputType, Int, ObjectType } from 'type-graphql'
import { Extension } from './extension'
import { Qualification } from './qualification'
import { Round } from './round'

@InputType('EventInput')
@ObjectType('Event')
export class Event {
	@Field()
	readonly _id!: ObjectId

	@Field()
	@prop()
	id: string

	@prop()
	@Field(() => [Round])
	rounds: Round[]

	@prop()
	@Field(() => [Extension])
	extensions!: Extension[]

	@prop()
	@Field(() => Int)
	competitorLimit!: number

	@prop({ type: Qualification })
	@Field(() => Qualification)
	qualification: Qualification
}

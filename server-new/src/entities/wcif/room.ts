import { ObjectType, Field, Int, InputType } from 'type-graphql'
import { prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Activity } from './activity'
import { Extension } from './extension'

@InputType('RoomInput')
@ObjectType('Room')
export class Room {
	@Field()
	readonly _id!: ObjectId

	@prop()
	@Field((type) => Int)
	id!: number

	@prop()
	@Field()
	name!: string

	@prop()
	@Field()
	color!: string

	@prop()
	@Field((type) => [Activity])
	activities!: Activity[]

	@prop()
	@Field((type) => [Extension])
	extensions!: Extension[]
}

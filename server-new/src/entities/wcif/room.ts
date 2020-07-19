import { prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Field, InputType, Int, ObjectType } from 'type-graphql'
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

	@prop({ type: Activity })
	@Field((type) => [Activity])
	activities!: Activity[]

	@prop({ type: Extension })
	@Field((type) => [Extension])
	extensions!: Extension[]
}

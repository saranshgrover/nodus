import { ObjectType, InputType, Field, Int } from 'type-graphql'
import { prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Room } from './room'
import { Extension } from './extension'

@InputType('VenueInput')
@ObjectType('Venue')
export class Venue {
	@Field()
	readonly _id!: ObjectId

	@prop()
	@Field()
	name!: string

	@prop()
	@Field()
	countryIso2!: string

	@prop()
	@Field()
	timezone!: string

	@prop()
	@Field((type) => Int)
	id!: number

	@prop()
	@Field((type) => Int)
	latitudeMicrodegrees!: number

	@prop()
	@Field((type) => Int)
	longitudeMicrodegrees!: number

	@prop({ type: Room })
	@Field((type) => [Room])
	rooms!: Room[]

	@prop({ type: Extension })
	@Field((type) => [Extension])
	extension: Extension[]
}

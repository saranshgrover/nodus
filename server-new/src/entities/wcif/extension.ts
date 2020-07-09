import { ObjectType, Field, InputType, Int } from 'type-graphql'
import { prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'

@InputType('ExtensionInput')
@ObjectType('Extension')
export class Extension {
	@Field()
	readonly _id!: ObjectId

	@prop()
	@Field()
	id!: string

	@prop()
	@Field()
	specUrl!: string

	@prop()
	@Field((type) => String)
	data!: string
}

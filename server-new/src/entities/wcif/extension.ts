import { ObjectType, Field, InputType, Int, Root } from 'type-graphql'
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

	@prop({
		set: (data: string) => JSON.parse(data),
		get: (data: any) => JSON.stringify(data),
		type: {},
	})
	@Field(() => String)
	data: string
}

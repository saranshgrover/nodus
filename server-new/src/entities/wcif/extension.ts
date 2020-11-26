import { prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Schema } from 'mongoose'
import { Field, InputType, ObjectType } from 'type-graphql'

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
		set: (data: Schema.Types.Mixed | string) => {
			if (typeof data === 'string') {
				return JSON.parse(data)
			} else return data
		},
		get: (content: Schema.Types.Mixed) => {
			return JSON.stringify(content)
		},
		type: Schema.Types.Mixed,
	})
	@Field(() => String)
	data: string
}

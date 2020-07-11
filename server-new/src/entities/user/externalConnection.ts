import { ObjectType, Field } from 'type-graphql'
import { prop } from '@typegoose/typegoose'
import { Schema } from 'mongoose'

@ObjectType()
export class ExternalConnection {
	@prop()
	@Field()
	connectionType: string

	@prop()
	@Field()
	accessToken: string

	@prop({
		set: (content: Schema.Types.Mixed | string) => {
			if (typeof content === 'string') {
				return JSON.parse(content)
			} else return content
		},
		get: (content: Schema.Types.Mixed) => JSON.stringify(content),
		type: Schema.Types.Mixed,
	})
	@Field(() => String)
	content: string
}

import { prop } from '@typegoose/typegoose'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class ExternalConnection {
	@prop()
	@Field()
	connectionType: string

	@prop()
	@Field()
	accessToken: string

	@prop({
		type: String,
		set: (content) => JSON.stringify(content),
		get: (content) => content,
	})
	@Field(() => String)
	content: string
}

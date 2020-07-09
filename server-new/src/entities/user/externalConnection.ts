import { ObjectType, Field } from 'type-graphql'
import { prop } from '@typegoose/typegoose'

@ObjectType()
export class ExternalConnection {
	@prop()
	@Field()
	connectionType: string

	@prop()
	@Field()
	accessToken: string

	@prop({
		set: (content: string) => JSON.parse(content),
		get: (content: any) => JSON.stringify(content),
		type: {},
	})
	@Field(() => String)
	content: string
}

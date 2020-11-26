import { prop } from '@typegoose/typegoose'
import { Field, ObjectType } from 'type-graphql'
import { WCAContent } from './WCAContent'

@ObjectType()
export class ExternalConnection {
	@prop()
	@Field()
	connectionType: string

	@prop()
	@Field()
	accessToken: string

	@prop()
	@Field(() => WCAContent)
	content: WCAContent
}

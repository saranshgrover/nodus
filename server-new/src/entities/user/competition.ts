import { ObjectType, Field } from 'type-graphql'
import { prop } from '@typegoose/typegoose'

@ObjectType()
export class Competition {
	@prop()
	@Field()
	competitionId: string

	@prop()
	@Field()
	competitionType: string

	@prop()
	@Field()
	startDate: string

	@prop()
	@Field()
	endDate: string

	@prop({ type: String })
	@Field(() => [String])
	roles: string[]
}

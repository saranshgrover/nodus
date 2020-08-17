import { prop } from '@typegoose/typegoose'
import { Field, ObjectType } from 'type-graphql'
import { Notification } from './notification'

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
	roles: RoleType[]

	@prop({ type: Notification, default: [] })
	@Field(() => [Notification], { defaultValue: [] })
	notifications: Notification[]
}

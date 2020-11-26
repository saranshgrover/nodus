import { prop } from '@typegoose/typegoose'
import { Field, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class WCATeams {
	@Field()
	@prop()
	friendlyId: string

	@Field(() => Boolean)
	@prop()
	leader: boolean
}

@ObjectType()
export class WCAContent {
	@Field(() => Int)
	@prop()
	id: number

	@Field()
	@prop()
	delegateStatus: string

	@Field()
	@prop()
	birthdate: string

	@Field(() => [WCATeams])
	@prop({ type: WCATeams })
	teams: WCATeams[]

	@Field(() => [String])
	@prop({ type: String })
	photos: string[]

	@Field({ nullable: true })
	@prop()
	wcaId: string
}

import { prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Field, InputType, Int, ObjectType } from 'type-graphql'

@ObjectType('Notification')
@InputType('NotificationInput')
export class Notification {
	@Field()
	readonly _id?: ObjectId

	@Field({ nullable: true })
	@prop()
	body?: string
	@Field({ nullable: true })
	@prop()
	icon?: string
	@Field({ nullable: true })
	@prop()
	image?: string

	@Field({ nullable: true })
	@prop()
	title?: string

	@Field({ nullable: true })
	@prop()
	badge?: string

	@Field(() => [Int], { nullable: true })
	@prop()
	vibrate?: number[]

	@Field(() => [String], { nullable: true })
	@prop({ type: String })
	actions?: string[]

	@Field(() => String, { nullable: true })
	@prop({ type: String })
	url?: string

	@Field()
	@prop()
	timestamp: number
}

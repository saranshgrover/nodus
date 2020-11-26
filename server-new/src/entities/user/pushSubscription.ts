import { prop } from '@typegoose/typegoose'
import { Field, InputType, ObjectType } from 'type-graphql'
import { PushSubscription } from 'web-push'

@ObjectType('Keys')
@InputType('KeysInput')
class Keys {
	@Field()
	@prop()
	p256dh: string

	@Field()
	@prop()
	auth: string
}

@ObjectType('UserPushSubscriptionInput')
@InputType('UserPushSubscription')
export class UserPushSubscription implements PushSubscription {
	@Field(() => String)
	@prop()
	endpoint: string

	@Field((type) => Keys)
	@prop({ type: Keys })
	keys: Keys

	@Field({ nullable: true })
	@prop()
	device: string

	@Field({ nullable: true })
	@prop()
	browser: string
}

import { ObjectType, Field, InputType } from 'type-graphql'
import { prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'

@InputType('AvatarInput')
@ObjectType('Avatar')
export class Avatar {
	@Field()
	readonly _id!: ObjectId

	@prop()
	@Field()
	url!: string

	@prop()
	@Field()
	thumbUrl!: string
}

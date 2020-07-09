import { ObjectType, Field, Int, InputType } from 'type-graphql'
import { prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'

@InputType('SettingInput')
@ObjectType('Setting')
export class Setting {
	@Field()
	readonly _id!: ObjectId

	@prop()
	@Field()
	imageUrl!: string

	@prop()
	@Field()
	message!: string

	@prop()
	@Field()
	colorTheme: string
}

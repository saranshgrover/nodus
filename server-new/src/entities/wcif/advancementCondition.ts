import { ObjectType, Field, InputType, Int } from 'type-graphql'
import { prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'

@InputType('AdvancementConditionInput')
@ObjectType('AdvancementCondition')
export class AdvancementCondition {
	@Field()
	readonly _id!: ObjectId

	@prop()
	@Field()
	type!: string

	@prop({ type: Int })
	@Field(() => [Int])
	level!: number[]
}

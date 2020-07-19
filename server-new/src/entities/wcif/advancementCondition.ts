import { prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Field, InputType, Int, ObjectType } from 'type-graphql'

@InputType('AdvancementConditionInput')
@ObjectType('AdvancementCondition')
export class AdvancementCondition {
	@Field()
	readonly _id!: ObjectId

	@prop()
	@Field()
	type!: string

	@prop()
	@Field(() => [Int])
	level!: number[]
}

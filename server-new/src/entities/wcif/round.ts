import { ObjectType, Field, Int, InputType } from 'type-graphql'
import { prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { TimeLimit } from './timeLimit'
import { Cutoff } from './cutoff'
import { AdvancementCondition } from './advancementCondition'
import { Extension } from './extension'
import { Result } from './result'
import { ScrambleSet } from './scrambleSet'

@InputType('RoundInput')
@ObjectType('Round')
export class Round {
	@Field()
	readonly _id!: ObjectId

	@prop()
	@Field()
	id!: string

	@prop()
	@Field()
	format!: string

	@prop()
	@Field(() => [TimeLimit])
	timeLimit: TimeLimit[]

	@prop()
	@Field(() => Cutoff)
	cutoff: Cutoff

	@prop()
	@Field(() => AdvancementCondition)
	advancementCondition: AdvancementCondition

	@prop()
	@Field(() => Int)
	scrambleSetCount: number

	@prop()
	@Field(() => [ScrambleSet])
	scrambleSets: ScrambleSet[]

	@prop()
	@Field(() => [Result])
	results: Result[]

	@prop()
	@Field(() => [Extension])
	extensions: Extension[]
}

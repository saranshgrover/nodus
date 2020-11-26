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

	@prop({ type: TimeLimit })
	@Field(() => [TimeLimit])
	timeLimit: TimeLimit[]

	@prop({ type: Cutoff })
	@Field(() => Cutoff)
	cutoff: Cutoff

	@prop({ type: AdvancementCondition })
	@Field(() => AdvancementCondition)
	advancementCondition: AdvancementCondition

	@prop()
	@Field(() => Int)
	scrambleSetCount: number

	@prop({ type: ScrambleSet })
	@Field(() => [ScrambleSet])
	scrambleSets: ScrambleSet[]

	@prop({ type: Result })
	@Field(() => [Result])
	results: Result[]

	@prop({ type: Extension })
	@Field(() => [Extension])
	extensions: Extension[]
}

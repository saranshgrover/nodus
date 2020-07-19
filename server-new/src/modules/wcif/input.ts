import { MaxLength, Min } from 'class-validator'
import { ObjectId } from 'mongodb'
import { ArgsType, Field, InputType, Int } from 'type-graphql'
import {
	AdvancementCondition,
	Cutoff,
	Person,
	Qualification,
	TimeLimit,
	Wcif,
} from '../../entities/wcif'

@InputType()
export class NewWcifInput extends Wcif {}

@InputType()
class NewPersonInput implements Partial<Person> {
	@Field()
	readonly _id!: ObjectId

	@Field()
	name: string
	@Field(() => Int)
	wcaUserId: number
	@Field({ nullable: true })
	wcaId: string
	@Field(() => Int, { nullable: true })
	registrantId: number
	@Field()
	countryIso2: string
	@Field()
	gender: string
	@Field()
	birthdate: string
	@Field()
	email: string
}

@ArgsType()
export class WcifCompetitorArgs {
	@Field()
	competitionId: string

	@Field((type) => [NewPersonInput])
	competitors: NewPersonInput[]
}

@ArgsType()
export class WcifEventsArgs {
	@Field()
	competitionId: string

	@Field((type) => [UpdateEventInput])
	events: UpdateEventInput[]
}

@InputType()
export class UpdateEventInput {
	@Field()
	id!: string
	@Field(() => Int)
	competitorLimit: number
	@Field(() => [UpdateRoundInput])
	rounds: UpdateRoundInput[]
	@Field(() => Qualification)
	qualification: Qualification
}

@InputType()
export class UpdateRoundInput {
	@Field()
	id: string
	@Field()
	format: string
	@Field(() => Int)
	scrambleSetCount: number
	@Field(() => AdvancementCondition)
	advancementCondition: AdvancementCondition
	@Field(() => [TimeLimit])
	timeLimit: TimeLimit[]
	@Field(() => Cutoff)
	cutoff: Cutoff
}

@ArgsType()
export class UpdateWcifInfoArgs {
	@Field()
	competitionId: string

	@Field()
	newName: string

	@Field()
	@MaxLength(50)
	newShortName: string

	@Field((type) => Int)
	@Min(1)
	newCompetitorLimit: number
}

@ArgsType()
export class GetTopCompetitorsArgs {
	@Field()
	competitionId: string
	@Field(() => Int)
	top: number
}

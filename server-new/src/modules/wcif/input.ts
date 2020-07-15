import { Field, InputType, ID, ArgsType } from 'type-graphql'
import { MaxLength, MinLength } from 'class-validator'
import { Wcif, Person, Event } from '../../entities/wcif'

@InputType()
export class NewWcifInput extends Wcif {}

@ArgsType()
export class WcifCompetitorArgs {
	@Field()
	competitionId: string

	@Field((type) => [Person])
	competitors: Person[]
}

@ArgsType()
export class WcifEventsArgs {
	@Field()
	competitionId: string

	@Field((type) => [Event])
	events: Event[]
}

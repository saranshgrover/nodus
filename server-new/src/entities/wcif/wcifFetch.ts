import { ObjectType, Field, Root } from 'type-graphql'

@ObjectType()
export class WcifFetch {
	@Field()
	name: string

	@Field()
	start_date: string

	@Field()
	end_date: string

	id: string

	@Field()
	country_iso2: string

	@Field(() => String)
	competitionId(@Root() wcif: WcifFetch) {
		return wcif.id
	}
}

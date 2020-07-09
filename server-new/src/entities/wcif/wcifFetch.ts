import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class WcifFetch {
	@Field()
	name: string

	@Field()
	start_date: string

	@Field()
	end_date: string

	@Field()
	id: string

	@Field()
	country_iso2: string
}

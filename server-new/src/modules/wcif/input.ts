import { MaxLength, Min } from 'class-validator'
import { ObjectId } from 'mongodb'
import { ArgsType, Field, InputType, Int, ObjectType } from 'type-graphql'
import {
	Activity,
	AdvancementCondition,
	ChildActivity,
	Cutoff,
	Person,
	Qualification,
	TimeLimit,
	Wcif,
} from '../../entities/wcif'
import { RoomWithoutActivities } from '../../entities/wcif/room'

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

@InputType()
export class GroupInfo {
	@Field(() => Int)
	id: number

	@Field({ nullable: true })
	activityCode: string

	@Field(() => Int, { nullable: true })
	parentId: number
}

@ArgsType()
export class UpdateGroupsArgs {
	@Field(() => String)
	competitionId: string

	@Field(() => [GroupInfo], { defaultValue: [] })
	newGroups: GroupInfo[]

	@Field(() => [GroupInfo], { defaultValue: [] })
	closeGroups: GroupInfo[]
}

@ObjectType()
export class ActivityWithPerons extends Activity {
	@Field(() => [ChildActivityWithPersons])
	childActivities: ChildActivityWithPersons[]

	@Field(() => RoomWithoutActivities)
	room: RoomWithoutActivities
}

@ObjectType()
export class ChildActivityWithPersons extends ChildActivity {
	@Field(() => [Person])
	persons: Person[]

	@Field(() => ChildActivity, { nullable: true })
	next: ChildActivity
}

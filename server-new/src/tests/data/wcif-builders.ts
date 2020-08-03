// Code from https://github.com/thewca/wca-live/blob/master/server/logic/tests/wcif-builders.js with a few tweaks to TS

const nextIdByBuilder = new Map()
const withId = (builder: any) => {
	nextIdByBuilder.set(builder, 1)
	return (attributes: any) => {
		const id = nextIdByBuilder.get(builder)
		nextIdByBuilder.set(builder, id + 1)
		return builder(id)(attributes)
	}
}

export const Competition = (attributes: any) => ({
	formatVersion: '1.0',
	competitionId: 'Example2019',
	name: 'Example Competition 2019',
	shortName: 'Example 2019',
	locationName: 'World Cube Association',
	registrationOpen: '2020-10-02',
	registrationClose: '2020-11-17',
	persons: [],
	events: [],
	extensions: [],
	...attributes,
	schedule: {
		startDate: '2021-01-01',
		numberOfDays: 2,
		venues: [],
		...attributes.schedule,
	},
	settings: {
		imageUrl: '',
		message: '',
		colorTheme: '#f0ff00',
	},
})

export const Person = withId((id: any) => (attributes: any) => ({
	name: `Person ${id}`,
	wcaUserId: id,
	wcaId: `2019PERS${id % 100}`,
	registrantId: id,
	countryIso2: 'GB',
	gender: 'm',
	birthdate: '2000-01-01',
	email: `person${id}@example.com`,
	avatar: {
		url: 'https://example.com/avatar.jpg',
		thumbUrl: 'https://example.com/avatar-thumb.jpg',
	},
	roles: [],
	assignments: [],
	personalBests: [],
	...attributes,
	registration: {
		wcaRegistrationId: id,
		eventIds: [],
		status: 'accepted',
		guests: 0,
		comments: '',
		...attributes.registration,
	},
}))

export const PersonalBest = (attributes: any) => {
	const { eventId, worldRanking, type } = attributes
	if (!eventId || !worldRanking || !type)
		throw new Error('PersonalBest requires eventId, worldRanking and type.')
	return {
		best: worldRanking * 200,
		continentalRanking: worldRanking,
		nationalRanking: worldRanking,
		...attributes,
	}
}

export const Event = (attributes: any) => ({
	id: '333',
	rounds: [],
	competitorLimit: null,
	qualification: null,
	extensions: [],
	...attributes,
})

export const Round = (attributes: any) => ({
	id: '333-r1',
	format: 'a',
	timeLimit: { centiseconds: 10 * 60 * 60 * 10, cumulativeRoundIds: [] },
	cutoff: null,
	advancementCondition: { type: 'percent', level: 75 },
	results: [],
	scrambleSetCount: 1,
	scrambleSets: [],
	extensions: [],
	...attributes,
})

export const Result = (attributes: any) => {
	const { personId, ranking } = attributes
	if (!personId) throw new Error('Result requires personId.')
	const multiplier = ranking || 10
	return {
		attempts: [
			{ result: multiplier * 200 },
			{ result: multiplier * 205 },
			{ result: multiplier * 150 },
			{ result: multiplier * 300 },
			{ result: multiplier * 101 },
		],
		best: multiplier * 101,
		average: multiplier * 185,
		...attributes,
	}
}

export const Venue = withId((id: any) => (attributes: any) => ({
	id,
	name: `Venue ${id}`,
	latitudeMicrodegrees: 0,
	longitudeMicrodegrees: 0,
	timezone: 'UTC',
	rooms: [],
	extensions: [],
	...attributes,
}))

export const Room = withId((id: any) => (attributes: any) => ({
	id: id,
	name: `Room ${id}`,
	color: '#000000',
	activities: [],
	extensions: [],
	...attributes,
}))
export const Activity = withId((id: any) => (attributes: any) => ({
	id: id,
	ongoing: false,
	name: `Activity ${id}`,
	activityCode: 'other-misc-example',
	startTime: '2020-01-01T10:00:00.000Z',
	endTime: '2020-01-01T11:00:00.000Z',
	childActivities: [],
	scrambleSetId: null,
	extensions: [],
	...attributes,
}))

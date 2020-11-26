import { Wcif } from '../../../entities'

export default function getOpenActivities(competition: Wcif) {
	const openActivities: any[] = []
	for (const venue of competition.schedule.venues) {
		for (const room of venue.rooms) {
			const { activities, ...roomWithoutActivities } = room
			for (const [activityIndex, activity] of room.activities.entries()) {
				if (activity.ongoing) {
					const childActivites = []
					for (const [
						childIndex,
						child,
					] of activity.childActivities.entries()) {
						if (child.ongoing) {
							childActivites.push({
								...child,
								next:
									activity.childActivities.length > childIndex + 1
										? activity.childActivities[childIndex + 1]
										: room.activities.length > activityIndex
										? room.activities[activityIndex + 1].childActivities
												.length > 0
											? room.activities[activityIndex + 1].childActivities[0]
											: room.activities[activityIndex + 1]
										: null,
							})
						}
					}
					if (activity.childActivities.length <= 0) {
						childActivites.push({
							...activity,
							next:
								room.activities.length > activityIndex + 1
									? room.activities[activityIndex + 1].childActivities.length >
									  0
										? room.activities[activityIndex + 1].childActivities[0]
										: room.activities[activityIndex + 1]
									: null,
						})
					}
					const filteredActivity = {
						...activity,
						childActivities: childActivites,
						room: roomWithoutActivities,
					}
					openActivities.push(filteredActivity)
				}
			}
		}
	}
	return openActivities
}

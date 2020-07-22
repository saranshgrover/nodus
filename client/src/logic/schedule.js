export const getScheduleData = (
	events = [],
	unselectedVenues = [],
	unselectedAssignments = [],
	assignments,
	activities
) => {
	let data = []

	for (const assignment of assignments) {
		const activity = activities.find(
			(activity) => activity.id === assignment.activityId
		)
		if (
			activity &&
			!events.includes(
				activity.activityCode.slice(0, activity.activityCode.indexOf('-'))
			) &&
			!unselectedVenues.includes(activity.room.id) &&
			!unselectedAssignments.includes(assignment.assignmentCode)
		)
			data.push({
				startDate: activity.startTime,
				endDate: activity.endTime,
				title: `${assignedTo(assignment.assignmentCode)} in ${activity.name}`,
				assignmentCode: assignment.assignmentCode,
				activity: activity,
			})
	}
	return data
}

export const assignedTo = (assignment) => {
	switch (assignment) {
		case 'competitor':
			return 'Compete'
		case 'staff-judge':
			return 'Judge'
		case 'staff-runner':
			return 'Run'
		case 'staff-scrambler':
			return 'Scramble'
		default:
			return 'Assigned for'
	}
}

export const findEarlierEventId = (event1, event2, schedule) => {
	let aTime
	let bTime
	schedule.venues.forEach((venue) =>
		venue.rooms.forEach((room) =>
			room.activities.forEach((activity) => {
				if (activity.activityCode === `${event1}-r1`)
					aTime = new Date(activity.startTime)
				else if (activity.activityCode === `${event2}-r1`)
					bTime = new Date(activity.startTime)
			})
		)
	)
	return aTime - bTime
}

export const findEarlierActivityId = (activity1, activity2, schedule) => {
	let aTime
	let bTime
	schedule.venues.forEach((venue) =>
		venue.rooms.forEach((room) =>
			room.activities.forEach((activity) => {
				activity.childActivities.forEach((childActivity) => {
					if (childActivity.id === activity1)
						aTime = new Date(childActivity.startTime)
					else if (childActivity.id === activity2)
						bTime = new Date(childActivity.startTime)
				})
			})
		)
	)
	return aTime - bTime
}

export const flattenActivities = (schedule) => {
	let flatActivites = []
	for (const venue of schedule.venues) {
		for (const room of venue.rooms) {
			for (const activity of room.activities) {
				flatActivites.push({ ...activity, room })
				if (activity.childActivities) {
					for (const childActivity of activity.childActivities)
						flatActivites.push({ ...childActivity, room })
				}
			}
		}
	}
	return flatActivites
}

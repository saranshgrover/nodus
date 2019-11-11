import moment from 'moment'

const findEarlierActivityId = (activity1,activity2,schedule) => {
    let aTime
    let bTime
    schedule.venues.forEach(venue=> venue.rooms.forEach(room => room.activities.forEach(activity => {
        activity.childActivities.forEach(childActivity => {
        if(childActivity.id === activity1) 
            aTime = new Date(childActivity.startTime)
        else if(childActivity.id === activity2)
            bTime = new Date(childActivity.startTime)
    })})))
    return aTime - bTime
}

/**
 * 
 * Returns an array of the users assignments in order of the schedule.
 * 
 * @param  userInfo 
 * @param  wcif 
 */
export const getMyAssignmentsInOrder = (userInfo, wcif) => {
    const userAssignments = wcif.persons.find(person=>person.wcaId === userInfo.me.wca_id).assignments
    const schedule = wcif.schedule
    return userAssignments.sort((a,b) => findEarlierActivityId(a.activityId, b.activityId,schedule))

}

export const getMyEventsInOrder = (userInfo, wcif) => {
    const userEvents = wcif.persons.find(person=>person.wcaId === userInfo.me.wca_id).registration.eventIds
    const schedule = wcif.schedule
    return userEvents.sort((a,b)=> findEarlierEventId(a,b,schedule))
}

const findEarlierEventId = (event1,event2,schedule) => {
    let aTime
    let bTime
    schedule.venues.forEach(venue=> venue.rooms.forEach(room => room.activities.forEach(activity => {
        if(activity.activityCode === `${event1}-r1`) 
            aTime = new Date(activity.startTime)
        else if(activity.activityCode === `${event2}-r1`)
            bTime = new Date(activity.startTime)
    })))
    return aTime - bTime
}
export const flattenActivities = (schedule) => {
    let flatActivites = []
    for(const venue of schedule.venues) {
        for( const room of venue.rooms) {
            for(const activity of room.activities) {
                flatActivites.push({...activity,room})
                for(const childActivity of activity.childActivities)
                    flatActivites.push({...childActivity,room})
            }
        }
    }
    return flatActivites
}


/**
 * Returns a list of data resembling
 * {start_date: , end_date: title:  }
 * 
 * @param {*} events 
 * @param {*} assignments 
 */
export const getScheduleData = (events, unselectedVenues, usselectedAssignments, assignments,activities) => {
    let data = []
    const assignedTo = (assignment) => {
        switch(assignment){
            case 'competitor': return 'Compete'
            case 'staff-judge': return 'Judge'
            case 'staff-runner': return 'Run'
            case 'staff-scrambler': return 'Scramble'
            default: return 'Assigned for'
        } 
    }
    for( const assignment of assignments) {
        const activity = activities.find(activity => activity.id === assignment.activityId)
        if(events.includes(activity.activityCode.slice(0,activity.activityCode.indexOf('-'))))
            data.push({startDate:activity.startTime,endDate:activity.endTime,title:`${assignedTo(assignment.assignmentCode)} in ${activity.name}`,assignmentCode:assignment.assignmentCode, activity:activity})
    }
    return data
}
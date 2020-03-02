import moment from 'moment'
import { flattenActivities } from '../Competition/Overview/OverviewLogic'

export const getCurrentEvents = (activities, delays) => {
  let currentEvents = []

  for (const activity of activities) {
    // const now = moment().subtract(delays[activity.room.id], 'minutes')
    const now = moment('2019-11-23T14:15:00Z')
    if (
      activity.childActivities.length === 0 &&
      now.isBetween(
        moment(activity.startTime).add(delays[activity.room.id], 'minutes'),
        moment(activity.endTime).add(delays[activity.room.id], 'minutes')
      )
    ) {
      currentEvents.push(activity)
    }
  }
  return currentEvents
}

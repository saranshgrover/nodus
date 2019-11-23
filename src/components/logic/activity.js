export const matches = () => {}

export const parseRoundFromActivity = activity => {
  let round = activity.substring(activity.indexOf('-') + 2)

  round = round.substring(
    0,
    round.indexOf('-') > 0 ? round.indexOf('-') : round.length
  )
  return round
}

export const parseGroupFromActivity = activity =>
  activity.substring(activity.lastIndexOf('-g') + 2)

export const getGroupsOf = (roundActivity, activities) => {
  let groups = []
  let rooms = []
  for (const activity of activities) {
    if (
      activity.activityCode.includes(roundActivity) &&
      !groups.includes(activity.activityCode) &&
      activity.childActivities.length === 0
    ) {
      groups.push(activity.activityCode)
      rooms.push(activity.room.name)
    }
  }
  return [groups, rooms]
}

export const activityUrl = activity => {
  const event = activity.substring(0, activity.indexOf('-'))
  const round = parseRoundFromActivity(activity)
  const group = parseGroupFromActivity(activity)
  return `${event}/${round}/${group}`
}

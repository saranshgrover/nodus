import React, { useState, useEffect } from 'react'
import GroupsEvent from './GroupsEvent'
import GroupsRound from './GroupsRound'
import { Breadcrumbs, Grid, Link, LinearProgress } from '@material-ui/core'
import EventList from '../../common/EventList'
import { flattenActivities } from '../Overview/OverviewLogic'
import GroupsActivity from './GroupsActivity'
import { isHappening } from '../../../server/tools'
import CompetitionStatus from '../Status/CompetitionStatus'

export default function GroupsActivities({ match, wcif, userInfo, history }) {
  const [activities, setActivities] = useState(undefined)
  useEffect(() => {
    setActivities(flattenActivities(wcif.schedule))
  }, [wcif.schedule])
  const [events, setEvents] = useState(undefined)
  useEffect(() => {
    let localEvents = []
    wcif.events.map(event => localEvents.push(event.id))
    setEvents(localEvents)
  }, [wcif.events])
  const [event, setEvent] = useState(match.params.event)
  const [group, setGroup] = useState(match.params.group)
  const [round, setRound] = useState(match.params.round)
  return (
    <Grid
      container
      spacing={4}
      direction='column'
      alignItems='center'
      justify='center'
    >
      {isHappening(wcif.schedule) && <CompetitionStatus wcif={wcif} />}
      <Grid item>
        <Breadcrumbs style={{ fontSize: '5vmin' }}>
          <Link color='inherit' href={`/competitions/${wcif.id}/groups/events`}>
            Events
          </Link>
          {event && (
            <Link
              color='inherit'
              href={`/competitions/${wcif.id}/groups/events/${event}`}
            >
              <span className={`cubing-icon event-${event}`} />
            </Link>
          )}
          {round && (
            <Link
              color='inherit'
              href={`/competitions/${wcif.id}/groups/events/${event}/${round}`}
            >
              Round {round}
            </Link>
          )}
          {group && (
            <Link
              color='inherit'
              href={`/competitions/${wcif.id}/groups/events/${event}/${round}/${group}`}
            >
              Group {group}
            </Link>
          )}
        </Breadcrumbs>
      </Grid>
      {events && activities && event && round && group ? (
        <GroupsActivity
          activities={activities}
          event={event}
          group={group}
          round={round}
          history={history}
          wcif={wcif}
        />
      ) : events && activities && event && round ? (
        <GroupsRound
          history={history}
          activities={activities}
          event={event}
          round={round}
          setGroup={setGroup}
          wcif={wcif}
        />
      ) : events && activities && event ? (
        <GroupsEvent
          history={history}
          setRound={setRound}
          events={events}
          event={event}
          wcif={wcif}
        />
      ) : events ? (
        <EventList
          events={events}
          showName={true}
          onClick={event => setEvent(event)}
        />
      ) : (
        <LinearProgress />
      )}
    </Grid>
  )
}

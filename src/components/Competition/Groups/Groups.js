import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import GroupsActivity from './GroupsActivity'
import GroupsActivities from './GroupsActivities'

import GroupsUsers from './GroupsUsers'

export default function Groups({ user, wcif, userInfo }) {
  return (
    <Switch>
      <Route
        path={`/competitions/${wcif.id}/groups/competitors/:wcaId?`}
        render={props => (
          <GroupsUsers {...props} wcif={wcif} userInfo={userInfo} user={user} />
        )}
      />
      <Route
        path={`/competitions/${wcif.id}/groups/events/:event?/:round?/:group?`}
        render={props => (
          <GroupsActivities {...props} wcif={wcif} userInfo={userInfo} />
        )}
      />
      {/* <Route
        path={`/competitions/${wcif.id}/groups/:roomId/:activityCode`}
        render={props => (
          <GroupsActivity {...props} wcif={wcif} userInfo={userInfo} />
        )}
      /> */}
      {user !== 'spectator' && (
        <Redirect
          to={`/competitions/${wcif.id}/groups/competitors/${
            userInfo.me.wca_id ? userInfo.me.wca_id : userInfo.me.id
          }`}
        />
      )}
      {user === 'spectator' && (
        <Redirect to={`/competitions/${wcif.id}/Groups/competitors`} />
      )}
    </Switch>
  )
}

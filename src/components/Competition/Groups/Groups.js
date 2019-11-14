import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import GroupsUser from './GroupsUser'
import GroupsActivity from './GroupsActivity'

export default function Groups({ user, wcif, userInfo }) {
  return (
    <>
      <Route
        path={`/competitions/${wcif.id}/Groups/me`}
        render={props => (
          <GroupsUser {...props} wcif={wcif} userInfo={userInfo} />
        )}
      />
      <Route
        path={`/competitions/${wcif.id}/groups/:eventId/:activityName`}
        render={props => (
          <GroupsActivity {...props} wcif={wcif} userInfo={userInfo} />
        )}
      />
      <Route
        path={`/competitions/${wcif.id}/groups/general`}
        render={props => <GroupsActivity {...props} wcif={wcif} />}
      />
      <Redirect to={`/competitions/${wcif.id}/Groups/me`} />
    </>
  )
}

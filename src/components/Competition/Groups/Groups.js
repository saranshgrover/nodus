import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import GroupsUser from './GroupsUser'
import GroupsActivity from './GroupsActivity'

export default function Groups({ user, wcif, userInfo }) {
  console.log(userInfo)
  return (
    <Switch>
      <Route
        path={`/competitions/${wcif.id}/groups/:roomId/:activityCode`}
        render={props => (
          <GroupsActivity {...props} wcif={wcif} userInfo={userInfo} />
        )}
      />
      <Route
        path={`/competitions/${wcif.id}/groups/general`}
        render={props => <GroupsActivity {...props} wcif={wcif} />}
      />
      <Route
        path={`/competitions/${wcif.id}/Groups/:wcaId`}
        render={props => (
          <GroupsUser {...props} wcif={wcif} userInfo={userInfo} />
        )}
      />
      <Redirect
        to={`/competitions/${wcif.id}/Groups/${
          userInfo.me.wca_id ? userInfo.me.wca_id : userInfo.me.id
        }`}
      />
    </Switch>
  )
}

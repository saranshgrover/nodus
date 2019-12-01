import React, { useState } from 'react'
import { Redirect, Route } from 'react-router-dom'
import Notifications from './Notifications/Notifications'
import Groups from './Groups/Groups'
import Overview from './Overview/Overview'
import Error from '../common/Error'
import Admin from './Admin/Admin'
import { isExtensionSetup } from '../../server/wcif'
import {
  getMyAssignmentsInOrder,
  getMyEventsInOrder
} from './Overview/OverviewLogic'
import MySnackbar from '../common/MySnackbar'

function Competition({ user, history, localWcif, compId, userInfo }) {
  const [wcif, setWcif] = useState(localWcif)
  return (
    <div>
      {isExtensionSetup('GeneralConfig', wcif) && (
        <>
          <Route
            path={`/competitions/${wcif.id}/overview`}
            render={props => (
              <Overview
                {...props}
                myEvents={getMyEventsInOrder(userInfo, wcif)}
                myAssignments={getMyAssignmentsInOrder(
                  userInfo.me.wca_id,
                  wcif
                )}
                wcif={wcif}
                user={user}
                userInfo={userInfo}
              />
            )}
          />
          <Route
            path={`/competitions/${wcif.id}/groups`}
            render={props => (
              <Groups {...props} user={user} wcif={wcif} userInfo={userInfo} />
            )}
          />
          <Route
            path={`/competitions/${wcif.id}/notifications`}
            render={props => <Notifications {...props} />}
          />
          <Route
            path={`/competitions/${wcif.id}/admin`}
            render={props => (
              <Admin {...props} user={user} wcif={wcif} setWcif={setWcif} />
            )}
          />
        </>
      )}
      {!isExtensionSetup('GeneralConfig', wcif) &&
        (user === 'admin' ? (
          <>
            <Redirect to={`/competitions/${compId}/admin`} />
            <MySnackbar
              variant={'error'}
              message={'Set up Admin information first'}
            />
            <Admin user={user} wcif={wcif} setWcif={setWcif} />
          </>
        ) : (
          <Error
            message={"😞😞😞 This competition isn't using myComp 😞😞😞 "}
          />
        ))}
      <Route exact path={`/competitions/${wcif.id}`}>
        <Redirect to={`/competitions/${wcif.id}/overview`} />
      </Route>
    </div>
  )
}
export default Competition

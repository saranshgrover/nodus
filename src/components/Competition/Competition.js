import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
import Notifications from './Notifications/Notifications'
import Groups from './Groups/Groups'
import Overview from './Overview/Overview'
import Error from '../common/Error'
import Admin from './Admin/Admin'

import LinearProgress from '@material-ui/core/LinearProgress'

import { getWcif, getWcifPublic } from '../../server/wca-api'
import { isExtensionSetup } from '../../server/wcif'
import {
  getMyAssignmentsInOrder,
  getMyEventsInOrder
} from './Overview/OverviewLogic'
import MySnackbar from '../common/MySnackbar'

class Competition extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wcif: null,
      loadingWcif: true,
      myEvents: [],
      extensionSetup: false
    }
    props.user === 'admin'
      ? getWcif(this.props.compId).then(res =>
          this.setState({ wcif: res, loadingWcif: false })
        )
      : getWcifPublic(this.props.compId).then(res =>
          this.setState({ wcif: res, loadingWcif: false })
        )
    if (props.user !== 'spectator' && !this.state.loadingWcif) {
      this.setState({
        myEvents: getMyEventsInOrder(props.userInfo, this.state.wcif),
        extensionSetup: isExtensionSetup('GeneralConfig', this.state.wcif)
      })
    }
  }
  setWcif = newWcif => this.setState({ wcif: newWcif })
  render() {
    const { wcif, loadingWcif } = this.state
    const { user, userInfo, compId } = this.props
    return (
      <div>
        {!loadingWcif && isExtensionSetup('GeneralConfig', wcif) && (
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
                <Groups
                  {...props}
                  user={user}
                  wcif={wcif}
                  userInfo={userInfo}
                />
              )}
            />
            <Route
              path={`/competitions/${wcif.id}/notifications`}
              render={props => <Notifications {...props} />}
            />
            <Route
              path={`/competitions/${wcif.id}/admin`}
              render={props => (
                <Admin
                  {...props}
                  user={user}
                  wcif={this.state.wcif}
                  setWcif={this.setWcif}
                />
              )}
            />
          </>
        )}
        {!loadingWcif &&
          !isExtensionSetup('GeneralConfig', wcif) &&
          (user === 'admin' ? (
            <>
              <Redirect to={`/competitions/${compId}/admin`} />
              <MySnackbar
                variant={'error'}
                message={'Set up Admin information first'}
              />
              <Admin
                user={user}
                wcif={this.state.wcif}
                setWcif={this.setWcif}
              />
            </>
          ) : (
            <Error
              message={"😞😞😞 This competition isn't using myComp 😞😞😞 "}
            />
          ))}
        {loadingWcif && <LinearProgress />}
      </div>
    )
  }
}
export default Competition

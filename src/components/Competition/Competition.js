import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
import Notifications from './Notifications/Notifications'
import Groups from './Groups/Groups'
import Projector from './Projector/Projector'
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
    return (
      <div>
        {!loadingWcif && isExtensionSetup('GeneralConfig', wcif) && (
          <>
            <Route
              path={`/competitions/${wcif.id}/overview`}
              render={props => (
                <Overview
                  {...props}
                  myEvents={getMyEventsInOrder(this.props.userInfo, wcif)}
                  myAssignments={getMyAssignmentsInOrder(
                    this.props.userInfo.me.wca_id,
                    wcif
                  )}
                  wcif={wcif}
                  user={this.props.user}
                  userInfo={this.props.userInfo}
                />
              )}
            />
            <Route
              path={`/competitions/${wcif.id}/groups`}
              render={props => (
                <Groups
                  {...props}
                  user={this.props.user}
                  wcif={wcif}
                  userInfo={this.props.userInfo}
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
                  wcif={this.state.wcif}
                  setWcif={this.setWcif}
                  user={this.props.user}
                />
              )}
            />
          </>
        )}
        {!loadingWcif &&
          !isExtensionSetup('GeneralConfig', wcif) &&
          (this.props.user === 'admin' ? (
            <>
              <Redirect to={`/competitions/${this.props.compId}/admin`} />
              <MySnackbar
                variant={'error'}
                message={'Set up Admin information first'}
              />
              <Admin wcif={this.state.wcif} setWcif={this.setWcif} />
            </>
          ) : (
            <Error message={'TODO MAKE A useError HOOK!'} />
          ))}
        {loadingWcif && <LinearProgress />}
      </div>
    )
  }
}
export default Competition

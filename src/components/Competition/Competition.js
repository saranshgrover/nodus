import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
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
      myAssigments: []
    }
    props.user === 'admin'
      ? getWcif(this.props.compId).then(res =>
          this.setState({ wcif: res, loadingWcif: false })
        )
      : getWcifPublic(this.props.compId).then(res =>
          this.setState({ wcif: res, loadingWcif: false })
        )
    if (props.user !== 'spectator' && !this.state.loadingWcif) {
      console.log('helo?')
      this.setState({
        myEvents: getMyEventsInOrder(props.userInfo, this.state.wcif),
        myAssigments: getMyAssignmentsInOrder(props.userInfo, this.state.wcif)
      })
    }
  }
  setWcif = newWcif => this.setState({ wcif: newWcif })
  getComponents = () => {
    // IF WCIF EXTENSION NOT SETUP
    if (!isExtensionSetup('GeneralConfig', this.state.wcif)) {
      // IF ADMIN, REDIRECT TO ADMIN PAGE
      if (this.props.user === 'admin')
        return (
          <>
            <Redirect to={`/competitions/${this.props.compId}/admin`} />
            <MySnackbar
              variant={'error'}
              message={'Set up Admin information first'}
            />
            <Admin wcif={this.state.wcif} setWcif={this.setWcif} />
          </>
        )
      // ELSE SHOW ERROR
      else
        return (
          <Error message={'This competition is not using WCA Real Time. '} />
        )
    }
    if (!this.props.component)
      return (
        <Overview
          myEvents={getMyEventsInOrder(this.props.userInfo, this.state.wcif)}
          myAssignments={getMyAssignmentsInOrder(
            this.props.userInfo,
            this.state.wcif
          )}
          wcif={this.state.wcif}
          user={this.props.user}
          userInfo={this.props.userInfo}
        />
      )
    switch (this.props.component.toLowerCase()) {
      case 'overview':
        return (
          <Overview
            myEvents={getMyEventsInOrder(this.props.userInfo, this.state.wcif)}
            myAssignments={getMyAssignmentsInOrder(
              this.props.userInfo,
              this.state.wcif
            )}
            wcif={this.state.wcif}
            user={this.props.user}
            userInfo={this.props.userInfo}
          />
        )
      case 'notifications':
        return <Notifications />
      case 'groups':
        return <Groups />
      case 'projector':
        return <Projector />
      case 'admin': {
        if (this.props.user === 'admin')
          return <Admin wcif={this.state.wcif} setWcif={this.setWcif} />
        return <Error />
      }
      default:
        return <Error message={'Invalid URL'} />
    }
  }
  render() {
    return (
      <>{this.state.loadingWcif ? <LinearProgress /> : this.getComponents()}</>
    )
  }
}
export default Competition

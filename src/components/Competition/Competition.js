import React, { Component } from 'react'
import Notifications from './Notifications'
import Groups from './Groups'
import Projector from './Projector'
import Overview from './Overview'
import Error from '../common/Error'
import Admin from './Admin'

import LinearProgress from '@material-ui/core/LinearProgress'

import {getWcif, getWcifPublic} from '../../server/wca-api'

class Competition extends Component {
    constructor(props) {
      super(props)
      this.state = {
        wcif: null,
        loadingWcif: true,
      }
      props.user === 'admin' ?
      getWcif(props.compId).then(res=>this.setState({wcif:res,loadingWcif: false }))
      :
      getWcifPublic(props.compId).then(res=>this.setState({wcif:res,loadingWcif:false}))
    }
    getComponents = () => {
      if(!this.props.component)
        return <Overview/>
      switch(this.props.component.toLowerCase()) {
        case 'overview':
          return <Overview/>
        case 'notifications':
          return <Notifications/>
        case 'groups':
          return <Groups/>
        case 'projector':
          return <Projector/>
        case 'admin': {
          if(this.props.user==='admin')
            return <Admin/>
          return <Error/>
        }
        default:
          return <Error message={"Invalid URL"}/>
      }
    }
    render() {
        return (
          <>
            {this.state.loadingWcif && <LinearProgress/>}
            {!this.state.loadingWcif && this.getComponents()}
          </>
        )
    }
}
export default (Competition);

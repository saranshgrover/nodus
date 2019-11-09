import React, { Component } from 'react'
import Notifications from './Notifications/Notifications'
import Groups from './Groups/Groups'
import Projector from './Projector/Projector'
import Overview from './Overview'
import Error from '../common/Error'
import Admin from './Admin/Admin'

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
    setWcif = (newWcif) => {
      this.setState({wcif:newWcif})
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
            return <Admin wcif={this.state.wcif} setWcif={this.setWcif}/>
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

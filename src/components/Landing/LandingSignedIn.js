import React, { Component } from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'
import CompList from './CompList'
import { getMyManagableComps, getMyUpcomingComps } from '../../server/wca-api'
import { sortArrayByDate } from '../../server/tools'

class LandingSignedIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allUpcomingComps: null,
      myManagableComps: null,
      loadingAll: true,
      loadingMine: true,
      myUpcomingComps: null
    }
    getMyUpcomingComps(this.props.userInfo.me.id).then(res => {
      this.setState({
        myUpcomingComps: sortArrayByDate(res.upcoming_competitions),
        loadingAll: false
      })
    })
    getMyManagableComps().then(comps =>
      this.setState({
        myManagableComps: sortArrayByDate(comps),
        loadingMine: false
      })
    )
  }

  render() {
    const {
      myUpcomingComps,
      myManagableComps,
      loadingAll,
      loadingMine
    } = this.state
    return (
      <>
        {!loadingAll && !loadingMine && (
          <CompList
            myUpcomingComps={myUpcomingComps}
            myManagableComps={myManagableComps}
          />
        )}
        {loadingMine && loadingAll && <LinearProgress />}
      </>
    )
  }
}

export default LandingSignedIn

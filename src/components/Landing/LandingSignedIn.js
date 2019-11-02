import React, { Component } from 'react'
import LinearProgress from '@material-ui/core/LinearProgress';
import CompList from './CompList'
import {getAllUpcomingComps, getMyManagableComps, getMyUpcomingComps} from '../../server/wca-api'
import {sortArrayBy} from '../../server/tools'

class LandingSignedIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allUpcomingComps: null,
            myManagableComps: null,
            loadingAll: true,
            loadingMine: true,
            myUpcomingComps: null,
        }
        getMyUpcomingComps(this.props.userInfo.me.id)
        .then(res => {this.setState({myUpcomingComps: sortArrayBy(res.upcoming_competitions,'end_date'),loadingAll: false})})
        getMyManagableComps()
        .then(comps => this.setState({myManagableComps: sortArrayBy(comps,'end_date'), loadingMine: false},()=>{console.log(this.state.myManagableComps)}))
        
    }
    compileAllComps = (allUpcomingComps) => {
        let allComps = []
        allUpcomingComps.forEach(comps => {
            comps.forEach(comp => allComps.push(comp))
        });
        return sortArrayBy(allComps,'start_date')
    }
    async getAllUpcomingComps() {
        let i = 1
        let promises = []
        while(i<10) {
          promises.push(getAllUpcomingComps(i))
          i++
        }
        let res = await Promise.all(promises)
        return res
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
                {!loadingAll && !loadingMine && <CompList myUpcomingComps={myUpcomingComps} myManagableComps={myManagableComps}/>}
                {loadingMine && loadingAll && <LinearProgress/>}
            </>
        )
    }
}

export default LandingSignedIn
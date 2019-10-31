import React, { Component } from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import { isSignedIn, signOut } from '../../server/auth'
import { getMe } from '../../server/wca-api'


class LandingSignedIn extends Component {
    constructor(props) {
        super()
        this.state = {
            infoReceived: false,
            userInfo: {}
        }
    }

    getClientInfo = () => {
        getMe().then(me => {
            this.setState({
                infoReceived: true,
                userInfo: me
            })
        })
    }

    render() {
        console.log(this.state.infoReceived)
        console.log(this.state.userInfo)
        if (!this.state.infoReceived) this.getClientInfo()
        return (
            <>
                <p>SIGNED IN WOOO</p>
            </>
        )
    }
}

export default LandingSignedIn
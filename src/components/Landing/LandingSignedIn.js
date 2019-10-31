import React, { Component } from 'react'
import Header from '../Header'
import Footer from '../Footer'
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
                <Header signFunction={signOut} isSignedIn={isSignedIn()} infoReceived={this.state.infoReceived} userInfo={this.state.userInfo} />
                <p>SIGNED IN WOOO</p>
                <Footer />
            </>
        )
    }
}

export default LandingSignedIn
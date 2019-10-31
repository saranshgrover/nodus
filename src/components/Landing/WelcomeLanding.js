import React, { Component } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import {signIn, isSignedIn} from '../../server/auth'


class WelcomeLanding extends Component {
    constructor(props) {
        super()
    }

    render() {
        return (
            <>
                <Header signFunction={signIn} isSignedIn={isSignedIn()} />

                <Footer />
            </>
        );
    }
}

export default WelcomeLanding
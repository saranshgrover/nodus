import React, { Component } from 'react'
import CompTable from './CompTable'

class LandingSignedIn extends Component {
    constructor(props) {
        super()
    }

    render() {
        return (
            <>
                <p>SIGNED IN WOOO</p>
                <CompTable />
            </>
        )
    }
}

export default LandingSignedIn
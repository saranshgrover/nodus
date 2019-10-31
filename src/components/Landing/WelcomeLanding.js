import React, { Component } from 'react'

class WelcomeLanding extends Component {
    constructor(props) {
        super()
    }

    render() {
        console.log(this.props.upcomingComps)
        return (
            <>
                <p>You ain't signed in</p>
            </>
        );
    }
}

export default WelcomeLanding
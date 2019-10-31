import React, { Component } from 'react'
import {signIn, isSignedIn} from '../server/auth'
import {getWcif} from '../server/wca-api'
class Comp extends Component {
    constructor(props) {
        super();
        console.log(isSignedIn())
        isSignedIn() ?
        this.getWcif('BrooklynFall2019') :
        console.log("you aint signed in")
    }

    async getWcif(competitionID) {
        let data = await getWcif(competitionID);
        console.log(data);
    }

    render() {
        return (
            <div>
                <h1 onClick={signIn}>Sign In </h1>
            </div>
        );
    }
}

export default Comp;
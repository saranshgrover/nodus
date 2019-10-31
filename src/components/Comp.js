import React, { Component } from 'react'
import axios from 'axios'
import {signIn} from '../server/auth'
import  {getWcif} from '../server/wca-api'
class Comp extends Component {
    constructor(props) {
        super();
        const API_URL = "https://www.worldcubeassociation.org/api/v0/competitions/SBUFall2019/schedule";
        const API_OTHER = "https://www.worldcubeassociation.org/api/v0/competitions/BrooklynFall2019/schedule";
        this.getData(API_URL);
        this.getData(API_OTHER);
    }

    async getData(URL) {
        let data = await axios.get(URL);
        console.log(JSON.parse(data.request.response));
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
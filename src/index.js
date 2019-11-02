import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/Landing/App';
import * as serviceWorker from './serviceWorker';
import { getMe} from './server/wca-api'
import {isSignedIn} from './server/auth'
import { initializeAuth} from './server/auth'
initializeAuth()
if(isSignedIn()) {
    getMe().then(user => {
        ReactDOM.render(<App userInfo={user} />, document.getElementById('root'));
        })
}
else {
    ReactDOM.render(<App userInfo={{}} />, document.getElementById('root'));
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react'
import LandingSignedIn from './LandingSignedIn'
import WelcomeLanding from './WelcomeLanding'
export default function Landing({signedIn, onSignOut, userInfo}) {
    return (
    <>
        {signedIn && userInfo && <LandingSignedIn userInfo={userInfo}/>}
        {!signedIn && <WelcomeLanding/>}
    </>
    )
}

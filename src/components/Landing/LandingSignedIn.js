import React, { useEffect, useState } from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'
import CompList from './CompList'
import { getAllCompsToday } from '../../server/wca-api'
import { Tabs, Tab } from '@material-ui/core'
import { isExtensionSetup } from '../../server/wcif'

function LandingSignedIn({ myUpcomingComps }) {
  const [allCompsToday, setAllCompsToday] = useState([])
  const [loadingToday, setLoadingToday] = useState(true)
  const [value, setValue] = React.useState(-1)

  useEffect(() => {
    getAllCompsToday(1).then(comps => {
      setAllCompsToday(comps)
      setLoadingToday(false)
    })
    allCompsToday.length > myUpcomingComps.length ? setValue(0) : setValue(1)
  }, [allCompsToday.length, myUpcomingComps.length])

  return (
    <>
      {!loadingToday ? (
        <>
          <Tabs
            value={value}
            onChange={(event, index) => setValue(index)}
            variant='fullWidth'
          >
            <Tab label='Happening Now' />
            <Tab label='Upcoming' />
          </Tabs>
          {value === 0 && <CompList comps={allCompsToday} />}
          {value === 1 && <CompList date={true} comps={myUpcomingComps} />}
        </>
      ) : (
        <LinearProgress />
      )}
    </>
  )
}

export default LandingSignedIn

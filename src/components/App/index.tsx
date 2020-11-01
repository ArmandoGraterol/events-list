import React from 'react'
import { isEmpty } from 'lodash'

import useEventData from '../../hooks/useEventData'
import EventList from '../EventList'

import classes from './styles.module.css'

function App () {
  const { eventLogs, isLoadingEventLogs } = useEventData()

  return (
    <div className={classes.container}>
      {!isEmpty(eventLogs) && <EventList eventLogs={eventLogs} />}
      {isLoadingEventLogs && <h2 className={classes.loadingMessage}>Loading</h2>}
    </div>
  )
}

export default App

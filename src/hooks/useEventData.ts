import { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'

import createColonyClient from '../colony_integration/createColonyClient'
import getEventLogs from '../colony_integration/getEventLogs'
import { EventLog } from '../types'

const useEventData = () => {
  const [eventLogs, setEventLogs] = useState<EventLog[]>([])
  const [isLoadingEventLogs, setIsLoadingEventLogs] = useState(false)
  const fetchEventLogs = async () => {
    setIsLoadingEventLogs(true)

    try {
      const client = await createColonyClient()
      const eventLogs = await getEventLogs(client)

      setEventLogs(eventLogs)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoadingEventLogs(false)
    }
  }

  useEffect(() => {
    if (isEmpty(eventLogs)) {
      fetchEventLogs()
    }
  }, [eventLogs])

  return {
    eventLogs,
    isLoadingEventLogs
  }
}

export default useEventData

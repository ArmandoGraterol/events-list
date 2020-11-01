import React from 'react'

import EventListItem from '../EventListItem'
import { EventLog } from '../../types'

import classes from './styles.module.css'

interface EventListProps {
  eventLogs: EventLog[]
}

const EventList = ({ eventLogs }: EventListProps) => (
  <ul className={classes.list}>
    {eventLogs.map((eventLog, i) => (
      <EventListItem key={i} eventLog={eventLog} />
    ))}
  </ul>
)

export default EventList

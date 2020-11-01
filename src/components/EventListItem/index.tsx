import React from 'react'
import dayjs from 'dayjs'

import { EventLog } from '../../types'
import Avatar from './Avatar'

import classes from './styles.module.css'

interface EventListItemProps {
  eventLog: EventLog
}

const EventListItem = ({ eventLog }: EventListItemProps) => (
  <li className={classes.listItem}>
    <Avatar seed={eventLog.userAddress || eventLog.transactionHash} />
    <div className={classes.content}>
      {eventLog.type === 'ColonyInitialised' && (
        <p className={classes.text}>Congratulations! It's a beautiful baby colony!</p>
      )}
      {eventLog.type === 'ColonyRoleSet' && (
        <p className={classes.text}>
          <span className={classes.boldText}>{eventLog.role}</span>
          {' '}role assigned to user{' '}
          <span className={classes.boldText}>{eventLog.userAddress}</span>
          {' '}in domain{' '}
          <span className={classes.boldText}>{eventLog.domainId}</span>
          .
        </p>
      )}
      {eventLog.type === 'PayoutClaimed' && (
        <p className={classes.text}>
          User{' '}
          <span className={classes.boldText}>{eventLog.userAddress}</span>
          {' '}claimed{' '}
          <span className={classes.boldText}>{eventLog.claimedAmount}{eventLog.token}</span>
          {' '}payout from pot{' '}
          <span className={classes.boldText}>{eventLog.fundingPotId}</span>
          .
        </p>
      )}
      {eventLog.type === 'DomainAdded' && (
        <p className={classes.text}>
          Domain{' '}
          <span className={classes.boldText}>{eventLog.domainId}</span>
          {' '}added.
        </p>
      )}
      <p className={classes.date}>{dayjs(eventLog.date).format('DD MMM HH:mm:ss')}</p>
    </div>
  </li>
)

export default EventListItem

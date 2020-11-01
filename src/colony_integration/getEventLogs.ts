import { ColonyClient } from '@colony/colony-js'
import { InfuraProvider } from 'ethers/providers'

import { EventLog } from '../types'
import getColonyInitialisedEventLogs from './getColonyInitialisedEventLogs'
import getColonyRoleSetEventLogs from './getColonyRoleSetEventLogs'
import getPayoutClaimedEventLogs from './getPayoutClaimedEventLogs'
import getDomainAddedEventLogs from './getDomainAddedEventLogs'

const getEventLogs = async (client: ColonyClient): Promise<EventLog[]> => {
  const provider = new InfuraProvider(
    'mainnet',
    'f78d8251de9e4dc998f74d902e0aac03'
  )
  const colonyInitialisedEventLogs = await getColonyInitialisedEventLogs(client, provider)
  const colonyRoleSetEventLogs = await getColonyRoleSetEventLogs(client, provider)
  const payoutClaimedEventLogs = await getPayoutClaimedEventLogs(client, provider)
  const domainAddedEventLogs = await getDomainAddedEventLogs(client, provider)
  const eventLogs = colonyInitialisedEventLogs.concat(
    colonyRoleSetEventLogs,
    payoutClaimedEventLogs,
    domainAddedEventLogs
  )
  const sortedEventLogs = eventLogs.sort((eventA, eventB) => {
    if (eventA.date > eventB.date) return 1
    else if (eventB.date > eventA.date) return -1
    else return 0
  })

  return sortedEventLogs
}

export default getEventLogs

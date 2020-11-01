import {
  ColonyClient,
  getLogs,
  getBlockTime,
  ColonyRole
} from '@colony/colony-js'
import { InfuraProvider, Log } from 'ethers/providers'
import { utils } from 'ethers'

import { EventLog } from '../types'

const getColonyRoleSetEventLogs = async (client: ColonyClient, provider: InfuraProvider):Promise<EventLog[]> => {
  // @ts-ignore
  // I had a ts error where it said that ColonyRoleSet wasn't a defined prop in the filters.
  const eventFilter = client.filters.ColonyRoleSet(null, null, null, null)
  const eventLogs = await getLogs(client, eventFilter)
  const parsedEvents = eventLogs.map(async (event: Log) => {
    const parsedEvent = client.interface.parseLog(event)
    const userAddress: string = parsedEvent.values.user
    const role = ColonyRole[parsedEvent.values.role]
    const domainId = new utils.BigNumber(parsedEvent.values.domainId).toString()
    const logTime = await getBlockTime(provider, parsedEvent.values.blockHash)

    return {
      type: parsedEvent.name,
      transactionHash: event.transactionHash as string,
      date: logTime,
      userAddress,
      role,
      domainId
    }
  })

  return Promise.all(parsedEvents)
}

export default getColonyRoleSetEventLogs

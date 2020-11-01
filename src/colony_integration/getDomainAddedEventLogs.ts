import { ColonyClient, getLogs, getBlockTime } from '@colony/colony-js'
import { InfuraProvider, Log } from 'ethers/providers'
import { utils } from 'ethers'

import { EventLog } from '../types'

const getDomainAddedEventLogs = async (
  client: ColonyClient,
  provider: InfuraProvider
):Promise<EventLog[]> => {
  const eventFilter = client.filters.DomainAdded(null)
  const eventLogs = await getLogs(client, eventFilter)
  const parsedEvents = eventLogs.map(async (event: Log) => {
    const parsedEvent = client.interface.parseLog(event)
    const domainId = new utils.BigNumber(parsedEvent.values.domainId).toString()
    const logTime = await getBlockTime(provider, parsedEvent.values.blockHash)

    return {
      type: parsedEvent.name,
      transactionHash: event.transactionHash as string,
      date: logTime,
      domainId
    }
  })

  return Promise.all(parsedEvents)
}

export default getDomainAddedEventLogs
